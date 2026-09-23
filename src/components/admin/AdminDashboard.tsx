import React, { useState } from 'react';
import { db } from '../../lib/storage';
import { soundEngine } from '../../lib/sound';
import { useAuth } from '../../lib/authContext';
import { Subject, Quiz, Reward, User } from '../../types';
import {
  Shield,
  Users,
  BookOpen,
  HelpCircle,
  Gift,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  BarChart3,
  Sparkles,
  Volume2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SUBJECTS' | 'QUIZZES' | 'REWARDS' | 'USERS'>('OVERVIEW');

  const [subjects, setSubjects] = useState<Subject[]>(db.getSubjects());
  const [quizzes, setQuizzes] = useState<Quiz[]>(db.getQuizzes());
  const [rewards, setRewards] = useState<Reward[]>(db.getRewards());
  const [users, setUsers] = useState<User[]>(db.getUsers());

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-amber-500" />
            <span>Panel Kontrol Administrator</span>
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-0.5">
            Admin Master Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Kelola kurikulum mata pelajaran, bank kuis, stok reward merchandise, dan manajemen siswa.
          </p>
        </div>

        <span className="px-3.5 py-1.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-black uppercase self-start sm:self-auto">
          Role: {user?.role || 'ADMIN'}
        </span>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        {[
          { key: 'OVERVIEW', label: 'Ringkasan & Analitik', icon: BarChart3 },
          { key: 'SUBJECTS', label: `Mata Pelajaran (${subjects.length})`, icon: BookOpen },
          { key: 'QUIZZES', label: `Bank Kuis (${quizzes.length})`, icon: HelpCircle },
          { key: 'REWARDS', label: `Stok Reward (${rewards.length})`, icon: Gift },
          { key: 'USERS', label: `Data Siswa (${users.length})`, icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key as typeof activeTab);
                soundEngine.playConfirm();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-400 font-bold">Total Siswa Terdaftar</div>
              <div className="font-display font-black text-3xl text-slate-900 mt-1">4.280</div>
              <div className="text-[10px] text-emerald-600 font-bold mt-0.5">+120 Siswa baru minggu ini</div>
            </div>

            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-400 font-bold">Kuis Dikerjakan</div>
              <div className="font-display font-black text-3xl text-sky-600 mt-1">28.450</div>
              <div className="text-[10px] text-sky-600 font-bold mt-0.5">Tingkat kelulusan 89.2%</div>
            </div>

            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-400 font-bold">Reward Diklaim</div>
              <div className="font-display font-black text-3xl text-amber-600 mt-1">1.840</div>
              <div className="text-[10px] text-amber-600 font-bold mt-0.5">Rp 18.4 jt saldo tersalurkan</div>
            </div>

            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-400 font-bold">Status Sistem</div>
              <div className="font-display font-black text-xl text-emerald-600 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5" />
                <span>Optimal (100%)</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Latensi audio & DB 0ms</div>
            </div>
          </div>

          {/* Sound Test Panel */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-sky-600" />
              <span>Audio Synthesis Engine Diagnostics</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => soundEngine.playCorrect()}
                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200"
              >
                Test: Suara Benar (Correct)
              </button>
              <button
                onClick={() => soundEngine.playWrong()}
                className="px-3 py-1.5 bg-rose-50 text-rose-700 font-bold text-xs rounded-xl border border-rose-200"
              >
                Test: Suara Salah (Wrong)
              </button>
              <button
                onClick={() => soundEngine.playVictory()}
                className="px-3 py-1.5 bg-amber-50 text-amber-800 font-bold text-xs rounded-xl border border-amber-200"
              >
                Test: Suara Kemenangan
              </button>
              <button
                onClick={() => soundEngine.playChestOpen()}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200"
              >
                Test: Suara Peti 3D
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBJECTS TAB */}
      {activeTab === 'SUBJECTS' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800">Daftar Mata Pelajaran & Silabus</h3>
            <button
              onClick={() => alert('Fitur tambah kurikulum baru aktif dalam mode pengembang.')}
              className="px-3 py-1.5 bg-sky-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Pelajaran</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {subjects.map((s) => (
              <div key={s.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sky-700 text-xs">{s.code}</span>
                    <span className="font-bold text-xs sm:text-sm text-slate-900">{s.title}</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-600 rounded">
                      {s.educationLevel}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.chapters.length} Bab • {s.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600">Aktif</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUIZZES TAB */}
      {activeTab === 'QUIZZES' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800">Daftar Paket Kuis Interaktif</h3>
            <button
              onClick={() => alert('Fitur tambah paket soal kuis baru.')}
              className="px-3 py-1.5 bg-sky-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Buat Kuis Baru</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {quizzes.map((q) => (
              <div key={q.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">{q.title}</div>
                  <div className="text-xs text-slate-400">{q.subjectTitle} • {q.questions.length} Soal • +{q.rewardPoints} Poin</div>
                </div>
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-lg">
                  {q.educationLevel}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REWARDS TAB */}
      {activeTab === 'REWARDS' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800">Inventori & Hadiah Reward</h3>
          </div>

          <div className="divide-y divide-slate-100">
            {rewards.map((r) => (
              <div key={r.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <img src={r.imageUrl} alt={r.title} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900">{r.title}</div>
                    <div className="text-xs text-amber-600 font-bold">{r.requiredPoints.toLocaleString()} Poin • Stok: {r.stock}</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg">
                  Tersedia
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USERS TAB */}
      {activeTab === 'USERS' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800">Daftar Akun Pengguna</h3>
          </div>

          <div className="divide-y divide-slate-100">
            {users.map((u) => (
              <div key={u.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <img src={u.profile.avatar} alt={u.username} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900">
                      {u.profile.fullName || u.username} (@{u.username})
                    </div>
                    <div className="text-xs text-slate-400">{u.email} • {u.profile.educationLevel}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-xs text-amber-600">{u.points.toLocaleString()} Poin</div>
                  <span className="text-[10px] font-bold text-sky-600">{u.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
