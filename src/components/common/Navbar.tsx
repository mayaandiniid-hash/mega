import React, { useState } from 'react';
import { useAuth } from '../../lib/authContext';
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
  Icon3DUser,
  Icon3DNotification,
  Icon3DFlame,
  Icon3DSparkles
} from './3dIcons';
import {
  Search,
  Bell,
  Volume2,
  VolumeX,
  Shield,
  LogOut,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Flame
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const { user, logout, switchAccount, soundMuted, toggleSound } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const notifications = user ? [
    { id: '1', title: 'Poin Kuis Masuk! (+500 pt)', time: '5m lalu', unread: true },
    { id: '2', title: 'Peti Reward 3D Terbuka! 🎁', time: '1j lalu', unread: true },
    { id: '3', title: 'Streak Belajar 7 Hari Aktif 🔥', time: '1h lalu', unread: false },
  ] : [];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/70 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => {
            setActiveTab('home');
            soundEngine.playConfirm();
          }}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
            A
          </div>
          <div className="hidden sm:block">
            <span className="font-display font-extrabold text-base text-slate-800 tracking-tight flex items-center gap-1">
              AURELIA <span className="text-sky-500">EDU</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold block -mt-1 tracking-wider uppercase">
              {user?.profile?.educationLevel || 'Platform'} • {user?.profile?.grade || 'Indonesia'}
            </span>
          </div>
        </div>

        {/* Search Bar Input (Triggers Search Modal) */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full px-4 py-2 bg-slate-100/90 hover:bg-slate-100 border border-slate-200/80 rounded-2xl flex items-center justify-between text-xs text-slate-400 font-medium transition-all group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors" />
              <span>Cari mata pelajaran, materi, soal, atau game...</span>
            </div>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-400 rounded-md border border-slate-200 shadow-xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {[
            { id: 'home', label: 'Home' },
            { id: 'subjects', label: 'Mata Pelajaran' },
            { id: 'quiz', label: 'Bank Kuis' },
            { id: 'rewards', label: 'Reward 3D' },
            { id: 'ranking', label: 'Ranking' },
            { id: 'games', label: 'Games' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                soundEngine.playConfirm();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-sky-50 text-sky-700 font-extrabold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Icons & User Balance */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Flame Badge */}
          {user && (
            <div
              title={`${user.streakDays} Hari Streak Belajar`}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-xs font-extrabold text-amber-700 shadow-xs"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{user.streakDays}d</span>
            </div>
          )}

          {/* Points Counter Badge */}
          {user && (
            <button
              onClick={() => {
                setActiveTab('rewards');
                soundEngine.playConfirm();
              }}
              className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-full text-xs font-black text-sky-800 shadow-xs hover:border-sky-300 transition-all hover:scale-105"
            >
              <span className="text-amber-500 font-black">🪙</span>
              <span>{user.points.toLocaleString()}</span>
              <span className="hidden sm:inline text-[10px] text-sky-600 font-bold uppercase">Poin</span>
            </button>
          )}

          {/* Search Trigger for Mobile */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-sky-600" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
                  <span className="text-xs font-bold text-slate-800">Notifikasi Terbaru</span>
                  <button
                    onClick={() => {
                      setActiveTab('notifications');
                      setShowNotifMenu(false);
                    }}
                    className="text-[11px] text-sky-600 font-bold hover:underline"
                  >
                    Lihat Semua
                  </button>
                </div>
                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setActiveTab('notifications');
                        setShowNotifMenu(false);
                      }}
                      className="py-2 px-1 text-xs hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="font-semibold text-slate-800 flex items-center justify-between">
                        <span>{n.title}</span>
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Role Dropdown */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full bg-slate-100/80 hover:bg-slate-200/70 border border-slate-200/80 transition-all"
              >
                <img
                  src={user.profile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                  alt={user.profile.fullName || user.username}
                  className="w-7 h-7 rounded-full object-cover border border-white shadow-xs"
                />
                <span className="hidden sm:inline text-xs font-bold text-slate-800 max-w-[90px] truncate">
                  {user.profile.fullName?.split(' ')[0] || user.username}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 text-xs">
                  {/* User info */}
                  <div className="pb-3 border-b border-slate-100 flex items-center gap-3">
                    <img
                      src={user.profile.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover border border-sky-200"
                    />
                    <div className="truncate">
                      <div className="font-bold text-slate-800 truncate">{user.profile.fullName || user.username}</div>
                      <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                      <span className="inline-block px-1.5 py-0.5 bg-sky-100 text-sky-800 rounded font-extrabold text-[9px] mt-0.5">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="py-2 space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab('account');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <Icon3DUser size={18} />
                      <span>Pengaturan Akun</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('transactions');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <Icon3DWallet size={18} />
                      <span>Dompet Poin & Transaksi</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('help');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <Icon3DHelp size={18} />
                      <span>Pusat Bantuan & Tiket</span>
                    </button>

                    {(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') && (
                      <button
                        onClick={() => {
                          setActiveTab('admin');
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 font-bold text-amber-800 flex items-center gap-2 border border-amber-200"
                      >
                        <Shield className="w-4 h-4 text-amber-600" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}
                  </div>

                  {/* Switch Account Quick Demo */}
                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 block px-1">Ganti Akun Demo:</span>
                    <div className="grid grid-cols-2 gap-1">
                      <button
                        onClick={() => {
                          switchAccount('user_david');
                          setShowProfileMenu(false);
                        }}
                        className="p-1 rounded bg-slate-50 hover:bg-slate-100 text-[10px] font-bold text-slate-700 text-left truncate"
                      >
                        ⚡ David (SMK)
                      </button>
                      <button
                        onClick={() => {
                          switchAccount('user_admin');
                          setShowProfileMenu(false);
                        }}
                        className="p-1 rounded bg-amber-50 hover:bg-amber-100 text-[10px] font-bold text-amber-800 text-left truncate"
                      >
                        👑 Admin
                      </button>
                    </div>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="w-full mt-2 pt-2 border-t border-slate-100 text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-50 font-bold text-rose-600 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
