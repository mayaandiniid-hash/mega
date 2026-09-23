import React, { useState } from 'react';
import { db } from '../../lib/storage';
import { soundEngine } from '../../lib/sound';
import { Quiz } from '../../types';
import { Icon3DSparkles, Icon3DHeart, Icon3DTrophy } from '../common/3dIcons';
import {
  Sparkles,
  Play,
  Clock,
  Award,
  Filter,
  Search,
  BookOpen,
  CheckCircle2,
  Flame,
  Zap
} from 'lucide-react';

interface QuizBankPageProps {
  onLaunchQuiz: (quizId: string) => void;
}

export const QuizBankPage: React.FC<QuizBankPageProps> = ({ onLaunchQuiz }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>(db.getQuizzes());
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuizzes = quizzes.filter((q) => {
    const matchesLevel = filterLevel === 'ALL' || q.educationLevel === filterLevel;
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.subjectTitle && q.subjectTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.description && q.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-sky-600 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4" />
            <span>Bank Soal & Tryout Interaktif</span>
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-0.5">
            Kuis & Uji Kompetensi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Pilih paket soal berdasarkan kurikulummu, pertahankan 5 nyawa, dan kumpulkan poin reward!
          </p>
        </div>

        {/* Quick Start Featured */}
        <button
          onClick={() => {
            onLaunchQuiz('quiz_rpl_01');
            soundEngine.playConfirm();
          }}
          className="px-6 py-3 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg hover:shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Mulai Kuis Cepat Harian</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama kuis atau materi..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:border-sky-500 outline-none text-xs font-semibold text-slate-800"
          />
        </div>

        {/* Level Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto no-scrollbar">
          {['ALL', 'SMK', 'SMA', 'SMP', 'SD', 'KULIAH'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setFilterLevel(lvl);
                soundEngine.playConfirm();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterLevel === lvl
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lvl === 'ALL' ? 'Semua Jenjang' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-card-elevated hover:shadow-3d hover:border-sky-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 bg-sky-50 text-sky-700 text-[10px] font-black rounded-lg uppercase">
                  {quiz.educationLevel} • {quiz.grade || 'Umum'}
                </span>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-[10px] font-bold rounded-lg border border-amber-200">
                  +{quiz.rewardPoints} Pts
                </span>
              </div>

              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {quiz.subjectTitle}
              </div>
              <h3 className="font-display font-bold text-base text-slate-800 group-hover:text-sky-700 transition-colors mt-0.5">
                {quiz.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {quiz.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                  <span>{quiz.questions.length} Soal</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>~{quiz.timeLimitMinutes} Menit</span>
                </span>
              </div>

              <button
                onClick={() => {
                  onLaunchQuiz(quiz.id);
                  soundEngine.playConfirm();
                }}
                className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs rounded-xl shadow-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Kerjakan</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
