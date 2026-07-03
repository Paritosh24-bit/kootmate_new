import React, { useState, useEffect } from 'react';
import { 
  FolderPlus, Plus, Edit, Trash2, Search, ArrowLeft, Upload, 
  Check, Trash, Loader2, BookOpen, Layers, Info, Trash2 as TrashIcon, ShieldAlert, Sparkles, CheckCircle, AlertCircle, PlusCircle
} from 'lucide-react';
import { 
  dbGetClasses, dbCreateClass, dbDeleteClass,
  dbGetSubjects, dbCreateSubject, dbDeleteSubject,
  dbGetChapters, dbCreateChapter, dbUpdateChapter, dbDeleteChapter,
  ClassItem, SubjectItem, ChapterItem 
} from '../lib/syllabusDb';
import { ContentItem } from '../types';
import { AdminContentForm, ContentGrid, ContentFilter, PDFViewer, AudioPlayer } from './CMSComponents';

type AdminTab = 'materials' | 'curriculum' | 'admins';

export default function AdminCMS() {
  const [activeTab, setActiveTab] = useState<AdminTab>('materials');

  // Active media assets preview overlays
  const [activeAudio, setActiveAudio] = useState<{ url: string; title: string; chapter: string } | null>(null);
  const [activePDF, setActivePDF] = useState<{ url: string; title: string } | null>(null);

  // Ground database metadata states
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [chapters, setChapters] = useState<ChapterItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Content items states (Supabase content_items table)
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [contentLoading, setContentLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);

  // Filtering states for materials
  const [boardFilter, setBoardFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [chapterFilter, setChapterFilter] = useState('all');
  const [contentSearch, setContentSearch] = useState('');

  // Filtering states for curriculum
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [curriculumSearch, setCurriculumSearch] = useState('');

  // Modals / forms toggles
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  
  // Temporary form values
  const [newClassName, setNewClassName] = useState('');
  const [newSubjectClassId, setNewSubjectClassId] = useState('');
  const [newSubjectName, setNewSubjectName] = useState('');

  // Admin Delegation states
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [adminEmails, setAdminEmails] = useState<string[]>([]);

  // Chapter form state
  const [editingChapterId, setEditingChapterId] = useState<string | number | null>(null);
  const [chapterForm, setChapterForm] = useState({
    subject_id: '',
    chapter_name: '',
    description: '',
    mindmap_url: '',
    game_url: '',
    audio_url: '',
    pdf_url: ''
  });

  // Upload/status notification banners
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load all data
  const loadAllData = async () => {
    try {
      setLoading(true);
      const fetchedClasses = await dbGetClasses();
      const fetchedSubjects = await dbGetSubjects();
      const fetchedChapters = await dbGetChapters();
      
      setClasses(fetchedClasses);
      setSubjects(fetchedSubjects);
      setChapters(fetchedChapters);

      // Setup default fallback admin accounts list to state and local storage
      const cachedAdminsStr = localStorage.getItem('kootmate_admin_emails') || '["admin@company.com"]';
      const cachedAdmins = JSON.parse(cachedAdminsStr);
      if (!cachedAdmins.includes('admin@company.com')) {
        cachedAdmins.unshift('admin@company.com');
        localStorage.setItem('kootmate_admin_emails', JSON.stringify(cachedAdmins));
      }
      setAdminEmails(cachedAdmins);
    } catch (err: any) {
      console.error('Failed to load foundational syllabus metadata:', err);
      showBannerError(err.message || 'Failed to download academic structure database.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Supabase materials
  const loadContentItems = async () => {
    try {
      setContentLoading(true);
      const res = await fetch('/api/content');
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Server returned non-JSON list response: ${text.substring(0, 150)}`);
      }
      const json = await res.json();
      if (json.success && json.data) {
        setContentItems(json.data);
      }
    } catch (err) {
      console.error("Failed to query catalog uploaded materials:", err);
    } finally {
      setContentLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
    loadContentItems();
  }, []);

  const showBannerError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(''), 5000);
  };

  const showBannerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  // CLASS DIR CREATION/DELETION
  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    try {
      await dbCreateClass(newClassName.trim());
      setNewClassName('');
      setIsClassModalOpen(false);
      showBannerSuccess('Class created successfully!');
      loadAllData();
    } catch (err: any) {
      showBannerError(err.message || 'Failed to write Class item.');
    }
  };

  const handleDeleteClass = async (id: string | number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This deletes all associated subjects and chapters.`)) return;
    try {
      await dbDeleteClass(id);
      showBannerSuccess('Class and associated items deleted.');
      loadAllData();
    } catch (err: any) {
      showBannerError(err.message || 'Failed to purge Class item.');
    }
  };

  // SUBJECT DELETION/CREATION
  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectClassId || !newSubjectName.trim()) {
      showBannerError('Please choose a Class and enter subject title.');
      return;
    }
    try {
      await dbCreateSubject(newSubjectClassId, newSubjectName.trim());
      setNewSubjectName('');
      setIsSubjectModalOpen(false);
      showBannerSuccess('Subject generated successfully!');
      loadAllData();
    } catch (err: any) {
      showBannerError(err.message || 'Failed to write Subject.');
    }
  };

  const handleDeleteSubject = async (id: string | number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the subject "${name}"? This will delete all chapter files and folders.`)) return;
    try {
      await dbDeleteSubject(id);
      showBannerSuccess('Subject deleted successfully.');
      loadAllData();
    } catch (err: any) {
      showBannerError(err.message || 'Failed to delete Subject.');
    }
  };

  // CHAPTER MODALS
  const openChapterForCreate = () => {
    setEditingChapterId(null);
    setChapterForm({
      subject_id: subjects[0]?.id ? String(subjects[0].id) : '',
      chapter_name: '',
      description: '',
      mindmap_url: '',
      game_url: '',
      audio_url: '',
      pdf_url: ''
    });
    setIsChapterModalOpen(true);
  };

  const openChapterForEdit = (ch: ChapterItem) => {
    setEditingChapterId(ch.id);
    setChapterForm({
      subject_id: String(ch.subject_id),
      chapter_name: ch.chapter_name,
      description: ch.description || '',
      mindmap_url: ch.mindmap_url || '',
      game_url: ch.game_url || '',
      audio_url: ch.audio_url || '',
      pdf_url: ch.pdf_url || ''
    });
    setIsChapterModalOpen(true);
  };

  const handleSaveChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapterForm.subject_id || !chapterForm.chapter_name.trim()) {
      showBannerError('Choose a Subject and enter chapter title.');
      return;
    }

    try {
      if (editingChapterId !== null) {
        await dbUpdateChapter(editingChapterId, {
          subject_id: Number(chapterForm.subject_id),
          chapter_name: chapterForm.chapter_name.trim(),
          description: chapterForm.description,
          mindmap_url: chapterForm.mindmap_url,
          game_url: chapterForm.game_url,
          audio_url: chapterForm.audio_url,
          pdf_url: chapterForm.pdf_url
        });
        showBannerSuccess('Chapter updated.');
      } else {
        await dbCreateChapter({
          subject_id: Number(chapterForm.subject_id),
          chapter_name: chapterForm.chapter_name.trim(),
          description: chapterForm.description,
          mindmap_url: chapterForm.mindmap_url,
          game_url: chapterForm.game_url,
          audio_url: chapterForm.audio_url,
          pdf_url: chapterForm.pdf_url
        });
        showBannerSuccess('Chapter created successfully!');
      }
      setIsChapterModalOpen(false);
      loadAllData();
    } catch (err: any) {
      showBannerError(err.message || 'Failed to save Chapter.');
    }
  };

  const handleDeleteChapter = async (id: string | number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete chapter "${name}"?`)) return;
    try {
      await dbDeleteChapter(id);
      showBannerSuccess('Chapter deleted.');
      loadAllData();
    } catch (err: any) {
      showBannerError(err.message || 'Failed to purge Chapter.');
    }
  };

  // ADMIN PERSISTENCE LIST TRIGGERS
  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const email = newAdminEmail.trim().toLowerCase();
    if (!email) return;
    if (adminEmails.includes(email)) {
      showBannerError('This email is already registered as an administrator.');
      return;
    }
    const updated = [...adminEmails, email];
    localStorage.setItem('kootmate_admin_emails', JSON.stringify(updated));
    setAdminEmails(updated);
    setNewAdminEmail('');
    showBannerSuccess(`Access granted successfully to ${email}`);
  };

  const handleDeleteAdmin = (email: string) => {
    if (email === 'admin@company.com') {
      showBannerError('The default root administrator cannot be deleted.');
      return;
    }
    if (!window.confirm(`Are you sure you want to revoke administrative access for "${email}"?`)) return;
    const updated = adminEmails.filter(e => e !== email);
    localStorage.setItem('kootmate_admin_emails', JSON.stringify(updated));
    setAdminEmails(updated);
    showBannerSuccess(`Access revoked for ${email}`);
  };

  // CONTENT SAVE TRIGGER
  const handleSaveContentItem = async (formData: Record<string, any>) => {
    try {
      const isEdit = !!formData.id;
      const url = isEdit ? `/api/content/${formData.id}` : '/api/content';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Server returned non-JSON save response: ${text.substring(0, 150)}`);
      }
      const json = await res.json();
      if (json.success) {
        showBannerSuccess(isEdit ? 'Material record updated successfully!' : 'New material asset published successfully!');
        setShowAddForm(false);
        setEditingContent(null);
        loadContentItems();
      } else {
        showBannerError(json.error || 'Failed to save material asset.');
      }
    } catch (err: any) {
      showBannerError(err.message || 'Error occurred while saving material asset.');
    }
  };

  // CONTENT DELETE TRIGGER (S3 & Supabase sync)
  const handleDeleteContentItem = async (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete this study material asset? This is permanent and deletes files from storage!")) return;
    try {
      const res = await fetch(`/api/content/${id}`, { method: 'DELETE' });
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Server returned non-JSON delete response: ${text.substring(0, 150)}`);
      }
      const json = await res.json();
      if (json.success) {
        showBannerSuccess('Material asset record deleted from database and storage successfully!');
        loadContentItems();
      } else {
        showBannerError(json.error || 'Failed to delete material asset.');
      }
    } catch (err: any) {
      showBannerError(err.message || 'Error occurred while deleting asset.');
    }
  };

  const startEditContent = (item: ContentItem) => {
    setEditingContent(item);
    setShowAddForm(true);
  };

  // Computations for filter helper lists
  const subjectsList = Array.from(new Set(contentItems.map(item => item.subject))) as string[];
  const chaptersList = Array.from(new Set(contentItems.map(item => item.chapter))) as string[];

  // Filter materials list (Supabase)
  const filteredContentItems = contentItems.filter(item => {
    const sTerm = contentSearch.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(sTerm) || 
                          (item.description || '').toLowerCase().includes(sTerm) ||
                          item.subject.toLowerCase().includes(sTerm);

    const matchesBoard = boardFilter === 'all' || item.board.toLowerCase() === boardFilter.toLowerCase();
    const matchesSubject = subjectFilter === 'all' || item.subject.toLowerCase() === subjectFilter.toLowerCase();
    const matchesChapter = chapterFilter === 'all' || item.chapter.toLowerCase() === chapterFilter.toLowerCase();

    return matchesSearch && matchesBoard && matchesSubject && matchesChapter;
  });

  // Filter chapters list (scaffolding helper)
  const filteredChapterScaffolds = chapters.filter(ch => {
    const sTerm = curriculumSearch.toLowerCase();
    const matchesSearch = ch.chapter_name.toLowerCase().includes(sTerm) || 
                          (ch.description || '').toLowerCase().includes(sTerm) ||
                          (ch.subject_name || '').toLowerCase().includes(sTerm);

    const matchesClass = selectedClassFilter === 'all' || 
                         classes.find(c => String(c.id) === selectedClassFilter)?.class_name === ch.class_name;

    const matchesSubject = selectedSubjectFilter === 'all' || 
                           String(ch.subject_id) === selectedSubjectFilter;

    return matchesSearch && matchesClass && matchesSubject;
  });

  return (
    <div className="bg-white border border-neutral-200 rounded-3xl shadow-xl overflow-hidden text-neutral-900 animate-in fade-in duration-300" id="admin-cms-workspace">
      
      {/* 1. CMS NAVIGATION BAR PANEL */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-700 p-6 text-white space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-500/35 text-white text-[10px] font-black rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Administrative Command Center
            </div>
            <h1 className="text-2.5xl font-black text-white tracking-tight">Academic Material Control CMS</h1>
            <p className="text-xs text-violet-100 font-bold">
              Publish verified textbook PDFs and lecture audio files to Cloudflare R2 and save metadata in Supabase.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setEditingContent({ is_free_preview: true } as any);
                setShowAddForm(true);
              }}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md hover:scale-[1.01]"
            >
              <Sparkles className="w-4.5 h-4.5 text-neutral-950" />
              Add Free Preview Material
            </button>

            <button
              onClick={() => {
                setEditingContent(null);
                setShowAddForm(true);
              }}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider rounded-xl border border-white/25 transition-all cursor-pointer flex items-center gap-1.5 shadow-md hover:scale-[1.01]"
            >
              <PlusCircle className="w-4.5 h-4.5 text-white" />
              Upload New Material File
            </button>
          </div>
        </div>

        {/* Dynamic feedback messages */}
        {errorMessage && (
          <div className="p-3.5 bg-red-600 border border-red-700 text-white rounded-2xl text-xs font-black animate-pulse flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>⚠️ {errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="p-3.5 bg-emerald-600 border border-emerald-700 text-white rounded-2xl text-xs font-black flex items-center gap-2 text-left">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>✓ {successMessage}</span>
          </div>
        )}
      </div>

      {/* ==========================================
          TAB CONTENT SPACE: A. MATERIALS PUBLISHER
          ========================================== */}
      {activeTab === 'materials' && (
        <div className="p-6 space-y-6 text-left">
          
          {showAddForm ? (
            <div className="bg-slate-50 border border-neutral-200 p-6 sm:p-8 rounded-3xl max-w-2xl mx-auto space-y-4 shadow-md animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center pb-3 border-b-2 border-indigo-100">
                <h3 className="text-sm font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1.5">
                  <Upload className="w-4.5 h-4.5 text-[#5c3beb]" />
                  <span>{editingContent ? "Modify Asset Record Information" : "Upload & Publish Core Course Materials"}</span>
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingContent(null);
                  }}
                  className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-zinc-900 border border-neutral-300 rounded-lg text-xs font-black cursor-pointer transition-colors"
                >
                  Back to List
                </button>
              </div>

              <AdminContentForm
                onSave={handleSaveContentItem}
                onCancel={() => {
                  setShowAddForm(false);
                  setEditingContent(null);
                }}
                isLoading={contentLoading}
                initialValues={editingContent || undefined}
              />
            </div>
          ) : (
            <div className="space-y-6">
              
              <ContentFilter
                selectedBoardFilter={boardFilter}
                setSelectedBoardFilter={setBoardFilter}
                selectedSubjectFilter={subjectFilter}
                setSelectedSubjectFilter={setSubjectFilter}
                selectedChapterFilter={chapterFilter}
                setSelectedChapterFilter={setChapterFilter}
                searchQuery={contentSearch}
                setSearchQuery={setContentSearch}
                subjectsList={subjectsList}
                chaptersList={chaptersList}
              />

              {contentLoading ? (
                <div className="py-20 text-center space-y-2">
                  <Loader2 className="w-8 h-8 animate-spin text-[#5c3beb] mx-auto" />
                  <p className="text-xs text-neutral-400 font-bold animate-pulse">Retrieve catalog files list...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                      Live Materials Published ({filteredContentItems.length})
                    </h3>
                  </div>

                  <ContentGrid
                    items={filteredContentItems}
                    isAdmin={true}
                    onEdit={startEditContent}
                    onDelete={handleDeleteContentItem}
                    onPlayAudio={(url, title, chap) => setActiveAudio({ url, title, chapter: chap })}
                    onOpenPDF={(url, title) => setActivePDF({ url, title })}
                  />
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* ==========================================
          TAB CONTENT SPACE: B. CURRICULUM SCAFFOLDING
          ========================================== */}
      {activeTab === 'curriculum' && (
        <div className="p-6 space-y-6 text-left">
          
          <div className="bg-[#fafafa] border border-neutral-150 rounded-3xl p-5 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsClassModalOpen(true)}
                className="px-3.5 py-2 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs rounded-xl flex items-center gap-1"
              >
                <FolderPlus className="w-4 h-4 text-violet-100" />
                Manage Classes
              </button>
              <button
                onClick={() => setIsSubjectModalOpen(true)}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl flex items-center gap-1"
              >
                <Plus className="w-4 h-4 text-indigo-100" />
                Manage Subjects
              </button>
              <button
                onClick={openChapterForCreate}
                className="px-3.5 py-2 bg-yellow-500 hover:bg-yellow-600 text-neutral-950 font-black text-xs rounded-xl flex items-center gap-1 shadow"
              >
                <Layers className="w-4 h-4" />
                Add Chapter
              </button>
            </div>

            {/* Quick dropdown selector filters */}
            <div className="flex items-center gap-3">
              <select
                value={selectedClassFilter}
                onChange={(e) => {
                  setSelectedClassFilter(e.target.value);
                  setSelectedSubjectFilter('all');
                }}
                className="bg-white border border-neutral-200 px-3 py-1.5 focus:outline-none font-bold text-xs rounded-lg cursor-pointer max-w-40 text-black animate-in fade-in"
              >
                <option value="all">Every Class</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.class_name}</option>
                ))}
              </select>

              <select
                value={selectedSubjectFilter}
                onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                className="bg-white border border-neutral-200 px-3 py-1.5 focus:outline-none font-bold text-xs rounded-lg cursor-pointer max-w-40 text-black"
              >
                <option value="all">Every Subject</option>
                {subjects
                  .filter(s => selectedClassFilter === 'all' || String(s.class_id) === selectedClassFilter)
                  .map(s => (
                    <option key={s.id} value={s.id}>{s.subject_name}</option>
                  ))}
              </select>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Filter chapters..."
                  value={curriculumSearch}
                  onChange={(e) => setCurriculumSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white text-black max-w-48"
                />
              </div>
            </div>
          </div>

          {/* Chapter Scaffolds Database List Grid */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
              Folder Chapter Scaffolds ({filteredChapterScaffolds.length})
            </h3>

            {loading ? (
              <div className="py-12 text-center text-xs text-neutral-400 font-extrabold flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#5c3beb]" />
                <span>Checking structural syllabus records...</span>
              </div>
            ) : filteredChapterScaffolds.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-neutral-200 rounded-3xl max-w-md mx-auto text-neutral-400 font-bold text-xs">
                ⚠️ No matching catalog folder items found in structured memory. Click tools to insert classes/subjects.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredChapterScaffolds.map((ch, index) => (
                  <div key={ch.id} className="p-4 border border-neutral-200 rounded-2xl bg-white hover:border-neutral-300 transition-colors flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase text-violet-600 bg-violet-50">
                          {ch.class_name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase text-amber-600 bg-amber-50">
                          {ch.subject_name}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-neutral-900 leading-none">
                        {ch.chapter_name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-bold lines-clamp-2 leading-relaxed">
                        {ch.description || "No customized summary description written for this lesson chapter guide."}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-center">
                      <button
                        onClick={() => openChapterForEdit(ch)}
                        className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-black cursor-pointer"
                        title="Edit Chapter structural details"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteChapter(ch.id, ch.chapter_name)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 hover:text-red-700 cursor-pointer"
                        title="Delete Chapter entry"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ==========================================
          TAB CONTENT SPACE: C. ADMIN DELEGATION
          ========================================== */}
      {activeTab === 'admins' && (
        <div className="p-6 max-w-xl mx-auto space-y-6 text-left animate-in fade-in duration-200">
          
          <div className="bg-[#fafafa] border border-neutral-150 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-black text-neutral-900 flex items-center gap-2 border-b border-neutral-200 pb-2">
              <ShieldAlert className="w-5 h-5 text-pink-500" />
              Manage Administrative Co-Workers
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-bold">
              Delegate access permission to staff members. Registered emails will bypass student view restrictions and unlock this dynamic file publisher automatically.
            </p>

            <form onSubmit={handleCreateAdmin} className="space-y-4 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-black text-neutral-700">Enter Admin Email Address</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="e.g. academic.head@company.com"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="flex-1 px-3 py-2 border border-neutral-350 rounded-xl text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none text-black"
                  />
                  <button
                    type="submit"
                    className="px-4.5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-black text-xs rounded-xl cursor-pointer"
                  >
                    Grant Access
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
              Active Authorized Administrators ({adminEmails.length})
            </p>

            <div className="max-h-64 overflow-y-auto divide-y divide-neutral-150 border border-neutral-200 rounded-3xl bg-white p-4 space-y-3.5">
              {adminEmails.map(email => (
                <div key={email} className="flex items-center justify-between py-1 text-xs">
                  <span className="font-extrabold text-neutral-800 text-xs truncate max-w-xs">{email}</span>
                  {email === 'admin@company.com' ? (
                    <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                      Root Administrator
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDeleteAdmin(email)}
                      className="text-red-500 hover:text-red-700 font-extrabold text-[10px] uppercase cursor-pointer hover:underline"
                    >
                      Revoke Credentials
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ==========================================
          FOUNDATIONAL CREATIVE MODALS (CLASS GRADES)
          ========================================== */}
      {isClassModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 text-left">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl p-6 max-w-md w-full space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-150">
              <h3 className="text-sm font-black uppercase text-neutral-900 flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-violet-600" />
                Manage Classes
              </h3>
              <button
                onClick={() => setIsClassModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 font-bold bg-neutral-100 w-6 h-6 rounded-full flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-black text-neutral-700">Class Identifier Name</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. CBSE Class 10, SSC Class 10"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-neutral-350 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-violet-500 text-black"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-750 text-white font-black text-xs rounded-xl cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>

            <div className="space-y-2 pt-2">
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">Existing Class Folders</p>
              <div className="max-h-40 overflow-y-auto divide-y divide-neutral-100 border border-neutral-150 rounded-2xl bg-neutral-50 p-3">
                {classes.map(cl => (
                  <div key={cl.id} className="flex items-center justify-between py-2 text-xs">
                    <span className="font-bold text-neutral-800">{cl.class_name}</span>
                    <button
                      onClick={() => handleDeleteClass(cl.id, cl.class_name)}
                      className="text-red-500 hover:text-red-700 font-bold text-[10px] uppercase hover:underline cursor-pointer font-black"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOUNDATIONAL CREATIVE MODALS (SUBJECTS) */}
      {isSubjectModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 text-left">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl p-6 max-w-md w-full space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-150">
              <h3 className="text-sm font-black uppercase text-neutral-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-650" />
                Manage Subjects
              </h3>
              <button
                onClick={() => setIsSubjectModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 font-bold bg-neutral-100 w-6 h-6 rounded-full flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubject} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-neutral-700">Bind to Class Grade</label>
                <select
                  required
                  value={newSubjectClassId}
                  onChange={(e) => setNewSubjectClassId(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-350 rounded-xl text-xs bg-white focus:outline-none text-black"
                >
                  <option value="">Select Target Class...</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.class_name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-neutral-700 font-bold">Subject Name</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Science, Mathematics, Geography"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-neutral-350 rounded-xl text-xs focus:outline-none text-black"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-750 text-white font-black text-xs rounded-xl cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>

            <div className="space-y-2 pt-2">
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Active Registered Subjects</p>
              <div className="max-h-40 overflow-y-auto divide-y divide-neutral-100 border border-neutral-150 rounded-2xl bg-neutral-50 p-3">
                {subjects.map(sub => (
                  <div key={sub.id} className="flex items-center justify-between py-2 text-xs">
                    <div className="text-left">
                      <p className="font-bold text-neutral-800">{sub.subject_name}</p>
                      <p className="text-[9px] text-[#5c3beb] font-black uppercase leading-none">{sub.class_name}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteSubject(sub.id, sub.subject_name)}
                      className="text-red-500 hover:text-red-700 font-bold text-[10px] uppercase hover:underline cursor-pointer font-black"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOUNDATIONAL CREATIVE MODALS (CHAPTER SCAFFOLDS) */}
      {isChapterModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 text-left overflow-y-auto">
          <div className="bg-white rounded-3xl border border-neutral-205 shadow-2 shadow-2xl p-6 max-w-xl w-full my-8 space-y-5 animate-in fade-in duration-200 scale-95 origin-center">
            
            <div className="flex justify-between items-center pb-2 border-b border-neutral-150">
              <h3 className="text-sm font-black uppercase text-neutral-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-yellow-600" />
                {editingChapterId !== null ? 'Modify Chapter Scaffold Details' : 'Publish New Chapter Scaffold'}
              </h3>
              <button
                onClick={() => setIsChapterModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 font-bold bg-neutral-100 w-6 h-6 rounded-full flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveChapter} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-neutral-750">Course Subject</label>
                  <select
                    required
                    value={chapterForm.subject_id}
                    onChange={(e) => setChapterForm(prev => ({ ...prev, subject_id: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-350 rounded-xl text-xs bg-white text-black"
                  >
                    <option value="">Select subject folder...</option>
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.subject_name} ({s.class_name})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-neutral-750">Chapter Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chemical Reactions"
                    value={chapterForm.chapter_name}
                    onChange={(e) => setChapterForm(prev => ({ ...prev, chapter_name: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-350 rounded-xl text-xs text-black animate-in"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-neutral-750">Chapter Summary Description</label>
                <textarea
                  placeholder="Summarize course goals for fast reference..."
                  rows={3}
                  value={chapterForm.description}
                  onChange={(e) => setChapterForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-350 rounded-xl text-xs text-black"
                />
              </div>

              {/* URL linkages for legacy compatibility */}
              <div className="space-y-3 pt-3 border-t border-neutral-100">
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none">
                  Legacy Media URLs (Optional mapping)
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500">Legacy Mindmap Image Link</span>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={chapterForm.mindmap_url}
                      onChange={(e) => setChapterForm(prev => ({ ...prev, mindmap_url: e.target.value }))}
                      className="w-full px-2.5 py-1.5 border border-neutral-300 rounded-lg text-[10px] font-mono text-black"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500">Legacy Game Link</span>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={chapterForm.game_url}
                      onChange={(e) => setChapterForm(prev => ({ ...prev, game_url: e.target.value }))}
                      className="w-full px-2.5 py-1.5 border border-neutral-300 rounded-lg text-[10px] font-mono text-black"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-neutral-150">
                <button
                  type="button"
                  onClick={() => setIsChapterModalOpen(false)}
                  className="px-4.5 py-2 hover:bg-neutral-100 rounded-xl font-bold text-xs border border-neutral-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-750 text-white font-black text-xs rounded-xl shadow-lg cursor-pointer"
                >
                  Save Scaffold Chapter
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Conditional Floating Audio Playback Widget */}
      {activeAudio && (
        <AudioPlayer
          url={activeAudio.url}
          title={activeAudio.title}
          chapterName={activeAudio.chapter}
          onClose={() => setActiveAudio(null)}
        />
      )}

      {/* Conditional Full-Screen Secure PDF Document Viewer Overlay */}
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
