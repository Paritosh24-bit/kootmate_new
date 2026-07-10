import { getSupabase } from './supabase';

export interface ClassItem {
  id: string | number;
  class_name: string;
  created_at?: string;
}

export interface SubjectItem {
  id: string | number;
  class_id: string | number;
  subject_name: string;
  created_at?: string;
  // helper derived name
  class_name?: string;
}

export interface ChapterItem {
  id: string | number;
  subject_id: string | number;
  chapter_name: string;
  description?: string;
  mindmap_url?: string;
  game_url?: string;
  audio_url?: string;
  pdf_url?: string;
  created_at?: string;
  // helpers
  subject_name?: string;
  class_name?: string;
  storage_type?: 'r2' | 'local_simulation';
  audio_filename?: string;
  pdf_filename?: string;
}

// Simulated Initial Seed Content to keep application beautiful from the start!
const INITIAL_CLASSES: ClassItem[] = [
  { id: 1, class_name: 'Class 10 CBSE', created_at: new Date().toISOString() },
  { id: 2, class_name: 'Class 10 SSC', created_at: new Date().toISOString() }
];

const INITIAL_SUBJECTS: SubjectItem[] = [
  // CBSE Subjects
  { id: 101, class_id: 1, subject_name: 'Science 🧪', created_at: new Date().toISOString() },
  { id: 102, class_id: 1, subject_name: 'Mathematics 📐', created_at: new Date().toISOString() },
  { id: 103, class_id: 1, subject_name: 'Social Studies 🏛️', created_at: new Date().toISOString() },
  
  // MH state board SSC Subjects
  { id: 201, class_id: 2, subject_name: 'Science 1 (Physics/Chem) 🧪', created_at: new Date().toISOString() },
  { id: 202, class_id: 2, subject_name: 'Science 2 (Biology/EVS) 🧬', created_at: new Date().toISOString() },
  { id: 203, class_id: 2, subject_name: 'Mathematics Part 1 (Algebra) 📝', created_at: new Date().toISOString() },
  { id: 204, class_id: 2, subject_name: 'Mathematics Part 2 (Geometry) 📐', created_at: new Date().toISOString() },
  { id: 205, class_id: 2, subject_name: 'Social Sciences & Civics 🏛️', created_at: new Date().toISOString() }
];

const INITIAL_CHAPTERS: ChapterItem[] = [
  {
    id: 1001,
    subject_id: 101,
    chapter_name: 'Chemical Reactions and Equations',
    description: 'Learn chemical formulas, balancing equations, combination, decomposition, displacement, and redox reactions.',
    mindmap_url: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://poki.com/en/g/refraction',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1003,
    subject_id: 101,
    chapter_name: 'Acids, Bases and Salts',
    description: 'Explore the chemical properties of acids and bases, pH scale significance, and preparation of salts like baking soda and plaster of Paris.',
    mindmap_url: 'https://images.unsplash.com/photo-1607619275048-24722480f875?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://poki.com/en/g/refraction',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1004,
    subject_id: 101,
    chapter_name: 'Metals and Non-metals',
    description: 'Study physical and chemical properties of metals/non-metals, ionic bond formation, and basic metallurgy/corrosion prevention.',
    mindmap_url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://poki.com/en/g/refraction',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1005,
    subject_id: 101,
    chapter_name: 'Carbon and Its Compounds',
    description: 'Understand the versatile nature of carbon, covalent bonding, homologous series, functional groups, soaps, and detergents.',
    mindmap_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://poki.com/en/g/refraction',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1007,
    subject_id: 101,
    chapter_name: 'Life Processes',
    description: 'Deep dive into essential human functions: nutrition, respiration, transportation, and excretion.',
    mindmap_url: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://poki.com/en/g/refraction',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1008,
    subject_id: 101,
    chapter_name: 'Control and Coordination',
    description: 'Analyze how nervous system, brain parts, reflex actions, and endocrine hormones coordinate responses in plants and animals.',
    mindmap_url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://poki.com/en/g/refraction',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1009,
    subject_id: 101,
    chapter_name: 'How Do Organisms Reproduce?',
    description: 'Learn about asexual and sexual reproduction mechanisms, pollination, fertilization, and human reproductive health.',
    mindmap_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://poki.com/en/g/refraction',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1010,
    subject_id: 101,
    chapter_name: 'Heredity',
    description: 'Study Mendelian inheritance laws, variation, sex determination, and fundamental concepts of genetics.',
    mindmap_url: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://poki.com/en/g/refraction',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1011,
    subject_id: 101,
    chapter_name: 'Light - Reflection and Refraction',
    description: 'Master ray diagrams, mirror and lens formulas, magnification, and the refractive index.',
    mindmap_url: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://poki.com/en/g/refraction',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1012,
    subject_id: 101,
    chapter_name: 'The Human Eye and the Colourful World',
    description: 'Understand eye defects (myopia, hypermetropia), atmospheric refraction, scattering of light, and dispersion.',
    mindmap_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://poki.com/en/g/refraction',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1013,
    subject_id: 101,
    chapter_name: 'Electricity',
    description: 'Explore electric current, potential difference, Ohm\'s law, resistance, series/parallel combinations, and electric power.',
    mindmap_url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://poki.com/en/g/refraction',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1014,
    subject_id: 101,
    chapter_name: 'Magnetic Effects of Electric Current',
    description: 'Study magnetic field lines, straight/circular conductors, solenoids, electromagnetism, Fleming\'s rules, and electric motors.',
    mindmap_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://poki.com/en/g/refraction',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1016,
    subject_id: 101,
    chapter_name: 'Our Environment',
    description: 'Understand ecosystem components, food chains/webs, 10% law, biomagnification, ozone depletion, and waste management.',
    mindmap_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://poki.com/en/g/refraction',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },

  // Quadratic Equations for Math
  {
    id: 1002,
    subject_id: 102,
    chapter_name: 'Quadratic Equations',
    description: 'Master factorization, completing squares, discriminant calculations, and finding roots for CBSE board exam grade guidelines.',
    mindmap_url: 'https://images.unsplash.com/photo-1453733190148-c44698c26588?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },

  // History Chapters under Social Studies (subject_id: 103)
  {
    id: 1031,
    subject_id: 103,
    chapter_name: 'The Rise of Nationalism in Europe',
    description: 'Explore the rise of nation-states, French Revolution, Napoleon\'s civil code, the Congress of Vienna, and unification of Germany/Italy.',
    mindmap_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1032,
    subject_id: 103,
    chapter_name: 'Nationalism in India',
    description: 'Examine Mahatma Gandhi\'s return, Satyagraha, Rowlatt Act, Jallianwalla Bagh, Non-Cooperation, Purna Swaraj, and the famous Salt March.',
    mindmap_url: 'https://images.unsplash.com/photo-1532375811409-94b16d7caf13?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1033,
    subject_id: 103,
    chapter_name: 'The Making of a Global World',
    description: 'Study ancient trade links (silk routes), Christopher Columbus, potato dependency, biological weapons, Corn Laws, and Bretton Woods twins.',
    mindmap_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1034,
    subject_id: 103,
    chapter_name: 'The Age of Industrialisation',
    description: 'Learn about proto-industrialization, Richard Arkwright\'s system, Steam Engine updates, traditional upper classes preference, and gomasthas.',
    mindmap_url: 'https://images.unsplash.com/photo-1513829096999-497860229414?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1035,
    subject_id: 103,
    chapter_name: 'Print Culture and the Modern World',
    description: 'Trace early hand printing, oldest Japanese book, mechanical printing by Gutenberg, Ninety-Five Theses, and Bengal Gazette.',
    mindmap_url: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },

  // Geography Chapters under Social Studies (subject_id: 103)
  {
    id: 1036,
    subject_id: 103,
    chapter_name: 'Resources and Development',
    description: 'Define resources, sustainable development, first Earth Summit, land degradation factors, and resource planning steps.',
    mindmap_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1037,
    subject_id: 103,
    chapter_name: 'Forest and Wildlife Resources',
    description: 'Understand biodiversity, Wildlife Protection Act, Project Tiger, reserved forests, sacred groves, and Joint Forest Management.',
    mindmap_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1038,
    subject_id: 103,
    chapter_name: 'Water Resources',
    description: 'Study water scarcity causes, multi-purpose river projects, Sardar Sarovar Dam, palar pani, and rainwater harvesting techniques.',
    mindmap_url: 'https://images.unsplash.com/photo-1484627391993-0a29532db444?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1039,
    subject_id: 103,
    chapter_name: 'Agriculture',
    description: 'Analyze slash and burn agriculture, commercial farming, cropping seasons (Rabi, Kharif, Zaid), and key fiber/plantation crops.',
    mindmap_url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1040,
    subject_id: 103,
    chapter_name: 'Minerals and Energy Resources',
    description: 'Study geologists define minerals, placer deposits, finest iron ore (magnetite), manganese production, and petroleum deposits.',
    mindmap_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1041,
    subject_id: 103,
    chapter_name: 'Manufacturing Industries',
    description: 'Explore raw materials source classification, public vs joint sector, textile mill setup, jute concentration, and pollution control.',
    mindmap_url: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 1042,
    subject_id: 103,
    chapter_name: 'Lifelines of National Economy',
    description: 'Examine transport modes, Golden Quadrilateral highways, border roads, rail challenges, major sea ports, and international trade.',
    mindmap_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },

  // State Board Gravitation
  {
    id: 2001,
    subject_id: 201,
    chapter_name: 'Gravitation',
    description: 'Understand Kepler\'s laws of planetary motion, Newton\'s universal law of gravity, escape velocity, and acceleration due to gravity (g) calculations for State Board SSC standards.',
    mindmap_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  // SSC Political Science Chapters
  {
    id: 2051,
    subject_id: 205,
    chapter_name: 'Working of the Constitution',
    description: 'Learn about the working of the Indian Constitution, the framework of democracy, social justice, and judiciary roles.',
    mindmap_url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 2052,
    subject_id: 205,
    chapter_name: 'The Electoral Process',
    description: 'Understand the election commission, code of conduct, voting processes, and key electoral reforms in India.',
    mindmap_url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 2053,
    subject_id: 205,
    chapter_name: 'Political Parties',
    description: 'Study the role, functions, and structure of regional and national political parties in Indian democracy.',
    mindmap_url: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 2054,
    subject_id: 205,
    chapter_name: 'Social and Political Movements',
    description: 'Explore environmental, tribal, labor, and women\'s movements that shape democratic policies.',
    mindmap_url: 'https://images.unsplash.com/photo-1552581230-c01bc911b004?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 2055,
    subject_id: 205,
    chapter_name: 'Challenges Faced by Indian Democracy',
    description: 'Analyze political corruption, communalism, regionalism, and efforts to strengthen democratic values.',
    mindmap_url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://www.coolmathgames.com',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  }
];

// Helper to assure localStorage matches initial seeding if uninitialized
const initLocalStoreAndGet = <T>(key: string, initial: T[]): T[] => {
  const current = localStorage.getItem(key);
  if (!current) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  const parsed = JSON.parse(current) as T[];
  if (Array.isArray(parsed) && parsed.length < initial.length) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return parsed;
};

// CLASSES CRUD
export async function dbGetClasses(): Promise<ClassItem[]> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.from('classes').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Supabase fetch failed, fallback to local', err);
  }
  return initLocalStoreAndGet('kootmate_classes', INITIAL_CLASSES);
}

export async function dbCreateClass(className: string): Promise<ClassItem> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.from('classes').insert([{ class_name: className }]).select();
      if (!error && data && data.length > 0) return data[0];
    }
  } catch (err) {
    console.warn('Supabase insert failed, fallback to local', err);
  }
  const items = initLocalStoreAndGet('kootmate_classes', INITIAL_CLASSES);
  const newItem: ClassItem = {
    id: Date.now(),
    class_name: className,
    created_at: new Date().toISOString()
  };
  items.push(newItem);
  localStorage.setItem('kootmate_classes', JSON.stringify(items));
  return newItem;
}

export async function dbDeleteClass(id: string | number): Promise<boolean> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { error } = await supabase.from('classes').delete().eq('id', id);
      if (!error) return true;
    }
  } catch (err) {
    console.warn('Supabase delete failed, fallback to local', err);
  }
  const items = initLocalStoreAndGet('kootmate_classes', INITIAL_CLASSES);
  const filtered = items.filter(x => String(x.id) !== String(id));
  localStorage.setItem('kootmate_classes', JSON.stringify(filtered));
  return true;
}

// SUBJECTS CRUD
export async function dbGetSubjects(): Promise<SubjectItem[]> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.from('subjects').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        const classes = await dbGetClasses();
        return data.map((sub: any) => ({
          ...sub,
          class_name: classes.find(c => String(c.id) === String(sub.class_id))?.class_name || 'Class 10'
        }));
      }
    }
  } catch (err) {
    console.warn('Supabase fetch failed, fallback to local', err);
  }
  const items = initLocalStoreAndGet('kootmate_subjects', INITIAL_SUBJECTS);
  const classes = await dbGetClasses();
  return items.map(item => ({
    ...item,
    class_name: classes.find(c => String(c.id) === String(item.class_id))?.class_name || 'Class 10'
  }));
}

export async function dbCreateSubject(classId: string | number, subjectName: string): Promise<SubjectItem> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.from('subjects').insert([{ class_id: Number(classId), subject_name: subjectName }]).select();
      if (!error && data && data.length > 0) return data[0];
    }
  } catch (err) {
    console.warn('Supabase insert failed, fallback to local', err);
  }
  const items = initLocalStoreAndGet('kootmate_subjects', INITIAL_SUBJECTS);
  const newItem: SubjectItem = {
    id: Date.now(),
    class_id: classId,
    subject_name: subjectName,
    created_at: new Date().toISOString()
  };
  items.push(newItem);
  localStorage.setItem('kootmate_subjects', JSON.stringify(items));
  return newItem;
}

export async function dbDeleteSubject(id: string | number): Promise<boolean> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { error } = await supabase.from('subjects').delete().eq('id', id);
      if (!error) return true;
    }
  } catch (err) {
    console.warn('Supabase delete failed, fallback to local', err);
  }
  const items = initLocalStoreAndGet('kootmate_subjects', INITIAL_SUBJECTS);
  const filtered = items.filter(x => String(x.id) !== String(id));
  localStorage.setItem('kootmate_subjects', JSON.stringify(filtered));
  return true;
}

// CHAPTERS CRUD
export async function dbGetChapters(): Promise<ChapterItem[]> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.from('chapters').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        const subjects = await dbGetSubjects();
        return data.map((ch: any) => {
          const sub = subjects.find(s => String(s.id) === String(ch.subject_id));
          return {
            ...ch,
            subject_name: sub?.subject_name || 'General',
            class_name: sub?.class_name || 'Class 10'
          };
        });
      }
    }
  } catch (err) {
    console.warn('Supabase fetch failed, fallback to local', err);
  }
  const items = initLocalStoreAndGet('kootmate_chapters', INITIAL_CHAPTERS);
  const subjects = await dbGetSubjects();
  return items.map(item => {
    const sub = subjects.find(s => String(s.id) === String(item.subject_id));
    return {
      ...item,
      subject_name: sub?.subject_name || 'General',
      class_name: sub?.class_name || 'Class 10'
    };
  });
}

export async function dbCreateChapter(chapterPayload: Omit<ChapterItem, 'id' | 'created_at'>): Promise<ChapterItem> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.from('chapters').insert([
        {
          subject_id: Number(chapterPayload.subject_id),
          chapter_name: chapterPayload.chapter_name,
          description: chapterPayload.description || '',
          mindmap_url: chapterPayload.mindmap_url || '',
          game_url: chapterPayload.game_url || '',
          audio_url: chapterPayload.audio_url || '',
          pdf_url: chapterPayload.pdf_url || ''
        }
      ]).select();
      if (!error && data && data.length > 0) return data[0];
    }
  } catch (err) {
    console.warn('Supabase insert failed, fallback to local', err);
  }
  const items = initLocalStoreAndGet('kootmate_chapters', INITIAL_CHAPTERS);
  const newItem: ChapterItem = {
    ...chapterPayload,
    id: Date.now(),
    created_at: new Date().toISOString()
  };
  items.push(newItem);
  localStorage.setItem('kootmate_chapters', JSON.stringify(items));
  return newItem;
}

export async function dbUpdateChapter(id: string | number, chapterPayload: Partial<ChapterItem>): Promise<ChapterItem> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.from('chapters').update({
        chapter_name: chapterPayload.chapter_name,
        description: chapterPayload.description,
        mindmap_url: chapterPayload.mindmap_url,
        game_url: chapterPayload.game_url,
        audio_url: chapterPayload.audio_url,
        pdf_url: chapterPayload.pdf_url
      }).eq('id', id).select();
      if (!error && data && data.length > 0) return data[0];
    }
  } catch (err) {
    console.warn('Supabase update failed, fallback to local', err);
  }
  const items = initLocalStoreAndGet('kootmate_chapters', INITIAL_CHAPTERS);
  const idx = items.findIndex(x => String(x.id) === String(id));
  if (idx !== -1) {
    items[idx] = { ...items[idx], ...chapterPayload };
    localStorage.setItem('kootmate_chapters', JSON.stringify(items));
    return items[idx];
  }
  throw new Error('Chapter not found locally.');
}

export async function dbDeleteChapter(id: string | number): Promise<boolean> {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { error } = await supabase.from('chapters').delete().eq('id', id);
      if (!error) return true;
    }
  } catch (err) {
    console.warn('Supabase delete failed, fallback to local', err);
  }
  const items = initLocalStoreAndGet('kootmate_chapters', INITIAL_CHAPTERS);
  const filtered = items.filter(x => String(x.id) !== String(id));
  localStorage.setItem('kootmate_chapters', JSON.stringify(filtered));
  return true;
}
