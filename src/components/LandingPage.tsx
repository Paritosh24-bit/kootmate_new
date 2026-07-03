import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Volume2, 
  BookOpen, 
  Trophy, 
  Compass, 
  Play, 
  Pause, 
  ExternalLink, 
  HelpCircle, 
  X, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  RotateCcw,
  FileText
} from 'lucide-react';
import Logo from './Logo';
import { PDFViewer } from './CMSComponents';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'login' | 'signup' | 'dashboard') => void;
  isDarkMode: boolean;
}

export default function LandingPage({ onNavigate, isDarkMode }: LandingPageProps) {
  // Current active preview item (e.g. 'mind_map', 'infographic', 'audio', 'bakers_dozen', 'kootmate')
  const [activePreview, setActivePreview] = useState<'mind_map' | 'infographic' | 'audio' | 'bakers_dozen' | 'kootmate' | null>(null);
  const [activePDF, setActivePDF] = useState<{ url: string; title: string } | null>(null);
  
  // Dynamic free preview items fetched from backend CMS
  const [dynamicFreePreviews, setDynamicFreePreviews] = useState<any[]>([]);
  const [dynamicLoading, setDynamicLoading] = useState(false);
  const [activeDynamicAudio, setActiveDynamicAudio] = useState<{ url: string; title: string; subject: string; chapter: string } | null>(null);
  const [isDynamicAudioPlaying, setIsDynamicAudioPlaying] = useState(false);
  const [dynamicAudioTime, setDynamicAudioTime] = useState(0);
  const [dynamicAudioDuration, setDynamicAudioDuration] = useState(0);
  const dynamicAudioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch dynamic free previews from the CMS api
  useEffect(() => {
    const fetchDynamicPreviews = async () => {
      setDynamicLoading(true);
      try {
        const res = await fetch('/api/content');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          // Filter out only free preview items
          const freeItems = json.data.filter((item: any) => !!item.is_free_preview);
          setDynamicFreePreviews(freeItems);
        }
      } catch (err) {
        console.error('Failed to load dynamic free previews:', err);
      } finally {
        setDynamicLoading(false);
      }
    };
    fetchDynamicPreviews();
  }, []);

  // Update dynamic audio times
  useEffect(() => {
    if (activeDynamicAudio && dynamicAudioRef.current) {
      const audio = dynamicAudioRef.current;
      const updateTime = () => setDynamicAudioTime(audio.currentTime);
      const updateDuration = () => setDynamicAudioDuration(audio.duration || 0);
      const handleEnded = () => setIsDynamicAudioPlaying(false);

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('durationchange', updateDuration);
      audio.addEventListener('ended', handleEnded);

      // Play immediately
      audio.play().then(() => setIsDynamicAudioPlaying(true)).catch(err => console.warn('Autoplay blocked', err));

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('durationchange', updateDuration);
        audio.removeEventListener('ended', handleEnded);
      };
    } else {
      setIsDynamicAudioPlaying(false);
      setDynamicAudioTime(0);
      setDynamicAudioDuration(0);
    }
  }, [activeDynamicAudio]);

  const togglePlayDynamicAudio = () => {
    if (!dynamicAudioRef.current) return;
    if (isDynamicAudioPlaying) {
      dynamicAudioRef.current.pause();
      setIsDynamicAudioPlaying(false);
    } else {
      dynamicAudioRef.current.play().catch(err => console.warn('Audio play blocked', err));
      setIsDynamicAudioPlaying(true);
    }
  };

  const handleDynamicAudioSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (dynamicAudioRef.current) {
      dynamicAudioRef.current.currentTime = val;
      setDynamicAudioTime(val);
    }
  };
  
  // Audio Player states
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Baker's Dozen states
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  // KootMate Flashcard states
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset states when preview changes
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setCurrentTime(0);
    setExpandedQuestion(null);
    setCurrentCardIdx(0);
    setIsFlipped(false);
  }, [activePreview]);

  // Audio elements hook
  useEffect(() => {
    if (activePreview === 'audio' && audioRef.current) {
      const audio = audioRef.current;
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration || 0);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('durationchange', updateDuration);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('durationchange', updateDuration);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [activePreview]);

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => console.warn('Audio auto-play blocked', err));
      setIsPlaying(true);
    }
  };

  const changeAudioSpeed = (speed: number) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = speed;
    setPlaybackRate(speed);
  };

  const handleAudioProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // 4 Main blocks in the Revision Toolkit
  const mainToolkit = [
    {
      id: 'mind_map',
      title: '“Left, Right and Center”',
      badge: 'Big Picture People',
      desc: 'Gorgeous multi-branch mind maps connecting concepts and themes, so you can see the entire chapter at a single glance.',
      icon: Layers,
      bgLight: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      tag: '🗺️ Mind Mapping'
    },
    {
      id: 'infographic',
      title: '“In A Nutshell”',
      badge: 'Last Minute Scholars',
      desc: 'High-density summary sheets, charts, and infographics designed to deliver massive chapter value in under 5 minutes.',
      icon: BookOpen,
      bgLight: 'bg-purple-50 border-purple-200 text-purple-700',
      tag: '⚡ Cheat Sheets'
    },
    {
      id: 'audio',
      title: '“Once Upon A Time”',
      badge: 'The Multitaskers',
      desc: 'Bite-sized, engaging history and science audio podcasts. Listen while walking, resting, or traveling!',
      icon: Volume2,
      bgLight: 'bg-sky-50 border-sky-200 text-sky-700',
      tag: '🎧 Audio Lessons'
    },
    {
      id: 'bakers_dozen',
      title: '“Baker’s Dozen”',
      badge: 'Challenge Lovers',
      desc: 'The ultimate question bank! The 13 toughest questions for every chapter, complete with detailed secure PDFs and answers.',
      icon: Trophy,
      bgLight: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      tag: '🏆 Elite Practice'
    },
  ];

  // KootMate under "Our Other Services"
  const kootmateService = {
    id: 'kootmate',
    title: '“KootMate”',
    badge: 'Memory Testers',
    desc: 'Formulas, definitions, and active recall exercises designed for students who want to test their memory retention daily.',
    icon: Compass,
    bgLight: 'bg-amber-50 border-amber-200 text-amber-700',
    tag: '🧠 Active Recall'
  };

  // 13 Toughest Questions for Chapter 1
  const toughestQuestions = [
    { q: "Why should a magnesium ribbon be cleaned before burning in air?", a: "Magnesium is very reactive. When exposed to air, it forms a protective layer of magnesium carbonate on its surface which prevents further reaction. Cleaning the ribbon with sandpaper removes this oxide layer so it can burn readily with oxygen." },
    { q: "Balance the following chemical equation: Fe + H2O → Fe3O4 + H2.", a: "The balanced equation is: 3Fe + 4H2O → Fe3O4 + 4H2." },
    { q: "What is a balanced chemical equation? Why should chemical equations be balanced?", a: "A chemical equation in which the number of atoms of each element on both LHS (reactants) and RHS (products) are equal is called a balanced equation. It must be balanced to satisfy the Law of Conservation of Mass, which states that mass can neither be created nor destroyed in a chemical reaction." },
    { q: "Write the balanced chemical equation for the reaction: Hydrogen + Chlorine → Hydrogen chloride.", a: "H2 + Cl2 → 2HCl" },
    { q: "Why is respiration considered an exothermic reaction? Explain.", a: "During respiration, glucose (formed during digestion) combines with oxygen in our body cells to release carbon dioxide, water, and massive amounts of energy in the form of heat/ATP. Hence, it is an exothermic reaction. C6H12O6 + 6O2 → 6CO2 + 6H2O + Energy." },
    { q: "Why are decomposition reactions called the opposite of combination reactions? Write equations for these reactions.", a: "In a combination reaction, two or more reactants combine to form a single product. Example: C + O2 → CO2. In a decomposition reaction, a single reactant breaks down to form two or more simpler products. Example: CaCO3 → CaO + CO2. Thus, they are chemically opposite." },
    { q: "Write one equation each for decomposition reactions where energy is supplied in the form of heat, light or electricity.", a: "1) Heat (Thermal): CaCO3(s) + Heat → CaO(s) + CO2(g).\n2) Light (Photolytic): 2AgCl(s) + Sunlight → 2Ag(s) + Cl2(g).\n3) Electricity (Electrolytic): 2H2O(l) + Electricity → 2H2(g) + O2(g)." },
    { q: "What is the difference between displacement and double displacement reactions? Write equations for these reactions.", a: "In a displacement reaction, a more reactive element displaces a less reactive element from its salt solution. Example: Fe(s) + CuSO4(aq) → FeSO4(aq) + Cu(s). In a double displacement reaction, two compounds exchange ions to form two new compounds. Example: Na2SO4(aq) + BaCl2(aq) → BaSO4(s) + 2NaCl(aq)." },
    { q: "In the refining of silver, the recovery of silver from silver nitrate solution involved displacement by copper metal. Write down the reaction involved.", a: "2AgNO3(aq) + Cu(s) → Cu(NO3)2(aq) + 2Ag(s)" },
    { q: "What do you mean by a precipitation reaction? Explain by giving examples.", a: "Any reaction in which an insoluble solid (called a precipitate) is formed that separates out from the solution is called a precipitation reaction. Example: Na2SO4(aq) + BaCl2(aq) → BaSO4(s)↓ (white precipitate) + 2NaCl(aq)." },
    { q: "Explain the following in terms of gain or loss of oxygen with two examples each: (a) Oxidation, (b) Reduction.", a: "(a) Oxidation: Gain of oxygen during a reaction. Example: 2Cu + O2 + Heat → 2CuO (Copper is oxidized).\n(b) Reduction: Loss of oxygen during a reaction. Example: CuO + H2 + Heat → Cu + H2O (Copper oxide is reduced)." },
    { q: "A shiny brown colored element ‘X’ on heating in air becomes black in color. Name the element ‘X’ and the black colored compound formed.", a: "The shiny brown element ‘X’ is Copper (Cu). The black colored compound formed is Copper(II) Oxide (CuO). Reaction: 2Cu + O2 + Heat → 2CuO." },
    { q: "Why do we apply paint on iron articles? How do oil and fat containing food items get protected from rancidity?", a: "Paint forms a protective barrier that prevents moisture and air from coming into direct contact with iron, avoiding rusting.\nOil/fat foods are saved from rancidity by adding anti-oxidants, packing them in airtight containers, or flushing the packets with inert Nitrogen gas to prevent atmospheric oxidation." }
  ];

  // KootMate Active Recall Quiz
  const kootmateFlashcards = [
    { q: "What is rancidity in food items?", a: "Rancidity is the slow aerial oxidation of unsaturated fats and oils present in food materials, resulting in a highly unpleasant smell, color distortion, and off-taste." },
    { q: "State the law of conservation of mass in chemical reactions.", a: "Mass can neither be created nor destroyed in a chemical reaction. Hence, the total mass of reactants must equal the total mass of the products." },
    { q: "What is the color of the precipitate formed when Lead Nitrate reacts with Potassium Iodide?", a: "A brilliant, bright yellow precipitate of Lead Iodide (PbI2) is formed." },
    { q: "What is a catalyst?", a: "A chemical substance that accelerates or alters the rate of a chemical reaction without undergoing any permanent chemical change itself." },
    { q: "What type of chemical reaction is digestion of food in our body?", a: "It is a Decomposition reaction and Exothermic in nature, as complex starches and carbohydrates break down into simpler glucose molecules, releasing energy." }
  ];

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIdx((prev) => (prev + 1) % kootmateFlashcards.length);
    }, 200);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIdx((prev) => (prev - 1 + kootmateFlashcards.length) % kootmateFlashcards.length);
    }, 200);
  };

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

          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight leading-none" id="landing-main-quote">
            “Let’s be honest, just re-reading and memorizing your chapters isn’t fun.”
          </h2>
          
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

      {/* Interactive 4-in-1 Revision Toolkit Section */}
      <section className="py-20 bg-white" id="punch-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="px-3 py-1 bg-violet-100 text-[#5c3beb] text-xs font-black rounded-lg uppercase tracking-wider">The Revision "PUNCH"</span>
            <h3 className="text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight">
              A 4-in-1 Complete Revision Toolkit
            </h3>
            <p className="text-sm sm:text-base font-bold text-neutral-600 leading-relaxed">
              Cleverly is giving you a complete revision toolkit for the whole year covering the full syllabus of the key subjects! Click "Free preview" on any service block to sample CBSE Science Lesson 1.
            </p>
          </div>

          {/* Cards Grid: Main 4 Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {mainToolkit.map((tool) => {
              const IconComponent = tool.icon;
              const isCurrentlyActive = activePreview === tool.id;
              return (
                <div 
                  key={tool.id} 
                  className={`bg-slate-50 border-2 rounded-3xl p-6.5 hover:shadow-xl transition-all flex flex-col justify-between space-y-5 ${
                    isCurrentlyActive ? 'border-indigo-600 ring-4 ring-indigo-500/15 shadow-lg' : 'border-neutral-200/80 hover:border-neutral-300'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg ${tool.bgLight}`}>
                        {tool.tag}
                      </span>
                      <IconComponent className="w-5 h-5 text-indigo-600 shrink-0" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xl font-black text-neutral-900 tracking-tight">
                        {tool.title}
                      </h4>
                      <p className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest">
                        🎯 For {tool.badge}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-neutral-600 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-dashed border-neutral-250 flex items-center justify-between">
                    <span className="text-[10px] font-black text-neutral-400 uppercase">Class 10 Materials</span>
                    <button 
                      onClick={() => {
                        setActivePreview(activePreview === tool.id ? null : (tool.id as any));
                        const el = document.getElementById('preview-display-anchor');
                        if (el) {
                          setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
                        }
                      }}
                      className={`px-4 py-2 font-black text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                        isCurrentlyActive 
                          ? 'bg-neutral-900 text-white shadow-md' 
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                      }`}
                    >
                      <span>Free preview</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div id="preview-display-anchor" className="pt-2"></div>

          {/* DYNAMIC INTERACTIVE FREE PREVIEW PANEL FOR CBSE SCIENCE LESSON 1 */}
          {activePreview && (
            <div className="mt-12 p-6 sm:p-8 rounded-[32px] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-neutral-900 max-w-5xl mx-auto animate-fadeIn relative">
              
              {/* Close Button */}
              <button 
                onClick={() => setActivePreview(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black border border-neutral-200 transition-all cursor-pointer"
                title="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                
                {/* Preview Header */}
                <div className="border-b-4 border-black pb-4 text-left">
                  <span className="px-3 py-1 bg-[#ccff00] border-2 border-black text-black font-black text-[10px] rounded-full uppercase tracking-wider">
                    ⚡ Live Free Preview Block
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight mt-2 text-black">
                    {activePreview === 'mind_map' && '“Left, Right and Center” — Multi-branch Interactive Mind Map'}
                    {activePreview === 'infographic' && '“In A Nutshell” — Visual Infographic Summary Sheet'}
                    {activePreview === 'audio' && '“Once Upon A Time” — Standard Voice-over Audio Podcast'}
                    {activePreview === 'bakers_dozen' && '“Baker’s Dozen” — 13 Toughest Board Questions'}
                    {activePreview === 'kootmate' && '“KootMate” — Active Recall Interactive Flashcards'}
                  </h3>
                  <p className="text-xs sm:text-sm font-extrabold text-neutral-500 uppercase tracking-widest mt-1">
                    📖 Syllabus Chapter: <span className="text-indigo-600 font-black">Chemical Reactions and Equations</span> &bull; Subject: Science (CBSE Class 10)
                  </p>
                </div>

                {/* 1. MIND MAP CONTENT */}
                {activePreview === 'mind_map' && (
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm font-bold text-neutral-600 text-left">
                      Below is the fully functional branching mind map for Chapter 1. Use your mouse wheel or gestures to zoom in, and click/drag to pan and trace different branches.
                    </p>
                    <div className="relative border-4 border-black rounded-2xl overflow-hidden bg-slate-50">
                      <iframe 
                        src="https://chem-map-bloom.lovable.app/" 
                        className="w-full h-[550px] bg-white"
                        title="Chemical Reactions Interactive Mind Map"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-indigo-50 border-2 border-indigo-200 rounded-xl gap-3">
                      <p className="text-xs font-bold text-indigo-900 text-left">
                        ✨ Fully structured mapping connects Reactants, Products, Balancing Coefficients, and 5 core Chemical equations instantly!
                      </p>
                      <a 
                        href="https://chem-map-bloom.lovable.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 py-2.5 bg-[#5c3beb] hover:bg-[#472ecc] text-white font-black text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 shrink-0"
                      >
                        <span>Fullscreen Map</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}

                {/* 2. INFOGRAPHICS CONTENT */}
                {activePreview === 'infographic' && (
                  <div className="space-y-6 text-left">
                    <p className="text-xs sm:text-sm font-bold text-neutral-600">
                      This infographic summary highlights chemical properties, reaction states, and step-by-step balancing indices. Preview the sample graphic or download the complete study PDF.
                    </p>
                    
                    {/* Visual Card Infographic mockup */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-amber-50 border-2 border-black p-5 rounded-2xl">
                        <span className="text-xs font-black uppercase text-amber-700 block mb-2">💡 Rule 1: Mass Balance</span>
                        <p className="text-xs font-bold text-neutral-800 leading-relaxed">
                          Mass is conserved. Write down individual element counts on Reactants (LHS) and Products (RHS) before applying coefficients. Never alter the subscripts of chemical formulas!
                        </p>
                      </div>
                      <div className="bg-sky-50 border-2 border-black p-5 rounded-2xl">
                        <span className="text-xs font-black uppercase text-sky-700 block mb-2">🔥 Rule 2: Reaction Types</span>
                        <ul className="text-xs font-bold text-neutral-800 space-y-1.5 list-disc pl-4">
                          <li>Combination: A + B → AB</li>
                          <li>Decomposition: AB → A + B</li>
                          <li>Displacement: A + BC → AC + B</li>
                          <li>Redox: Oxidation & Reduction occur together</li>
                        </ul>
                      </div>
                      <div className="bg-emerald-50 border-2 border-black p-5 rounded-2xl">
                        <span className="text-xs font-black uppercase text-emerald-700 block mb-2">⭐ Rule 3: Visual Indicators</span>
                        <p className="text-xs font-bold text-neutral-800 leading-relaxed">
                          Note precipitate indicators (↓), gas evolution (↑), color shifts (e.g. Copper Sulfate blue to Iron Sulfate green) and temperature changes (Exo vs Endo).
                        </p>
                      </div>
                    </div>

                    <div className="p-5 border-2 border-black rounded-2xl bg-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="text-left space-y-1">
                        <p className="text-sm font-black text-black uppercase">Official Free Infographic Document</p>
                        <p className="text-xs font-bold text-neutral-500">File Name: cbse-class10-science-ch1-infographic-preview.pdf</p>
                      </div>
                      <button 
                        onClick={() => {
                          setActivePDF({
                            url: "https://kootmate-content.e919105d6b0d81f6ecf5f7ae83c1992d.r2.cloudflarestorage.com/class10/cbse/science/chemicalreactionsandequations/sdvf.pdf",
                            title: "CBSE Class 10 Science Chapter 1 - In A Nutshell Infographic Summary"
                          });
                        }}
                        className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center gap-2 w-full md:w-auto cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Open Free Infographic</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. AUDIO LESSONS CONTENT */}
                {activePreview === 'audio' && (
                  <div className="space-y-6">
                    <p className="text-xs sm:text-sm font-bold text-neutral-600 text-left">
                      Our audio lessons are formatted as engaging podcasts that outline textbook chapters clearly. Hit Play below to hear the official CBSE Lesson 1 audio summary.
                    </p>

                    {/* Cassette Retro Custom Audio Player */}
                    <div className="bg-neutral-900 text-white border-4 border-black p-6 rounded-3xl max-w-lg mx-auto space-y-6 shadow-md">
                      
                      <audio 
                        ref={audioRef}
                        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                        preload="metadata"
                      />

                      {/* Cassette mockup details */}
                      <div className="border-2 border-neutral-700 rounded-xl p-4 bg-neutral-950 flex justify-between items-center relative overflow-hidden">
                        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-neutral-800 -translate-x-1/2" />
                        
                        <div className="space-y-1 text-left z-10">
                          <span className="text-[9px] font-black tracking-widest text-neutral-500 uppercase">CLEVERLY CASSETTE</span>
                          <h5 className="text-xs font-black text-amber-400 block truncate w-40">CH1: Chemical Reactions</h5>
                          <p className="text-[8px] font-bold text-neutral-400">Time: {formatTime(currentTime)} / {formatTime(duration || 372)}</p>
                        </div>

                        {/* Tape wheels */}
                        <div className="flex gap-4 z-10 pr-2">
                          <div className={`w-10 h-10 rounded-full border-4 border-dashed border-neutral-600 flex items-center justify-between ${isPlaying ? 'animate-spin' : ''}`}>
                            <div className="w-2.5 h-2.5 bg-neutral-800 rounded-full mx-auto" />
                          </div>
                          <div className={`w-10 h-10 rounded-full border-4 border-dashed border-neutral-600 flex items-center justify-between ${isPlaying ? 'animate-spin' : ''}`}>
                            <div className="w-2.5 h-2.5 bg-neutral-800 rounded-full mx-auto" />
                          </div>
                        </div>
                      </div>

                      {/* Custom Controls */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold text-neutral-400">{formatTime(currentTime)}</span>
                          <input 
                            type="range"
                            min={0}
                            max={duration || 100}
                            value={currentTime}
                            onChange={handleAudioProgressChange}
                            className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer accent-amber-500 bg-neutral-800"
                          />
                          <span className="text-[10px] font-bold text-neutral-400">{formatTime(duration || 372)}</span>
                        </div>

                        {/* Player Action buttons */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => changeAudioSpeed(1.0)}
                              className={`px-2 py-1 text-[9px] font-black rounded border cursor-pointer ${playbackRate === 1.0 ? 'bg-amber-500 border-amber-500 text-black' : 'border-neutral-700 text-neutral-400'}`}
                            >
                              1.0x
                            </button>
                            <button 
                              onClick={() => changeAudioSpeed(1.25)}
                              className={`px-2 py-1 text-[9px] font-black rounded border cursor-pointer ${playbackRate === 1.25 ? 'bg-amber-500 border-amber-500 text-black' : 'border-neutral-700 text-neutral-400'}`}
                            >
                              1.25x
                            </button>
                            <button 
                              onClick={() => changeAudioSpeed(1.5)}
                              className={`px-2 py-1 text-[9px] font-black rounded border cursor-pointer ${playbackRate === 1.5 ? 'bg-amber-500 border-amber-500 text-black' : 'border-neutral-700 text-neutral-400'}`}
                            >
                              1.5x
                            </button>
                          </div>

                          <button 
                            onClick={togglePlayAudio}
                            className="p-3 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 cursor-pointer shadow-md transition-all flex items-center justify-center shrink-0"
                            title={isPlaying ? 'Pause' : 'Play'}
                          >
                            {isPlaying ? <Pause className="w-5 h-5 fill-neutral-950" /> : <Play className="w-5 h-5 fill-neutral-950 ml-0.5" />}
                          </button>

                          <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                            {isPlaying ? '🔴 STREAMING ACTIVE' : '⏸️ PLAYER PAUSED'}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

                {/* 4. BAKER'S DOZEN CONTENT */}
                {activePreview === 'bakers_dozen' && (
                  <div className="space-y-4 text-left">
                    <p className="text-xs sm:text-sm font-bold text-neutral-600">
                      The ultimate test! Below are the 13 toughest questions for Chemical Reactions and Equations. Click on any card to slide open the expert solution!
                    </p>

                    <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 border border-neutral-100 rounded-2xl p-2 bg-slate-50">
                      {toughestQuestions.map((item, index) => {
                        const isExpanded = expandedQuestion === index;
                        return (
                          <div 
                            key={index} 
                            className="border-2 border-black rounded-xl overflow-hidden bg-white shadow-sm transition-all"
                          >
                            <button
                              onClick={() => setExpandedQuestion(isExpanded ? null : index)}
                              className="w-full p-4 text-left font-black text-xs sm:text-sm flex items-center justify-between gap-3 bg-neutral-50 hover:bg-neutral-100 transition-all cursor-pointer"
                            >
                              <span className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-black text-white font-black text-[10px] flex items-center justify-center shrink-0">
                                  {index + 1}
                                </span>
                                <span className="text-neutral-950">{item.q}</span>
                              </span>
                              {isExpanded ? <ChevronUp className="w-4 h-4 shrink-0 text-indigo-600" /> : <ChevronDown className="w-4 h-4 shrink-0 text-neutral-500" />}
                            </button>
                            
                            {isExpanded && (
                              <div className="p-4 bg-indigo-50/50 border-t-2 border-dashed border-black text-xs sm:text-sm font-bold text-neutral-800 leading-relaxed animate-fadeIn">
                                <p className="text-indigo-900 font-black mb-1">📝 Expert Verification Answer:</p>
                                <p className="whitespace-pre-line">{item.a}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 5. KOOTMATE CONTENT */}
                {activePreview === 'kootmate' && (
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm font-bold text-neutral-600 text-left">
                      Test your active memory recall on Lesson 1! Read the question below, flip the card to check if your memory matches the answer, then move to the next card.
                    </p>

                    {/* Interactive Flashcard UI */}
                    <div className="max-w-md mx-auto py-6 space-y-6">
                      <div 
                        onClick={() => setIsFlipped(!isFlipped)}
                        className={`w-full min-h-[180px] rounded-3xl p-6 border-4 border-black flex flex-col justify-between cursor-pointer transition-all duration-300 transform shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${
                          isFlipped ? 'bg-amber-100 -rotate-1 hover:rotate-0' : 'bg-violet-100 rotate-1 hover:rotate-0'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                            Card {currentCardIdx + 1} of {kootmateFlashcards.length}
                          </span>
                          <span className="text-xs font-black text-indigo-600">
                            {isFlipped ? '✨ ANSWER REVEALED' : '🧠 CLICK TO FLIP'}
                          </span>
                        </div>

                        <div className="py-4 text-center">
                          {!isFlipped ? (
                            <h4 className="text-base sm:text-lg font-black text-neutral-900 leading-snug">
                              Q: {kootmateFlashcards[currentCardIdx].q}
                            </h4>
                          ) : (
                            <p className="text-xs sm:text-sm font-extrabold text-indigo-950 leading-relaxed">
                              {kootmateFlashcards[currentCardIdx].a}
                            </p>
                          )}
                        </div>

                        <div className="text-center text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                          {isFlipped ? 'Click card to see question' : 'Click card to flip and check answer'}
                        </div>
                      </div>

                      {/* Card controllers */}
                      <div className="flex items-center justify-between">
                        <button 
                          onClick={handlePrevCard}
                          className="px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-800 border-2 border-black font-black text-xs rounded-xl cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5"
                        >
                          Prev Card
                        </button>
                        <button 
                          onClick={() => setIsFlipped(!isFlipped)}
                          className="px-4 py-2 bg-[#ccff00] hover:bg-amber-300 text-black border-2 border-black font-black text-xs rounded-xl cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5"
                        >
                          Flip Card
                        </button>
                        <button 
                          onClick={handleNextCard}
                          className="px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-800 border-2 border-black font-black text-xs rounded-xl cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5"
                        >
                          Next Card
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* ==================== OUR OTHER SERVICES SECTION ==================== */}
          <div className="mt-24 pt-16 border-t-2 border-dashed border-neutral-200" id="other-services-section">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-black rounded-lg uppercase tracking-wider">Additional Features</span>
              <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                Our Other Services
              </h3>
              <p className="text-sm font-bold text-neutral-600 leading-relaxed">
                Unlock specialized tools that help class 10 students practice on-the-go definition lookups, key chemical equations, and recall sheets.
              </p>
            </div>

            {/* KootMate Single Block centered */}
            <div className="max-w-md mx-auto">
              <div 
                className={`bg-slate-50 border-2 rounded-3xl p-6.5 hover:shadow-xl transition-all flex flex-col justify-between space-y-5 ${
                  activePreview === 'kootmate' ? 'border-amber-500 ring-4 ring-amber-500/15 shadow-lg' : 'border-neutral-200/80 hover:border-neutral-300'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg bg-amber-50 border-amber-200 text-amber-700">
                      {kootmateService.tag}
                    </span>
                    <Compass className="w-5 h-5 text-amber-500 shrink-0" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-neutral-900 tracking-tight">
                      {kootmateService.title}
                    </h4>
                    <p className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest">
                      🎯 For {kootmateService.badge}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-neutral-600 leading-relaxed">
                    {kootmateService.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-dashed border-neutral-250 flex items-center justify-between">
                  <span className="text-[10px] font-black text-neutral-400 uppercase">Interactive recall</span>
                  <button 
                    onClick={() => {
                      setActivePreview(activePreview === 'kootmate' ? null : 'kootmate');
                      const el = document.getElementById('preview-display-anchor');
                      if (el) {
                        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
                      }
                    }}
                    className={`px-4 py-2 font-black text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                      activePreview === 'kootmate' 
                        ? 'bg-neutral-900 text-white shadow-md' 
                        : 'bg-amber-500 hover:bg-amber-600 text-neutral-950 shadow-sm'
                    }`}
                  >
                    <span>Free preview</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== FREE PREVIEW MATERIALS LIBRARY (DYNAMIC FROM CMS) ==================== */}
          {dynamicFreePreviews.length > 0 && (
            <div className="mt-24 pt-16 border-t-2 border-dashed border-neutral-200" id="free-preview-library-section">
              <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
                <span className="px-3 py-1 bg-violet-100 text-[#5c3beb] text-[10px] font-black rounded-lg uppercase tracking-wider">Free Previews Section</span>
                <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                  🎁 Dynamic Free Study Materials Library
                </h3>
                <p className="text-sm font-bold text-neutral-600 leading-relaxed">
                  These premium revision materials are uploaded live by our administrative team. Sample actual files, audio, interactive sheets, and practice exams!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-12" id="dynamic-free-previews-grid">
                {dynamicFreePreviews.map((item) => {
                  const isPdf = item.content_type === 'pdf' || item.content_type === 'question_bank';
                  const isAudio = item.content_type === 'audio';
                  const isExternal = item.content_type === 'mindmap' || item.content_type === 'game';
                  
                  return (
                    <div 
                      key={item.id}
                      className="bg-white border-2 border-neutral-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl hover:border-violet-300 transition-all space-y-4"
                    >
                      <div className="space-y-3">
                        {/* Tags */}
                        <div className="flex justify-between items-center">
                          <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-lg bg-indigo-50 text-indigo-700">
                            {item.subject}
                          </span>
                          <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider">
                            {item.content_type === 'pdf' ? '📚 PDF Notes' :
                             item.content_type === 'audio' ? '🎙️ Podcast' :
                             item.content_type === 'mindmap' ? '🧠 Mind Map' :
                             item.content_type === 'game' ? '🎮 Game Test' :
                             item.content_type === 'question_bank' ? '📝 Question Bank' : '📖 Document'}
                          </span>
                        </div>

                        {/* Title & Chapter */}
                        <div className="space-y-1">
                          <h4 className="text-md font-black text-neutral-900 line-clamp-2 tracking-tight">
                            {item.title}
                          </h4>
                          <p className="text-[10px] text-neutral-500 font-extrabold line-clamp-1">
                            📖 {item.chapter}
                          </p>
                        </div>

                        {/* Description */}
                        {item.description && (
                          <p className="text-xs font-medium text-neutral-600 line-clamp-3 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* CTA Action */}
                      <div className="pt-4 border-t border-dashed border-neutral-100 flex items-center justify-between">
                        <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">
                          {item.board || 'CBSE'} Class 10
                        </span>
                        
                        <button
                          onClick={() => {
                            if (isPdf) {
                              setActivePDF({ url: item.resource_url, title: item.title });
                            } else if (isAudio) {
                              setActiveDynamicAudio({
                                url: item.resource_url,
                                title: item.title,
                                subject: item.subject,
                                chapter: item.chapter
                              });
                            } else if (isExternal) {
                              window.open(item.resource_url, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          className="px-4 py-2 bg-[#5c3beb] hover:bg-indigo-600 text-white font-black text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm hover:translate-y-[-1px]"
                        >
                          <span>{isPdf ? 'Read Notes' : isAudio ? 'Listen' : 'Launch'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Subscribe CTA */}
          <div className="mt-16 p-8 rounded-3xl border-2 border-dashed border-violet-200 bg-violet-50/50 text-center space-y-4 max-w-3xl mx-auto">
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

      {activePDF && (
        <PDFViewer 
          url={activePDF.url} 
          title={activePDF.title} 
          onClose={() => setActivePDF(null)} 
        />
      )}
      
      {/* Dynamic Audio Stream Player Modal */}
      {activeDynamicAudio && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border-4 border-neutral-800 text-white p-6 rounded-[32px] w-full max-w-md shadow-2xl relative space-y-6">
            <button 
              onClick={() => setActiveDynamicAudio(null)}
              className="absolute top-4 right-4 p-2 bg-neutral-850 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="space-y-1 pr-10">
              <span className="px-2 py-0.5 text-[9px] font-black bg-[#ccff00] text-black rounded uppercase">
                {activeDynamicAudio.subject}
              </span>
              <h4 className="text-lg font-black tracking-tight mt-1 line-clamp-1">{activeDynamicAudio.title}</h4>
              <p className="text-xs text-neutral-400 font-bold line-clamp-1">Chapter: {activeDynamicAudio.chapter}</p>
            </div>

            {/* Visual Retro Audio Waves */}
            <div className="h-20 bg-neutral-950 border-2 border-neutral-800 rounded-2xl flex items-center justify-center gap-1 px-4 overflow-hidden relative">
              {isDynamicAudioPlaying ? (
                <div className="flex items-end justify-center gap-1 h-12 w-full">
                  {[...Array(15)].map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-[#ccff00] w-1.5 rounded-t transition-all duration-300"
                      style={{
                        height: `${Math.floor(Math.random() * 80) + 20}%`,
                        animation: `bounce 1s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center text-neutral-500 font-mono text-xs">
                  ⏸️ Stream Paused
                </div>
              )}
            </div>

            {/* HTML5 Hidden Audio tag */}
            <audio 
              ref={dynamicAudioRef} 
              src={activeDynamicAudio.url} 
              preload="metadata"
            />

            {/* Slider controls */}
            <div className="space-y-1">
              <input 
                type="range"
                min="0"
                max={dynamicAudioDuration || 100}
                value={dynamicAudioTime}
                onChange={handleDynamicAudioSeek}
                className="w-full accent-[#ccff00] bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono font-bold">
                <span>{formatTime(dynamicAudioTime)}</span>
                <span>{formatTime(dynamicAudioDuration)}</span>
              </div>
            </div>

            {/* Main Playback button */}
            <div className="flex justify-center">
              <button 
                onClick={togglePlayDynamicAudio}
                className="p-5 bg-[#ccff00] hover:bg-lime-400 text-neutral-950 rounded-full transition-all shadow-lg cursor-pointer transform hover:scale-[1.03]"
              >
                {isDynamicAudioPlaying ? <Pause className="w-8 h-8 fill-black" /> : <Play className="w-8 h-8 fill-black ml-0.5" />}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
