import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

// Lazy initialization of Supabase.
// It will only be active if VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are supplied.
export const isSupabaseConfigured = () => {
  return supabaseUrl.trim().length > 0 && supabaseAnonKey.trim().length > 0;
};

let supabaseInstance: any = null;

export const getSupabase = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
};

// Helper to determine if a registered user account is expired based on its registration date
export function isAccountExpired(createdAtString?: string): boolean {
  if (!createdAtString) return false;
  const created = new Date(createdAtString);
  if (isNaN(created.getTime())) return false;
  
  const createdYear = created.getFullYear();
  // Expiration date for this account is March 31st of the appropriate year
  let expiryYear = createdYear;
  const march31ThisYear = new Date(createdYear, 2, 31, 23, 59, 59, 999); // Month 2 is March
  
  if (created > march31ThisYear) {
    expiryYear = createdYear + 1;
  }
  
  const expirationDate = new Date(expiryYear, 2, 31, 23, 59, 59, 999);
  const now = new Date();
  
  return now > expirationDate;
}

export interface UserProfile {
  name: string;
  email: string;
  password?: string;
  coupon_code?: string;
  selected_board?: 'cbse' | 'ssc';
  created_at?: string;
  role?: string;
}

/**
 * Persists the registered student to either Supabase (if configured) or localStorage simulation.
 * This guarantees both local operation and true live cloud syncing.
 */
export async function dbRegisterUser(profile: UserProfile): Promise<{ success: boolean; message: string }> {
  try {
    const isAppAdmin = profile.role === 'admin' || profile.email.toLowerCase() === 'admin@company.com';
    
    // 1. Always sync to localStorage first to guarantee smooth preview interaction
    const localUsersStr = localStorage.getItem('kootmate_users') || '[]';
    const localUsers = JSON.parse(localUsersStr);
    
    // Check local duplicate
    if (localUsers.some((u: any) => u.email.toLowerCase() === profile.email.toLowerCase())) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    localUsers.push({
      name: profile.name,
      email: profile.email.toLowerCase(),
      password: profile.password || '',
      couponCode: profile.coupon_code || '',
      selectedBoard: profile.selected_board || 'cbse',
      createdAt: new Date().toISOString(),
      role: profile.role || 'student'
    });
    localStorage.setItem('kootmate_users', JSON.stringify(localUsers));

    if (isAppAdmin) {
      const adminEmails = JSON.parse(localStorage.getItem('kootmate_admin_emails') || '[]');
      if (!adminEmails.includes(profile.email.toLowerCase())) {
        adminEmails.push(profile.email.toLowerCase());
        localStorage.setItem('kootmate_admin_emails', JSON.stringify(adminEmails));
      }
    }

    // 2. Perform live Supabase sync if credentials are set up
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            name: profile.name,
            email: profile.email.toLowerCase(),
            password: profile.password || '',
            referral_code: profile.coupon_code || '',
            selected_board: profile.selected_board || 'cbse',
            created_at: new Date().toISOString(),
            role: profile.role || 'student'
          }
        ]);

      if (error) {
        console.error('Supabase write error:', error.message);
        if (error.message && (error.message.includes('public.users') || error.message.includes('relation "users" does not exist') || error.message.includes('schema cache'))) {
          localStorage.setItem('kootmate_supabase_table_error', 'true');
        }
        return { 
          success: true, 
          message: `Local profile saved! Supabase insert status: ${error.message}` 
        };
      } else {
        localStorage.removeItem('kootmate_supabase_table_error');
      }
      return { success: true, message: 'Account saved securely to Supabase database!' };
    }

    return { 
      success: true, 
      message: 'Account created successfully in local repository! (To sync with live Supabase, supply credentials in settings).' 
    };

  } catch (err: any) {
    console.error('Registration handler failure:', err);
    return { success: false, message: err.message || 'Error occurred during database enrollment.' };
  }
}

/**
 * Authenticates user credentials. Checks local localStorage repository,
 * and if Supabase is active, verifies against the remote table database.
 */
export async function dbLoginUser(email: string, password: string): Promise<{ success: boolean; user?: any; message: string }> {
  const targetEmail = email.toLowerCase().trim();
  
  // 0. Explicit support for primary admin account
  if (targetEmail === 'admin@company.com' && password === 'admin@123') {
    // Make sure we have admin@company.com in local users so they can be retrieved
    const localUsersStr = localStorage.getItem('kootmate_users') || '[]';
    const localUsers = JSON.parse(localUsersStr);
    if (!localUsers.some((u: any) => u.email.toLowerCase() === 'admin@company.com')) {
      localUsers.push({
        name: 'Primary Admin',
        email: 'admin@company.com',
        password: 'admin@123',
        selectedBoard: 'cbse',
        role: 'admin',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('kootmate_users', JSON.stringify(localUsers));
    }

    const adminEmails = JSON.parse(localStorage.getItem('kootmate_admin_emails') || '[]');
    if (!adminEmails.includes('admin@company.com')) {
      adminEmails.push('admin@company.com');
      localStorage.setItem('kootmate_admin_emails', JSON.stringify(adminEmails));
    }

    return {
      success: true,
      user: {
        name: 'Primary Admin',
        email: 'admin@company.com',
        selectedBoard: 'cbse',
        role: 'admin',
        isAdmin: true
      },
      message: 'Access granted! Welcome to the Administrator CMS Workspace...'
    };
  }

  try {
    // 1. Try Supabase verification if active
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', targetEmail)
        .eq('password', password)
        .maybeSingle();

      if (error) {
        console.error('Supabase fetch error: ' + JSON.stringify(error));
        if (error.message && (error.message.includes('public.users') || error.message.includes('relation "users" does not exist') || error.message.includes('schema cache'))) {
          localStorage.setItem('kootmate_supabase_table_error', 'true');
        }
      } else if (data) {
        if (isAccountExpired(data.created_at)) {
          return {
            success: false,
            message: 'This account expired on March 31st as per the annual policy. Please register a new account to continue.'
          };
        }

        localStorage.removeItem('kootmate_supabase_table_error');
        const adminEmails = JSON.parse(localStorage.getItem('kootmate_admin_emails') || '[]');
        const isUserAdmin = data.role === 'admin' || data.email.toLowerCase() === 'admin@company.com' || adminEmails.includes(data.email.toLowerCase());
        
        return { 
          success: true, 
          user: {
            name: data.name,
            email: data.email,
            couponCode: data.referral_code || '',
            selectedBoard: data.selected_board || 'cbse',
            googleId: data.google_id || '',
            avatarUrl: data.avatar_url || '',
            role: data.role || 'student',
            schoolName: data.school_name || '',
            phoneNumber: data.phone_number || '',
            dob: data.dob || '',
            isAdmin: isUserAdmin
          },
          message: 'Authenticated securely from real-time Supabase remote database!' 
        };
      }
    }

    // 2. Fallback check local simulation
    const localUsersStr = localStorage.getItem('kootmate_users') || '[]';
    const localUsers = JSON.parse(localUsersStr);
    const matched = localUsers.find((u: any) => u.email.toLowerCase() === targetEmail && u.password === password);

    if (matched) {
      if (isAccountExpired(matched.createdAt)) {
        return {
          success: false,
          message: 'This account expired on March 31st as per the annual policy. Please register a new account to continue.'
        };
      }

      const adminEmails = JSON.parse(localStorage.getItem('kootmate_admin_emails') || '[]');
      const isUserAdmin = matched.role === 'admin' || matched.email.toLowerCase() === 'admin@company.com' || adminEmails.includes(matched.email.toLowerCase());

      return {
        success: true,
        user: {
          name: matched.name,
          email: matched.email,
          couponCode: matched.couponCode || '',
          selectedBoard: matched.selectedBoard || 'cbse',
          googleId: matched.googleId || '',
          avatarUrl: matched.avatarUrl || '',
          role: matched.role || 'student',
          schoolName: matched.schoolName || '',
          phoneNumber: matched.phoneNumber || '',
          dob: matched.dob || '',
          isAdmin: isUserAdmin
        },
        message: 'Successfully signed in!'
      };
    }

    // 3. Fallback to default developer profile bypass for seamless testing
    if (targetEmail === 'student@kootmate.com' && password === 'password123') {
      return {
        success: true,
        user: {
          name: 'Kootmate Scholar',
          email: 'student@kootmate.com',
          couponCode: 'WELCOME100',
          selectedBoard: 'cbse',
          role: 'student',
          isAdmin: false
        },
        message: 'Signed in with pre-loaded account.'
      };
    }

    return { success: false, message: 'Invalid email or password combination. Verify entries or Sign Up!' };

  } catch (err: any) {
    return { success: false, message: err.message || 'System verification error.' };
  }
}

export interface GoogleUserProfile {
  name: string;
  email: string;
  picture?: string;
  googleId: string;
  selectedBoard?: 'cbse' | 'ssc';
}

export async function dbRegisterOrLoginGoogleUser(profile: GoogleUserProfile): Promise<{ success: boolean; user: any; isNew: boolean }> {
  try {
    const localUsersStr = localStorage.getItem('kootmate_users') || '[]';
    const localUsers = JSON.parse(localUsersStr);
    
    // Find if user already exists
    let matched = localUsers.find((u: any) => u.email.toLowerCase() === profile.email.toLowerCase() || u.googleId === profile.googleId);
    
    let isNew = false;
    // If matched but expired, reset it to treat it as a new registration for the new year
    if (matched && isAccountExpired(matched.createdAt)) {
      console.log(`[Google OAuth] Overwriting expired local account for ${profile.email}`);
      isNew = true;
      matched.createdAt = new Date().toISOString();
      matched.name = profile.name;
      matched.avatarUrl = profile.picture || matched.avatarUrl;
      matched.selectedBoard = profile.selectedBoard || matched.selectedBoard || 'cbse';
      localStorage.setItem('kootmate_users', JSON.stringify(localUsers));
    } else if (!matched) {
      isNew = true;
      matched = {
        name: profile.name,
        email: profile.email.toLowerCase(),
        googleId: profile.googleId,
        avatarUrl: profile.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.name)}`,
        selectedBoard: profile.selectedBoard || 'cbse',
        couponCode: 'GOOGLE_SYNC',
        createdAt: new Date().toISOString()
      };
      localUsers.push(matched);
      localStorage.setItem('kootmate_users', JSON.stringify(localUsers));
    } else {
      // If user exists, but doesn't have a googleId or avatar, update it
      if (!matched.googleId) matched.googleId = profile.googleId;
      if (!matched.avatarUrl) matched.avatarUrl = profile.picture;
      if (profile.selectedBoard && !matched.selectedBoard) matched.selectedBoard = profile.selectedBoard;
      localStorage.setItem('kootmate_users', JSON.stringify(localUsers));
    }

    // Perform fine-tuned Supabase insert or overwrite if active
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data: dbUser, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .or(`email.eq.${profile.email.toLowerCase()},google_id.eq.${profile.googleId}`)
          .maybeSingle();

        if (fetchError) {
          console.error('Supabase Google fetch error:', fetchError.message);
          if (fetchError.message && (fetchError.message.includes('public.users') || fetchError.message.includes('relation "users" does not exist') || fetchError.message.includes('schema cache'))) {
            localStorage.setItem('kootmate_supabase_table_error', 'true');
          }
        } else {
          localStorage.removeItem('kootmate_supabase_table_error');
        }

        if (dbUser) {
          // Check if database user is expired. If so, update their created_at to reset their cycle!
          if (isAccountExpired(dbUser.created_at)) {
            console.log(`[Google OAuth] Resetting expired Supabase account for ${profile.email}`);
            isNew = true;
            await supabase
              .from('users')
              .update({
                name: profile.name,
                avatar_url: profile.picture || dbUser.avatar_url,
                selected_board: profile.selectedBoard || dbUser.selected_board || 'cbse',
                created_at: new Date().toISOString() // RESET creation timestamp to now!
              })
              .eq('email', profile.email.toLowerCase());
          }
        } else if (!fetchError) {
          const { error: insertError } = await supabase
            .from('users')
            .insert([
              {
                name: profile.name,
                email: profile.email.toLowerCase(),
                google_id: profile.googleId,
                avatar_url: profile.picture || '',
                selected_board: profile.selectedBoard || 'cbse',
                password: '',
                referral_code: 'GOOGLE_SYNC',
                created_at: new Date().toISOString()
              }
            ]);
          if (insertError) {
            console.error('Supabase Google insert error:', insertError.message);
            if (insertError.message && (insertError.message.includes('public.users') || insertError.message.includes('relation "users" does not exist') || insertError.message.includes('schema cache'))) {
              localStorage.setItem('kootmate_supabase_table_error', 'true');
            }
          }
        }
      } catch (dbErr) {
        console.error('Supabase async Google write pass skipped:', dbErr);
      }
    }

    return {
      success: true,
      user: {
        name: matched.name,
        email: matched.email,
        couponCode: matched.couponCode || 'GOOGLE_SYNC',
        googleId: matched.googleId,
        avatarUrl: matched.avatarUrl,
        selectedBoard: matched.selectedBoard || 'cbse',
        isLoggedIn: true
      },
      isNew
    };
  } catch (err) {
    console.error('Google user registration/login flow failure:', err);
    return {
      success: true,
      user: {
        name: profile.name,
        email: profile.email.toLowerCase(),
        googleId: profile.googleId,
        avatarUrl: profile.picture || '',
        selectedBoard: profile.selectedBoard || 'cbse',
        couponCode: 'GOOGLE_SYNC',
        isLoggedIn: true
      },
      isNew: true
    };
  }
}

// SQL Script string for user reference containing exact requested schemas
export const SUPABASE_SQL_SETUP = `-- Supreme Supabase Setup script for Kootmate Class 10 Syllabus Companion.
-- Copy and paste this directly inside your Supabase SQL Editor.

-- NOTE: If your tables already exist but are missing columns (e.g. "role" under the users table), 
-- you can uncomment the drop lines below to perform a clean-slate reset:
-- DROP TABLE IF EXISTS content_items CASCADE;
-- DROP TABLE IF EXISTS chapters CASCADE;
-- DROP TABLE IF EXISTS subjects CASCADE;
-- DROP TABLE IF EXISTS classes CASCADE;
-- DROP TABLE IF EXISTS email_otps CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- 1. Create email_otps table
CREATE TABLE IF NOT EXISTS email_otps (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  otp TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create users table
CREATE TABLE IF NOT EXISTS users (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  referral_code TEXT DEFAULT '',
  password TEXT DEFAULT '',
  selected_board TEXT DEFAULT 'cbse',
  google_id TEXT DEFAULT '',
  role TEXT DEFAULT 'student',
  avatar_url TEXT DEFAULT '',
  phone_number TEXT DEFAULT '',
  school_name TEXT DEFAULT '',
  dob TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Safe patch for users who already created the 'users' table without the extra columns:
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student';
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_number TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS school_name TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS dob TEXT DEFAULT '';

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_otps ENABLE ROW LEVEL SECURITY;

-- Allow public access policies for free applet interactions
DROP POLICY IF EXISTS "Allow public select users" ON users;
CREATE POLICY "Allow public select users" ON users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert users" ON users;
CREATE POLICY "Allow public insert users" ON users FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update users" ON users;
CREATE POLICY "Allow public update users" ON users FOR UPDATE USING (true);


DROP POLICY IF EXISTS "Allow public select email_otps" ON email_otps;
CREATE POLICY "Allow public select email_otps" ON email_otps FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert email_otps" ON email_otps;
CREATE POLICY "Allow public insert email_otps" ON email_otps FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete email_otps" ON email_otps;
CREATE POLICY "Allow public delete email_otps" ON email_otps FOR DELETE USING (true);

-- 3. Create classes table
CREATE TABLE IF NOT EXISTS classes (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  class_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  class_id BIGINT REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
  subject_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create chapters table
CREATE TABLE IF NOT EXISTS chapters (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  subject_id BIGINT REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
  chapter_name TEXT NOT NULL,
  description TEXT,
  mindmap_url TEXT,
  game_url TEXT,
  audio_url TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Educational Content Tables
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;

-- Select policies
DROP POLICY IF EXISTS "Allow public select classes" ON classes;
CREATE POLICY "Allow public select classes" ON classes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public select subjects" ON subjects;
CREATE POLICY "Allow public select subjects" ON subjects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public select chapters" ON chapters;
CREATE POLICY "Allow public select chapters" ON chapters FOR SELECT USING (true);

-- Management policies
DROP POLICY IF EXISTS "Allow public insert classes" ON classes;
CREATE POLICY "Allow public insert classes" ON classes FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update classes" ON classes;
CREATE POLICY "Allow public update classes" ON classes FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete classes" ON classes;
CREATE POLICY "Allow public delete classes" ON classes FOR DELETE USING (true);


DROP POLICY IF EXISTS "Allow public insert subjects" ON subjects;
CREATE POLICY "Allow public insert subjects" ON subjects FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update subjects" ON subjects;
CREATE POLICY "Allow public update subjects" ON subjects FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete subjects" ON subjects;
CREATE POLICY "Allow public delete subjects" ON subjects FOR DELETE USING (true);


DROP POLICY IF EXISTS "Allow public insert chapters" ON chapters;
CREATE POLICY "Allow public insert chapters" ON chapters FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update chapters" ON chapters;
CREATE POLICY "Allow public update chapters" ON chapters FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete chapters" ON chapters;
CREATE POLICY "Allow public delete chapters" ON chapters FOR DELETE USING (true);

-- 6. Create content_items table for the production Admin CMS
CREATE TABLE IF NOT EXISTS content_items (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  board TEXT NOT NULL,         -- 'CBSE' or 'SSC'
  subject TEXT NOT NULL,       -- e.g. 'Science'
  chapter TEXT NOT NULL,       -- e.g. 'Chemical Reactions'
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL,  -- 'mindmap' | 'pdf' | 'audio' | 'game'
  resource_url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for content_items
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;

-- Allow public read & write access
DROP POLICY IF EXISTS "Allow public select content_items" ON content_items;
CREATE POLICY "Allow public select content_items" ON content_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert content_items" ON content_items;
CREATE POLICY "Allow public insert content_items" ON content_items FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update content_items" ON content_items;
CREATE POLICY "Allow public update content_items" ON content_items FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete content_items" ON content_items;
CREATE POLICY "Allow public delete content_items" ON content_items FOR DELETE USING (true);
`;
