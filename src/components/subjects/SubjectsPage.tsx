import React, { useState, useEffect } from 'react';
import { useAuth } from '../../lib/authContext';
import { db } from '../../lib/storage';
import { soundEngine } from '../../lib/sound';
import { Subject, Chapter, EducationLevelType } from '../../types';
import { Icon3DBook, Icon3DSparkles } from '../common/3dIcons';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  Clock,
  Award,
  ChevronRight,
  Filter,
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';

interface SubjectsPageProps {
  onOpenReader: (subject: Subject, chapter: Chapter) => void;
  onLaunchQuiz: (quizId: string) => void;
  selectedSubjectId?: string;
}

export const SubjectsPage: React.FC<SubjectsPageProps> = ({
  onOpenReader,
  onLaunchQuiz,
  selectedSubjectId,
}) => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<EducationLevelType>(
    user?.profile?.educationLevel || 'SMK'
  );
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);

  useEffect(() => {
    const all = db.getSubjects();
    setSubjects(all);
    if (selectedSubjectId) {
      const found = all.find((s) => s.id === selectedSubjectId);
      if (found) {
        setActiveSubject(found);
        setSelectedLevel(found.educationLevel);
        return;
      }
    }
    const filtered = all.filter((s) => s.educationLevel === selectedLevel);
    setActiveSubject(filtered[0] || all[0] || null);
  }, [selectedLevel, selectedSubjectId]);

  const levelOptions: { key: EducationLevelType; label: string }[] = [
    { key: 'SD', label: 'SD / MI' },
    { key: 'SMP', label: 'SMP / MTs' },
    { key: 'SMA', label: 'SMA' },
    { key: 'SMK', label: 'SMK Vokasi' },
    { key: 'KULIAH', label: 'Perguruan Tinggi' },
  ];

  const currentLevelSubjects = subjects.filter((s) => s.educationLevel === selectedLevel);

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-sky-600 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            <span>Kurikulum Terintegrasi Nasional</span>
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-0.5">
            Mata Pelajaran & Materi Belajar
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Akses rangkuman bab terstruktur, contoh studi kasus interaktif, dan kuis uji kompetensi.
          </p>
        </div>

        {/* Level Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {levelOptions.map((lvl) => (
            <button
              key={lvl.key}
              onClick={() => {
                setSelectedLevel(lvl.key);
                soundEngine.playConfirm();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedLevel === lvl.key
                  ? 'bg-white text-sky-700 shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Subject Carousel */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Daftar Pelajaran ({currentLevelSubjects.length})
          </span>
          <span className="text-xs text-slate-400">Pilih mata pelajaran untuk melihat 8 bab</span>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {currentLevelSubjects.map((s) => {
            const isSelected = activeSubject?.id === s.id;
            return (
              <div
                key={s.id}
                onClick={() => {
                  setActiveSubject(s);
                  soundEngine.playConfirm();
                }}
                className={`min-w-[260px] sm:min-w-[300px] rounded-3xl p-5 border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-sky-50 to-indigo-50/70 border-sky-500 shadow-3d scale-[1.02]'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center">
                      <Icon3DBook size={24} />
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {s.grade || s.category}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-slate-800 line-clamp-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{s.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60">
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                    <span>{s.completedLessons}/{s.totalLessons} Bab</span>
                    <span className="text-sky-700 font-extrabold">{s.progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full"
                      style={{ width: `${s.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Subject Detailed View (All 8 Chapters) */}
      {activeSubject && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Header Banner for Selected Subject */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 bg-sky-100 text-sky-800 text-[10px] font-extrabold rounded-md uppercase">
                  {activeSubject.code}
                </span>
                <span className="text-xs font-semibold text-slate-400">•</span>
                <span className="text-xs font-bold text-slate-600">{activeSubject.educationLevel} ({activeSubject.grade || 'Umum'})</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                {activeSubject.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1 leading-relaxed">
                {activeSubject.description}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 shrink-0">
              <div className="text-center px-2">
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Bab</div>
                <div className="font-extrabold text-lg text-slate-800">{activeSubject.totalLessons}</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center px-2">
                <div className="text-[10px] uppercase font-bold text-slate-400">Selesai</div>
                <div className="font-extrabold text-lg text-sky-600">{activeSubject.completedLessons}</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center px-2">
                <div className="text-[10px] uppercase font-bold text-slate-400">Rata-rata</div>
                <div className="font-extrabold text-lg text-emerald-600">{activeSubject.averageScore}%</div>
              </div>
            </div>
          </div>

          {/* Chapters List (8 Chapters) */}
          <div className="space-y-3.5">
            <h4 className="font-display font-bold text-base text-slate-800 flex items-center justify-between">
              <span>Kurikulum 8 Bab Pembelajaran:</span>
              <span className="text-xs font-semibold text-slate-400">Pilih materi untuk mulai membaca</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {activeSubject.chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    chapter.isCompleted
                      ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300'
                      : 'bg-slate-50/60 border-slate-200 hover:border-sky-300 hover:bg-white shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                        BAB {chapter.chapterNumber}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{chapter.durationMinutes}m</span>
                        </span>
                        {chapter.isCompleted && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Skor {chapter.score || 90}%</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <h5 className="font-bold text-sm sm:text-base text-slate-800 line-clamp-1">
                      {chapter.title}
                    </h5>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {chapter.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        onOpenReader(activeSubject, chapter);
                        soundEngine.playConfirm();
                      }}
                      className="px-4 py-2 bg-white hover:bg-sky-50 text-sky-700 font-bold text-xs rounded-xl border border-sky-200 shadow-xs flex items-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Baca Materi</span>
                    </button>

                    <button
                      onClick={() => {
                        if (chapter.quizId) {
                          onLaunchQuiz(chapter.quizId);
                        } else {
                          onLaunchQuiz('quiz_rpl_01');
                        }
                        soundEngine.playConfirm();
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Kuis Bab</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
