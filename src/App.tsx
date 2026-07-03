import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/DashboardPage';
import Logo from './components/Logo';

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
  const handleLogout = () => {
    setUser({
      name: '',
      email: '',
      phone: '',
      couponCode: '',
      isLoggedIn: false,
    });
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen font-sans bg-white text-neutral-900 transition-all duration-200">
      
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
