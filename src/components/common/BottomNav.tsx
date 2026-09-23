import React, { useState } from 'react';
import { soundEngine } from '../../lib/sound';
import {
  Icon3DHome,
  Icon3DBook,
  Icon3DHistory,
  Icon3DGamebox,
  Icon3DUser,
  Icon3DGames,
  Icon3DWallet,
  Icon3DHelp,
  Icon3DNotification,
  Icon3DTrophy
} from './3dIcons';
import { MoreHorizontal, X, Shield, Settings } from 'lucide-react';
import { useAuth } from '../../lib/authContext';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Icon3DHome },
    { id: 'subjects', label: 'Pelajaran', icon: Icon3DBook },
    { id: 'history', label: 'Riwayat', icon: Icon3DHistory },
    { id: 'rewards', label: 'Reward', icon: Icon3DGamebox },
    { id: 'account', label: 'Akun', icon: Icon3DUser },
  ];

  const secondaryNavItems = [
    { id: 'games', label: 'Games & Kuis Cepat', icon: Icon3DGames },
    { id: 'ranking', label: 'Peringkat & Leaderboard', icon: Icon3DTrophy },
    { id: 'transactions', label: 'Dompet & Transaksi', icon: Icon3DWallet },
    { id: 'notifications', label: 'Pusat Notifikasi', icon: Icon3DNotification },
    { id: 'help', label: 'Pusat Bantuan & FAQ', icon: Icon3DHelp },
    { id: 'settings', label: 'Pengaturan Belajar', icon: Settings },
  ];

  return (
    <>
      {/* Secondary Sliding Drawer Menu */}
      {showMoreMenu && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="absolute inset-0"
            onClick={() => setShowMoreMenu(false)}
          />

          <div className="relative bg-white rounded-t-3xl p-5 shadow-2xl border-t border-slate-200 animate-in slide-in-from-bottom duration-250">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-display font-extrabold text-sm text-slate-800">
                Menu Lengkap Aurelia Edu
              </span>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="p-1 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 py-4">
              {secondaryNavItems.map((item) => {
                const IconComponent = item.icon as React.ComponentType<{ size?: number; className?: string }>;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setShowMoreMenu(false);
                      soundEngine.playConfirm();
                    }}
                    className="flex flex-col items-center p-3 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-100 hover:border-sky-200 text-center transition-all group"
                  >
                    <div className="mb-1.5 group-hover:scale-110 transition-transform">
                      <IconComponent size={28} className="w-7 h-7 text-sky-600" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight">
                      {item.label}
                    </span>
                  </button>
                );
              })}

              {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
                <button
                  onClick={() => {
                    setActiveTab('admin');
                    setShowMoreMenu(false);
                    soundEngine.playConfirm();
                  }}
                  className="flex flex-col items-center p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-center transition-all"
                >
                  <Shield className="w-7 h-7 text-amber-600 mb-1.5" />
                  <span className="text-[11px] font-bold text-amber-800 leading-tight">
                    Admin Panel
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-lg px-2 py-1.5 safe-area-pb">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  soundEngine.playConfirm();
                }}
                className={`flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all relative ${
                  isActive
                    ? 'text-sky-600 scale-105 font-black'
                    : 'text-slate-400 hover:text-slate-600 font-medium'
                }`}
              >
                <div className="relative">
                  <Icon size={24} className="transition-transform" />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-sky-500 rounded-full" />
                  )}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
              </button>
            );
          })}

          {/* More menu button */}
          <button
            onClick={() => {
              setShowMoreMenu(true);
              soundEngine.playConfirm();
            }}
            className="flex flex-col items-center py-1 px-2.5 rounded-2xl text-slate-400 hover:text-slate-600 font-medium"
          >
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
              <MoreHorizontal className="w-4 h-4 text-slate-600" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Lainnya</span>
          </button>
        </div>
      </div>
    </>
  );
};
