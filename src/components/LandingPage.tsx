import React from 'react';
import { Sparkles, ArrowRight, Layers, Volume2, BookOpen, Trophy, Compass, Landmark } from 'lucide-react';
import Logo from './Logo';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'login' | 'signup' | 'dashboard') => void;
  isDarkMode: boolean;
}

export default function LandingPage({ onNavigate, isDarkMode }: LandingPageProps) {
  // 5 in 1 Complete Revision Toolkit ("PUNCH")
  const punchToolkit = [
    {
      title: '“KootMate”',
      badge: 'Memory Testers',
      desc: 'Formulas, definitions, and active recall exercises designed for students who want to test their memory retention daily.',
      icon: Compass,
      color: 'from-orange-500 to-amber-500',
      bgLight: 'bg-amber-50 border-amber-200 text-amber-700',
      tag: '🧠 Active Recall'
    },
    {
      title: '“Left, Right and Center”',
      badge: 'Big Picture People',
      desc: 'Gorgeous multi-branch mind maps connecting concepts and themes, so you can see the entire chapter at a single glance.',
      icon: Layers,
      color: 'from-indigo-500 to-violet-500',
      bgLight: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      tag: '🗺️ Mind Mapping'
    },
    {
      title: '“In A Nutshell”',
      badge: 'Last Minute Scholars',
      desc: 'High-density summary sheets, charts, and infographics designed to deliver massive chapter value in under 5 minutes.',
      icon: BookOpen,
      color: 'from-purple-500 to-fuchsia-500',
      bgLight: 'bg-purple-50 border-purple-200 text-purple-700',
      tag: '⚡ Cheat Sheets'
    },
    {
      title: '“Once Upon A Time”',
      badge: 'The Multitaskers',
      desc: 'Bite-sized, engaging history and science audio podcasts. Listen while walking, resting, or traveling!',
      icon: Volume2,
      color: 'from-sky-500 to-blue-500',
      bgLight: 'bg-sky-50 border-sky-200 text-sky-700',
      tag: '🎧 Audio Lessons'
    },
    {
      title: '“Baker’s Dozen”',
      badge: 'Challenge Lovers',
      desc: 'The ultimate question bank! The 13 toughest questions for every chapter, complete with detailed secure PDFs and answers.',
      icon: Trophy,
      color: 'from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      tag: '🏆 Elite Practice'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-neutral-950 transition-colors duration-200">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-neutral-200/80 bg-white/90">
        <div id="nav-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => onNavigate('landing')}>
            <Logo size="sm" showText={false} className="w-10 h-10 shrink-0" />
            <span className="text-2xl font-black tracking-tight text-neutral-900 ml-1">
              clever<span className="text-[#f39c12]">ly</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4 animate-fadeIn">
            <button
              onClick={() => onNavigate('login')}
              className="px-4.5 py-2 text-sm font-extrabold text-neutral-700 hover:bg-neutral-100 rounded-xl transition-all cursor-pointer"
              id="header-login-btn"
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="px-5 py-2.5 text-sm font-black text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-all"
              id="header-signup-btn"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Editorial Bold Intro Header Section */}
      <section className="pt-16 pb-12 bg-white border-b border-neutral-200" id="intro-hero-section">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase bg-amber-500/10 text-amber-700 border border-amber-500/20" id="landing-hero-badge">
            <Sparkles className="w-3.5 h-3.5 animate-bounce-slow" />
            Designed for SSC & CBSE Class 10 Syllabus
          </div>

          {/* Core User Request Quote */}
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight leading-none" id="landing-main-quote">
            “Let’s be honest, just re-reading and memorizing your chapters isn’t fun.”
          </h2>
          
          {/* Welcome Text */}
          <p className="text-lg sm:text-xl font-bold text-neutral-600 max-w-2xl mx-auto">
            Welcome to the one-stop shop for revision! Mid-terms, boards, just practice… <span className="font-black text-neutral-950 px-2 py-0.5 bg-yellow-300 rounded">CLEVERLY</span> is here for it all!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
            <button
              onClick={() => onNavigate('signup')}
              className="w-full sm:w-auto px-8 py-4 bg-[#5c3beb] hover:bg-[#4a2ecc] text-white font-black text-sm rounded-2xl shadow-lg shadow-indigo-500/15 flex items-center justify-center gap-2.5 cursor-pointer transition-all hover:scale-[1.01]"
              id="hero-get-started-btn"
            >
              Begin Revision Journey
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-neutral-50 text-neutral-800 border-2 border-neutral-200 font-extrabold text-sm rounded-2xl cursor-pointer transition-all"
              id="hero-login-btn"
            >
              Enter Student / Teacher Portal
            </button>
          </div>
        </div>
      </section>


      {/* Interactive 5-in-1 Revision Toolkit Section */}
      <section className="py-20 bg-white" id="punch-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="px-3 py-1 bg-violet-100 text-[#5c3beb] text-xs font-black rounded-lg uppercase tracking-wider">The Revision "PUNCH"</span>
            <h3 className="text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight">
              A 5-in-1 Complete Revision Toolkit
            </h3>
            <p className="text-sm sm:text-base font-bold text-neutral-600 leading-relaxed">
              Cleverly is giving you a complete revision toolkit for the whole year covering the full syllabus of the 4 key subjects! We have something for everyone in this “PUNCH”!
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {punchToolkit.map((tool, idx) => {
              const IconComponent = tool.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-50 border-2 border-neutral-200/80 rounded-3xl p-6.5 hover:shadow-xl hover:border-neutral-300 hover:scale-[1.01] transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg ${tool.bgLight}`}>
                        {tool.tag}
                      </span>
                      <span className="text-xs font-black text-neutral-400">0{idx + 1}</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-black text-neutral-900 tracking-tight">
                        {tool.title}
                      </h4>
                      <p className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">
                        🎯 For {tool.badge}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-neutral-600 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-dashed border-neutral-250 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-neutral-400 uppercase">Interactive Module</span>
                    <button 
                      onClick={() => onNavigate('signup')}
                      className="p-2 bg-white hover:bg-neutral-100 rounded-lg border border-neutral-200 text-neutral-800 cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subscribe CTA */}
          <div className="mt-14 p-8 rounded-3xl border-2 border-dashed border-violet-200 bg-violet-50/50 text-center space-y-4 max-w-3xl mx-auto">
            <h4 className="text-xl sm:text-2xl font-black text-indigo-950">
              Want to know what all these are?
            </h4>
            <p className="text-sm font-bold text-violet-700">
              Hurry and subscribe to Cleverly to unlock all interactive modules for Class 10!
            </p>
            <button
              onClick={() => onNavigate('signup')}
              className="px-6 py-3 bg-[#5c3beb] hover:bg-[#4a2ecc] text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md"
            >
              Subscribe and Register Now ✨
            </button>
          </div>

        </div>
      </section>

      {/* Sports Tennis Highlight Quote Section (Extremely beautiful & sporty!) */}
      <section className="py-16 bg-slate-100 border-t border-neutral-200" id="sports-banner">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#ccff00] border-4 border-black p-8 sm:p-12 rounded-[36px] shadow-[8px_8px_0px_0px_#111111] text-neutral-950 space-y-6 text-center transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full">
              🎾 Match Highlights Mode
            </div>
            
            <blockquote className="text-2xl sm:text-4xl font-black leading-tight tracking-tight text-black font-sans uppercase">
              “If your textbook is a tennis match, CLEVERLY gives you the highlights!”
            </blockquote>
            
            <div className="w-16 h-1.5 bg-black mx-auto rounded-full"></div>
            
            <p className="text-xs sm:text-sm font-black text-neutral-800 uppercase tracking-wider max-w-md mx-auto leading-relaxed">
              Skip the 400-page back-and-forth volleys. Get high-definition summaries, formula indexes, active podcasts, and board-winning questions immediately!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-neutral-900 text-white font-medium" id="landing-footer-section">
        <div id="footer-inner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1.5" id="footer-logo-block">
            <Logo size="sm" showText={false} className="w-10 h-10 shrink-0" />
            <span className="font-extrabold text-sm tracking-tight text-white ml-1">Cleverly EdTech Corp</span>
          </div>
          <p className="text-xs text-neutral-300 font-extrabold" id="footer-copyright-text">
            &copy; 2026 Cleverly. Crafted with love for SSC and CBSE Class 10 Students. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs font-bold text-amber-400" id="footer-navigation-links">
            <button onClick={() => onNavigate('login')} className="hover:underline cursor-pointer" id="footer-nav-login">Login</button>
            <span>&bull;</span>
            <button onClick={() => onNavigate('signup')} className="hover:underline cursor-pointer" id="footer-nav-signup">Register</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
