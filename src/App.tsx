import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/DashboardPage';
import Logo from './components/Logo';
import { Laptop } from 'lucide-react';
import { dbGetCurrentUser, dbLogoutUser, dbHeartbeat } from './lib/supabase';

interface User {
  name: string;
  email: string;
  phone?: string;
  couponCode?: string;
  selectedBoard?: 'cbse' | 'ssc';
  avatarUrl?: string;
  googleId?: string;
  role?: string;
  schoolName?: string;
  dob?: string;
  isLoggedIn: boolean;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'signup' | 'dashboard'>('landing');
  const isDarkMode = false; // Completely eliminate dark theme as requested!
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [sessionErrorMsg, setSessionErrorMsg] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    phone: '',
    couponCode: '',
    role: '',
    schoolName: '',
    dob: '',
    isLoggedIn: false,
  });

  // Recover active session on mount
  useEffect(() => {
    const recoverSession = async () => {
      const token = localStorage.getItem("session_token");
      if (token) {
        try {
          const result = await dbGetCurrentUser();
          if (result.success && result.user) {
            handleLoginSuccess(result.user);
          } else {
            localStorage.removeItem("session_token");
          }
        } catch (e) {
          console.warn("Could not recover session automatically on mount:", e);
        }
      }
      setIsLoadingSession(false);
    };

    recoverSession();
  }, []);

  // Start Heartbeat interval when user is logged in
  useEffect(() => {
    if (!user.isLoggedIn) return;

    // Run heartbeat every 60 seconds (60000ms) to sync with active_sessions in Supabase
    const intervalId = setInterval(async () => {
      try {
        const result = await dbHeartbeat();
        if (!result.success) {
          console.warn("Heartbeat failed, logging out:", result.message);
          setSessionErrorMsg("This account was logged in on another device or your session has expired. Please log in again.");
          handleLogout();
        }
      } catch (e) {
        console.error("Error executing active session heartbeat:", e);
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [user.isLoggedIn]);

  // Check for mobile screens on mount and window resize
  useEffect(() => {
    const handleDeviceCheck = () => {
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth < 1024; // standard laptop barrier
      setIsMobileDevice(isMobileUA || isSmallScreen);
    };

    handleDeviceCheck();
    window.addEventListener('resize', handleDeviceCheck);
    return () => window.removeEventListener('resize', handleDeviceCheck);
  }, []);

  // Always keep light theme active on document element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
  }, []);

  // Handle successful login or registration
  const handleLoginSuccess = (profile: { 
    name: string; 
    email: string; 
    phone?: string; 
    couponCode?: string; 
    selectedBoard?: 'cbse' | 'ssc';
    avatarUrl?: string;
    googleId?: string;
    role?: string;
    schoolName?: string;
    dob?: string;
  }) => {
    setUser({
      name: profile.name,
      email: profile.email,
      phone: profile.phone || '',
      couponCode: profile.couponCode || '',
      selectedBoard: profile.selectedBoard,
      avatarUrl: profile.avatarUrl,
      googleId: profile.googleId,
      role: profile.role || '',
      schoolName: profile.schoolName || '',
      dob: profile.dob || '',
      isLoggedIn: true,
    });
    setCurrentPage('dashboard');
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await dbLogoutUser();
    } catch (e) {
      console.warn("Error during dbLogoutUser:", e);
    }
    setUser({
      name: '',
      email: '',
      phone: '',
      couponCode: '',
      isLoggedIn: false,
    });
    setCurrentPage('landing');
  };

  if (isMobileDevice) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-6 text-center select-none" id="mobile-blocking-container">
        <div className="max-w-md w-full bg-[#ccff00] border-4 border-black p-8 rounded-[36px] shadow-[8px_8px_0px_0px_#111111] text-neutral-950 space-y-6 transform rotate-1">
          <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full">
            🎾 Cleverly Match Notice
          </div>
          
          <div className="flex justify-center">
            <div className="p-4 bg-black rounded-full text-[#ccff00]">
              <Laptop className="w-10 h-10 animate-pulse" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight leading-none">
            Laptop View Required
          </h2>
          
          <p className="text-xs sm:text-sm font-black text-neutral-800 uppercase tracking-wider leading-relaxed">
            This website is designed exclusively for laptop/desktop screen use. Please open Cleverly on a larger screen to access your revision toolkit and materials.
          </p>
          
          <div className="w-16 h-1 bg-black mx-auto rounded-full"></div>
          
          <p className="text-[10px] font-bold text-neutral-700 leading-normal">
            Cleverly EdTech Corp &bull; SSC & CBSE Class 10 Syllabus Companion
          </p>
        </div>
      </div>
    );
  }

  if (isLoadingSession) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 select-none" id="loading-session-screen">
        <div className="w-12 h-12 border-4 border-black border-t-neutral-200 rounded-full animate-spin"></div>
        <p className="text-xs font-black uppercase tracking-widest text-neutral-500">Securing Session Allocation...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-white text-neutral-900 transition-all duration-200">
      
      {/* Session State Banner */}
      {sessionErrorMsg && (
        <div className="bg-rose-50 border-b border-rose-200 text-rose-800 px-6 py-3 text-xs font-bold flex items-center justify-between gap-4 animate-fade-in" id="global-session-error-banner">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-600 animate-pulse"></span>
            <span>{sessionErrorMsg}</span>
          </div>
          <button 
            onClick={() => setSessionErrorMsg(null)}
            className="px-2 py-1 hover:bg-rose-100 rounded text-rose-950 font-black uppercase text-[10px]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Page Routing */}
      {currentPage === 'landing' && (
        <LandingPage 
          onNavigate={setCurrentPage} 
          isDarkMode={isDarkMode} 
        />
      )}

      {currentPage === 'login' && (
        <LoginPage 
          onNavigate={setCurrentPage} 
          onLoginSuccess={handleLoginSuccess}
          isDarkMode={isDarkMode} 
        />
      )}

      {currentPage === 'signup' && (
        <SignupPage 
          onNavigate={setCurrentPage} 
          onLoginSuccess={handleLoginSuccess}
          isDarkMode={isDarkMode} 
        />
      )}

      {currentPage === 'dashboard' && (
        <DashboardPage 
          user={user} 
          onLogout={handleLogout} 
          isDarkMode={isDarkMode} 
        />
      )}
    </div>
  );
}
