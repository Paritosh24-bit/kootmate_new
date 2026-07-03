import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Layers, Award, Sparkles, ChevronRight, 
  ArrowLeft, Compass, Loader2
} from 'lucide-react';
import { 
  dbGetClasses, dbGetSubjects, dbGetChapters, 
  ClassItem, SubjectItem, ChapterItem 
} from '../lib/syllabusDb';
import { ContentItem } from '../types';
import { ContentGrid, PDFViewer, AudioPlayer } from './CMSComponents';
import { normalizeSubjectName } from './DashboardPage';

interface StudentCMSProps {
  userBoard?: 'cbse' | 'ssc' | '';
  studentOnly?: boolean;
}

export default function StudentCMS({ userBoard, studentOnly = false }: StudentCMSProps = {}) {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [chapters, setChapters] = useState<ChapterItem[]>([]);
  
  const [loading, setLoading] = useState(true);

  // Navigation steps: 'class' | 'subject' | 'chapters'
  const [currentStep, setCurrentStep] = useState<'class' | 'subject' | 'chapters'>('class');

  // Active user selections
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<SubjectItem | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ChapterItem | null>(null);

  // Content items synced from API / Supabase content_items table
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loadingContent, setLoadingContent] = useState(false);

  // Floating readers state
  const [activeAudio, setActiveAudio] = useState<{ url: string; title: string; chapter: string } | null>(null);
  const [activePDF, setActivePDF] = useState<{ url: string; title: string } | null>(null);

  // Initialize and load classes/subjects/chapters directories
  const loadStudentDatabase = async () => {
    try {
      setLoading(true);
      const fetchedClasses = await dbGetClasses();
      const fetchedSubjects = await dbGetSubjects();
      const fetchedChapters = await dbGetChapters();

      setClasses(fetchedClasses);
      setSubjects(fetchedSubjects);
      setChapters(fetchedChapters);

      // Auto pre-select matches for user board configuration
      if (userBoard) {
        const boardNormalized = userBoard.toLowerCase();
        const matchedClass = fetchedClasses.find(c => c.class_name.toLowerCase().includes(boardNormalized));
        if (matchedClass) {
          setSelectedClass(matchedClass);
          setCurrentStep('subject');
          return;
        }
      }

      // Auto pre-select CBSE Class 10 if present
      const class10 = fetchedClasses.find(c => c.class_name.toLowerCase().includes('cbse'));
      if (class10) {
        setSelectedClass(class10);
        setCurrentStep('subject');
      } else if (fetchedClasses.length > 0) {
        setSelectedClass(fetchedClasses[0]);
        setCurrentStep('subject');
      }
    } catch (e) {
      console.error('Failed to prepare student curriculum library:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudentDatabase();
  }, [userBoard]);

  // Load content items from Supabase when selected chapter modifications
  useEffect(() => {
    const fetchContentItems = async () => {
      if (!selectedClass || !selectedSubject || !selectedChapter) return;
      try {
        setLoadingContent(true);
        // Normalize board to uppercase CBSE / SSC
        const boardParam = selectedClass.class_name.toLowerCase().includes('cbse') ? 'CBSE' : 'SSC';
        const subParam = normalizeSubjectName(selectedSubject.subject_name);
        const chapParam = selectedChapter.chapter_name;

        // Fetch from API
        const url = `/api/content?board=${boardParam}&subject=${encodeURIComponent(subParam)}&chapter=${encodeURIComponent(chapParam)}`;
        const res = await fetch(url);
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(`Server returned non-JSON student list response: ${text.substring(0, 150)}`);
        }
        const data = await res.json();
        if (data.success && data.data) {
          setContentItems(data.data);
        } else {
          setContentItems([]);
        }
      } catch (err) {
        console.error("Failed to query catalog content items for student:", err);
        setContentItems([]);
      } finally {
        setLoadingContent(false);
      }
    };

    fetchContentItems();
  }, [selectedClass, selectedSubject, selectedChapter]);

  const resetAllSelections = () => {
    setSelectedClass(null);
    setSelectedSubject(null);
    setSelectedChapter(null);
    setCurrentStep('class');
    setActiveAudio(null);
    setActivePDF(null);
  };

  const selectClassHandler = (cls: ClassItem) => {
    setSelectedClass(cls);
    setSelectedSubject(null);
    setSelectedChapter(null);
    setCurrentStep('subject');
  };

  const selectSubjectHandler = (sub: SubjectItem) => {
    setSelectedSubject(sub);
    const relatedChapters = chapters.filter(c => String(c.subject_id) === String(sub.id));
    setSelectedChapter(relatedChapters[0] || null);
    setCurrentStep('chapters');
  };

  // Filtered lists for sidebar directories
  const visibleSubjects = subjects.filter(s => selectedClass && String(s.class_id) === String(selectedClass.id));
  const visibleChapters = chapters.filter(c => selectedSubject && String(c.subject_id) === String(selectedSubject.id));

  return (
    <div className="text-neutral-900 text-left min-h-[500px]" id="student-cms-view">
      
      {/* 1. SELECTION STEP: CLASS EXPLORATION */}
      {currentStep === 'class' && (
        <div className="space-y-6">
          <div className="text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-100 text-[#5c3beb] text-xs font-black rounded-full select-none">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Syllabus Library
            </div>
            <h2 className="text-2xl sm:text-3.5xl font-black text-slate-950 tracking-tight leading-none text-left">
              Select Your Class Grade
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-bold text-left">
              Browse customized board chapters, audio-podcasts and verified mindmaps.
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center text-xs text-neutral-400 font-black animate-pulse flex items-center justify-center gap-2">
              <Loader2 className="w-4.5 h-4.5 animate-spin text-[#5c3beb]" />
              <span>Generating class directories...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  onClick={() => selectClassHandler(cls)}
                  className="p-6 bg-gradient-to-br from-violet-50/40 via-white to-white border border-neutral-200 rounded-3xl text-left cursor-pointer hover:shadow-2xl hover:border-violet-300 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
                >
                  <div className="absolute right-0 bottom-0 w-20 h-20 bg-violet-600/5 rounded-tl-full transition-transform duration-300 group-hover:scale-110"></div>
                  <div className="w-11 h-11 rounded-2xl bg-violet-100 flex items-center justify-center text-[#5c3beb] mb-4">
                    <BookOpen className="w-5.5 h-5.5" />
                  </div>
                  <p className="text-[10px] tracking-wider uppercase font-black text-neutral-400">Class Board Directory</p>
                  <h3 className="text-xl font-black mt-1 text-slate-950 flex items-center gap-1.5">
                    {cls.class_name}
                    <ChevronRight className="w-4 h-4 text-violet-500 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-xs text-neutral-500 font-bold mt-2">
                    Review and read unit chapters, notes, text materials, and explore interactive syllabus games.
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. SELECTION STEP: SUBJECT EXPLORATION */}
      {currentStep === 'subject' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            {!studentOnly && (
              <button
                onClick={resetAllSelections}
                className="p-2 border border-neutral-200 rounded-xl bg-white hover:bg-neutral-50 text-neutral-600 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4.5 h-4.5" />
              </button>
            )}
            <div className="text-left">
              <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase text-violet-600 bg-violet-50">
                {selectedClass?.class_name} Course Catalog
              </span>
              <h1 className="text-2xl font-black text-slate-950 mt-1">Syllabus Subject Folders</h1>
            </div>
          </div>

          <p className="text-xs leading-none font-bold text-neutral-500">
            Choose your desired course subjects for localized board resources below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {visibleSubjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => selectSubjectHandler(sub)}
                className="p-6 bg-gradient-to-br from-white to-neutral-50/50 border border-neutral-200 rounded-3xl text-left cursor-pointer hover:shadow-2xl transition-all duration-300 hover:border-violet-300 group relative overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 w-20 h-20 rounded-full blur-2xl opacity-10 bg-[#5c3beb]"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-violet-50 text-[#5c3beb] rounded-2xl">
                    <Layers className="w-5 h-5 text-indigo-500" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-indigo-50 text-[#5c3beb] px-2 py-0.5 rounded-full mt-1.5">
                    {selectedClass?.class_name.toLowerCase().includes('cbse') ? 'CBSE' : 'SSC'}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-950 group-hover:text-[#5c3beb] transition-colors">
                  {sub.subject_name}
                </h3>
                <p className="text-xs text-neutral-500 font-bold mt-2 leading-relaxed">
                  Interactive lecture decks, MP3 audio syllabus content, textbook maps and homework assistance.
                </p>
                <div className="flex items-center gap-1 text-xs text-[#5c3beb] font-black mt-4 border-t border-neutral-100 pt-3">
                  <span>Enter Learn Deck</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}

            {visibleSubjects.length === 0 && (
              <div className="col-span-full py-16 text-center text-neutral-400 font-bold border-2 border-dashed border-neutral-200 rounded-2xl max-w-sm mx-auto space-y-2">
                <span className="text-2.5xl">🗂️</span>
                <p className="text-xs">No active Subjects found for {selectedClass?.class_name}.</p>
                <button
                  onClick={resetAllSelections}
                  className="text-xs font-black text-[#5c3beb] hover:underline"
                >
                  Return to Class Choice
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. DUAL-PANEL CONTENT DISPLAY: SIDEBAR CHAPTERS & ACTIVE CONTENT CANVAS */}
      {currentStep === 'chapters' && (
        <div className="space-y-6">
          
          {/* Breadcrumb Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-150 pb-5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedSubject(null);
                  setCurrentStep('subject');
                }}
                className="p-2 border border-neutral-200 rounded-xl bg-white hover:bg-neutral-50 text-neutral-600 transition-colors cursor-pointer"
                title="Go back to subjects"
              >
                <ArrowLeft className="w-4.5 h-4.5" />
              </button>
              <div className="text-left">
                <div className="flex items-center gap-1 text-[10px] font-black uppercase text-neutral-500">
                  <span>{selectedClass?.class_name}</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-[#5c3beb]">{selectedSubject?.subject_name}</span>
                </div>
                <h1 className="text-2xl font-black text-slate-950 mt-1">Syllabus Learn Deck</h1>
              </div>
            </div>

            <div className="text-xs font-black bg-indigo-50/70 border border-indigo-100 text-[#5c3beb] px-3.5 py-2 rounded-2xl flex items-center gap-1.5 self-start sm:self-center">
              <Award className="w-4 h-4 text-rose-500 shrink-0" />
              <span>NCERT Unified Syllabus Tracker</span>
            </div>
          </div>

          {/* DUAL-PANEL LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: CHAPTER SELECTOR LIST (span-4) */}
            <div className="lg:col-span-4 space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest text-left">
                Chapters in this Course
              </p>
              
              <div className="space-y-2 text-left">
                {visibleChapters.map((ch, idx) => (
                  <div
                    key={ch.id}
                    onClick={() => setSelectedChapter(ch)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${
                      selectedChapter?.id === ch.id
                        ? 'border-[#5c3beb] bg-indigo-50/50 shadow-sm font-black'
                        : 'border-neutral-200 hover:border-neutral-350 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 ${
                        selectedChapter?.id === ch.id ? 'bg-[#5c3beb] text-white' : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-black text-neutral-900 truncate">
                          {ch.chapter_name}
                        </h4>
                        <p className="text-[10px] text-neutral-500 font-bold truncate">
                          Review customized board notes, study games & podcasts.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {visibleChapters.length === 0 && (
                  <div className="p-8 text-center border-2 border-dashed border-neutral-150 rounded-2xl text-neutral-400 font-bold text-xs">
                    ⚠️ No chapters listed under {selectedSubject?.subject_name} yet.
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: ACTIVE SYLLABUS UNIT CANVAS (span-8) */}
            <div className="lg:col-span-8 space-y-6">
              {selectedChapter ? (
                <div className="space-y-4">
                  
                  {/* Class unit description header */}
                  <div className="bg-white border border-neutral-200 rounded-3xl p-6 text-left shadow-xs space-y-1.5">
                    <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase text-violet-600 bg-violet-50 inline-block">
                      Active syllabus topic
                    </span>
                    <h2 className="text-lg font-black text-slate-1500 text-slate-950">
                      {selectedChapter.chapter_name} Lesson Guide
                    </h2>
                    <p className="text-xs text-neutral-500 font-bold leading-relaxed">
                      {selectedChapter.description || "Browse live materials uploaded by our academic mentors below, designed specifically for CBSE/SSC Class 10 guidelines."}
                    </p>
                  </div>

                  {/* CONTENT INTERACTIVE LAYOUT GRID */}
                  {loadingContent ? (
                    <div className="py-16 text-center text-xs text-neutral-400 font-bold flex flex-col items-center justify-center gap-2 bg-white rounded-3xl border border-neutral-150 shadow-sm">
                      <Loader2 className="w-6 h-6 animate-spin text-[#5c3beb]" />
                      <span>Fetching updated study media...</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black text-neutral-400 uppercase tracking-wider">
                          Uploaded Course Assets ({contentItems.length})
                        </h3>
                      </div>
                      
                      <ContentGrid
                        items={contentItems}
                        isAdmin={false}
                        onPlayAudio={(url, title, chap) => setActiveAudio({ url, title, chapter: chap })}
                        onOpenPDF={(url, title) => setActivePDF({ url, title })}
                      />
                    </div>
                  )}

                </div>
              ) : (
                <div className="bg-white border-2 border-dashed border-neutral-200 rounded-3xl p-12 text-center text-neutral-400 font-bold space-y-3 min-h-[400px] flex flex-col items-center justify-center">
                  <span className="text-3xl">📖</span>
                  <h3 className="text-sm font-black text-neutral-800">No Chapter Selected</h3>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto font-bold">
                    Select a chapter from the syllabus unit directory on the left sidebar to explore verified study media!
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Floating Audio Playback Player widget */}
      {activeAudio && (
        <AudioPlayer
          url={activeAudio.url}
          title={activeAudio.title}
          chapterName={activeAudio.chapter}
          onClose={() => setActiveAudio(null)}
        />
      )}

      {/* Overlay modal PDF Viewer panel */}
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
