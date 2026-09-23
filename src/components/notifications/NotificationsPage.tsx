import React, { useState } from 'react';
import { soundEngine } from '../../lib/sound';
import { Icon3DNotification } from '../common/3dIcons';
import {
  Bell,
  CheckCircle2,
  Gift,
  Trophy,
  Flame,
  Clock,
  Sparkles,
  Trash2
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'REWARD',
      title: 'Klaim Poin Kuis Harian (+500 pt)',
      message: 'Kamu berhasil menyelesaikan kuis Pemrograman Web dengan akurasi 100%. Poin telah ditambahkan!',
      time: '10 menit yang lalu',
      unread: true,
    },
    {
      id: '2',
      type: 'CHEST',
      title: 'Peti Reward 3D Baru Siap Dibuka! 🎁',
      message: 'Saldo poinmu telah melampaui 10.000 poin. Kunjungi toko reward untuk membuka peti emas legendaris.',
      time: '1 jam yang lalu',
      unread: true,
    },
    {
      id: '3',
      type: 'STREAK',
      title: 'Streak Belajar 7 Hari Berturut-turut! 🔥',
      message: 'Hebat! Konsistensi belajarmu mengaktifkan bonus multiplier koin 1.5x untuk semua kuis hari ini.',
      time: '1 hari yang lalu',
      unread: false,
    },
    {
      id: '4',
      type: 'RANKING',
      title: 'Peringkatmu Naik ke #24 Nasional 🏆',
      message: 'Kamu melompat 5 peringkat di klasemen pelajar berprestasi SMK se-Indonesia.',
      time: '2 hari yang lalu',
      unread: false,
    },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
    soundEngine.playConfirm();
  };

  const clearAll = () => {
    setNotifications([]);
    soundEngine.playConfirm();
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-sky-600 uppercase tracking-wider flex items-center gap-1.5">
            <Bell className="w-4 h-4" />
            <span>Pusat Pemberitahuan</span>
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-0.5">
            Notifikasi & Aktivitas
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Dapatkan update terbaru seputar pencapaian, bonus koin, dan update materi kurikulum.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            Tandai Semua Dibaca
          </button>
          <button
            onClick={clearAll}
            className="p-2 bg-white hover:bg-rose-50 border border-slate-200 text-slate-400 hover:text-rose-600 rounded-xl text-xs font-bold transition-all shadow-xs"
            title="Bersihkan Semua"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Icon3DNotification size={48} className="mx-auto mb-3 opacity-60" />
            <h4 className="font-bold text-slate-700 text-base">Tidak Ada Notifikasi Baru</h4>
            <p className="text-xs mt-1">Semua pemberitahuan sudah terbaca.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-4 sm:p-6 flex items-start justify-between gap-4 transition-colors ${
                  item.unread ? 'bg-sky-50/50' : 'hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-lg shrink-0">
                    {item.type === 'REWARD' && '🪙'}
                    {item.type === 'CHEST' && '🎁'}
                    {item.type === 'STREAK' && '🔥'}
                    {item.type === 'RANKING' && '🏆'}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</h4>
                      {item.unread && (
                        <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>
                    <span className="text-[10px] text-slate-400 font-semibold mt-1.5 block">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
