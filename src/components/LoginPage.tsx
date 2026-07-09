import React, { useState } from 'react';
import { Mail, KeyRound, ChevronRight, Sparkles, AlertCircle, ArrowLeft, Send, Users, GraduationCap, Calendar } from 'lucide-react';
import Logo from './Logo';
import { dbRegisterOrLoginGoogleUser, dbLoginUser } from '../lib/supabase';

interface LoginPageProps {
  onNavigate: (page: 'landing' | 'login' | 'signup' | 'dashboard') => void;
  onLoginSuccess: (user: { 
    name: string; 
    email: string; 
    couponCode?: string; 
    selectedBoard?: 'cbse' | 'ssc';
    avatarUrl?: string;
    googleId?: string;
    role?: string;
    schoolName?: string;
    dob?: string;
  }) => void;
  isDarkMode: boolean;
}

export default function LoginPage({ onNavigate, onLoginSuccess, isDarkMode }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [dob, setDob] = useState('');
  const [loginRole, setLoginRole] = useState<'student' | 'teacher'>('student');
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Password-based Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid school or personal email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your account password.');
      return;
    }

    setIsVerifying(true);

    try {
      const res = await dbLoginUser(email, password);
      setIsVerifying(false);

      if (res.success) {
        // Enforce matching role if user chose teacher vs student, or auto-set it if admin
        const finalUser = { ...res.user };
        if (finalUser.email === 'teacher@cleverly.com') {
          finalUser.role = 'teacher';
          finalUser.selectedBoard = 'cbse';
        } else if (finalUser.email === 'student@cleverly.com') {
          finalUser.role = 'student';
          finalUser.selectedBoard = 'cbse';
          finalUser.schoolName = finalUser.schoolName || "St. Xavier's High School";
          finalUser.dob = finalUser.dob || '2011-05-15';
        } else if (finalUser.email === 'ssc_student@cleverly.com') {
          finalUser.role = 'student';
          finalUser.selectedBoard = 'ssc';
          finalUser.schoolName = finalUser.schoolName || "Pune High School (SSC)";
          finalUser.dob = finalUser.dob || '2010-08-20';
        } else if (finalUser.email === 'ssc_teacher@cleverly.com') {
          finalUser.role = 'teacher';
          finalUser.selectedBoard = 'ssc';
        } else if (finalUser.email !== 'admin@company.com') {
          finalUser.role = finalUser.role || loginRole;
        }

        setSuccessMsg(res.message || 'Access granted! Loading your Cleverly Companion...');
        setTimeout(() => {
          onLoginSuccess(finalUser);
          onNavigate('dashboard');
        }, 1200);
      } else {
        setErrorMsg(res.message || 'Incorrect email or password combination.');
      }
    } catch (err: any) {
      setIsVerifying(false);
      setErrorMsg(err.message || 'System verification error. Please try again.');
    }
  };

  // 3. Google OAuth standard popups with failure handling
  const handleGoogleOAuth = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setIsGoogleLoading(true);

    try {
      const redirectUri = `${window.location.origin}/api/auth/callback/google`;
      const response = await fetch(`/api/auth/google/url?board=cbse&redirect_uri=${encodeURIComponent(redirectUri)}`);
      
      if (!response.ok) {
        throw new Error(`Google URL Endpoint returned status ${response.status}`);
      }

      const { url } = await response.json();
      
      const authWindow = window.open(
        url,
        'google_oauth_popup',
        'width=500,height=600,left=150,top=100,resizable=yes,scrollbars=yes'
      );

      if (!authWindow) {
        setIsGoogleLoading(false);
        setErrorMsg('Google login blocked by your browser popup blocker. Please allow popups to continue.');
        return;
      }

      const checkPopupClosed = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(checkPopupClosed);
          setIsGoogleLoading(false);
        }
      }, 800);

      const handleOAuthMessage = async (event: MessageEvent) => {
        const origin = event.origin;
        const isAllowedOrigin = origin === window.location.origin || 
                                origin.endsWith('.run.app') || 
                                origin.includes('localhost') || 
                                origin.includes('127.0.0.1');
        if (!isAllowedOrigin) {
          return;
        }

        if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
          const googleUser = event.data.user;
          if (googleUser) {
            try {
              clearInterval(checkPopupClosed);
              window.removeEventListener('message', handleOAuthMessage);
              
              const registerRes = await dbRegisterOrLoginGoogleUser({
                name: googleUser.name,
                email: googleUser.email,
                picture: googleUser.picture,
                googleId: googleUser.googleId,
                selectedBoard: googleUser.selectedBoard as 'cbse' | 'ssc'
              });

              setSuccessMsg(`Welcome Back, ${googleUser.name}! Loading Dashboard... 🚀`);
              setTimeout(() => {
                setIsGoogleLoading(false);
                onLoginSuccess(registerRes.user);
                onNavigate('dashboard');
              }, 1000);
            } catch (err) {
              console.error('Database Sync Error:', err);
              setErrorMsg('Persistence error synchronizing database.');
              setIsGoogleLoading(false);
            }
          }
        } else if (event.data?.type === 'OAUTH_AUTH_FAILURE') {
          clearInterval(checkPopupClosed);
          window.removeEventListener('message', handleOAuthMessage);
          setErrorMsg('Google Login aborted: User cancelled authentication.');
          setIsGoogleLoading(false);
        }
      };

      window.addEventListener('message', handleOAuthMessage);

    } catch (err: any) {
      console.error('Google OAuth Trigger Error:', err);
      setErrorMsg('Google Authentication Services are unavailable right now.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-neutral-50 text-neutral-900 transition-colors duration-200" id="login-container">
      
      {/* Absolute top back link */}
      <div className="absolute top-6 left-6" id="login-nav-header">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer hover:bg-neutral-100 text-neutral-600"
          id="back-to-home-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center" id="login-branding">
        <div className="flex justify-center cursor-pointer" onClick={() => onNavigate('landing')}>
          <Logo size="sm" showText={true} className="w-20 h-20" />
        </div>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-[#5c3beb]" id="login-main-title">
          Welcome to Cleverly
        </h2>
        <p className="mt-2 text-xs text-neutral-600 font-extrabold uppercase tracking-widest" id="login-main-subtitle">
          5-in-1 Complete Revision Companion
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4" id="login-card-container">
        <div className="py-8 px-6 sm:px-8 rounded-[32px] border-2 border-neutral-200 bg-white shadow-xl space-y-6" id="login-card">
          
          {/* Student vs Teacher Segmented Tab selector */}
          <div className="p-1 bg-slate-100 rounded-2xl grid grid-cols-2 gap-1 border border-neutral-200">
            <button
              type="button"
              onClick={() => setLoginRole('student')}
              className={`py-3.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                loginRole === 'student'
                  ? 'bg-[#5c3beb] text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-800 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Student Login
            </button>
            <button
              type="button"
              onClick={() => setLoginRole('teacher')}
              className={`py-3.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                loginRole === 'teacher'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-800 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" />
              Teacher Login
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" id="login-main-form">
            <div>
              <label htmlFor="login-email-input" className="block text-xs font-black uppercase tracking-wider text-neutral-800 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="login-email-input"
                  type="email"
                  required
                  placeholder={loginRole === 'student' ? 'student@cleverly.com' : 'teacher@cleverly.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white font-semibold"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password-input" className="block text-xs font-black uppercase tracking-wider text-neutral-800 mb-1.5">
                Account Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input
                  id="login-password-input"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white font-semibold"
                />
              </div>
            </div>

            {/* Action Verify Login Button */}
            <button
              type="submit"
              disabled={isVerifying || isGoogleLoading}
              className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md ${
                loginRole === 'student' 
                  ? 'bg-[#5c3beb] hover:bg-[#4b2ec7]' 
                  : 'bg-amber-500 hover:bg-amber-600 !text-neutral-950'
              }`}
              id="signin-submit-btn"
            >
              {isVerifying ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 shrink-0" />
                  <span>Sign In as {loginRole === 'student' ? 'Student' : 'Teacher'}</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Social login option */}
          <div className="relative flex items-center justify-center pt-1" id="login-social-container">
            <div className="absolute inset-x-0 border-t border-neutral-200"></div>
            <span className="relative px-3 text-[10px] uppercase tracking-wider font-extrabold bg-white text-neutral-400">
              Or continue with
            </span>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              disabled={isVerifying || isGoogleLoading}
              onClick={handleGoogleOAuth}
              className="w-full flex items-center justify-center gap-3 py-3 border-2 border-slate-200 rounded-xl text-xs font-black bg-white hover:bg-neutral-50 text-neutral-700 shadow-sm transition-all cursor-pointer hover:shadow disabled:opacity-50"
              id="google-signin-btn"
            >
              {isGoogleLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#5c3beb] border-t-white rounded-full animate-spin"></span>
                  <span className="text-neutral-400">Connecting Google...</span>
                </>
              ) : (
                <>
                  <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5.04c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 1.74 14.93 1 12 1 7.37 1 3.4 3.66 1.46 7.55l3.74 2.9C6.1 7.42 8.84 5.04 12 5.04z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.45 12.3c0-.82-.07-1.6-.2-2.3H12v4.4h6.43c-.28 1.44-1.1 2.66-2.33 3.47l3.6 2.8c2.1-1.94 3.3-4.8 3.3-8.37z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.2 14.65c-.23-.68-.36-1.41-.36-2.15s.13-1.47.36-2.15L1.46 7.55C.53 9.4 0 11.64 0 14s.53 4.6 1.46 6.45l3.74-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.24 0 5.95-1.08 7.93-2.9l-3.6-2.8c-1.1.74-2.5 1.18-4.33 1.18-3.16 0-5.9-2.38-6.8-5.4l-3.74 2.9C3.4 20.34 7.37 23 12 23z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>

          {/* Feedback message boxes */}
          {errorMsg && (
            <div className="p-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-xs flex items-start gap-2 animate-shake" id="login-error-alert">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="font-extrabold text-left">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 text-xs flex items-start gap-2 text-left" id="login-success-alert">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500 animate-pulse" />
              <span className="font-extrabold">{successMsg}</span>
            </div>
          )}

          {/* Nav link to switch to signup */}
          <p className="text-center text-xs font-black text-black">
            Don't have an education account?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="text-violet-600 font-bold hover:underline cursor-pointer bg-transparent border-0"
              id="login-navigate-to-signup"
            >
              Sign Up Free Today
            </button>
          </p>

          {/* Single-Click Bypass Testing Controls */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <p className="text-[10px] text-center font-extrabold uppercase tracking-widest text-neutral-400">
              ⚡ Sandbox Bypass Quick Accounts
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('student@cleverly.com');
                  setPassword('password123');
                  setLoginRole('student');
                  setSuccessMsg('Loading CBSE Student Dashboard with preloaded content...');
                  setTimeout(() => {
                    onLoginSuccess({
                      name: 'Paritosh Student',
                      email: 'student@cleverly.com',
                      selectedBoard: 'cbse',
                      role: 'student',
                      schoolName: 'St. Xavier\'s High School',
                      dob: '2011-05-15'
                    });
                    onNavigate('dashboard');
                  }, 800);
                }}
                className="py-3 px-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-[10px] text-indigo-850 font-black tracking-wide uppercase transition-all cursor-pointer text-center"
              >
                🎓 CBSE Student
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('teacher@cleverly.com');
                  setPassword('password123');
                  setLoginRole('teacher');
                  setSuccessMsg('Loading CBSE Teacher Dashboard with game capabilities...');
                  setTimeout(() => {
                    onLoginSuccess({
                      name: 'Anjali Teacher',
                      email: 'teacher@cleverly.com',
                      selectedBoard: 'cbse',
                      role: 'teacher'
                    });
                    onNavigate('dashboard');
                  }, 800);
                }}
                className="py-3 px-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-[10px] text-amber-850 font-black tracking-wide uppercase transition-all cursor-pointer text-center"
              >
                👩‍🏫 CBSE Teacher
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('ssc_student@cleverly.com');
                  setPassword('password123');
                  setLoginRole('student');
                  setSuccessMsg('Loading SSC Student Dashboard with preloaded content...');
                  setTimeout(() => {
                    onLoginSuccess({
                      name: 'Paritosh SSC Student',
                      email: 'ssc_student@cleverly.com',
                      selectedBoard: 'ssc',
                      role: 'student',
                      schoolName: 'Pune High School (SSC)',
                      dob: '2010-08-20'
                    });
                    onNavigate('dashboard');
                  }, 800);
                }}
                className="py-3 px-2 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-xl text-[10px] text-pink-850 font-black tracking-wide uppercase transition-all cursor-pointer text-center"
              >
                🎓 SSC Student
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('ssc_teacher@cleverly.com');
                  setPassword('password123');
                  setLoginRole('teacher');
                  setSuccessMsg('Loading SSC Teacher Dashboard with game capabilities...');
                  setTimeout(() => {
                    onLoginSuccess({
                      name: 'Anjali SSC Teacher',
                      email: 'ssc_teacher@cleverly.com',
                      selectedBoard: 'ssc',
                      role: 'teacher'
                    });
                    onNavigate('dashboard');
                  }, 800);
                }}
                className="py-3 px-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl text-[10px] text-rose-850 font-black tracking-wide uppercase transition-all cursor-pointer text-center"
              >
                👩‍🏫 SSC Teacher
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setEmail('admin@company.com');
                setPassword('ADMIN777');
                setSuccessMsg('Accessing system admin override console...');
                setTimeout(() => {
                  onLoginSuccess({
                    name: 'System Admin Override',
                    email: 'admin@company.com',
                    couponCode: 'ADMIN777',
                    role: 'admin'
                  });
                  onNavigate('dashboard');
                }, 800);
              }}
              className="w-full py-3 px-3 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-[10px] text-red-700 font-black tracking-wide uppercase transition-all cursor-pointer text-center"
            >
              🔒 System Admin Console
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
