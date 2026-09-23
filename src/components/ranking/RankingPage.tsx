import React, { useState } from 'react';
import { db } from '../../lib/storage';
import { useAuth } from '../../lib/authContext';
import { soundEngine } from '../../lib/sound';
import { LeaderboardUser } from '../../types';
import { Icon3DTrophy, Icon3DFlame } from '../common/3dIcons';
import {
  Trophy,
  Award,
  Medal,
  Flame,
  Search,
  School,
  Sparkles,
  ChevronUp,
  GraduationCap
} from 'lucide-react';

export const RankingPage: React.FC = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(db.getLeaderboard());
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeaderboard = leaderboard.filter((item) => {
    const matchesLevel = filterLevel === 'ALL' || item.educationLevel === filterLevel;
    const schoolText = item.schoolName || item.schoolOrUniv || '';
    const matchesSearch =
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schoolText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const top3 = filteredLeaderboard.slice(0, 3);
  const rest = filteredLeaderboard.slice(3);

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Peringkat Prestasi Nasional</span>
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-0.5">
            Leaderboard Pelajar Indonesia
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Kumpulkan poin belajar, pertahankan streak harian, dan bawa nama sekolahmu ke puncak prestasi!
          </p>
        </div>

        {/* User's relative rank pill */}
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-center gap-3">
          <span className="text-2xl">👑</span>
          <div>
            <div className="text-[10px] font-bold text-amber-800 uppercase">Posisi Kamu:</div>
            <div className="font-extrabold text-sm text-slate-800">
              Peringkat <strong className="text-amber-600">#24</strong> Nasional ({user?.points.toLocaleString()} pt)
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama pelajar atau sekolah..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:border-sky-500 outline-none text-xs font-semibold text-slate-800"
          />
        </div>

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
                  ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lvl === 'ALL' ? 'Semua Jenjang' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* TOP 3 PODIUM */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 max-w-2xl mx-auto items-end">
          {/* Rank 2 (Silver) */}
          <div className="bg-gradient-to-b from-slate-100 to-white rounded-3xl p-4 sm:p-5 border-2 border-slate-300 text-center shadow-md flex flex-col items-center justify-between h-[230px] sm:h-[260px]">
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-black text-xs">
              2
            </div>
            <div>
              <img
                src={top3[1].avatar}
                alt={top3[1].fullName}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-slate-300 shadow-sm mx-auto"
              />
              <h4 className="font-bold text-xs sm:text-sm text-slate-800 truncate mt-2">
                {top3[1].fullName}
              </h4>
              <p className="text-[10px] text-slate-400 truncate">{top3[1].schoolName || top3[1].schoolOrUniv}</p>
            </div>
            <div className="font-black text-xs sm:text-sm text-slate-700 bg-slate-200/60 px-3 py-1 rounded-full">
              {top3[1].points.toLocaleString()} pt
            </div>
          </div>

          {/* Rank 1 (Gold - Elevated) */}
          <div className="bg-gradient-to-b from-amber-100 via-amber-50 to-white rounded-3xl p-4 sm:p-6 border-2 border-amber-400 text-center shadow-xl flex flex-col items-center justify-between h-[260px] sm:h-[300px] scale-105 z-10">
            <div className="text-2xl animate-bounce">👑</div>
            <div>
              <img
                src={top3[0].avatar}
                alt={top3[0].fullName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-amber-400 shadow-md mx-auto"
              />
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 truncate mt-2">
                {top3[0].fullName}
              </h4>
              <p className="text-[11px] text-slate-500 font-semibold truncate">{top3[0].schoolName || top3[0].schoolOrUniv}</p>
            </div>
            <div className="font-black text-sm sm:text-base text-amber-700 bg-amber-200/80 px-4 py-1.5 rounded-full shadow-xs">
              {top3[0].points.toLocaleString()} pt
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="bg-gradient-to-b from-amber-50/50 to-white rounded-3xl p-4 sm:p-5 border-2 border-amber-700/30 text-center shadow-md flex flex-col items-center justify-between h-[210px] sm:h-[240px]">
            <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xs">
              3
            </div>
            <div>
              <img
                src={top3[2].avatar}
                alt={top3[2].fullName}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-4 border-amber-700/40 shadow-sm mx-auto"
              />
              <h4 className="font-bold text-xs sm:text-sm text-slate-800 truncate mt-2">
                {top3[2].fullName}
              </h4>
              <p className="text-[10px] text-slate-400 truncate">{top3[2].schoolName || top3[2].schoolOrUniv}</p>
            </div>
            <div className="font-black text-xs sm:text-sm text-amber-900 bg-amber-100/60 px-3 py-1 rounded-full">
              {top3[2].points.toLocaleString()} pt
            </div>
          </div>
        </div>
      )}

      {/* FULL LEADERBOARD TABLE (Rank 4 to 50) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <span className="font-display font-bold text-sm text-slate-800">
            Daftar Peringkat Lengkap
          </span>
          <span className="text-xs text-slate-400">Diperbarui secara real-time</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredLeaderboard.map((student) => (
            <div
              key={student.userId}
              className={`p-4 sm:px-6 flex items-center justify-between transition-colors ${
                student.userId === user?.id ? 'bg-amber-50/80 border-l-4 border-amber-500' : 'hover:bg-slate-50/60'
              }`}
            >
              <div className="flex items-center gap-3.5 sm:gap-4">
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                    student.rank === 1
                      ? 'bg-amber-400 text-amber-950'
                      : student.rank === 2
                      ? 'bg-slate-300 text-slate-900'
                      : student.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {student.rank}
                </span>

                <img
                  src={student.avatar}
                  alt={student.fullName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                />

                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                    <span>{student.fullName}</span>
                    {student.userId === user?.id && (
                      <span className="px-1.5 py-0.2 bg-amber-200 text-amber-900 text-[9px] font-black rounded">
                        Kamu
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <span>{student.schoolName || student.schoolOrUniv}</span>
                    <span>•</span>
                    <span className="font-semibold text-sky-600">{student.educationLevel}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-700">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{student.streakDays}d</span>
                </div>

                <div>
                  <div className="font-display font-black text-xs sm:text-sm text-amber-600">
                    {student.points.toLocaleString()} pt
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">{student.accuracy ?? 92}% akurasi</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
