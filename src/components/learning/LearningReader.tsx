import React, { useState } from 'react';
import { Chapter, Subject } from '../../types';
import { soundEngine } from '../../lib/sound';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Volume2,
  VolumeX,
  Sparkles,
  Share2,
  Bookmark,
  Award,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Play
} from 'lucide-react';

interface LearningReaderProps {
  subject: Subject;
  chapter: Chapter;
  onBack: () => void;
  onLaunchQuiz: (quizId: string) => void;
}

export const LearningReader: React.FC<LearningReaderProps> = ({
  subject,
  chapter,
  onBack,
  onLaunchQuiz,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const fontSizeClass = {
    normal: 'text-sm sm:text-base leading-relaxed',
    large: 'text-base sm:text-lg leading-loose',
    xlarge: 'text-lg sm:text-xl leading-loose',
  }[fontSize];

  const toggleNarrator = () => {
    setIsPlayingAudio(!isPlayingAudio);
    soundEngine.playConfirm();
    if (!isPlayingAudio && 'speechSynthesis' in window) {
      const plainText = chapter.content.replace(/[#*`$\\]/g, '');
      const utterance = new SpeechSynthesisUtterance(
        `Bab ${chapter.chapterNumber}: ${chapter.title}. ${plainText.slice(0, 300)}`
      );
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } else if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Floating Action Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => {
              if (window.speechSynthesis) window.speechSynthesis.cancel();
              onBack();
              soundEngine.playConfirm();
            }}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-sky-600 bg-slate-100 hover:bg-sky-50 px-3 py-1.5 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Pelajaran</span>
          </button>

          <div className="hidden sm:block text-center truncate max-w-xs">
            <span className="text-[10px] font-bold text-sky-600 uppercase block">{subject.title}</span>
            <span className="text-xs font-extrabold text-slate-800 truncate block">Bab {chapter.chapterNumber}: {chapter.title}</span>
          </div>

          {/* Reader Controls */}
          <div className="flex items-center gap-2">
            {/* Font Size Adjuster */}
            <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 text-xs font-bold rounded-lg ${fontSize === 'normal' ? 'bg-white shadow-xs text-sky-600' : 'text-slate-500'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 text-sm font-bold rounded-lg ${fontSize === 'large' ? 'bg-white shadow-xs text-sky-600' : 'text-slate-500'}`}
              >
                A+
              </button>
            </div>

            {/* Audio Narrator Simulator */}
            <button
              onClick={toggleNarrator}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                isPlayingAudio
                  ? 'bg-sky-500 text-white border-sky-600 shadow-sm animate-pulse'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="Dengarkan Suara Pembaca Narasi"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden md:inline">{isPlayingAudio ? 'Membaca...' : 'Dengarkan'}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => {
                setIsBookmarked(!isBookmarked);
                soundEngine.playConfirm();
              }}
              className={`p-2 rounded-xl border transition-all ${
                isBookmarked ? 'bg-amber-50 text-amber-600 border-amber-300' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl w-full mx-auto px-4 py-8 flex-1">
        {/* Chapter Header Banner */}
        <div className="bg-gradient-to-br from-sky-50 via-indigo-50/50 to-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm mb-8">
          <div className="flex items-center gap-2 text-xs font-extrabold text-sky-600 uppercase tracking-wider mb-2">
            <span>{subject.educationLevel}</span>
            <span>•</span>
            <span>Bab {chapter.chapterNumber} dari {subject.totalLessons}</span>
            <span>•</span>
            <span>⏱️ {chapter.durationMinutes} Menit</span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight">
            {chapter.title}
          </h1>
          <p className="text-sm text-slate-600 mt-2 font-medium">{chapter.description}</p>
        </div>

        {/* Rich Lesson Body */}
        <div className={`bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm text-slate-800 space-y-6 ${fontSizeClass}`}>
          <div className="prose max-w-none">
            {chapter.content.split('\n\n').map((block, idx) => {
              if (block.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-display font-bold text-xl text-slate-900 mt-6 mb-3 flex items-center gap-2">
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              if (block.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="font-display font-bold text-base text-slate-800 mt-4 mb-2">
                    {block.replace('#### ', '')}
                  </h4>
                );
              }
              if (block.startsWith('```')) {
                const code = block.replace(/```[a-z]*\n?/g, '');
                return (
                  <div key={idx} className="my-4 p-4 rounded-2xl bg-slate-900 text-sky-200 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner border border-slate-800">
                    <pre>{code}</pre>
                  </div>
                );
              }
              return (
                <p key={idx} className="text-slate-700 leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Key Takeaways Box */}
          {chapter.keyPoints && chapter.keyPoints.length > 0 && (
            <div className="bg-sky-50/80 border-2 border-sky-100 rounded-2xl p-5 sm:p-6 my-6 space-y-2.5">
              <h4 className="font-display font-bold text-sm text-sky-900 flex items-center gap-2 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Poin-Poin Kunci yang Harus Diingat:</span>
              </h4>
              <ul className="space-y-2">
                {chapter.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-sky-950 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Practical Examples */}
          {chapter.examples && chapter.examples.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="font-display font-bold text-base text-slate-800 flex items-center gap-2">
                <span>💡 Contoh Penerapan Soal / Kasus</span>
              </h4>
              {chapter.examples.map((ex, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
                  <div className="font-bold text-slate-800">{ex.title}</div>
                  <p className="text-slate-600">{ex.explanation}</p>
                  {ex.codeOrFormula && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-indigo-700 font-semibold overflow-x-auto">
                      {ex.codeOrFormula}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Actions (Launch Quiz) */}
        <div className="mt-8 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-200">
              Sudah Paham Materinya?
            </span>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl mt-0.5">
              Uji Kemampuanmu di Kuis Bab {chapter.chapterNumber}
            </h3>
            <p className="text-xs text-sky-100 mt-1">
              5 Nyawa • Dapatkan bonus hingga +250 Poin & Buka Kotak Reward 3D!
            </p>
          </div>

          <button
            onClick={() => {
              if (chapter.quizId) {
                onLaunchQuiz(chapter.quizId);
              } else {
                onLaunchQuiz('quiz_rpl_01');
              }
              soundEngine.playConfirm();
            }}
            className="px-8 py-4 bg-white text-slate-900 font-black text-sm rounded-2xl shadow-lg hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shrink-0"
          >
            <span>Mulai Kuis Interaktif</span>
            <Play className="w-4 h-4 fill-slate-900" />
          </button>
        </div>
      </div>
    </div>
  );
};
