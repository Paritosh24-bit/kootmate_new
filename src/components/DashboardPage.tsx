import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Layers, HelpCircle, Gamepad2, Volume2, Image, 
  ArrowLeft, Search, Award, Flame, Zap, Bell, CheckCircle, 
  ChevronRight, LogOut, Compass, Sparkles, PlusCircle, Bookmark, FileText 
} from 'lucide-react';
import Logo from './Logo';
import StudentCMS from './StudentCMS';
import AdminCMS from './AdminCMS';
import { ContentGrid, PDFViewer, AudioPlayer } from './CMSComponents';

export function normalizeSubjectName(rawName: string): string {
  const clean = rawName
    .replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "")
    .trim();
  
  if (clean.includes("Science 1") || clean.includes("Science Part 1")) return "Science 1";
  if (clean.includes("Science 2") || clean.includes("Science Part 2")) return "Science 2";
  if (clean.includes("Math 1") || clean.includes("Math Part 1") || clean.includes("Mathematics Part 1") || clean.includes("Algebra")) return "Math 1 (Algebra)";
  if (clean.includes("Math 2") || clean.includes("Math Part 2") || clean.includes("Mathematics Part 2") || clean.includes("Geometry")) return "Math 2 (Geometry)";
  if (clean.includes("Science")) return "Science";
  if (clean.includes("Mathematics") || clean.includes("Maths")) return "Mathematics";
  if (clean.includes("Social Studies") || clean.includes("Social Sciences") || clean.includes("History") || clean.includes("Geography") || clean.includes("Civics")) return "Social Studies";
  
  return clean;
}

interface User {
  name: string;
  email: string;
  phone?: string;
  couponCode?: string;
  selectedBoard?: 'cbse' | 'ssc';
  avatarUrl?: string;
  role?: string;
  schoolName?: string;
  dob?: string;
}

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
  isDarkMode: boolean;
}

export default function DashboardPage({ user, onLogout, isDarkMode }: DashboardPageProps) {
  const adminEmails = JSON.parse(localStorage.getItem('kootmate_admin_emails') || '[]');
  const isUserAdmin = user.email.toLowerCase() === 'admin@company.com' || (user as any).isAdmin || (user as any).role === 'admin' || adminEmails.includes(user.email.toLowerCase().trim());

  const [selectedBoard, setSelectedBoard] = useState<'all' | 'cbse' | 'ssc' | ''>(user.selectedBoard || '');
  const [supabaseTableError, setSupabaseTableError] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [companionDashboardTab, setCompanionDashboardTab] = useState<'syllabus' | 'student_cms' | 'admin_cms'>('syllabus');

  useEffect(() => {
    const checkError = () => {
      setSupabaseTableError(localStorage.getItem('kootmate_supabase_table_error') === 'true');
    };
    checkError();
    const interval = setInterval(checkError, 2500);
    return () => clearInterval(interval);
  }, []);

  // Sync default user selected board selection change
  useEffect(() => {
    if (user.selectedBoard) {
      setSelectedBoard(user.selectedBoard);
    }
  }, [user.selectedBoard]);

  const handleSelectBoard = async (board: 'cbse' | 'ssc') => {
    setSelectedBoard(board);
    
    // 1. Sync localStorage
    try {
      const localUsersStr = localStorage.getItem('kootmate_users') || '[]';
      const localUsers = JSON.parse(localUsersStr);
      const matchedIdx = localUsers.findIndex((u: any) => u.email.toLowerCase() === user.email.toLowerCase());
      if (matchedIdx !== -1) {
        localUsers[matchedIdx].selectedBoard = board;
        localStorage.setItem('kootmate_users', JSON.stringify(localUsers));
      }
    } catch (e) {
      console.warn('LocalStorage board save skip:', e);
    }

    // 2. Sync to local user prop
    user.selectedBoard = board;

    // 3. Sync live Supabase if credentials are active
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
      const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';
      if (supabaseUrl && supabaseAnonKey) {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { error } = await supabase
          .from('users')
          .update({ selected_board: board })
          .eq('email', user.email.toLowerCase());
        if (error) {
          console.warn('Supabase sync board select write status:', error.message);
          if (error.message && (error.message.includes('public.users') || error.message.includes('relation "users" does not exist') || error.message.includes('schema cache'))) {
            localStorage.setItem('kootmate_supabase_table_error', 'true');
            setSupabaseTableError(true);
          }
        } else {
          localStorage.removeItem('kootmate_supabase_table_error');
          setSupabaseTableError(false);
        }
      }
    } catch (err) {
      console.warn('Graceful bypass of live Supabase board sync:', err);
    }
  };

  const handleCopySql = () => {
    const sqlCode = `-- Supreme Supabase Setup script for Kootmate Class 10 Syllabus Companion.
-- Copy and paste this script directly inside your Supabase SQL Editor.

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
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_otps ENABLE ROW LEVEL SECURITY;

-- Allow public access policies for free applet interactions
CREATE POLICY "Allow public select users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public insert users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update users" ON users FOR UPDATE USING (true);

CREATE POLICY "Allow public select email_otps" ON email_otps FOR SELECT USING (true);
CREATE POLICY "Allow public insert email_otps" ON email_otps FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete email_otps" ON email_otps FOR DELETE USING (true);
`;
    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };
  const [selectedSubject, setSelectedSubject] = useState<{
    id: string;
    name: string;
    board: 'cbse' | 'ssc';
    desc: string;
    lessons: string[];
  } | null>(null);
  
  const [selectedLesson, setSelectedLesson] = useState<string>('');
  const [selectedSubSubject, setSelectedSubSubject] = useState<'history' | 'geography' | 'civics' | 'economics' | ''>('');

  const selectSubjectAndResetLesson = (sub: any) => {
    setSelectedSubject(sub);
    setSelectedLesson('');
    setSelectedSubSubject('');
  };

  const sstDynamicLessons: Record<'cbse' | 'ssc', Record<'history' | 'geography' | 'civics' | 'economics', string[]>> = {
    cbse: {
      history: [
        "The Rise of Nationalism in Europe",
        "Nationalism in India",
        "The Making of a Global World",
        "The Age of Industrialisation",
        "Print Culture and the Modern World"
      ],
      geography: [
        "Resources and Development",
        "Forest and Wildlife Resources",
        "Water Resources",
        "Agriculture",
        "Minerals and Energy Resources",
        "Manufacturing Industries",
        "Lifelines of National Economy"
      ],
      civics: [
        "Power Sharing",
        "Federalism",
        "Democracy and Diversity",
        "Gender, Religion and Caste",
        "Popular Struggles and Movements",
        "Political Parties",
        "Outcomes of Democracy",
        "Challenges to Democracy"
      ],
      economics: []
    },
    ssc: {
      history: [
        "Historiography: Development in the West",
        "Historiography: Indian Tradition",
        "Applied History",
        "History of Indian Arts",
        "Mass Media and History",
        "Entertainment and History",
        "Sports and History",
        "Tourism and History",
        "Heritage Management",
        "Preservation of Heritage"
      ],
      geography: [
        "Field Visit",
        "Location and Extent",
        "Physiography and Drainage",
        "Climate",
        "Natural Vegetation and Wildlife",
        "Population",
        "Human Settlements",
        "Economy and Occupations",
        "Transport and Communication",
        "Tourism"
      ],
      civics: [],
      economics: []
    }
  };

  const isSSTSubject = selectedSubject && (selectedSubject.id === 'cbse-sst' || selectedSubject.id === 'ssc-sst');
  const activeLessons = isSSTSubject
    ? (selectedSubSubject ? sstDynamicLessons[selectedSubject!.board][selectedSubSubject as 'history' | 'geography' | 'civics' | 'economics'] : [])
    : (selectedSubject ? selectedSubject.lessons : []);

  const [activeCategoryTab, setActiveCategoryTab] = useState<'mind_maps' | 'infographics' | 'audio' | 'games' | 'question_bank'>('mind_maps');
  const [notifyFormSubmitted, setNotifyFormSubmitted] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [topicRequest, setTopicRequest] = useState('');
  const [topicSubmitted, setTopicSubmitted] = useState(false);

  // Load content items from API/Supabase
  const [contentItems, setContentItems] = useState<any[]>([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const [activeAudio, setActiveAudio] = useState<{ url: string; title: string; chapter: string } | null>(null);
  const [activePDF, setActivePDF] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!selectedSubject || !selectedLesson) {
        setContentItems([]);
        return;
      }
      try {
        setLoadingContent(true);
        const boardParam = selectedSubject.board === 'cbse' ? 'CBSE' : 'SSC';
        let subParam = normalizeSubjectName(selectedSubject.name);
        if (isSSTSubject && selectedSubSubject) {
          const discWord = selectedSubSubject.charAt(0).toUpperCase() + selectedSubSubject.slice(1);
          subParam = discWord; 
        }
        const chapParam = selectedLesson;
        const url = `/api/content?board=${boardParam}&subject=${encodeURIComponent(subParam)}&chapter=${encodeURIComponent(chapParam)}`;
        const res = await fetch(url);
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(`Server returned non-JSON dashboard list response: ${text.substring(0, 150)}`);
        }
        const data = await res.json();
        if (data.success && data.data) {
          setContentItems(data.data);
        } else {
          setContentItems([]);
        }
      } catch (err) {
        console.error("Failed to fetch student content items in dashboard:", err);
        setContentItems([]);
      } finally {
        setLoadingContent(false);
      }
    };
    fetchContent();
  }, [selectedSubject, selectedLesson, selectedSubSubject]);

  // Class 10 Syllabus Subject Definitions
  const cbseSubjects = [
    {
      id: 'cbse-science',
      name: 'Science',
      board: 'cbse' as const,
      desc: 'Integrated Chemistry, Physics, Biology, and Environmental chapters aligned with NCERT.',
      lessons: [
        'Chemical Reactions and Equations',
        'Acids, Bases and Salts',
        'Metals and Non-metals',
        'Carbon and its Compounds',
        'Periodic Classification of Elements',
        'Life Processes',
        'Control and Coordination',
        'How do Organisms Reproduce?',
        'Heredity and Evolution',
        'Light - Reflection and Refraction',
        'The Human Eye and the Colourful World',
        'Electricity',
        'Magnetic Effects of Electric Current',
        'Sources of Energy',
        'Our Environment',
        'Management of Natural Resources'
      ]
    },
    {
      id: 'cbse-maths',
      name: 'Mathematics',
      board: 'cbse' as const,
      desc: 'Unified Class 10 CBSE Math covering Algebra, Geometry, Trigonometry, and Statistics.',
      lessons: [
        'Real Numbers',
        'Polynomials',
        'Pair of Linear Equations in Two Variables',
        'Quadratic Equations',
        'Arithmetic Progressions',
        'Triangles',
        'Coordinate Geometry',
        'Introduction to Trigonometry',
        'Some Applications of Trigonometry',
        'Circles',
        'Constructions',
        'Areas Related to Circles',
        'Surface Areas and Volumes',
        'Statistics',
        'Probability'
      ]
    },
    {
      id: 'cbse-sst',
      name: 'Social Studies',
      board: 'cbse' as const,
      desc: 'Unified history, democratic politics, and geography.',
      lessons: [
        'The Rise of Nationalism in Europe',
        'Nationalism in India',
        'The Making of a Global World',
        'The Age of Industrialisation',
        'Print Culture and the Modern World',
        'Resources and Development',
        'Forest and Wildlife Resources',
        'Water Resources',
        'Agriculture',
        'Minerals and Energy Resources',
        'Manufacturing Industries',
        'Lifelines of National Economy',
        'Power Sharing',
        'Federalism',
        'Democracy and Diversity',
        'Gender, Religion and Caste',
        'Popular Struggles and Movements',
        'Political Parties',
        'Outcomes of Democracy',
        'Challenges to Democracy'
      ]
    }
  ];

  const sscSubjects = [
    {
      id: 'ssc-science-1',
      name: 'Science 1',
      board: 'ssc' as const,
      desc: 'Maharashtra State Board Physics & Chemistry fundamentals, chemical equations, and gravitational laws.',
      lessons: [
        'Gravitation',
        'Periodic Classification of Elements',
        'Chemical Reactions and Equations',
        'Effects of Electric Current',
        'Heat',
        'Refraction of Light',
        'Lenses',
        'Metallurgy',
        'Carbon Compounds',
        'Space Missions'
      ]
    },
    {
      id: 'ssc-science-2',
      name: 'Science 2',
      board: 'ssc' as const,
      desc: 'Maharashtra State Board Biology, environmental systems, genetic evolutions, and life cycles.',
      lessons: [
        'Heredity and Evolution',
        'Life Processes in Living Organisms - Part I',
        'Life Processes in Living Organisms - Part II',
        'Environmental Management',
        'Towards Green Energy',
        'Animal Classification',
        'Introduction to Microbiology',
        'Cell Biology and Biotechnology',
        'Social Health',
        'Disaster Management'
      ]
    },
    {
      id: 'ssc-math-1',
      name: 'Math 1 (Algebra)',
      board: 'ssc' as const,
      desc: 'Linear equations in two variables, quadratic formulas, arithmetic progressive metrics, and financial planning.',
      lessons: [
        'Linear Equations in Two Variables',
        'Quadratic Equations',
        'Arithmetic Progression',
        'Financial Planning',
        'Probability',
        'Statistics'
      ]
    },
    {
      id: 'ssc-math-2',
      name: 'Math 2 (Geometry)',
      board: 'ssc' as const,
      desc: 'Similarity theorems, Pythagoras relations, coordinate grids, trigonometry proofs, and sector mensuration.',
      lessons: [
        'Similarity',
        'Pythagoras Theorem',
        'Circle',
        'Geometric Constructions',
        'Coordinate Geometry',
        'Trigonometry',
        'Mensuration'
      ]
    },
    {
      id: 'ssc-sst',
      name: 'Social Studies',
      board: 'ssc' as const,
      desc: 'Maharashtra State Board History & Geography (excluding Political Science as per board guidelines).',
      lessons: [
        'Historiography: Development in the West',
        'Historiography: Indian Tradition',
        'Applied History',
        "History of Indian Arts",
        "Mass Media and History",
        "Entertainment and History",
        "Sports and History",
        "Tourism and History",
        "Heritage Management",
        "Preservation of Heritage",
        "Field Visit",
        "Location and Extent",
        "Physiography and Drainage",
        "Climate",
        "Natural Vegetation and Wildlife",
        "Population",
        "Human Settlements",
        "Economy and Occupations",
        "Transport and Communication",
        "Tourism"
      ]
    }
  ];

  const allSubjects = [...cbseSubjects, ...sscSubjects];

  // Filtered subjects based on selected filter and search bar query
  const filteredSubjects = allSubjects.filter(sub => {
    const matchesBoard = selectedBoard === 'all' || sub.board === selectedBoard;
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBoard && matchesSearch;
  });

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail || !notifyEmail.includes('@')) return;
    setNotifyFormSubmitted(true);
    setTimeout(() => {
      setNotifyFormSubmitted(false);
      setNotifyEmail('');
    }, 4000);
  };

  const handleTopicRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicRequest.trim()) return;
    setTopicSubmitted(true);
    setTimeout(() => {
      setTopicSubmitted(false);
      setTopicRequest('');
    }, 4000);
  };

  if (isUserAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-neutral-900" id="admin-dashboard-viewport">
        {/* Simple crisp header */}
        <header className="sticky top-0 z-45 bg-white border-b border-neutral-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer">
              <Logo size="sm" showText={true} className="w-40 h-14" />
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-neutral-900">
                  {user.email}
                </p>
                <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">
                  Assigned: Content Admin
                </p>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-900 hover:text-black rounded-xl cursor-pointer transition-all flex items-center gap-2 text-xs font-black shadow-xs hover:scale-[1.01]"
                title="Sign Out"
                id="header-logout-btn"
              >
                <LogOut className="w-4 h-4 text-neutral-750" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Workspace with only Admin CMS inside */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full flex flex-col justify-start">
          <AdminCMS />
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-neutral-50 text-black transition-colors duration-200`} id="dashboard-companion">
      
      {/* Top Navigation */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-205 ${
        isDarkMode ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white/90 border-neutral-250 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedSubject(null)}>
            <Logo size="sm" showText={true} className="w-40 h-14" />
          </div>

          {/* Search Bar - hidden on subject detail view */}
          {!selectedSubject && (
            <div className="hidden md:block relative w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search Class 10 Science, Maths..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                  isDarkMode 
                    ? 'bg-neutral-850 border-neutral-800 text-white placeholder-neutral-600' 
                    : 'bg-neutral-100 border-neutral-250 text-neutral-900 placeholder-neutral-400'
                }`}
                id="search-input"
              />
            </div>
          )}

          {/* Right Utility Counters & User Profile info */}
          <div className="flex items-center gap-4">

            {/* Logout button & Board Swapper */}
            <div className="flex items-center gap-2">
              {selectedBoard !== '' && !user.selectedBoard && (
                <button
                  onClick={() => {
                    setSelectedBoard('');
                    setSelectedSubject(null);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-extrabold rounded-xl border transition-all cursor-pointer ${
                    isDarkMode 
                      ? 'bg-neutral-850 hover:bg-neutral-800 border-neutral-800 text-neutral-200' 
                      : 'bg-white hover:bg-neutral-50 border-neutral-350 text-neutral-700 shadow-xs'
                  }`}
                  title="Switch CBSE & SSC MH State Board"
                >
                  <span>Switch Board</span>
                  <span className="text-xs leading-none">🔄</span>
                </button>
              )}

              <div className="text-right hidden lg:block">
                <p className="text-xs font-black text-neutral-900 dark:text-white">
                  {user.name || 'Paritosh Badave'}
                </p>
                {user.role === 'student' && user.schoolName && (
                  <p className="text-[10px] font-bold text-neutral-500 block truncate max-w-[180px]" title={user.schoolName}>
                    🏫 {user.schoolName}
                  </p>
                )}
                {user.role === 'student' && user.dob && (
                  <p className="text-[9px] font-bold text-violet-500 uppercase tracking-wider block">
                    🎂 DOB: {user.dob}
                  </p>
                )}
                {(!user.role || user.role !== 'student') && (
                  <p className="text-[9px] font-bold text-violet-500 uppercase tracking-widest">
                    {user.couponCode ? 'Scholar Gold' : 'Class 10 Student'}
                  </p>
                )}
              </div>
              <button
                onClick={onLogout}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                  isDarkMode 
                    ? 'hover:bg-neutral-800 border-neutral-800 text-neutral-400 hover:text-white' 
                    : 'hover:bg-neutral-50 border-neutral-250 text-neutral-500 hover:text-neutral-800'
                }`}
                title="Sign Out"
                id="header-logout-btn"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Supabase Missing Table Banner */}
        {supabaseTableError && (
          <div className="mb-6 bg-amber-50 border border-amber-200 text-neutral-800 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-800">
                  ⚠️ Supabase Synced, Missing SQL Table
                </span>
                <h4 className="text-sm font-black text-amber-900 mt-1">
                  Missing <code>users</code> and <code>email_otps</code> Tables in Supabase
                </h4>
                <p className="text-xs text-amber-800 font-bold leading-relaxed max-w-3xl">
                  We detected that your remote Supabase is configured, but the target <code>users</code> or <code>email_otps</code> tables do not exist or schema cache needs refreshing. We have safely fallen back to local browser storage so your logins and syllabus records persist dynamically. Press the button to instantly copy the supreme SQL setup script to paste into your Supabase SQL Editor!
                </p>
              </div>
              <button
                onClick={handleCopySql}
                className="shrink-0 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-black transition-all shadow shadow-amber-950/10 cursor-pointer active:scale-95"
              >
                {copiedSql ? '✓ Script Copied!' : 'Copy SQL Setup Query'}
              </button>
            </div>
          </div>
        )}

        {selectedBoard === '' ? (
          <div className="max-w-3xl mx-auto text-center py-12 space-y-8">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase text-[#5c3beb] bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400">
                Class 10 Syllabus Choice
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Welcome, {user.name ? user.name.split(' ')[0] : 'Scholar'}! Select your Board:
              </h2>
              <p className="text-xs sm:text-sm text-black dark:text-neutral-300 font-bold max-w-lg mx-auto">
                Choose your state or central syllabus board once. You can easily switch layout directories later from your profile.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {/* CBSE Board Option Card */}
              <button
                onClick={() => handleSelectBoard('cbse')}
                className={`p-8 rounded-3xl border-2 text-left cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-95 group flex flex-col justify-between h-72 ${
                  isDarkMode 
                    ? 'bg-neutral-950 border-neutral-800 hover:border-violet-500 hover:shadow-violet-950/20 hover:shadow-2xl' 
                    : 'bg-white border-neutral-200 hover:border-[#5c3beb] hover:shadow-violet-100 dark:hover:shadow-neutral-950 hover:shadow-2xl'
                }`}
                id="select-board-cbse-btn"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-[#5c3beb]">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase bg-indigo-50 text-[#5c3beb] dark:bg-indigo-950 dark:text-indigo-300 block w-max mb-1">
                      Central School Division
                    </span>
                    <h3 className="text-2xl font-black group-hover:text-[#5c3beb] transition-colors animate-pulse">
                      CBSE Syllabus
                    </h3>
                  </div>
                  <p className="text-xs text-black dark:text-neutral-300 font-medium leading-relaxed">
                    NCERT textbooks, Science, Maths and Unified Social Studies. Special memory boost guides.
                  </p>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs text-[#5c3beb] font-bold pt-3 border-t border-neutral-100 dark:border-neutral-900 w-full">
                  <span>Load CBSE Curriculum</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* SSC Board Option Card */}
              <button
                onClick={() => handleSelectBoard('ssc')}
                className={`p-8 rounded-3xl border-2 text-left cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-95 group flex flex-col justify-between h-72 ${
                  isDarkMode 
                    ? 'bg-neutral-950 border-neutral-800 hover:border-pink-500 hover:shadow-pink-950/25 hover:shadow-2xl' 
                    : 'bg-white border-neutral-200 hover:border-[#e94674] hover:shadow-pink-100 dark:hover:shadow-neutral-950 hover:shadow-2xl'
                }`}
                id="select-board-ssc-btn"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950 flex items-center justify-center text-[#e94674]">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase bg-pink-50 text-[#e94674] dark:bg-pink-950 dark:text-pink-300 block w-max mb-1">
                      Maharashtra State Board
                    </span>
                    <h3 className="text-2xl font-black group-hover:text-[#e94674] transition-colors animate-pulse">
                      MH-SSC Board
                    </h3>
                  </div>
                  <p className="text-xs text-black dark:text-neutral-300 font-medium leading-relaxed">
                    Science 1 (Physics/Chem), Science 2 (Biology), Algebra & Geometry, Split Social Studies.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#e94674] font-bold pt-3 border-t border-neutral-100 dark:border-neutral-900 w-full">
                  <span>Load SSC Curriculum</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
            
            <div className="pt-6">
              <p className="text-xs text-black dark:text-neutral-300 font-bold">
                Logged in as <strong className="font-extrabold text-[#5c3beb] dark:text-violet-400">{user.email}</strong>. Switch dashboards easily later.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Welcome Block (Hero style) - only shown when not inspecting a subject */}
            {!selectedSubject && (
              <div className="mb-8 relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                <div className="relative p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-violet-600 text-white shadow-xs">
                      <Award className="w-3.5 h-3.5" />
                      Target Scoring: Class 10 Board 2026
                    </div>
                    <h2 className="text-2xl sm:text-3.5xl font-black tracking-tight text-neutral-900 dark:text-white">
                      Welcome to Kootmate,{' '}
                      <span className="bg-gradient-to-r from-violet-600 to-[#e94674] bg-clip-text text-transparent">
                        {user.name ? user.name.split(' ')[0] : 'Scholar'}!
                      </span>{' '}
                      👋
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-black leading-relaxed">
                      Explore complete curriculum materials for dual syllabi. Tap any subject for instant access to study aids.
                    </p>
                  </div>
                </div>
              </div>
            )}

        {/* WORKSPACE SELECTION TABS */}
        {isUserAdmin && (
          <div className="flex flex-wrap rounded-2xl bg-neutral-100 p-1.5 w-full sm:w-max mb-8 border border-neutral-200 shadow-xs gap-1 select-none">
            <button
              onClick={() => {
                setCompanionDashboardTab('syllabus');
                setSelectedSubject(null);
              }}
              className={`flex-1 sm:flex-initial px-5 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                companionDashboardTab === 'syllabus'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <BookOpen className="w-4 h-4 text-violet-600" />
              <span>Classic Syllabus Map</span>
            </button>
            <button
              onClick={() => {
                setCompanionDashboardTab('student_cms');
                setSelectedSubject(null);
              }}
              className={`flex-1 sm:flex-initial px-5 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                companionDashboardTab === 'student_cms'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-500 hover:text-[#5c3beb]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
              <span>Interactive Chapter Library</span>
            </button>
            <button
              onClick={() => {
                setCompanionDashboardTab('admin_cms');
                setSelectedSubject(null);
              }}
              className={`flex-1 sm:flex-initial px-5 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                companionDashboardTab === 'admin_cms'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-500 hover:text-yellow-600'
              }`}
            >
              <Layers className="w-4 h-4 text-yellow-600" />
              <span>Librarian Portal</span>
            </button>
          </div>
        )}

        {companionDashboardTab === 'student_cms' ? (
          <StudentCMS />
        ) : companionDashboardTab === 'admin_cms' ? (
          <AdminCMS />
        ) : (
          /* -------------------- MAIN DASHBOARD SUBJECT GRID VIEW -------------------- */
          !selectedSubject ? (
          <div className="space-y-8">
            {/* Board Selection Tabs */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
              <div className="space-y-1 text-left">
                <h3 className="text-lg font-extrabold tracking-tight">
                  {user.selectedBoard ? `${user.selectedBoard.toUpperCase()} Student Dashboard` : 'Class 10 Syllabus Folders'}
                </h3>
                <p className="text-xs text-black dark:text-neutral-300 font-bold">
                  {user.selectedBoard 
                    ? `Curriculum curated specifically for your registered ${user.selectedBoard.toUpperCase()} board curriculum.` 
                    : 'Review CBSE core or MH State Board (SSC) subjects.'}
                </p>
              </div>

              {/* Segmented Controller for Boards - Hidden if user already has a bound selected board */}
              {!user.selectedBoard && (
                <div className="flex rounded-xl bg-neutral-100 dark:bg-neutral-900 p-1 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedBoard('all')}
                    className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      selectedBoard === 'all'
                        ? (isDarkMode ? 'bg-neutral-800 text-white shadow' : 'bg-white text-neutral-950 shadow')
                        : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                    id="board-tab-all"
                  >
                    All (8 Subjects)
                  </button>
                  <button
                    onClick={() => setSelectedBoard('cbse')}
                    className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      selectedBoard === 'cbse'
                        ? (isDarkMode ? 'bg-neutral-800 text-white shadow' : 'bg-white text-neutral-950 shadow')
                        : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                    id="board-tab-cbse"
                  >
                    CBSE syllabus
                  </button>
                  <button
                    onClick={() => setSelectedBoard('ssc')}
                    className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      selectedBoard === 'ssc'
                        ? (isDarkMode ? 'bg-neutral-800 text-white shadow' : 'bg-white text-neutral-950 shadow')
                        : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                    id="board-tab-ssc"
                  >
                    MH-SSC syllabus
                  </button>
                </div>
              )}
            </div>

            {/* CBSE Subjects Section */}
            {(selectedBoard === 'all' || selectedBoard === 'cbse') && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-5 rounded-md bg-[#5c3beb]"></span>
                  <h4 className="text-base font-bold tracking-tight uppercase tracking-wider text-black">
                    CBSE Syllabus Subjects
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cbseSubjects
                    .filter(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || sub.desc.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((sub) => (
                      <div
                        key={sub.id}
                        onClick={() => selectSubjectAndResetLesson(sub)}
                        className={`p-6 rounded-3xl border text-left cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.01] group relative overflow-hidden ${
                          isDarkMode 
                            ? 'bg-neutral-950 border-neutral-850 hover:bg-neutral-900' 
                            : sub.id.includes('science')
                              ? 'bg-gradient-to-br from-indigo-50/30 via-white to-white border-neutral-200 hover:border-indigo-300 hover:shadow-indigo-50/50'
                              : sub.id.includes('maths')
                                ? 'bg-gradient-to-br from-emerald-50/30 via-white to-white border-neutral-200 hover:border-emerald-300 hover:shadow-emerald-50/50'
                                : 'bg-gradient-to-br from-[#fff2f5]/30 via-white to-white border-neutral-200 hover:border-pink-300 hover:shadow-pink-50/50'
                        }`}
                        id={`subject-card-${sub.id}`}
                      >
                        {/* A beautiful glowing background accent circle */}
                        <div className={`absolute -right-12 -top-12 w-28 h-28 rounded-full blur-2xl opacity-10 transition-opacity group-hover:opacity-20 ${
                          sub.id.includes('science') ? 'bg-indigo-400' : sub.id.includes('maths') ? 'bg-emerald-400' : 'bg-[#e94674]'
                        }`}></div>

                        <div className="flex justify-between items-center mb-4 relative z-10">
                          <div className="flex items-center gap-2">
                            <span className={`p-2 rounded-xl text-xs flex items-center justify-center ${
                              sub.id.includes('science')
                                ? 'bg-indigo-50 text-[#5c3beb]'
                                : sub.id.includes('maths')
                                  ? 'bg-emerald-50 text-emerald-600'
                                  : 'bg-pink-50 text-[#e94674]'
                            }`}>
                              {sub.id.includes('science') ? (
                                <Compass className="w-4.5 h-4.5 animate-pulse" />
                              ) : sub.id.includes('maths') ? (
                                <Zap className="w-4.5 h-4.5 text-emerald-500 fill-emerald-500" />
                              ) : (
                                <Bookmark className="w-4.5 h-4.5 text-pink-500 fill-pink-500" />
                              )}
                            </span>
                            <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase ${
                              sub.id.includes('science')
                                ? 'bg-indigo-100 text-[#5c3beb]'
                                : sub.id.includes('maths')
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-[#fff2f5] text-[#e94674]'
                            }`}>
                              CBSE Class 10
                            </span>
                          </div>
                          <span className="text-[10px] text-neutral-500 font-bold group-hover:text-black dark:group-hover:text-white flex items-center gap-1">
                            Unlock
                            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>

                        <h5 className="text-xl font-extrabold tracking-tight mb-2 group-hover:text-black transition-colors text-black">
                          {sub.name}
                        </h5>
                        <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 mb-5 line-clamp-2">
                          {sub.desc}
                        </p>

                        <div className="space-y-1.5 border-t border-neutral-100 dark:border-neutral-900 pt-4 relative z-10">
                          <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                            <span>Curriculum Highlights:</span>
                            <span className="text-neutral-400 font-bold lowercase">{sub.lessons.length} Modules total</span>
                          </div>
                          {sub.lessons.slice(0, 3).map((l, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                sub.id.includes('science') ? 'bg-indigo-400' : sub.id.includes('maths') ? 'bg-emerald-400' : 'bg-pink-400'
                              }`}></span>
                              <span className="truncate text-black font-semibold">{l}</span>
                            </div>
                          ))}
                          <p className={`text-[10px] font-bold pt-1 ${
                            sub.id.includes('science') ? 'text-[#5c3beb]' : sub.id.includes('maths') ? 'text-emerald-600' : 'text-[#e94674]'
                          }`}>
                            + {sub.lessons.length - 3} more interactive units
                          </p>

                          {/* Syllabus tracker progress bar placeholder */}
                          <div className="mt-3 pt-3 border-t border-neutral-150/50">
                            <div className="flex items-center justify-between text-[9px] font-black text-neutral-400 mb-1">
                              <span>Course Syllabus Map</span>
                              <span className="text-black font-black uppercase text-[8px] tracking-wider px-1.5 py-0.5 rounded bg-neutral-100">Pending Release</span>
                            </div>
                            <div className="w-full bg-neutral-100 dark:bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full transition-all duration-500 w-[15%] ${
                                sub.id.includes('science') ? 'bg-[#5c3beb]' : sub.id.includes('maths') ? 'bg-emerald-500' : 'bg-[#e94674]'
                              }`}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            )}

            {/* SSC Subjects Section */}
            {(selectedBoard === 'all' || selectedBoard === 'ssc') && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-5 rounded-md bg-[#e94674]"></span>
                  <h4 className="text-base font-bold tracking-tight uppercase tracking-wider text-black">
                    MH State Board (SSC) Subjects
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sscSubjects
                    .filter(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || sub.desc.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((sub) => (
                      <div
                        key={sub.id}
                        onClick={() => selectSubjectAndResetLesson(sub)}
                        className={`p-6 rounded-3xl border text-left cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.01] group relative overflow-hidden ${
                          isDarkMode 
                            ? 'bg-neutral-950 border-neutral-850 hover:bg-neutral-900' 
                            : sub.id.includes('science')
                              ? 'bg-gradient-to-br from-indigo-50/20 via-white to-white border-neutral-200 hover:border-indigo-300 hover:shadow-indigo-50/50'
                              : sub.id.includes('maths')
                                ? 'bg-gradient-to-br from-emerald-50/20 via-white to-white border-neutral-200 hover:border-emerald-300 hover:shadow-emerald-50/50'
                                : 'bg-gradient-to-br from-[#fff2f5]/20 via-white to-white border-neutral-200 hover:border-pink-300 hover:shadow-pink-50/50'
                        }`}
                        id={`subject-card-${sub.id}`}
                      >
                        {/* A beautiful glowing background accent circle */}
                        <div className={`absolute -right-12 -top-12 w-28 h-28 rounded-full blur-2xl opacity-10 transition-opacity group-hover:opacity-20 ${
                          sub.id.includes('science') ? 'bg-indigo-400' : sub.id.includes('maths') ? 'bg-emerald-400' : 'bg-[#e94674]'
                        }`}></div>

                        <div className="flex justify-between items-center mb-4 relative z-10">
                          <div className="flex items-center gap-2">
                            <span className={`p-2 rounded-xl text-xs flex items-center justify-center ${
                              sub.id.includes('science')
                                ? 'bg-indigo-50 text-[#5c3beb]'
                                : sub.id.includes('maths')
                                  ? 'bg-emerald-50 text-emerald-600'
                                  : 'bg-pink-50 text-[#e94674]'
                            }`}>
                              {sub.id.includes('science') ? (
                                <Compass className="w-4.5 h-4.5 animate-pulse" />
                              ) : sub.id.includes('maths') ? (
                                <Zap className="w-4.5 h-4.5 text-emerald-500 fill-emerald-500" />
                              ) : (
                                <Bookmark className="w-4.5 h-4.5 text-pink-500 fill-pink-500" />
                              )}
                            </span>
                            <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase ${
                              sub.id.includes('science')
                                ? 'bg-indigo-100 text-[#5c3beb]'
                                : sub.id.includes('maths')
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-[#fff2f5] text-[#e94674]'
                            }`}>
                              MH State (SSC)
                            </span>
                          </div>
                          <span className="text-[10px] text-neutral-500 font-bold group-hover:text-black dark:group-hover:text-white flex items-center gap-1">
                            Unlock
                            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>

                        <h5 className="text-xl font-extrabold tracking-tight mb-2 group-hover:text-black transition-colors text-black">
                          {sub.name}
                        </h5>
                        <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 mb-5 line-clamp-2">
                          {sub.desc}
                        </p>

                        <div className="space-y-1.5 border-t border-neutral-100 dark:border-neutral-900 pt-4 relative z-10">
                          <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                            <span>Curriculum Highlights:</span>
                            <span className="text-neutral-400 font-bold lowercase">{sub.lessons.length} Modules total</span>
                          </div>
                          {sub.lessons.slice(0, 3).map((l, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                sub.id.includes('science') ? 'bg-indigo-400' : sub.id.includes('maths') ? 'bg-emerald-400' : 'bg-pink-400'
                              }`}></span>
                              <span className="truncate text-black font-semibold">{l}</span>
                            </div>
                          ))}
                          <p className={`text-[10px] font-bold pt-1 ${
                            sub.id.includes('science') ? 'text-[#5c3beb]' : sub.id.includes('maths') ? 'text-emerald-600' : 'text-[#e94674]'
                          }`}>
                            + {sub.lessons.length - 3} more interactive units
                          </p>

                          {/* Syllabus tracker progress bar placeholder */}
                          <div className="mt-3 pt-3 border-t border-neutral-150/50">
                            <div className="flex items-center justify-between text-[9px] font-black text-neutral-400 mb-1">
                              <span>Course Syllabus Map</span>
                              <span className="text-black font-black uppercase text-[8px] tracking-wider px-1.5 py-0.5 rounded bg-neutral-100">Pending Release</span>
                            </div>
                            <div className="w-full bg-neutral-100 dark:bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full transition-all duration-500 w-[15%] ${
                                sub.id.includes('science') ? 'bg-[#5c3beb]' : sub.id.includes('maths') ? 'bg-emerald-500' : 'bg-[#e94674]'
                              }`}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* If no subject matched the search */}
            {filteredSubjects.length === 0 && (
              <div className="py-12 text-center max-w-md mx-auto">
                <p className="text-lg font-bold">No matching subjects found</p>
                <p className="text-xs text-neutral-400 mt-1">Try searching another term like "Science", "Maths" or "Social Studies"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-xl text-xs font-semibold hover:bg-violet-700 cursor-pointer"
                >
                  Reset Search filter
                </button>
              </div>
            )}
          </div>
        ) : (
          // -------------------- DETAILED CONTENT SUB-FOLDER EXPLORER (With 4 empty categories) --------------------
          <div className="space-y-6 text-left">
            {/* Back to folders button */}
            <button
              onClick={() => {
                setSelectedSubject(null);
                setNotifyFormSubmitted(false);
                setNotifyEmail('');
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 font-black text-xs rounded-xl border transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-neutral-850 border-neutral-800 text-neutral-300 hover:bg-neutral-800' 
                  : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50 shadow-xs'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Syllabus Library
            </button>

            {/* Subject Detail Header */}
            <div className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${
              isDarkMode ? 'bg-neutral-950 border-neutral-850' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="space-y-2">
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wide inline-block ${
                  selectedSubject.board === 'cbse'
                    ? 'bg-indigo-100 text-[#5c3beb] dark:bg-indigo-950 dark:text-indigo-400'
                    : 'bg-pink-100 text-[#e94674] dark:bg-pink-950 dark:text-pink-400'
                }`}>
                  {selectedSubject.board === 'cbse' ? 'CBSE CLASS 10' : 'MH STATE BOARD (SSC)'}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {selectedSubject.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl">
                  {selectedSubject.desc}
                </p>
              </div>

              {/* Subject Chapter Tracker Stats (Placeholder) */}
              <div className="flex gap-4">
                <div className="text-left">
                  <span className="text-neutral-400 text-[10px] block font-semibold uppercase tracking-wider">Board Chapters</span>
                  <span className="font-extrabold text-lg sm:text-2xl">
                    {isSSTSubject 
                      ? (selectedSubSubject ? `${activeLessons.length} Modules (${selectedSubSubject.toUpperCase()})` : '12 Modules total')
                      : `${selectedSubject.lessons.length} Modules`}
                  </span>
                </div>
                <div className="w-px bg-neutral-300 dark:bg-neutral-800"></div>
                <div className="text-left">
                  <span className="text-neutral-400 text-[10px] block font-semibold uppercase tracking-wider">Status</span>
                  <span className="font-black text-rose-500 text-xs sm:text-sm flex items-center gap-1 mt-1">
                    <Zap className="w-4 h-4 fill-rose-500 text-rose-500" />
                    Pending Release
                  </span>
                </div>
              </div>
            </div>

            {/* Social Studies Sub-Subject Choice Section */}
            {isSSTSubject && (
              <div className="p-6 rounded-3xl border border-indigo-100 bg-white shadow-sm space-y-4 text-left animate-fadeIn" id="sst-branch-selector-panel">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-950 font-black text-sm">
                    <span className="p-1.5 rounded-lg bg-indigo-50 text-[#5c3beb] text-xs">🏛️ Social Studies</span>
                    <span className="text-black font-black">Choose Social Studies Sub-subject</span>
                  </div>
                  {selectedSubSubject && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
                      {selectedSubSubject} Active 🌟
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-600 font-bold max-w-xl">
                  Social Studies is split into distinct disciplines. Select a branch below to explore its chapters. Once a branch is selected, the 4 study options and lesson selector will search those units.
                </p>
                
                <div className={`grid grid-cols-1 gap-3 ${selectedSubject!.board === 'cbse' ? 'sm:grid-cols-3 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
                  {(selectedSubject!.board === 'cbse'
                    ? [
                        { key: 'history', name: 'History 📜', desc: 'World wars, nationalist movements & print culture.' },
                        { key: 'geography', name: 'Geography 🌍', desc: 'Resources, forests, water, agriculture & manufacturing.' },
                        { key: 'civics', name: 'Civics ⚖️', desc: 'Power sharing, federalism, gender & political parties.' }
                      ]
                    : [
                        { key: 'history', name: 'History 📜', desc: 'Historiography, applied history, heritage & mass media.' },
                        { key: 'geography', name: 'Geography 🌍', desc: 'India-Brazil comparative climate, pop & tourism.' }
                      ]
                  ).map((branch) => {
                    const isActive = selectedSubSubject === branch.key;
                    return (
                      <button
                        key={branch.key}
                        type="button"
                        onClick={() => {
                          setSelectedSubSubject(branch.key as any);
                          const dynamicL = sstDynamicLessons[selectedSubject!.board][branch.key as 'history' | 'geography' | 'civics' | 'economics'];
                          setSelectedLesson(dynamicL[0] || ''); // Auto-select the first unit so the 4 options appear immediately
                          setNotifyFormSubmitted(false);
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all duration-250 cursor-pointer ${
                          isActive
                             ? 'border-[#5c3beb] bg-indigo-50/75 ring-2 ring-[#5c3beb]/20'
                             : 'border-neutral-200 hover:border-violet-300 bg-neutral-50 hover:bg-white'
                        }`}
                        id={`sst-btn-${branch.key}`}
                      >
                        <h5 className="font-extrabold text-sm text-[#5c3beb] mb-1">{branch.name}</h5>
                        <p className="text-[10px] text-neutral-500 font-bold leading-relaxed">{branch.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Lesson Select Dropdown Section - Only shown for SST once a branch is active */}
            {(!isSSTSubject || selectedSubSubject !== '') && (
              <div className="p-6 rounded-3xl border border-indigo-100 bg-indigo-50/60 shadow-xs space-y-3.5 text-left animate-fadeIn">
                <div className="flex items-center gap-2 text-indigo-950 font-black text-sm">
                  <span className="p-1.5 rounded-lg bg-indigo-100 text-[#5c3beb] text-xs">🎓 Unit</span>
                  <span className="text-black font-black">Select active Lesson or Chapter</span>
                </div>
                <p className="text-xs text-neutral-600 font-bold max-w-xl">
                  Choose a specific Class 10 chapter to focus on. Once selected, you can access the 4 interactive formats for that specific lesson.
                </p>
                
                <div className="relative max-w-sm">
                  <select
                    value={selectedLesson}
                    onChange={(e) => {
                      setSelectedLesson(e.target.value);
                      setNotifyFormSubmitted(false);
                    }}
                    className="w-full px-4 py-3 bg-white border border-neutral-350 focus:border-[#5c3beb] rounded-xl text-neutral-900 font-black text-sm focus:outline-none focus:ring-1 focus:ring-[#5c3beb] cursor-pointer shadow-sm appearance-none"
                    id="lesson-dropdown-select"
                  >
                    <option value="">-- Choose textbook lesson --</option>
                    {activeLessons.map((lesson, idx) => (
                      <option key={idx} value={lesson}>
                        Lesson {idx + 1}: {lesson}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 font-black">
                    ▼
                  </div>
                </div>
              </div>
            )}

            {(!isSSTSubject || selectedSubSubject !== "") && selectedLesson === "" ? (
              <div className="p-12 rounded-3xl border border-dashed border-indigo-200 bg-white text-center space-y-6 animate-fadeIn">
                <div className="flex justify-center">
                  <span className="p-5 rounded-3xl bg-indigo-50 border border-indigo-100 text-[#5c3beb] animate-bounce-slow flex items-center justify-center">
                    <Sparkles className="w-10 h-10 animate-pulse" />
                  </span>
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h4 className="text-xl font-extrabold tracking-tight text-neutral-900">
                    Unfold the 4 Study Formats!
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-500 font-semibold leading-relaxed">
                    Select a class topic or board lesson in the dropdown above to unlock its custom Mind Map, Audio Podcast, high-definition Infographic poster, and formula-matching Game resources.
                  </p>
                </div>

                {/* Grid of quick choices */}
                <div className="space-y-2.5 max-w-lg mx-auto pt-2">
                  <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block">
                    Quick-Load Available Lessons:
                  </span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {activeLessons.map((lesson, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedLesson(lesson)}
                        className="px-4 py-2.5 text-xs font-bold bg-white text-neutral-800 hover:bg-neutral-50 border border-neutral-250 hover:border-[#5c3beb] hover:text-[#5c3beb] rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 animate-slideUp"
                      >
                        Lesson {idx + 1}: {lesson} &rarr;
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (!isSSTSubject || selectedSubSubject !== "") && selectedLesson !== "" ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn animate-slideUp">
              
              {/* Left Column Tabs Selector (Duolingo Style Buttons) */}
              <div className="lg:col-span-3 space-y-2.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-1.5 block text-left">
                  Interactive Formats
                </span>

                <button
                  onClick={() => {
                    setActiveCategoryTab('mind_maps');
                    setNotifyFormSubmitted(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-sm font-bold text-left transition-all cursor-pointer ${
                    activeCategoryTab === 'mind_maps'
                      ? 'bg-violet-600 text-white border-violet-600 shadow-md'
                      : (isDarkMode ? 'bg-neutral-950 border-neutral-850 text-neutral-300 hover:bg-neutral-900' : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-xs')
                  }`}
                >
                  <Layers className={`w-5 h-5 ${activeCategoryTab === 'mind_maps' ? 'text-white' : 'text-violet-500'}`} />
                  <div className="flex-1">
                    <span className="block leading-none">Mind Maps</span>
                    <span className={`text-[9px] block mt-0.5 ${activeCategoryTab === 'mind_maps' ? 'text-violet-200' : 'text-neutral-500 dark:text-neutral-400'}`}>Visual Concept Trees</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveCategoryTab('infographics');
                    setNotifyFormSubmitted(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-sm font-bold text-left transition-all cursor-pointer ${
                    activeCategoryTab === 'infographics'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                      : (isDarkMode ? 'bg-neutral-950 border-neutral-850 text-neutral-300 hover:bg-neutral-900' : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-xs')
                  }`}
                >
                  <Image className={`w-5 h-5 ${activeCategoryTab === 'infographics' ? 'text-white' : 'text-purple-500'}`} />
                  <div className="flex-1">
                    <span className="block leading-none">Infographics</span>
                    <span className={`text-[9px] block mt-0.5 ${activeCategoryTab === 'infographics' ? 'text-purple-200' : 'text-neutral-500 dark:text-neutral-400'}`}>Chapter Memory Boosters</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveCategoryTab('audio');
                    setNotifyFormSubmitted(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-sm font-bold text-left transition-all cursor-pointer ${
                    activeCategoryTab === 'audio'
                      ? 'bg-sky-600 text-white border-sky-600 shadow-md'
                      : (isDarkMode ? 'bg-neutral-950 border-neutral-850 text-neutral-300 hover:bg-neutral-900' : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-xs')
                  }`}
                >
                  <Volume2 className={`w-5 h-5 ${activeCategoryTab === 'audio' ? 'text-white' : 'text-sky-500'}`} />
                  <div className="flex-1">
                    <span className="block leading-none">Audio Lessons</span>
                    <span className={`text-[9px] block mt-0.5 ${activeCategoryTab === 'audio' ? 'text-sky-200' : 'text-neutral-500 dark:text-neutral-400'}`}>Voice Pod summaries</span>
                  </div>
                </button>

                {/* Question Bank Tab (Visible to both students & teachers) */}
                <button
                  onClick={() => {
                    setActiveCategoryTab('question_bank');
                    setNotifyFormSubmitted(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-sm font-bold text-left transition-all cursor-pointer ${
                    activeCategoryTab === 'question_bank'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : (isDarkMode ? 'bg-neutral-950 border-neutral-850 text-neutral-300 hover:bg-neutral-900' : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-xs')
                  }`}
                >
                  <FileText className={`w-5 h-5 ${activeCategoryTab === 'question_bank' ? 'text-white' : 'text-emerald-500'}`} />
                  <div className="flex-1">
                    <span className="block leading-none">Question Bank</span>
                    <span className={`text-[9px] block mt-0.5 ${activeCategoryTab === 'question_bank' ? 'text-emerald-250' : 'text-neutral-500 dark:text-neutral-400'}`}>Elite revision sheets</span>
                  </div>
                </button>

                {/* Games Tab (Only visible to Teachers and Admins) */}
                {((user as any).role === 'teacher' || (user as any).role === 'admin' || isUserAdmin) && (
                  <button
                    onClick={() => {
                      setActiveCategoryTab('games');
                      setNotifyFormSubmitted(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-sm font-bold text-left transition-all cursor-pointer ${
                      activeCategoryTab === 'games'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                        : (isDarkMode ? 'bg-neutral-950 border-neutral-850 text-neutral-300 hover:bg-neutral-900' : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-xs')
                    }`}
                  >
                    <Gamepad2 className={`w-5 h-5 ${activeCategoryTab === 'games' ? 'text-white' : 'text-rose-500'}`} />
                    <div className="flex-1">
                      <span className="block leading-none">Interactive Games</span>
                      <span className={`text-[9px] block mt-0.5 ${activeCategoryTab === 'games' ? 'text-rose-200' : 'text-neutral-500 dark:text-neutral-400'}`}>Play formula challenges</span>
                    </div>
                  </button>
                )}
              </div>

              {/* Right Column: Dynamic Content or Fallback Waitlists */}
              <div className="lg:col-span-9">
                {loadingContent ? (
                  <div className="p-16 border rounded-3xl bg-white border-neutral-200 text-center space-y-4">
                    <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm font-black text-black">Scanning Syllabus database for live files...</p>
                  </div>
                ) : (() => {
                  const tabFilteredItems = contentItems.filter(item => {
                    const type = item.content_type?.toLowerCase() || '';
                    if (activeCategoryTab === 'mind_maps') {
                      return type === 'mindmap' || type === 'mind_maps' || type === 'mind_map';
                    }
                    if (activeCategoryTab === 'infographics') {
                      return type === 'pdf';
                    }
                    if (activeCategoryTab === 'audio') {
                      return type === 'audio';
                    }
                    if (activeCategoryTab === 'question_bank') {
                      return type === 'question_bank' || type === 'questionbank';
                    }
                    if (activeCategoryTab === 'games') {
                      return type === 'game' || type === 'games';
                    }
                    return false;
                  });

                  if (tabFilteredItems.length > 0) {
                    return (
                      <div className="space-y-4" id="dynamic-student-material-deck">
                        <h3 className="text-sm font-black text-black uppercase tracking-wider text-left border-b pb-2">
                          Live Verified Materials ({tabFilteredItems.length})
                        </h3>
                        <ContentGrid
                          items={tabFilteredItems}
                          isAdmin={false}
                          onPlayAudio={(url, title, chap) => setActiveAudio({ url, title, chapter: chap })}
                          onOpenPDF={(url, title) => setActivePDF({ url, title })}
                        />
                      </div>
                    );
                  }

                  return (
                    <div className={`p-8 sm:p-12 rounded-3xl border text-center relative ${
                      isDarkMode ? 'bg-neutral-950 border-neutral-850' : 'bg-white border-neutral-200 shadow-sm'
                    }`}>
                      
                      {/* Category icon rendering */}
                      <div className="flex justify-center mb-6">
                        <span className={`p-6 rounded-3xl animate-bounce-slow flex items-center justify-center border ${
                          activeCategoryTab === 'mind_maps' ? 'bg-indigo-50 border-indigo-100 text-indigo-500 dark:bg-indigo-950/20 dark:border-indigo-900' :
                          activeCategoryTab === 'infographics' ? 'bg-purple-50 border-purple-100 text-purple-500 dark:bg-purple-950/20 dark:border-purple-900' :
                          activeCategoryTab === 'audio' ? 'bg-sky-50 border-sky-100 text-sky-500 dark:bg-sky-950/20 dark:border-sky-900' :
                          activeCategoryTab === 'question_bank' ? 'bg-emerald-50 border-emerald-100 text-emerald-500 dark:bg-emerald-950/20 dark:border-emerald-900' :
                          'bg-rose-50 border-rose-100 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900'
                        }`}>
                          {activeCategoryTab === 'mind_maps' && <Layers className="w-10 h-10" />}
                          {activeCategoryTab === 'infographics' && <Image className="w-10 h-10" />}
                          {activeCategoryTab === 'audio' && <Volume2 className="w-10 h-10" />}
                          {activeCategoryTab === 'question_bank' && <FileText className="w-10 h-10" />}
                          {activeCategoryTab === 'games' && <Gamepad2 className="w-10 h-10" />}
                        </span>
                      </div>

                      <h4 className="text-2xl font-black text-black tracking-tight mb-2">
                        {activeCategoryTab === 'mind_maps' && 'No Mind Maps uploaded yet'}
                        {activeCategoryTab === 'infographics' && 'No Infographics available yet'}
                        {activeCategoryTab === 'audio' && 'Audio Lessons are preparing'}
                        {activeCategoryTab === 'question_bank' && 'Question Banks are being prepared'}
                        {activeCategoryTab === 'games' && 'Interactive games coming soon'}
                      </h4>

                      <p className="max-w-md mx-auto text-xs sm:text-sm text-neutral-900 mb-8 font-extrabold leading-relaxed">
                        {activeCategoryTab === 'mind_maps' && `Our teachers are curating the tree concept maps for ${selectedSubject.lessons.length} core Class 10 chapters. This makes multi-page revisions super easy!`}
                        {activeCategoryTab === 'infographics' && `We are processing high-definition visual memory posters representing timelines, geographical mapping vectors, and civics schemas.`}
                        {activeCategoryTab === 'audio' && `Engaging, standard voice-over scripts are in deep recording sessions, preparing podcasts for your class chapters.`}
                        {activeCategoryTab === 'question_bank' && `We are organizing comprehensive high-priority Class 10 question banks, including previous year questions and challenging test items.`}
                        {activeCategoryTab === 'games' && `Formula-racer and equation-matching puzzle games are being programmed for ${selectedSubject.name}. Stay tuned for fun activities!`}
                      </p>

                      {/* Empty state interactive utility forms to verify intent & functionality */}
                      <div className="max-w-md mx-auto p-6 rounded-2xl border bg-neutral-50/50 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-850">
                        {!notifyFormSubmitted ? (
                          <form onSubmit={handleNotifySubmit} className="space-y-4">
                            <div className="text-left space-y-1">
                              <label className="text-xs font-black uppercase text-black">
                                Notify Me On Release
                              </label>
                              <p className="text-[10px] text-neutral-800 font-extrabold">
                                Get a real-time email as soon as {selectedSubject.name} {activeCategoryTab.replace('_', ' ')} are uploaded by educators.
                              </p>
                            </div>

                            <div className="flex gap-2">
                              <input
                                type="email"
                                required
                                placeholder="Type student/parent email"
                                value={notifyEmail}
                                onChange={(e) => setNotifyEmail(e.target.value)}
                                className={`flex-1 px-3 py-2 border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-transparent ${
                                  isDarkMode 
                                    ? 'bg-neutral-850 border-neutral-800 text-white placeholder-neutral-600' 
                                    : 'bg-white border-neutral-350 text-neutral-900 placeholder-neutral-500 font-bold'
                                }`}
                              />
                              <button
                                type="submit"
                                className="bg-[#5c3beb] hover:bg-[#4b2ec7] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm animate-pulse"
                              >
                                Join Waitlist
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="py-4 text-emerald-600 dark:text-emerald-400 space-y-2 animate-bounce-slow">
                            <CheckCircle className="w-8 h-8 mx-auto stroke-[2.5]" />
                            <h5 className="font-bold text-sm">You are on the list!</h5>
                            <p className="text-[11px] text-neutral-900 font-extrabold">
                              We'll notify {user.email || 'you'} as soon as {selectedSubject.name} syllabus resources match target!
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Suggest a unit text area input */}
                      <div className="max-w-md mx-auto mt-6">
                        {!topicSubmitted ? (
                          <form onSubmit={handleTopicRequestSubmit} className="space-y-3 text-left">
                            <label htmlFor="topic-input" className="text-[10px] font-black uppercase text-black px-1">
                              Suggest a hard Class 10 topic to cover first
                            </label>
                            <div className="flex gap-2">
                              <input
                                id="topic-input"
                                type="text"
                                required
                                placeholder="E.g., Carbon compounds or Trigonometry proofs"
                                value={topicRequest}
                                onChange={(e) => setTopicRequest(e.target.value)}
                                className={`flex-1 px-3 py-2 border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-transparent ${
                                  isDarkMode 
                                    ? 'bg-neutral-850 border-neutral-850 text-white placeholder-neutral-700' 
                                    : 'bg-white border-neutral-350 text-neutral-900 placeholder-neutral-500 font-bold'
                                }`}
                              />
                              <button
                                type="submit"
                                className="px-3.5 py-2 rounded-xl text-xs font-bold border border-violet-500 text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/20 transition-all cursor-pointer"
                              >
                                Request
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/10 text-emerald-600 text-xs text-center flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-500" />
                            <span className="font-black text-black">Topic request registered! Our Class 10 textbook content team is reviewing.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>

              </div>
            ) : null}
          </div>
        )
      )}
    </>
  )}
</main>
      {activeAudio && (
        <div className="fixed bottom-4 right-4 z-50 w-96 max-w-sm">
          <AudioPlayer
            url={activeAudio.url}
            title={activeAudio.title}
            chapterName={activeAudio.chapter}
            onClose={() => setActiveAudio(null)}
          />
        </div>
      )}

      {activePDF && (
        <PDFViewer
          url={activePDF.url}
          title={activePDF.title}
          onClose={() => setActivePDF(null)}
        />
      )}
    </div>
  );
}
