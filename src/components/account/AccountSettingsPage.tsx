import React, { useState } from 'react';
import { useAuth } from '../../lib/authContext';
import { soundEngine } from '../../lib/sound';
import { EducationLevelType, UserProfile, LearningStyle } from '../../types';
import { SMK_MAJORS_LIST, UNIVERSITY_PROGRAMS_LIST } from '../../lib/storage';
import { AurelAvatar } from '../common/AurelAvatar';
import {
  User,
  Settings,
  Volume2,
  VolumeX,
  RotateCcw,
  Trash2,
  CheckCircle2,
  Shield,
  Sparkles,
  Save,
  GraduationCap
} from 'lucide-react';

export const AccountSettingsPage: React.FC = () => {
  const { user, updateProfile, resetProgress, soundMuted, toggleSound, switchAccount } = useAuth();

  const [fullName, setFullName] = useState(user?.profile?.fullName || '');
  const [educationLevel, setEducationLevel] = useState<EducationLevelType>(
    user?.profile?.educationLevel || 'SMK'
  );
  const [grade, setGrade] = useState(user?.profile?.grade || 'Kelas 11');
  const [major, setMajor] = useState(user?.profile?.major || 'Rekayasa Perangkat Lunak (RPL)');
  const [university, setUniversity] = useState(user?.profile?.university || 'Universitas Indonesia');
  const [studyProgram, setStudyProgram] = useState(user?.profile?.studyProgram || 'Teknik Informatika / Ilmu Komputer');
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(user?.profile?.learningStyle || 'Game dan tantangan');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      educationLevel,
      grade,
      major: educationLevel === 'SMK' ? major : undefined,
      university: educationLevel === 'KULIAH' ? university : undefined,
      studyProgram: educationLevel === 'KULIAH' ? studyProgram : undefined,
      learningStyle,
    });
    soundEngine.playVictory();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Apakah kamu yakin ingin menyetel ulang semua poin dan riwayat kuis ke kondisi awal?')) {
      resetProgress();
      soundEngine.playConfirm();
      alert('Kemajuan belajar telah disetel ulang.');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
            <Settings className="w-4 h-4" />
            <span>Preferensi & Akun</span>
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-0.5">
            Pengaturan Akun & Profil Belajar
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Sesuaikan identitas sekolah, preferensi audio, gaya belajar, dan konfigurasi data.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">
            <User className="w-5 h-5 text-sky-600" />
            <span>Informasi Pribadi & Identitas</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
            <img
              src={user?.profile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
              alt={fullName}
              className="w-20 h-20 rounded-full object-cover border-4 border-sky-100 shadow-md"
            />
            <div className="text-center sm:text-left space-y-1">
              <div className="font-bold text-slate-800 text-lg">{fullName || user?.username}</div>
              <div className="text-xs text-slate-400">{user?.email}</div>
              <span className="inline-block px-2.5 py-0.5 bg-sky-100 text-sky-800 font-black text-[10px] rounded-md uppercase">
                {user?.role} ACCOUNT
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">Nama Lengkap</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 outline-none text-xs font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">Username Akun</label>
              <input
                type="text"
                disabled
                value={`@${user?.username || ''}`}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-xs font-mono font-semibold cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Academic Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <span>Jenjang Pendidikan & Jurusan</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">Jenjang Pendidikan</label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value as EducationLevelType)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 outline-none text-xs font-semibold text-slate-800 bg-white"
              >
                <option value="SD">SD / MI (Kelas 1-6)</option>
                <option value="SMP">SMP / MTs (Kelas 7-9)</option>
                <option value="SMA">SMA (Kelas 10-12 IPA/IPS)</option>
                <option value="SMK">SMK Vokasi (Kejuruan)</option>
                <option value="MA">Madrasah Aliyah (MA)</option>
                <option value="KULIAH">Perguruan Tinggi / Universitas</option>
                <option value="LAINNYA">Umum / Kursus Profesional</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">Tingkat Kelas / Semester</label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="e.g. Kelas 11 atau Semester 4"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 outline-none text-xs font-semibold text-slate-800"
              />
            </div>

            {educationLevel === 'SMK' && (
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 mb-1.5 block">Jurusan SMK Kejuruan</label>
                <select
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 outline-none text-xs font-semibold text-slate-800 bg-white"
                >
                  {SMK_MAJORS_LIST.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {educationLevel === 'KULIAH' && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1.5 block">Universitas</label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 outline-none text-xs font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1.5 block">Program Studi</label>
                  <select
                    value={studyProgram}
                    onChange={(e) => setStudyProgram(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 outline-none text-xs font-semibold text-slate-800 bg-white"
                  >
                    {UNIVERSITY_PROGRAMS_LIST.map((prog) => (
                      <option key={prog} value={prog}>
                        {prog}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">Gaya Belajar Pilihan</label>
              <select
                value={learningStyle}
                onChange={(e) => setLearningStyle(e.target.value as LearningStyle)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 outline-none text-xs font-semibold text-slate-800 bg-white"
              >
                <option value="Game dan tantangan">Game dan tantangan interaktif</option>
                <option value="Mengerjakan soal">Latihan soal & Tryout terstruktur</option>
                <option value="Video dan visual">Video visual & animasi</option>
                <option value="Membaca materi">Membaca rangkuman materi lengkap</option>
                <option value="Campuran semuanya">Campuran semuanya</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audio & Danger Zone */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-amber-600" />
            <span>Audio & Pengaturan Data</span>
          </h3>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              {soundMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5 text-sky-600" />}
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-800">Efek Suara Web Audio (SFX)</div>
                <div className="text-[11px] text-slate-400">Suara ketikan awan, nada kuis benar/salah, dan kemenangan</div>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleSound}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                soundMuted ? 'bg-rose-100 text-rose-700' : 'bg-sky-100 text-sky-800'
              }`}
            >
              {soundMuted ? 'Mati (Bisu)' : 'Aktif'}
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Riwayat Belajar & Poin</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>

          {isSaved && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Perubahan profil berhasil disimpan!</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
