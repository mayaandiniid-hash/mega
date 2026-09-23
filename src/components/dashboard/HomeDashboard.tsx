import React, { useState, useEffect } from 'react';
import { useAuth } from '../../lib/authContext';
import { db } from '../../lib/storage';
import { soundEngine } from '../../lib/sound';
import {
  Icon3DHome,
  Icon3DBook,
  Icon3DTrophy,
  Icon3DGamebox,
  Icon3DHistory,
  Icon3DGames,
  Icon3DWallet,
  Icon3DHelp,
  Icon3DSparkles,
  Icon3DFlame
} from '../common/3dIcons';
import { AurelAvatar } from '../common/AurelAvatar';
import { Subject, QuizAttempt, GameItem, LeaderboardUser } from '../../types';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  Flame,
  Award,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  Zap,
  Target
} from 'lucide-react';

interface HomeDashboardProps {
  onNavigate: (tab: string, extra?: Record<string, unknown>) => void;
  onOpenSearch: () => void;
  onLaunchQuiz: (quizId: string) => void;
  onOpenSubject: (subjectId: string) => void;
  onLaunchGame: (gameId: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigate,
  onOpenSearch,
  onLaunchQuiz,
  onOpenSubject,
  onLaunchGame,
}) => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isBannerHovered, setIsBannerHovered] = useState(false);

  useEffect(() => {
    setSubjects(db.getSubjects());
    setAttempts(db.getQuizAttempts());
    setLeaderboard(db.getLeaderboard());
  }, []);

  // Filter subjects matching user's education level or major
  const userLevel = user?.profile?.educationLevel || 'SMK';
  const relevantSubjects = subjects.filter((s) => {
    if (s.educationLevel === userLevel) return true;
    return true; // Fallback to showcase curriculum
  });

  // Promotional Banners (Exactly 3)
  const promoBanners = [
    {
      id: 1,
      title: 'Belajar Hari Ini, Raih Poin Lebih Banyak! 🚀',
      subtitle: 'Selesaikan 1 kuis harian untuk melipatgandakan multiplier bonus streak 7 hari.',
      badge: 'Tantangan Harian',
      bgGradient: 'from-sky-500 via-blue-600 to-indigo-600',
      actionText: 'Mulai Kuis Cepat',
      actionTab: 'quiz',
      quizId: 'quiz_rpl_01',
    },
    {
      id: 2,
      title: 'Buka Peti Reward 3D Gamebox Emas 🎁',
      subtitle: 'Capai target 10.000 poin dan tukarkan langsung dengan saldo digital GoPay atau DANA.',
      badge: 'Hadiah Spesial',
      bgGradient: 'from-amber-500 via-orange-500 to-rose-500',
      actionText: 'Lihat Peti Hadiah',
      actionTab: 'rewards',
    },
    {
      id: 3,
      title: 'Naikkan Peringkatmu di Leaderboard Nasional 🏆',
      subtitle: 'Tunjukkan keunggulan sekolahmu di jajaran 10 besar pelajar berprestasi se-Indonesia.',
      badge: 'Leaderboard Aktif',
      bgGradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      actionText: 'Lihat Klasemen',
      actionTab: 'ranking',
    },
  ];

  // Auto slide promo banners every 5s
  useEffect(() => {
    if (isBannerHovered) return;
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % promoBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isBannerHovered, promoBanners.length]);

  // Quick Action Buttons
  const quickActions = [
    { id: 'subjects', label: 'Belajar', icon: Icon3DBook, bg: 'bg-blue-50 text-blue-700' },
    { id: 'quiz', label: 'Soal Kuis', icon: Icon3DSparkles, bg: 'bg-indigo-50 text-indigo-700' },
    { id: 'ranking', label: 'Ranking', icon: Icon3DTrophy, bg: 'bg-amber-50 text-amber-700' },
    { id: 'rewards', label: 'Reward 3D', icon: Icon3DGamebox, bg: 'bg-rose-50 text-rose-700' },
    { id: 'history', label: 'Riwayat', icon: Icon3DHistory, bg: 'bg-sky-50 text-sky-700' },
    { id: 'games', label: 'Games', icon: Icon3DGames, bg: 'bg-purple-50 text-purple-700' },
    { id: 'transactions', label: 'Transaksi', icon: Icon3DWallet, bg: 'bg-emerald-50 text-emerald-700' },
    { id: 'help', label: 'Bantuan', icon: Icon3DHelp, bg: 'bg-cyan-50 text-cyan-700' },
  ];

  // User details
  const profileName = user?.profile?.fullName || user?.username || 'David Pratama';
  const educationTag = `${user?.profile?.educationLevel || 'SMK'} — ${
    user?.profile?.major
      ? user.profile.major.split('(')[1]?.replace(')', '') || user.profile.major
      : user?.profile?.studyProgram || user?.profile?.grade || 'RPL'
  }`;
  const currentDate = '23 September 2026';

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* 1. PROFILE BANNER */}
      <section className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        {/* Ambient background lights */}
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-sky-300/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* User info */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative shrink-0">
              <img
                src={user?.profile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={profileName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/80 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-amber-400 text-amber-950 font-black text-[10px] rounded-md shadow-xs">
                PRO
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-sky-200">{currentDate}</span>
                <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full font-bold text-white backdrop-blur-xs">
                  {user?.role === 'ADMIN' ? 'Administrator' : 'Student Account'}
                </span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-0.5">
                {profileName}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-sky-100 flex items-center gap-1.5 mt-0.5">
                <span>{educationTag}</span>
                <span>•</span>
                <span className="text-sky-200">{user?.profile?.schoolName || user?.profile?.university || 'SMKN 1 Jakarta'}</span>
              </p>
            </div>
          </div>

          {/* Points & Rank Badges */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/20 pt-3 sm:pt-0">
            {/* Points */}
            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center flex-1 sm:flex-initial">
              <div className="text-[10px] uppercase tracking-wider font-bold text-sky-200 flex items-center justify-center gap-1">
                <span>🪙 Total Poin</span>
              </div>
              <div className="font-display font-black text-xl sm:text-2xl text-amber-300">
                {user ? user.points.toLocaleString() : '12,850'}
              </div>
            </div>

            {/* Rank # */}
            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center flex-1 sm:flex-initial">
              <div className="text-[10px] uppercase tracking-wider font-bold text-sky-200 flex items-center justify-center gap-1">
                <Award className="w-3 h-3 text-amber-300" />
                <span>Peringkat</span>
              </div>
              <div className="font-display font-black text-xl sm:text-2xl text-white">
                #24 <span className="text-xs font-semibold text-sky-200">Nasional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH BAR PANEL */}
      <section>
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-full bg-white hover:bg-slate-50 border-2 border-sky-100 hover:border-sky-300 rounded-3xl p-3.5 sm:p-4 shadow-sm flex items-center justify-between text-left transition-all group"
        >
          <div className="flex items-center gap-3.5 pl-2">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-slate-800">
                Cari mata pelajaran, materi, soal, atau game...
              </div>
              <div className="text-xs text-slate-400">Ketik kata kunci untuk pencarian instan kurikulum</div>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 bg-sky-50 text-sky-700 rounded-xl text-xs font-bold border border-sky-200 mr-2">
            <span>Cari Sekarang</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </button>
      </section>

      {/* 3. QUICK ACTIONS (Horizontally Scrollable 3D Circular Buttons) */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-display font-extrabold text-base text-slate-800">Menu Cepat</h3>
          <span className="text-xs text-slate-400 font-semibold">Geser ke kanan →</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {quickActions.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  soundEngine.playConfirm();
                }}
                className="flex flex-col items-center shrink-0 w-20 sm:w-24 group"
              >
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-white border-2 border-slate-100 shadow-card-elevated hover:shadow-3d group-hover:border-sky-300 group-hover:-translate-y-1 transition-all flex items-center justify-center">
                  <Icon size={32} />
                </div>
                <span className="text-xs font-bold text-slate-700 mt-2 text-center group-hover:text-sky-600 transition-colors">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. THREE PROMOTIONAL BANNERS (Auto-sliding + Swipe + Dots) */}
      <section
        onMouseEnter={() => setIsBannerHovered(true)}
        onMouseLeave={() => setIsBannerHovered(false)}
        className="relative"
      >
        <div className="overflow-hidden rounded-3xl shadow-lg relative">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
          >
            {promoBanners.map((banner) => (
              <div
                key={banner.id}
                className={`min-w-full p-6 sm:p-8 bg-gradient-to-r ${banner.bgGradient} text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden`}
              >
                <div className="relative z-10 max-w-lg">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-2">
                    {banner.badge}
                  </span>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                    {banner.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 mt-1 font-medium leading-relaxed">
                    {banner.subtitle}
                  </p>
                </div>

                <div className="relative z-10 shrink-0 mt-2 sm:mt-0">
                  <button
                    onClick={() => {
                      if (banner.quizId) {
                        onLaunchQuiz(banner.quizId);
                      } else {
                        onNavigate(banner.actionTab);
                      }
                      soundEngine.playConfirm();
                    }}
                    className="px-6 py-3 bg-white text-slate-900 font-extrabold text-xs sm:text-sm rounded-2xl shadow-md hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <span>{banner.actionText}</span>
                    <ArrowRight className="w-4 h-4 text-sky-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Banner Left/Right arrows */}
          <button
            onClick={() =>
              setCurrentBannerIndex((prev) => (prev === 0 ? promoBanners.length - 1 : prev - 1))
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-xs flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentBannerIndex((prev) => (prev + 1) % promoBanners.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-xs flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {promoBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBannerIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentBannerIndex === idx ? 'w-6 bg-sky-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 5. PROGRESS ANALYTICS */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display font-extrabold text-lg text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-600" />
              <span>Analitik Kemajuan Belajar</span>
            </h3>
            <p className="text-xs text-slate-500">Aktivitas dan akurasi pengerjaan materi bulan September 2026</p>
          </div>
          <span className="text-xs px-3 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-200">
            +18% Lebih Rajin
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
            <div className="text-xs text-sky-700 font-bold">Materi Selesai</div>
            <div className="font-display font-extrabold text-2xl text-sky-900 mt-1">18 Bab</div>
            <div className="text-[10px] text-sky-600 mt-0.5">Dari 24 total materi aktif</div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
            <div className="text-xs text-indigo-700 font-bold">Akurasi Kuis</div>
            <div className="font-display font-extrabold text-2xl text-indigo-900 mt-1">92.4%</div>
            <div className="text-[10px] text-indigo-600 mt-0.5">Rata-rata 5 kuis terakhir</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
            <div className="text-xs text-amber-700 font-bold">Streak Harian</div>
            <div className="font-display font-extrabold text-2xl text-amber-900 mt-1 flex items-center gap-1">
              <span>{user?.streakDays || 7} Hari</span>
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
            </div>
            <div className="text-[10px] text-amber-600 mt-0.5">Konsisten tanpa putus</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <div className="text-xs text-emerald-700 font-bold">Poin Minggu Ini</div>
            <div className="font-display font-extrabold text-2xl text-emerald-900 mt-1">+1,750</div>
            <div className="text-[10px] text-emerald-600 mt-0.5">Ranking #24 Nasional</div>
          </div>
        </div>

        {/* Weekly Activity Bar Chart Visualization */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
            <span>Aktivitas Jam Belajar Mingguan</span>
            <span className="text-sky-600">Total 14.5 Jam</span>
          </div>
          <div className="grid grid-cols-7 gap-2 items-end h-28 pt-2">
            {[
              { day: 'Sen', hours: 2.1, height: '60%' },
              { day: 'Sel', hours: 2.8, height: '80%' },
              { day: 'Rab', hours: 3.5, height: '100%' },
              { day: 'Kam', hours: 1.8, height: '50%' },
              { day: 'Jum', hours: 2.5, height: '70%' },
              { day: 'Sab', hours: 1.0, height: '30%' },
              { day: 'Min', hours: 0.8, height: '25%' },
            ].map((d, i) => (
              <div key={i} className="flex flex-col items-center h-full justify-end group cursor-pointer">
                <div className="text-[10px] font-bold text-slate-400 group-hover:text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                  {d.hours}h
                </div>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-sky-500 to-indigo-500 group-hover:from-sky-400 group-hover:to-indigo-400 transition-all duration-300"
                  style={{ height: d.height }}
                />
                <span className="text-[11px] font-bold text-slate-500 mt-1">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CURRENT SUBJECTS (Horizontal Scrollable Carousel) */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="font-display font-extrabold text-lg text-slate-800">
              Mata Pelajaran Kamu ({relevantSubjects.length})
            </h3>
            <p className="text-xs text-slate-500">Disesuaikan untuk {userLevel} — {user?.profile?.grade || 'Kelas 11'}</p>
          </div>
          <button
            onClick={() => onNavigate('subjects')}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <span>Semua Kurikulum</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {relevantSubjects.map((s) => (
            <div
              key={s.id}
              onClick={() => {
                onOpenSubject(s.id);
                soundEngine.playConfirm();
              }}
              className="min-w-[280px] sm:min-w-[320px] bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card-elevated hover:shadow-3d hover:border-sky-300 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon3DBook size={28} />
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-full border border-emerald-100">
                    Sedang Berjalan
                  </span>
                </div>

                <div className="text-[11px] font-extrabold text-sky-600 uppercase tracking-wider">
                  {s.category}
                </div>
                <h4 className="font-display font-bold text-base text-slate-800 line-clamp-1 group-hover:text-sky-700 transition-colors">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{s.description}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
                  <span>{s.completedLessons} / {s.totalLessons} Bab Selesai</span>
                  <span className="text-sky-700 font-extrabold">{s.progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full"
                    style={{ width: `${s.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. RECOMMENDED LEARNING */}
      <section className="bg-gradient-to-br from-indigo-50/70 via-sky-50/50 to-white rounded-3xl p-6 border border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AurelAvatar mood="happy" size="sm" showClouds={false} />
            <div>
              <h3 className="font-display font-extrabold text-base text-slate-800">
                Rekomendasi Pintar Aurel
              </h3>
              <p className="text-xs text-slate-500">Berdasarkan minat Artificial Intelligence & gaya belajarmu</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 text-[10px] font-black rounded-full uppercase">
            AI Personalized
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div
            onClick={() => {
              onLaunchQuiz('quiz_rpl_01');
              soundEngine.playConfirm();
            }}
            className="p-4 bg-white rounded-2xl border border-indigo-100 hover:border-indigo-300 shadow-sm hover:shadow-md cursor-pointer transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase">Lanjutkan Materi</span>
              <h4 className="font-bold text-sm text-slate-800 group-hover:text-indigo-700">
                Arsitektur Web Modern & DOM
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">Kuis Bab 1 (+250 Bonus Poin)</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0 ml-2">
              <Play className="w-4 h-4" />
            </div>
          </div>

          <div
            onClick={() => {
              onLaunchQuiz('quiz_mat_01');
              soundEngine.playConfirm();
            }}
            className="p-4 bg-white rounded-2xl border border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-md cursor-pointer transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-[10px] font-bold text-sky-600 uppercase">Tingkatkan Skor</span>
              <h4 className="font-bold text-sm text-slate-800 group-hover:text-sky-700">
                Limit Fungsi Trigonometri
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">Uji pemahaman kalkulus lanjut</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all shrink-0 ml-2">
              <Target className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. MINI GAMES HUB PREVIEW */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="font-display font-extrabold text-lg text-slate-800 flex items-center gap-2">
              <Icon3DGames size={24} />
              <span>Arena Game Edukasi</span>
            </h3>
            <p className="text-xs text-slate-500">Asah kecepatan berpikir dan raih koin reward ekstra</p>
          </div>
          <button
            onClick={() => onNavigate('games')}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <span>Semua Game</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              id: 'game_speed_math',
              title: 'Speed Math Arena',
              desc: 'Tantangan hitung cepat 30 detik',
              pts: '+300 Poin',
              bg: 'from-amber-500 to-orange-600',
              icon: '⚡',
            },
            {
              id: 'game_word_master',
              title: 'Word Challenge',
              desc: 'Tebak kosakata sains & bahasa',
              pts: '+250 Poin',
              bg: 'from-blue-500 to-indigo-600',
              icon: '📖',
            },
            {
              id: 'game_code_trivia',
              title: 'Tech & AI Code Sprint',
              desc: 'Algoritma & logika pemrograman',
              pts: '+450 Poin',
              bg: 'from-emerald-500 to-teal-600',
              icon: '💻',
            },
          ].map((game) => (
            <div
              key={game.id}
              onClick={() => {
                onLaunchGame(game.id);
                soundEngine.playConfirm();
              }}
              className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card-elevated hover:shadow-3d hover:border-sky-300 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{game.icon}</span>
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-[11px] font-black rounded-full border border-amber-200">
                    {game.pts}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 text-base group-hover:text-sky-700 transition-colors">
                  {game.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">{game.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
                <span>Mainkan Sekarang</span>
                <Play className="w-4 h-4 fill-sky-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. RANKING PREVIEW (Top 3 Podium) */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-extrabold text-lg text-slate-800 flex items-center gap-2">
              <Icon3DTrophy size={24} />
              <span>Klasemen Nasional Pelajar</span>
            </h3>
            <p className="text-xs text-slate-500">Top 3 Pelajar Teraktif se-Indonesia</p>
          </div>
          <button
            onClick={() => onNavigate('ranking')}
            className="text-xs font-bold text-sky-600 hover:underline"
          >
            Lihat Peringkatmu (#24) →
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
          {leaderboard.slice(0, 3).map((student, idx) => (
            <div
              key={student.userId}
              className={`p-3 sm:p-4 rounded-2xl text-center border transition-all ${
                idx === 0
                  ? 'bg-amber-50/80 border-amber-200 scale-105 shadow-md'
                  : 'bg-slate-50 border-slate-200/80'
              }`}
            >
              <div className="text-lg sm:text-2xl mb-1">
                {idx === 0 ? '👑' : idx === 1 ? '🥈' : '🥉'}
              </div>
              <img
                src={student.avatar}
                alt={student.fullName}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mx-auto border-2 border-white shadow-xs"
              />
              <div className="font-bold text-xs sm:text-sm text-slate-800 truncate mt-1.5">
                {student.fullName.split(' ')[0]}
              </div>
              <div className="text-[10px] text-slate-400 truncate">{student.educationLevel}</div>
              <div className="font-black text-xs text-amber-600 mt-1">
                {student.points.toLocaleString()} pt
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. RECENT HISTORY */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-extrabold text-lg text-slate-800 flex items-center gap-2">
              <Icon3DHistory size={24} />
              <span>Riwayat Aktivitas Terakhir</span>
            </h3>
            <p className="text-xs text-slate-500">Hasil pengerjaan kuis dan poin terbaru</p>
          </div>
          <button
            onClick={() => onNavigate('history')}
            className="text-xs font-bold text-sky-600 hover:underline"
          >
            Lihat Semua Riwayat →
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {[
            {
              title: 'Kuis Pemrograman Web Bab 1',
              date: '23 Sep 2026 • 13:30',
              score: 100,
              points: '+500 Poin',
              status: 'Sempurna',
            },
            {
              title: 'Speed Math Arena Mini-Game',
              date: '22 Sep 2026 • 19:45',
              score: 95,
              points: '+300 Poin',
              status: 'Lulus',
            },
            {
              title: 'Kuis Basis Data Relasional Bab 2',
              date: '21 Sep 2026 • 10:15',
              score: 88,
              points: '+400 Poin',
              status: 'Lulus',
            },
          ].map((item, i) => (
            <div key={i} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">{item.title}</div>
                  <div className="text-[10px] text-slate-400">{item.date}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-extrabold text-emerald-600">{item.points}</div>
                <div className="text-[10px] font-semibold text-slate-500">Skor: {item.score}%</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
