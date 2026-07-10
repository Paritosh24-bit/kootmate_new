import React, { useState, useEffect, useRef } from "react";
import { 
  FileText, Headphones, Gamepad2, Compass, Eye, Download, Play, Pause, 
  RotateCcw, Volume2, VolumeX, FastForward, Search, SlidersHorizontal, Trash2, 
  Edit3, ExternalLink, ArrowRight, CheckCircle, AlertCircle, Loader2, ArrowUpRight,
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Lock, ShieldAlert, Laptop, Smartphone
} from "lucide-react";
import { ContentItem } from "../types";
import { removeChapterNumber } from "../lib/utils";

// ==========================================
// 1. UPLOAD PROGRESS COMPONENT
// ==========================================
interface UploadProgressProps {
  progress: number;
  fileName?: string;
  status?: "idle" | "uploading" | "success" | "error";
  errorMsg?: string;
}

export function UploadProgress({ progress, fileName, status = "idle", errorMsg }: UploadProgressProps) {
  if (status === "idle") return null;

  return (
    <div className="p-4 rounded-2xl bg-neutral-50 not-dark:bg-zinc-900 border border-neutral-100 not-dark:border-zinc-800 space-y-3 animate-in fade-in transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-[70%]">
          {status === "uploading" && <Loader2 className="w-4 h-4 text-violet-500 animate-spin shrink-0" />}
          {status === "success" && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
          {status === "error" && <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />}
          <span className="text-xs font-black truncate text-neutral-800 not-dark:text-neutral-200">
            {fileName || "File Upload"}
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-neutral-500">
          {status === "success" ? "Done" : status === "error" ? "Failed" : `${progress}%`}
        </span>
      </div>

      <div className="w-full bg-neutral-200 not-dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-300 ${
            status === "error" ? "bg-red-500" : status === "success" ? "bg-emerald-500" : "bg-gradient-to-r from-violet-600 to-indigo-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {errorMsg && (
        <p className="text-[10px] text-red-500 font-bold leading-normal">
          Error: {errorMsg}
        </p>
      )}
    </div>
  );
}

// ==========================================
// 2. CONTENT FILTER COMPONENT
// ==========================================
interface ContentFilterProps {
  selectedBoardFilter: string;
  setSelectedBoardFilter: (board: string) => void;
  selectedSubjectFilter: string;
  setSelectedSubjectFilter: (subject: string) => void;
  selectedChapterFilter: string;
  setSelectedChapterFilter: (chapter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  subjectsList: string[];
  chaptersList: string[];
}

export function ContentFilter({
  selectedBoardFilter,
  setSelectedBoardFilter,
  selectedSubjectFilter,
  setSelectedSubjectFilter,
  selectedChapterFilter,
  setSelectedChapterFilter,
  searchQuery,
  setSearchQuery,
  subjectsList,
  chaptersList,
}: ContentFilterProps) {
  return (
    <div className="bg-white not-dark:bg-neutral-900 border border-neutral-200 not-dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        
        {/* Search Input bar */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search matching content titles or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs border border-neutral-200 not-dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-neutral-900 not-dark:text-white bg-neutral-50 not-dark:bg-neutral-950 font-bold"
          />
        </div>

        {/* Board Toggle Button */}
        <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
          <span className="text-xs font-black text-neutral-500 uppercase tracking-wider hidden sm:inline">Board:</span>
          <div className="inline-flex bg-neutral-100 not-dark:bg-neutral-950 p-1 rounded-xl border border-neutral-200 not-dark:border-zinc-800">
            {["all", "cbse", "ssc"].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBoardFilter(b)}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  selectedBoardFilter === b
                    ? "bg-[#5c3beb] text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-800 not-dark:hover:text-neutral-200"
                }`}
              >
                {b === "all" ? "Every Board" : b === "cbse" ? "CBSE Class 10" : "MH-SSC Board"}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Select Filters section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 border-t border-neutral-100 not-dark:border-zinc-850">
        
        {/* Subject dropdown */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Filter Subject</label>
          <select
            value={selectedSubjectFilter}
            onChange={(e) => {
              setSelectedSubjectFilter(e.target.value);
              setSelectedChapterFilter("all"); // reset chapter when subject alters
            }}
            className="w-full px-3 py-2 border border-neutral-200 not-dark:border-neutral-800 bg-neutral-50 not-dark:bg-neutral-950 text-neutral-900 not-dark:text-white text-xs rounded-xl focus:outline-none"
          >
            <option value="all">📚 All Subjects Folder</option>
            {subjectsList.map((sub) => (
              <option key={sub} value={sub}>
                📘 {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter dropdown */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Filter Chapter/Lesson</label>
          <select
            value={selectedChapterFilter}
            onChange={(e) => setSelectedChapterFilter(e.target.value)}
            disabled={selectedSubjectFilter === "all" && chaptersList.length === 0}
            className="w-full px-3 py-2 border border-neutral-200 not-dark:border-neutral-800 bg-neutral-50 not-dark:bg-neutral-950 text-neutral-900 not-dark:text-white text-xs rounded-xl focus:outline-none disabled:opacity-50"
          >
            <option value="all">📖 All Chapter Lessons</option>
            {chaptersList.map((chap) => (
              <option key={chap} value={chap}>
                📝 {chap}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 3. AUDIO PLAYER COMPONENT
// ==========================================
interface AudioPlayerProps {
  url: string;
  title: string;
  chapterName?: string;
  onClose?: () => void;
}

export function AudioPlayer({ url, title, chapterName, onClose }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // Reset play state and reload source URL when it modifications
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.load();
      // Auto play on change
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [url]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const val = parseFloat(e.target.value);
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const handleRateChange = () => {
    if (!audioRef.current) return;
    let nextRate = 1;
    if (playbackRate === 1) nextRate = 1.25;
    else if (playbackRate === 1.25) nextRate = 1.5;
    else if (playbackRate === 1.5) nextRate = 1.75;
    else if (playbackRate === 1.75) nextRate = 2;
    else nextRate = 1;

    audioRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const handleToggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !muted;
    audioRef.current.muted = nextMuted;
    setMuted(nextMuted);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-neutral-950 border border-neutral-800 text-white rounded-3xl p-5 shadow-2xl max-w-sm w-full space-y-4 animate-in slide-in-from-bottom-5">
      <audio
        ref={audioRef}
        src={url}
        controlsList="nodownload"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Title & Close button */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-lg shrink-0">
            🎙️
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-black text-rose-400 tracking-wider uppercase inline-block bg-rose-500/10 px-1.5 py-0.5 rounded">
              LECTURE STUDY PODCAST
            </span>
            <p className="text-xs font-black truncate text-neutral-100 mt-1" title={title}>
              {title}
            </p>
            {chapterName && (
              <p className="text-[10px] text-neutral-400 font-bold truncate">
                {chapterName}
              </p>
            )}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-white text-xs bg-white/10 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* Progress seeker bar */}
      <div className="space-y-1">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 font-bold">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Navigation and play options */}
      <div className="flex items-center justify-between pt-1 border-t border-neutral-800">
        
        {/* Speed button */}
        <button
          onClick={handleRateChange}
          className="px-2 py-1 hover:bg-white/10 rounded text-[10px] font-bold text-indigo-300 bg-indigo-500/10 transition-colors"
          title="Playback speed multiplier"
        >
          {playbackRate}x speed
        </button>

        {/* Master Play Button */}
        <button
          onClick={handlePlayPause}
          className="w-11 h-11 rounded-full bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-white" />
          ) : (
            <Play className="w-5 h-5 fill-white ml-0.5" />
          )}
        </button>

        {/* Mute button */}
        <button
          onClick={handleToggleMute}
          className={`p-2 rounded-xl transition-colors ${
            muted ? "bg-red-500/10 text-red-400" : "hover:bg-white/10 text-neutral-400"
          }`}
          title="Mute / Unmute"
        >
          {muted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
        </button>

      </div>
    </div>
  );
}

// ==========================================
// 4. PDF VIEWER COMPONENT
// ==========================================
interface PDFViewerProps {
  url: string;
  title: string;
  onClose: () => void;
}

export function PDFViewer({ url, title, onClose }: PDFViewerProps) {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);

  const isImage = url.toLowerCase().includes(".png") ||
                  url.toLowerCase().includes(".jpg") ||
                  url.toLowerCase().includes(".jpeg") ||
                  url.toLowerCase().includes(".webp") ||
                  url.toLowerCase().includes(".gif") ||
                  url.startsWith("data:image/");

  // Monitor screen size to restrict viewing on mobile devices
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Load PDFJS from CDN
  useEffect(() => {
    if (isMobile) return;
    if (isImage) {
      setLoading(false);
      setError(null);
      return;
    }
    let isMounted = true;
    const loadPdfJS = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if global pdfjsLib is present
        if (!(window as any).pdfjsLib) {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js";
          script.async = true;
          document.body.appendChild(script);
          
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = () => reject(new Error("Failed to load secure PDF viewer engine."));
          });
        }
        
        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
        
        if (!isMounted) return;
        
        // Pass through our backend secure PDF proxy to solve cross-origin CORS headers & "Failed to fetch" errors!
        const proxiedUrl = url.startsWith("http")
          ? `/api/proxy-pdf?url=${encodeURIComponent(url)}`
          : url;
        
        const loadingTask = pdfjsLib.getDocument(proxiedUrl);
        const pdf = await loadingTask.promise;
        
        if (!isMounted) return;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setLoading(false);
      } catch (err: any) {
        console.error("Secure PDF render failure:", err);
        if (isMounted) {
          setError(err.message || "Failed to load document. Make sure the file exists and is accessible.");
          setLoading(false);
        }
      }
    };
    
    loadPdfJS();
    return () => {
      isMounted = false;
    };
  }, [url, isMobile]);

  // Render Page
  useEffect(() => {
    if (isMobile || !pdfDoc || !canvasRef.current) return;
    
    let isCancelled = false;
    
    const renderPage = async () => {
      try {
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }
        
        const page = await pdfDoc.getPage(pageNum);
        if (isCancelled) return;
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;
        
        // Calculate viewport with scale & rotation
        const viewport = page.getViewport({ scale, rotation });
        
        // Support High DPI devices (Retina screens)
        const dpr = window.devicePixelRatio || 1;
        canvas.width = viewport.width * dpr;
        canvas.height = viewport.height * dpr;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        
        context.scale(dpr, dpr);
        
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        
        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;
        
        await renderTask.promise;
      } catch (err: any) {
        if (err.name !== "RenderingCancelledException") {
          console.error("Page render error:", err);
        }
      }
    };
    
    renderPage();
    
    return () => {
      isCancelled = true;
    };
  }, [pdfDoc, pageNum, scale, rotation, isMobile]);

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-neutral-900/95 backdrop-blur-md flex items-center justify-center p-4 z-50 text-center select-none" onContextMenu={(e) => e.preventDefault()}>
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl p-8 max-w-md w-full space-y-6 animate-in fade-in zoom-in-95 duration-200 text-left">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-100">
            <Laptop className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="px-2.5 py-1 bg-amber-500/10 text-amber-700 border border-amber-200/50 text-[10px] font-black uppercase tracking-wide rounded-xl">
              💻 Laptop Screen Required
            </span>
            <h3 className="text-lg font-black text-neutral-950 tracking-tight pt-1">
              Secure Desktop Viewer Only
            </h3>
            <p className="text-xs text-neutral-500 font-bold leading-relaxed">
              To protect copyright materials, ensure visual document layout fidelity, and render high-fidelity textbook graphics correctly, the secure read-only viewer is strictly restricted to Laptop and Desktop computers.
            </p>
          </div>
          <div className="flex gap-2.5 pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
            >
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handlePrevPage = () => {
    if (pageNum > 1) setPageNum(pageNum - 1);
  };

  const handleNextPage = () => {
    if (pdfDoc && pageNum < numPages) setPageNum(pageNum + 1);
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.6));
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleFitWidth = () => {
    setScale(1.2);
    setRotation(0);
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/90 backdrop-blur-md flex items-center justify-center p-4 z-50 text-left select-none" onContextMenu={(e) => e.preventDefault()}>
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden max-w-5xl w-full h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Controls bar */}
        <div className="px-6 py-3.5 border-b border-neutral-150 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-neutral-50 shrink-0 gap-3">
          <div className="truncate max-w-full">
            <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-violet-50 text-violet-600 inline-block mb-1">
              🔒 secure viewer
            </span>
            <h3 className="text-sm font-black text-neutral-900 truncate max-w-md sm:max-w-xl" title={title}>
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
            <span className="px-2.5 py-1 bg-amber-500/10 text-amber-700 border border-amber-200/50 text-[10px] font-black uppercase tracking-wide rounded-xl flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              View-Only Mode
            </span>
            
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-800 text-xs bg-neutral-200/60 hover:bg-neutral-200 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all"
              title="Close viewer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Custom Toolbar Controls */}
        {!error && !loading && (
          <div className="px-6 py-2 bg-white border-b border-neutral-150 flex flex-wrap items-center justify-between gap-3 text-neutral-700 shrink-0 select-none">
            {/* Page Navigation */}
            {!isImage ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={pageNum <= 1}
                  className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-black text-neutral-900 bg-neutral-100/80 px-3 py-1 rounded-lg">
                  Page {pageNum} of {numPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={pageNum >= numPages}
                  className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-xs font-black text-violet-700 bg-violet-50 px-3 py-1 rounded-lg border border-violet-100">
                Visual Infographic Image
              </div>
            )}

            {/* Zoom / Orientation controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 0.6}
                className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold w-12 text-center bg-neutral-100/80 px-2 py-1 rounded-lg select-none">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={scale >= 2.5}
                className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <span className="text-neutral-200 select-none">|</span>
              <button
                onClick={handleRotate}
                className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-all cursor-pointer"
                title="Rotate Clockwise"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleFitWidth}
                className="text-[10px] font-black uppercase px-2.5 py-1.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all cursor-pointer"
                title="Reset Fit"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Real PDF canvas workspace */}
        <div className="flex-1 overflow-auto bg-neutral-100 flex items-start justify-center p-6 relative">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50/95 space-y-4 text-center z-10">
              <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
              <div>
                <p className="text-sm font-black text-neutral-900">Loading document securely</p>
                <p className="text-xs text-neutral-400 mt-1 font-bold">Configuring view-only sandbox environment...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-6 text-center max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-neutral-900">Document Security Guard</h4>
                <p className="text-xs text-neutral-500 font-bold leading-relaxed mt-2">
                  We could not securely stream this document. The link may have expired or is blocked.
                </p>
                {error && <p className="text-[10px] font-mono text-neutral-400 mt-3 border border-neutral-100 bg-neutral-50 p-2 rounded-lg max-w-full truncate">{error}</p>}
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Go Back
              </button>
            </div>
          )}

          {/* Secure interactive canvas */}
          {!error && (
            isImage ? (
              <div className="relative group/canvas shadow-2xl rounded-xl overflow-hidden bg-white max-w-full transition-transform flex items-center justify-center p-2" style={{ maxHeight: '100%' }}>
                <img
                  src={url}
                  alt={title}
                  className="max-w-full select-none"
                  referrerPolicy="no-referrer"
                  style={{
                    transform: `scale(${scale}) rotate(${rotation}deg)`,
                    transition: 'transform 0.2s ease-out',
                    pointerEvents: 'none',
                    maxHeight: '70vh',
                    objectFit: 'contain'
                  }}
                />
                {/* Subtle diagonal security watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.04]">
                  <div className="text-slate-900 font-black text-3xl sm:text-5xl uppercase tracking-widest rotate-[-30deg] whitespace-nowrap">
                    Kootmate Academy • Secure Read Only
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative group/canvas shadow-2xl rounded-xl overflow-hidden bg-white max-w-full transition-transform">
                <canvas
                  ref={canvasRef}
                  className="max-w-full select-none"
                  style={{ pointerEvents: 'none' }}
                />
                {/* Subtle diagonal security watermark so they can't easily screenshot/steal */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.04]">
                  <div className="text-slate-900 font-black text-3xl sm:text-5xl uppercase tracking-widest rotate-[-30deg] whitespace-nowrap">
                    Kootmate Academy • Secure Read Only
                  </div>
                </div>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 5. CONTENT CARD COMPONENT
// ==========================================
interface ContentCardProps {
  key?: any;
  item: ContentItem;
  isAdmin?: boolean;
  onEdit?: (item: ContentItem) => void;
  onDelete?: (id: string | number) => void;
  onPlayAudio?: (url: string, title: string, chapter: string) => void;
  onOpenPDF?: (url: string, title: string) => void;
}

export function ContentCard({
  item,
  isAdmin = false,
  onEdit,
  onDelete,
  onPlayAudio,
  onOpenPDF,
}: ContentCardProps) {
  
  // Icon configuration helper
  const getIcon = () => {
    const type = item.content_type.toLowerCase();
    if (type === "mindmap") {
      return {
        icon: <Compass className="w-5 h-5 text-violet-600" />,
        bg: "bg-violet-100 not-dark:bg-violet-950",
        tagColor: "bg-violet-50 text-violet-600 not-dark:bg-violet-950/20 not-dark:text-violet-400",
        label: "Visual Mind Map",
      };
    }
    if (type === "pdf") {
      return {
        icon: <FileText className="w-5 h-5 text-red-600" />,
        bg: "bg-red-100 not-dark:bg-red-950",
        tagColor: "bg-red-50 text-red-600 not-dark:bg-red-950/20 not-dark:text-red-400",
        label: "Chapter PDF Guide",
      };
    }
    if (type === "question_bank" || type === "questionbank") {
      return {
        icon: <FileText className="w-5 h-5 text-emerald-600" />,
        bg: "bg-emerald-100 not-dark:bg-emerald-950",
        tagColor: "bg-emerald-50 text-emerald-600 not-dark:bg-emerald-950/20 not-dark:text-emerald-400",
        label: "Question Bank",
      };
    }
    if (type === "audio") {
      return {
        icon: <Headphones className="w-5 h-5 text-[#5c3beb]" />,
        bg: "bg-indigo-100 not-dark:bg-indigo-950",
        tagColor: "bg-indigo-50 text-[#5c3beb] not-dark:bg-indigo-950/20 not-dark:text-indigo-400",
        label: "Audio Lecture Podcast",
      };
    }
    return {
      icon: <Gamepad2 className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-100 not-dark:bg-emerald-950",
      tagColor: "bg-emerald-50 text-emerald-600 not-dark:bg-emerald-950/20 not-dark:text-emerald-400",
      label: "Interactive Learning Game",
    };
  };

  const styleConfig = getIcon();

  const logPreviewClick = async () => {
    if (item.is_free_preview && item.id) {
      try {
        await fetch(`/api/content/${item.id}/click`, { method: "POST" });
        console.log(`[Click Tracker] Registered free preview click for item: ${item.id}`);
      } catch (err) {
        console.error("Failed to log preview click:", err);
      }
    }
  };

  return (
    <div className="bg-white not-dark:bg-neutral-900 border border-neutral-200 not-dark:border-neutral-800 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:shadow-lg transition-all duration-200 h-64 group relative overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-full select-none pointer-events-none" />

      {/* Card Header section */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${styleConfig.tagColor}`}>
              {styleConfig.label}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-black uppercase tracking-widest bg-zinc-100 not-dark:bg-neutral-950 text-neutral-500 border border-neutral-200 not-dark:border-neutral-800">
              {item.board}
            </span>
            {item.is_free_preview && (
              <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-amber-500 text-neutral-950 border border-amber-600">
                ★ Free Preview
              </span>
            )}
          </div>

          {/* Admin Management controls */}
          {isAdmin && (onEdit || onDelete) && (
            <div className="flex items-center gap-1">
              {onEdit && (
                <button
                  onClick={() => onEdit(item)}
                  className="p-1 rounded-md text-amber-500 hover:bg-neutral-100 not-dark:hover:bg-zinc-800 border border-transparent hover:border-neutral-200 not-dark:hover:border-neutral-800 cursor-pointer"
                  title="Modify metadata details"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1 rounded-md text-red-500 hover:bg-neutral-100 not-dark:hover:bg-zinc-800 border border-transparent hover:border-neutral-200 not-dark:hover:border-neutral-800 cursor-pointer"
                  title="Destroy content record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Info detail block */}
        <div className="space-y-1">
          <h4 className="text-sm font-black text-slate-900 not-dark:text-neutral-100 truncate group-hover:text-violet-600 transition-colors" title={removeChapterNumber(item.title)}>
            {removeChapterNumber(item.title)}
          </h4>
          
          <div className="flex flex-wrap items-center gap-x-2 text-[9px] font-extrabold text-[#5c3beb]/80 uppercase tracking-wide">
            <span>{item.subject}</span>
            <span className="text-zinc-300 select-none">•</span>
            <span className="truncate max-w-[140px]">{item.chapter}</span>
          </div>

          <p className="text-[11px] text-neutral-500 not-dark:text-neutral-400 font-bold leading-normal pt-1 lines-clamp-3">
            {item.description || "No customized curriculum summary available for this study course. Click trigger, load catalog data and read details."}
          </p>
        </div>
      </div>

      {/* Button action area */}
      <div className="pt-3 border-t border-neutral-100 not-dark:border-neutral-800 flex items-center justify-between mt-auto">
        <div className="flex flex-col text-left">
          <span className="text-[9px] font-mono text-neutral-400 font-bold">
            {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Active Unit"}
          </span>
          {isAdmin && item.is_free_preview && (
            <span className="text-[9px] font-black uppercase text-amber-600 tracking-wider">
              ★ {item.preview_clicks || 0} clicks
            </span>
          )}
        </div>

        {/* Trigger content activation buttons */}
        {item.content_type === "mindmap" && (
          <a
            href={item.resource_url}
            target="_blank"
            rel="noreferrer"
            onClick={logPreviewClick}
            className="flex items-center gap-1 px-3 py-1.5 bg-violet-50 hover:bg-violet-100 text-violet-600 font-black text-[10px] rounded-lg transition-transform active:scale-95 cursor-pointer border border-violet-100/50"
          >
            <span>Open Mind Map</span>
            <ArrowUpRight className="w-3 h-3 text-violet-500" />
          </a>
        )}

        {item.content_type === "game" && (
          <a
            href={item.resource_url}
            target="_blank"
            rel="noreferrer"
            onClick={logPreviewClick}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-black text-[10px] rounded-lg transition-transform active:scale-95 cursor-pointer border border-emerald-100/50"
          >
            <span>Launch Game</span>
            <Gamepad2 className="w-3 h-3 text-emerald-500" />
          </a>
        )}

        {item.content_type === "pdf" && (
          <button
            onClick={() => {
              logPreviewClick();
              onOpenPDF ? onOpenPDF(item.resource_url, removeChapterNumber(item.title)) : window.open(item.resource_url, "_blank");
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-black text-[10px] rounded-lg transition-transform active:scale-95 cursor-pointer border border-red-100/50"
          >
            <span>Read PDF Notes</span>
            <Eye className="w-3 h-3 text-red-500" />
          </button>
        )}

        {(item.content_type === "question_bank" || item.content_type === "questionbank") && (
          <button
            onClick={() => {
              logPreviewClick();
              const isPdf = item.resource_url.toLowerCase().endsWith('.pdf');
              if (isPdf && onOpenPDF) {
                onOpenPDF(item.resource_url, removeChapterNumber(item.title));
              } else {
                window.open(item.resource_url, "_blank");
              }
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-black text-[10px] rounded-lg transition-transform active:scale-95 cursor-pointer border border-emerald-100/50"
          >
            <span>View Questions</span>
            <Eye className="w-3 h-3 text-emerald-500" />
          </button>
        )}

        {item.content_type === "audio" && (
          <button
            onClick={() => {
              logPreviewClick();
              onPlayAudio ? onPlayAudio(item.resource_url, removeChapterNumber(item.title), item.chapter) : window.open(item.resource_url, "_blank");
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-[#5c3beb] font-black text-[10px] rounded-lg transition-transform active:scale-95 cursor-pointer border border-indigo-100/50"
          >
            <span>Play Podcast</span>
            <Play className="w-3 h-3 text-indigo-500 fill-[#5c3beb]" />
          </button>
        )}
      </div>

    </div>
  );
}

// ==========================================
// 6. CONTENT GRID COMPONENT
// ==========================================
interface ContentGridProps {
  items: ContentItem[];
  isAdmin?: boolean;
  onEdit?: (item: ContentItem) => void;
  onDelete?: (id: string | number) => void;
  onPlayAudio?: (url: string, title: string, chapter: string) => void;
  onOpenPDF?: (url: string, title: string) => void;
}

export function ContentGrid({
  items,
  isAdmin = false,
  onEdit,
  onDelete,
  onPlayAudio,
  onOpenPDF,
}: ContentGridProps) {
  if (items.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl border-2 border-dashed border-neutral-205 not-dark:border-neutral-800 bg-white not-dark:bg-neutral-900 space-y-3.5 max-w-lg mx-auto">
        <Compass className="w-12 h-12 text-neutral-300 not-dark:text-neutral-700 animate-pulse mx-auto" />
        <div className="space-y-1">
          <h4 className="text-sm font-black text-neutral-850 not-dark:text-white">No Matching Content Found</h4>
          <p className="text-xs text-neutral-500 not-dark:text-neutral-400 font-bold max-w-xs mx-auto leading-relaxed">
            There are no textbook resources or study cards matching this filter configuration. Check back later!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ContentCard
          key={item.id}
          item={item}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
          onPlayAudio={onPlayAudio}
          onOpenPDF={onOpenPDF}
        />
      ))}
    </div>
  );
}

export const BOARD_SUBJECTS: Record<string, string[]> = {
  CBSE: ["Science", "Mathematics", "Social Studies"],
  SSC: ["Science", "Mathematics", "Social Studies"]
};

export const PRE_ENTERED_LESSONS: Record<string, Record<string, string[] | Record<string, string[]>>> = {
  CBSE: {
    "Science": [
      "Chemical Reactions and Equations",
      "Acids, Bases and Salts",
      "Metals and Non-metals",
      "Carbon and its Compounds",
      "Life Processes",
      "Control and Coordination",
      "How do Organisms Reproduce?",
      "Heredity",
      "Light - Reflection and Refraction",
      "The Human Eye and the Colourful World",
      "Electricity",
      "Magnetic Effects of Electric Current",
      "Our Environment"
    ],
    "Mathematics": [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations in Two Variables",
      "Quadratic Equations",
      "Arithmetic Progressions",
      "Triangles",
      "Coordinate Geometry",
      "Introduction to Trigonometry",
      "Some Applications of Trigonometry",
      "Circles",
      "Areas Related to Circles",
      "Surface Areas and Volumes",
      "Statistics",
      "Probability"
    ],
    "Social Studies": {
      "History": [
        "The Rise of Nationalism in Europe",
        "Nationalism in India",
        "The Making of a Global World",
        "The Age of Industrialisation",
        "Print Culture and the Modern World"
      ],
      "Geography": [
        "Resources and Development",
        "Forest and Wildlife Resources",
        "Water Resources",
        "Agriculture",
        "Minerals and Energy Resources",
        "Manufacturing Industries",
        "Lifelines of National Economy"
      ],
      "Civics": [
        "Power Sharing",
        "Federalism",
        "Gender, Religion and Caste",
        "Political Parties",
        "Outcomes of Democracy"
      ],
      "Economics": [
        "Development",
        "Sectors of the Indian Economy",
        "Money and Credit",
        "Globalisation and the Indian Economy",
        "Consumer Rights"
      ]
    }
  },
  SSC: {
    "Science": {
      "Science 1": [
        "Gravitation",
        "Periodic Classification of Elements",
        "Chemical Reactions and Equations",
        "Effects of Electric Current",
        "Heat",
        "Refraction of Light",
        "Lenses",
        "Metallurgy",
        "Carbon Compounds",
        "Space Missions"
      ],
      "Science 2": [
        "Heredity and Evolution",
        "Life Processes in Living Organisms - Part I",
        "Life Processes in Living Organisms - Part II",
        "Environmental Management",
        "Towards Green Energy",
        "Animal Classification",
        "Introduction to Microbiology",
        "Cell Biology and Biotechnology",
        "Social Health",
        "Disaster Management"
      ]
    },
    "Mathematics": {
      "Math 1 (Algebra)": [
        "Linear Equations in Two Variables",
        "Quadratic Equations",
        "Arithmetic Progression",
        "Financial Planning",
        "Probability",
        "Statistics"
      ],
      "Math 2 (Geometry)": [
        "Similarity",
        "Pythagoras Theorem",
        "Circle",
        "Geometric Constructions",
        "Coordinate Geometry",
        "Trigonometry",
        "Mensuration"
      ]
    },
    "Social Studies": {
      "History": [
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
      "Geography": [
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
      "Civics": [
        "Working of the Constitution",
        "The Electoral Process",
        "Political Parties",
        "Social and Political Movements",
        "Challenges Faced by Indian Democracy"
      ]
    }
  }
};

// ==========================================
// 7. ADMIN CONTENT FORM COMPONENT
// ==========================================
interface AdminContentFormProps {
  initialValues?: Partial<ContentItem> | null;
  onSave: (formData: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
  onCancel?: () => void;
}

export function AdminContentForm({
  initialValues,
  onSave,
  isLoading = false,
  onCancel,
}: AdminContentFormProps) {
  
  const [board, setBoard] = useState(initialValues?.board || "CBSE");
  const [subject, setSubject] = useState("Science");
  const [sstDiscipline, setSstDiscipline] = useState("");
  const [chapter, setChapter] = useState(initialValues?.chapter || "");
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [contentType, setContentType] = useState(initialValues?.content_type || "pdf");
  const [resourceUrl, setResourceUrl] = useState(initialValues?.resource_url || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(initialValues?.thumbnail_url || "");
  const [isFreePreview, setIsFreePreview] = useState(initialValues?.is_free_preview || false);

  // Upload handling states
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  const isEditing = !!initialValues?.id;

  // Sync state if initial value changes (e.g. selection toggled)
  useEffect(() => {
    if (initialValues) {
      const initialBoard = initialValues.board || "CBSE";
      setBoard(initialBoard);
      
      const savedSub = initialValues.subject || "";
      const isSubSst = ["history", "civics", "geography", "economics"].includes(savedSub.toLowerCase());
      const isSubSci = ["science 1", "science 2"].includes(savedSub.toLowerCase());
      const isSubMath = ["math 1 (algebra)", "math 2 (geometry)"].includes(savedSub.toLowerCase());

      let matchedSubject = "Science";
      let matchedSst = "";
      if (isSubSst) {
        matchedSubject = "Social Studies";
        matchedSst = savedSub.charAt(0).toUpperCase() + savedSub.slice(1).toLowerCase();
        if (matchedSst === "Civics" && initialBoard === "SSC") {
          matchedSst = "Civics";
        }
      } else if (isSubSci) {
        matchedSubject = "Science";
        matchedSst = savedSub === "Science 1" ? "Science 1" : "Science 2";
      } else if (isSubMath) {
        matchedSubject = "Mathematics";
        matchedSst = savedSub.includes("Math 1") ? "Math 1 (Algebra)" : "Math 2 (Geometry)";
      } else {
        matchedSubject = savedSub || "Science";
      }
      setSubject(matchedSubject);
      setSstDiscipline(matchedSst);

      // Now set the chapter
      if (initialValues.chapter) {
        setChapter(initialValues.chapter);
      } else {
        const boardLessons = PRE_ENTERED_LESSONS[initialBoard] || PRE_ENTERED_LESSONS["CBSE"];
        const subjectLessons = boardLessons[matchedSubject] || [];
        const lessons = (matchedSubject === "Social Studies" || (initialBoard === "SSC" && (matchedSubject === "Science" || matchedSubject === "Mathematics"))) && matchedSst
          ? (subjectLessons as Record<string, string[]>)[matchedSst] || []
          : subjectLessons as string[];
        setChapter(lessons[0] || "");
      }
      setTitle(initialValues.title || "");
      setDescription(initialValues.description || "");
      setContentType(initialValues.content_type || "pdf");
      setResourceUrl(initialValues.resource_url || "");
      setThumbnailUrl(initialValues.thumbnail_url || "");
      setIsFreePreview(!!initialValues.is_free_preview);
      
      setUploadFile(null);
      setUploadStatus("idle");
      setUploadProgress(0);
      setUploadError("");
    } else {
      // Default reset for creation
      const currentBoard = "CBSE";
      setBoard(currentBoard);
      const defaultSubject = BOARD_SUBJECTS[currentBoard][0];
      setSubject(defaultSubject);
      setSstDiscipline("");
      const defaultLessons = PRE_ENTERED_LESSONS[currentBoard][defaultSubject] as string[];
      setChapter(defaultLessons?.[0] || "");
      setTitle("");
      setDescription("");
      setContentType("pdf");
      setResourceUrl("");
      setThumbnailUrl("");
      setIsFreePreview(false);
    }
  }, [initialValues]);

  // Handlers for selection
  const handleBoardChange = (newBoard: string) => {
    setBoard(newBoard);
    const validSubs = BOARD_SUBJECTS[newBoard] || BOARD_SUBJECTS["CBSE"];
    const defSub = validSubs[0]; // Science
    setSubject(defSub);
    
    if (newBoard === "SSC") {
      setSstDiscipline("Science 1");
      const defaultLessons = PRE_ENTERED_LESSONS["SSC"]?.["Science"]?.["Science 1"] || [];
      setChapter(defaultLessons[0] || "");
    } else {
      setSstDiscipline("");
      const defaultLessons = PRE_ENTERED_LESSONS[newBoard]?.[defSub] || [];
      setChapter((defaultLessons as string[])[0] || "");
    }
  };

  const handleSubjectChange = (newSubject: string) => {
    setSubject(newSubject);
    if (newSubject === "Social Studies") {
      setSstDiscipline("History");
      const defaultLessons = PRE_ENTERED_LESSONS[board]?.[newSubject]?.["History"] || [];
      setChapter(defaultLessons[0] || "");
    } else if (board === "SSC" && newSubject === "Science") {
      setSstDiscipline("Science 1");
      const defaultLessons = PRE_ENTERED_LESSONS["SSC"]?.["Science"]?.["Science 1"] || [];
      setChapter(defaultLessons[0] || "");
    } else if (board === "SSC" && newSubject === "Mathematics") {
      setSstDiscipline("Math 1 (Algebra)");
      const defaultLessons = PRE_ENTERED_LESSONS["SSC"]?.["Mathematics"]?.["Math 1 (Algebra)"] || [];
      setChapter(defaultLessons[0] || "");
    } else {
      setSstDiscipline("");
      const defaultLessons = PRE_ENTERED_LESSONS[board]?.[newSubject] || [];
      setChapter((defaultLessons as string[])[0] || "");
    }
  };

  const handleSstDisciplineChange = (newDiscipline: string) => {
    setSstDiscipline(newDiscipline);
    const defaultLessons = PRE_ENTERED_LESSONS[board]?.[subject]?.[newDiscipline] || [];
    setChapter(defaultLessons[0] || "");
  };

  const getLessonsList = (): string[] => {
    const boardLessons = PRE_ENTERED_LESSONS[board] || PRE_ENTERED_LESSONS["CBSE"];
    const subjectLessons = boardLessons[subject] || [];
    if (subject === "Social Studies") {
      return (subjectLessons as Record<string, string[]>)[sstDiscipline] || [];
    }
    if (board === "SSC" && subject === "Science") {
      return (subjectLessons as Record<string, string[]>)[sstDiscipline] || [];
    }
    if (board === "SSC" && subject === "Mathematics") {
      return (subjectLessons as Record<string, string[]>)[sstDiscipline] || [];
    }
    return subjectLessons as string[];
  };

  // Drop File handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setUploadStatus("idle");
      setUploadProgress(0);
      setUploadError("");
    }
  };

  const executeUploadFile = async () => {
    if (!uploadFile) return null;
    
    setUploadStatus("uploading");
    setUploadProgress(1);
    setUploadError("");

    try {
      const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB slices
      const totalChunks = Math.ceil(uploadFile.size / CHUNK_SIZE);
      const uploadId = "up_" + Date.now() + "_" + Math.random().toString(36).substring(2, 10);
      
      let finalUrl = "";

      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, uploadFile.size);
        const chunk = uploadFile.slice(start, end);

        const formData = new FormData();
        formData.append("file", chunk, uploadFile.name);
        formData.append("uploadId", uploadId);
        formData.append("chunkIndex", String(i));
        formData.append("totalChunks", String(totalChunks));
        formData.append("filename", uploadFile.name);
        formData.append("board", board.toLowerCase());
        const targetSub = subject === "Social Studies" && sstDiscipline ? sstDiscipline : subject;
        formData.append("subject", targetSub.toLowerCase());
        formData.append("chapter", chapter.toLowerCase());
        formData.append("title", title.toLowerCase());

        const res = await fetch("/api/upload-chunk", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          let errorMsg = `Upload failed on piece ${i + 1} of ${totalChunks}.`;
          try {
            const contentType = res.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
              const errJson = await res.json();
              errorMsg = errJson.error || errJson.message || errorMsg;
            } else {
              const errText = await res.text();
              errorMsg = errText.substring(0, 150) || errorMsg;
            }
          } catch {
            // Safe ignore of double-read errors
          }
          throw new Error(errorMsg);
        }

        const contentTypeHeader = res.headers.get("content-type") || "";
        if (!contentTypeHeader.includes("application/json")) {
          const bodyText = await res.text();
          throw new Error(`Server returned non-JSON response style instead of chunk metadata: ${bodyText.substring(0, 150)}`);
        }

        const data = await res.json();
        if (!data.success) {
          throw new Error(data.error || `Upload error on piece ${i + 1} of ${totalChunks}`);
        }

        const currentProgress = Math.round(((i + 1) / totalChunks) * 100);
        setUploadProgress(currentProgress);

        if (data.complete && data.url) {
          finalUrl = data.url;
        }
      }

      if (finalUrl) {
        setUploadStatus("success");
        setResourceUrl(finalUrl);
        return finalUrl;
      } else {
        throw new Error("Assembly complete but backend did not return object URL.");
      }
    } catch (err: any) {
      console.error(err);
      setUploadStatus("error");
      setUploadProgress(0);
      setUploadError(err.message || "Failed to upload file in split segments.");
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalSubject = (subject === "Social Studies" || (board === "SSC" && (subject === "Science" || subject === "Mathematics"))) && sstDiscipline ? sstDiscipline : subject;
    if (!finalSubject.trim() || !chapter.trim() || !title.trim()) {
      alert("Please fill in Subject, Chapter, and Title fields to structure folder namespaces properly.");
      return;
    }

    try {
      let finalUrl = resourceUrl;
      
      // Auto trigger upload first for PDF / Audio / Question Bank if file selected
      if ((contentType === "pdf" || contentType === "audio" || contentType === "question_bank") && uploadFile) {
        finalUrl = await executeUploadFile();
      }

      if (!finalUrl && (contentType === "pdf" || contentType === "audio" || contentType === "question_bank")) {
        alert("Please select and upload a valid PDF, MP3, or Question Bank revision file to storage.");
         return;
      }

      if (!finalUrl) {
         alert("Please enter a valid URL location for your mindmap or game integration.");
         return;
      }

      await onSave({
        board: board.toUpperCase(),
        subject: finalSubject.trim(),
        chapter: chapter.trim(),
        title: title.trim(),
        description: description.trim(),
        content_type: contentType,
        resource_url: finalUrl,
        thumbnail_url: thumbnailUrl.trim(),
        is_free_preview: isFreePreview,
        id: initialValues?.id
      });
    } catch (e) {
      console.error("Save content validation failed:", e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left" id="admin-content-submission-form">
      
      {/* Subject and Chapter inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Board choices dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase text-indigo-950 tracking-wider">Curriculum Board</label>
          <select
            value={board}
            onChange={(e) => handleBoardChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-indigo-200 bg-white text-zinc-900 font-extrabold text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all shadow-sm"
          >
            <option value="CBSE" className="text-zinc-900 font-bold bg-white">CBSE Class 10</option>
            <option value="SSC" className="text-zinc-900 font-bold bg-white">MH-SSC Board</option>
          </select>
        </div>

        {/* Content Type select */}
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase text-indigo-950 tracking-wider">Content Type category</label>
          <select
            value={contentType}
            onChange={(e) => {
              setContentType(e.target.value);
              setResourceUrl("");
              setUploadFile(null);
              setUploadStatus("idle");
              setUploadProgress(0);
            }}
            className="w-full px-4 py-3 border-2 border-indigo-200 bg-white text-zinc-900 font-extrabold text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all shadow-sm"
          >
            <option value="pdf" className="text-zinc-900 font-bold bg-white">📚 Infographics</option>
            <option value="audio" className="text-zinc-900 font-bold bg-white">🎙️  Audio </option>
            <option value="mindmap" className="text-zinc-900 font-bold bg-white">🎨 Interactive Mind Map</option>
            <option value="game" className="text-zinc-900 font-bold bg-white">🧩 Gamified Study Test</option>
            <option value="question_bank" className="text-zinc-900 font-bold bg-white">📝 Question Bank </option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Subject input */}
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase text-indigo-950 tracking-wider">Subject Folder Name</label>
          <select
            value={subject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-indigo-200 bg-white text-zinc-900 font-extrabold text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all shadow-sm"
          >
            {(BOARD_SUBJECTS[board] || BOARD_SUBJECTS["CBSE"]).map((subName) => (
              <option key={subName} value={subName}>{subName}</option>
            ))}
          </select>
        </div>

        {/* Chapter input */}
        <div className="space-y-1.5 font-bold">
          <label className="text-xs font-black uppercase text-indigo-950 tracking-wider block">Chapter / Lesson Name</label>
          <select
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="w-full px-4 py-3 border-2 border-indigo-200 bg-white text-zinc-900 font-extrabold text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all shadow-sm"
          >
            {getLessonsList().map((les) => (
              <option key={les} value={les}>{les}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Social Studies Sub-subject selection */}
      {subject === "Social Studies" && (
        <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-150 space-y-2.5 animate-fadeIn">
          <label className="text-xs font-black uppercase text-indigo-950 tracking-wider block">
            🏛️ Social Studies Sub-subject
          </label>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
            {([
              { key: "History", label: "History 📜" },
              { key: "Geography", label: "Geography 🌍" },
              { key: "Civics", label: board === "SSC" ? "Political Science ⚖️" : "Civics ⚖️" },
              ...(board === "CBSE" ? [{ key: "Economics", label: "Economics 📈" }] : [])
            ]).map((disc) => {
              const active = sstDiscipline === disc.key;
              return (
                <button
                  key={disc.key}
                  type="button"
                  onClick={() => handleSstDisciplineChange(disc.key)}
                  className={`px-4 py-3 text-xs font-black rounded-xl border-2 transition-all cursor-pointer ${
                    active
                      ? "bg-[#5c3beb] text-white border-[#5c3beb] shadow-sm"
                      : "bg-white text-zinc-850 border-indigo-200 hover:bg-indigo-50/50"
                  }`}
                >
                  {disc.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SSC Science Part selection */}
      {board === "SSC" && subject === "Science" && (
        <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-150 space-y-2.5 animate-fadeIn">
          <label className="text-xs font-black uppercase text-indigo-950 tracking-wider block">
            🧪 Science Part Option
          </label>
          <div className="grid gap-3 grid-cols-2">
            {[
              { key: "Science 1", label: "Science 1 (Physics/Chem) 🧪" },
              { key: "Science 2", label: "Science 2 (Biology/EVS) 🧬" }
            ].map((disc) => {
              const active = sstDiscipline === disc.key;
              return (
                <button
                  key={disc.key}
                  type="button"
                  onClick={() => handleSstDisciplineChange(disc.key)}
                  className={`px-4 py-3 text-xs font-black rounded-xl border-2 transition-all cursor-pointer ${
                    active
                      ? "bg-[#5c3beb] text-white border-[#5c3beb] shadow-sm"
                      : "bg-white text-zinc-850 border-indigo-200 hover:bg-indigo-50/50"
                  }`}
                >
                  {disc.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SSC Mathematics Part selection */}
      {board === "SSC" && subject === "Mathematics" && (
        <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-150 space-y-2.5 animate-fadeIn">
          <label className="text-xs font-black uppercase text-indigo-950 tracking-wider block">
            📐 Mathematics Part Option
          </label>
          <div className="grid gap-3 grid-cols-2">
            {[
              { key: "Math 1 (Algebra)", label: "Math 1 (Algebra) 📈" },
              { key: "Math 2 (Geometry)", label: "Math 2 (Geometry) 📐" }
            ].map((disc) => {
              const active = sstDiscipline === disc.key;
              return (
                <button
                  key={disc.key}
                  type="button"
                  onClick={() => handleSstDisciplineChange(disc.key)}
                  className={`px-4 py-3 text-xs font-black rounded-xl border-2 transition-all cursor-pointer ${
                    active
                      ? "bg-[#5c3beb] text-white border-[#5c3beb] shadow-sm"
                      : "bg-white text-zinc-850 border-indigo-200 hover:bg-indigo-50/50"
                  }`}
                >
                  {disc.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Title input */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase text-indigo-950 tracking-wider">Resource Display Title</label>
        <input
          type="text"
          required
          placeholder="e.g. Reflection Detailed Formula Sheet, gravitation board notes"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border-2 border-indigo-200 bg-white text-zinc-900 font-extrabold text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all shadow-sm placeholder-zinc-400"
        />
      </div>

      {/* Description text area */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase text-indigo-950 tracking-wider">Short description (Optional)</label>
        <textarea
          rows={3}
          placeholder="e.g. Learn Kepler laws of motion, gravitation acceleration constants and formulas with visual details."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 border-2 border-indigo-200 bg-white text-zinc-900 font-extrabold text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all shadow-sm resize-none placeholder-zinc-400 leading-relaxed"
        />
      </div>

      {/* Free Preview Toggle */}
      <div className="flex items-center gap-3 p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl">
        <input
          type="checkbox"
          id="is-free-preview-checkbox"
          checked={isFreePreview}
          onChange={(e) => setIsFreePreview(e.target.checked)}
          className="w-5 h-5 accent-amber-600 rounded cursor-pointer border-2 border-amber-300"
        />
        <div className="space-y-0.5">
          <label htmlFor="is-free-preview-checkbox" className="text-xs font-black uppercase text-amber-950 tracking-wider cursor-pointer">
            ★ Mark as Free Preview Material
          </label>
          <p className="text-[11px] text-amber-800 font-bold leading-normal">
            Marking this option enables this material to appear on the landing page's "Free Preview" click widgets. It will be completely non-downloadable for users.
          </p>
        </div>
      </div>

      {/* CONDITIONAL MEDIA FIELDS */}
      <div className="space-y-4 pt-4 border-t-2 border-indigo-100">
        
        {(contentType === "mindmap" || contentType === "game") && (
          <div className="space-y-2">
            <h5 className="text-[11px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-1.5">
              <span>★ EXTERNAL REDIRECT INTEGRATION LINK</span>
            </h5>
            <label className="text-xs font-black uppercase text-indigo-950 tracking-wider">
              {contentType === "mindmap" ? "Visual Mindmap Embed/Redirect URL" : "Interactive Gameplay Redirect Link"}
            </label>
            <input
              type="url"
              required
              placeholder={contentType === "mindmap" ? "e.g. https://lovable.dev/editor/mindmap-light" : "e.g. https://poki.com/en/g/refraction"}
              value={resourceUrl}
              onChange={(e) => setResourceUrl(e.target.value)}
              className="w-full px-4 py-3 border-2 border-indigo-200 bg-white text-zinc-900 font-bold text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all font-mono shadow-sm"
            />
          </div>
        )}

        {(contentType === "pdf" || contentType === "audio" || contentType === "question_bank") && (
          <div className="space-y-3">
            <h5 className="text-[11px] font-black text-violet-700 uppercase tracking-widest flex items-center gap-1.5">
              <span>✦ CLOUDFLARE R2 FILE UPLOAD INTERFACE</span>
            </h5>
            
            <div className="p-6 border-2 border-dashed border-indigo-300 rounded-3xl bg-violet-50/50 hover:bg-violet-50 transition-all text-center space-y-3.5 relative shadow-xs">
              <label className="cursor-pointer block space-y-2">
                <input
                  type="file"
                  accept={
                    contentType === "pdf" 
                      ? ".pdf, image/png, image/jpeg, image/*, .png, .jpg, .jpeg" 
                      : contentType === "audio" 
                      ? "audio/*, .mp3" 
                      : ".pdf, image/*, .doc, .docx, .xls, .xlsx"
                  }
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center text-xl mx-auto text-[#5c3beb] shadow-inner">
                  {contentType === "pdf" ? "📚" : contentType === "audio" ? "🎙️" : "📝"}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black text-indigo-950">
                    {uploadFile ? uploadFile.name : `Choose class10 ${contentType.toUpperCase()} list asset file`}
                  </p>
                  <p className="text-xs text-indigo-600 font-bold">
                    {uploadFile 
                      ? `${(uploadFile.size / (1024 * 1024)).toFixed(2)} MB` 
                      : contentType === "question_bank" 
                      ? "Drag & Drop or click to browse (PDF, Images, Word documents)" 
                      : contentType === "pdf"
                      ? "Drag & Drop or click to browse local files (PDF, PNG, JPG/JPEG)"
                      : "Drag & Drop folder file or click to browse local files (PDF or MP3)"}
                  </p>
                </div>
              </label>

              {/* Progress feedback */}
              <UploadProgress
                progress={uploadProgress}
                fileName={uploadFile?.name}
                status={uploadStatus}
                errorMsg={uploadError}
              />
            </div>

            {/* Path visualization tracker */}
            {subject.trim() && chapter.trim() && title.trim() && (
              <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-xl text-[11px] font-mono text-indigo-900 space-y-1 text-left">
                <span className="font-extrabold uppercase text-[9px] text-violet-700 tracking-wider">Cloudflare R2 target object directory key:</span>
                <p className="truncate font-bold">
                  class10/{board.toLowerCase()}/{subject.toLowerCase().replace(/[^a-z0-9]/g, "")}/{chapter.toLowerCase().replace(/[^a-z0-9]/g, "")}/{title.toLowerCase().replace(/[^a-z0-9-_]/g, "_")}{uploadFile ? uploadFile.name.substring(uploadFile.name.lastIndexOf('.')) : (contentType === "pdf" ? ".pdf" : contentType === "audio" ? ".mp3" : ".pdf")}
                </p>
              </div>
            )}

            {resourceUrl && !uploadFile && (
              <div className="flex items-center gap-1.5 p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-bold">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <p className="truncate">Resource linked: <span className="font-mono text-emerald-700">{resourceUrl}</span></p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Button action area */}
      <div className="flex items-center gap-3 pt-5 border-t-2 border-indigo-150 font-bold shrink-0">
        <button
          type="submit"
          className="flex-1 py-4 px-6 bg-[#5c3beb] hover:bg-[#4a2ec2] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-95 text-center flex items-center justify-center gap-2"
          disabled={isLoading || uploadStatus === "uploading"}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Saving Content...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 text-white" />
              <span>{isEditing ? "Save Updated Content" : "Publish to Student Catalog"}</span>
            </>
          )}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading || uploadStatus === "uploading"}
            className="px-6 py-4 bg-white hover:bg-neutral-50 border-2 border-indigo-150 text-indigo-950 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-colors shrink-0 shadow-sm"
          >
            Cancel
          </button>
        )}
      </div>

    </form>
  );
}
