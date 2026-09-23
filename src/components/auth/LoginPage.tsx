import React, { useState } from 'react';
import { useAuth } from '../../lib/authContext';
import { AurelAvatar } from '../common/AurelAvatar';
import { soundEngine } from '../../lib/sound';
import {
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  Mail,
  User as UserIcon,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  GraduationCap
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, register } = useAuth();

  const [mode, setMode] = useState<'LOGIN' | 'REGISTER' | 'FORGOT'>('LOGIN');
  const [email, setEmail] = useState('david@aurelia.edu');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      if (mode === 'LOGIN') {
        const res = await login(email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Gagal login. Periksa email atau username.');
        }
      } else if (mode === 'REGISTER') {
        if (!email.trim() || !username.trim()) {
          setErrorMessage('Harap isi semua kolom pendaftaran.');
          setIsLoading(false);
          return;
        }
        const res = await register(email, username, fullName);
        if (!res.success) {
          setErrorMessage(res.error || 'Pendaftaran gagal.');
        }
      } else if (mode === 'FORGOT') {
        // Simulated password reset
        await new Promise((r) => setTimeout(r, 600));
        setSuccessMessage(`Tautan pemulihan kata sandi telah dikirim ke ${email}. Silakan periksa kotak masukmu!`);
        soundEngine.playConfirm();
      }
    } catch {
      setErrorMessage('Terjadi kendala pada server. Silakan coba beberapa saat lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSelect = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    soundEngine.playConfirm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50/40 to-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Decorative Floating 3D Orbs & Clouds */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-sky-300/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-300/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Main Glass Card */}
      <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-2xl border border-white/80 shadow-3d rounded-3xl p-6 sm:p-8 md:p-10 transition-all">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <AurelAvatar mood="happy" size="md" showClouds={false} />
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-amber-400 to-orange-400 text-white p-1 rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <h1 className="font-display font-extrabold text-2xl text-slate-800 tracking-tight flex items-center justify-center gap-1.5">
            AURELIA <span className="text-sky-500">EDU</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {mode === 'LOGIN' && 'Selamat datang kembali! Masuk untuk melanjutkan belajar.'}
            {mode === 'REGISTER' && 'Buat akun barumu dan mulai petualangan bersama Aurel!'}
            {mode === 'FORGOT' && 'Masukkan email terdaftar untuk menyetel ulang kata sandi.'}
          </p>
        </div>

        {/* Tab Toggle (Login / Register) */}
        {mode !== 'FORGOT' && (
          <div className="flex bg-slate-100/90 p-1 rounded-2xl mb-6 border border-slate-200/60">
            <button
              type="button"
              onClick={() => {
                setMode('LOGIN');
                setErrorMessage('');
                soundEngine.playConfirm();
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'LOGIN' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('REGISTER');
                setErrorMessage('');
                soundEngine.playConfirm();
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'REGISTER' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Daftar Akun
            </button>
          </div>
        )}

        {/* Error / Success Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-rose-700 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2.5 text-emerald-700 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'REGISTER' && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1.5 block">Nama Lengkap</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. David Pratama"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none text-sm text-slate-800 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 mb-1.5 block">Username</label>
                <div className="relative">
                  <span className="text-slate-400 font-bold text-sm absolute left-3.5 top-1/2 -translate-y-1/2">@</span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                    placeholder="david_rpl"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none text-sm text-slate-800 transition-all font-medium"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">
              {mode === 'REGISTER' ? 'Email Siswa / Mahasiswa' : 'Email atau Username'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={mode === 'REGISTER' ? 'email' : 'text'}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@aurelia.edu"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none text-sm text-slate-800 transition-all font-medium"
              />
            </div>
          </div>

          {mode !== 'FORGOT' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">Kata Sandi</label>
                {mode === 'LOGIN' && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('FORGOT');
                      setErrorMessage('');
                    }}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline"
                  >
                    Lupa sandi?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-2xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none text-sm text-slate-800 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {mode === 'LOGIN' && (
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
                />
                <span>Ingat sesi saya</span>
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-sky-500/25 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>
              {mode === 'LOGIN' && (isLoading ? 'Memproses Masuk...' : 'Masuk ke Aurelia Edu')}
              {mode === 'REGISTER' && (isLoading ? 'Membuat Akun...' : 'Daftar & Dapatkan +500 Poin')}
              {mode === 'FORGOT' && (isLoading ? 'Mengirim...' : 'Kirim Tautan Pemulihan')}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {mode === 'FORGOT' && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => {
                setMode('LOGIN');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className="text-xs font-bold text-sky-600 hover:underline"
            >
              ← Kembali ke Halaman Masuk
            </button>
          </div>
        )}

        {/* Quick Demo Switcher */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-2.5 flex items-center justify-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-sky-500" />
            <span>Pilih Akun Demo Praktis</span>
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoSelect('david@aurelia.edu')}
              className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                email === 'david@aurelia.edu' ? 'border-sky-500 bg-sky-50 font-bold text-sky-900' : 'border-slate-100 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-black">D</span>
              <div className="truncate">
                <div className="font-bold truncate">David</div>
                <div className="text-[10px] text-slate-400">SMK RPL (12.8k pt)</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoSelect('maya@aurelia.edu')}
              className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                email === 'maya@aurelia.edu' ? 'border-sky-500 bg-sky-50 font-bold text-sky-900' : 'border-slate-100 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-[10px] font-black">M</span>
              <div className="truncate">
                <div className="font-bold truncate">Maya</div>
                <div className="text-[10px] text-slate-400">SMA IPA (9.4k pt)</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoSelect('citra@aurelia.edu')}
              className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                email === 'citra@aurelia.edu' ? 'border-sky-500 bg-sky-50 font-bold text-sky-900' : 'border-slate-100 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-black">C</span>
              <div className="truncate">
                <div className="font-bold truncate">Citra (Rank #1)</div>
                <div className="text-[10px] text-slate-400">Kuliah ITB (15.2k pt)</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoSelect('admin@aurelia.edu')}
              className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                email === 'admin@aurelia.edu' ? 'border-sky-500 bg-sky-50 font-bold text-sky-900' : 'border-slate-100 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-black">A</span>
              <div className="truncate">
                <div className="font-bold truncate">Admin Master</div>
                <div className="text-[10px] text-slate-400">Dashboard Kontrol</div>
              </div>
            </button>
          </div>

          {/* Test Onboarding Flow Button */}
          <button
            type="button"
            onClick={() => handleDemoSelect('siswa.baru@aurelia.edu')}
            className="w-full mt-2.5 py-1.5 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 text-sky-800 rounded-xl text-center text-[11px] font-bold hover:bg-sky-100 transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-sky-500" />
            <span>Tes Alur Onboarding Awan Aurel Baru</span>
          </button>
        </div>

        {/* Security badge */}
        <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Otentikasi Aman & Enkripsi Sesi HTTP-Only</span>
        </div>
      </div>
    </div>
  );
};
