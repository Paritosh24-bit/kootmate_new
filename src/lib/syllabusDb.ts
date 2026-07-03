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
    description: 'Learn the principles of chemical formulas, balancing equations, combination, decomposition, displacement, and redox reactions with high-contrast molecular diagrams.',
    mindmap_url: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=600&auto=format&fit=crop',
    game_url: 'https://poki.com/en/g/refraction',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    created_at: new Date().toISOString()
  },
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
  }
];

// Helper to assure localStorage matches initial seeding if uninitialized
const initLocalStoreAndGet = <T>(key: string, initial: T[]): T[] => {
  const current = localStorage.getItem(key);
  if (!current) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(current);
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
