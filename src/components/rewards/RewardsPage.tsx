import React, { useState } from 'react';
import { useAuth } from '../../lib/authContext';
import { db } from '../../lib/storage';
import { soundEngine } from '../../lib/sound';
import { Reward } from '../../types';
import { Icon3DGamebox, Icon3DSparkles, Icon3DWallet, Icon3DTrophy } from '../common/3dIcons';
import { AurelAvatar } from '../common/AurelAvatar';
import {
  Sparkles,
  Gift,
  CheckCircle2,
  Lock,
  ArrowRight,
  Zap,
  ShieldCheck,
  RotateCcw,
  X,
  CreditCard
} from 'lucide-react';

export const RewardsPage: React.FC = () => {
  const { user, redeemReward, awardPoints } = useAuth();
  const [rewards, setRewards] = useState<Reward[]>(db.getRewards());
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [openingChest, setOpeningChest] = useState<string | null>(null);
  const [chestPrize, setChestPrize] = useState<{ name: string; pts: number; code?: string } | null>(null);
  const [redeemSuccessModal, setRedeemSuccessModal] = useState<{ reward: Reward; code: string } | null>(null);

  const categories = [
    { key: 'ALL', label: 'Semua Hadiah' },
    { key: 'E-Wallet', label: 'E-Wallet & Saldo' },
    { key: 'Voucher', label: 'Voucher Game & App' },
    { key: 'Merchandise', label: 'Merchandise Fisik' },
    { key: 'Sertifikasi', label: 'Sertifikat Prestasi' },
  ];

  const filteredRewards = rewards.filter((r) => {
    if (activeCategory === 'ALL') return true;
    return r.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  // 3D Chests
  const chests = [
    {
      id: 'chest_bronze',
      name: 'Peti Kayu Pemula',
      cost: 500,
      gradient: 'from-amber-700 to-yellow-900',
      emoji: '📦',
      minReward: 200,
      maxReward: 800,
    },
    {
      id: 'chest_silver',
      name: 'Peti Perak Berbintang',
      cost: 1500,
      gradient: 'from-slate-400 to-slate-600',
      emoji: '🥈',
      minReward: 1000,
      maxReward: 2500,
    },
    {
      id: 'chest_gold',
      name: 'Peti Emas Legendaris',
      cost: 4000,
      gradient: 'from-amber-400 via-amber-500 to-yellow-600',
      emoji: '👑',
      minReward: 3500,
      maxReward: 8000,
    },
    {
      id: 'chest_diamond',
      name: 'Peti Berlian Juara',
      cost: 10000,
      gradient: 'from-cyan-400 via-sky-500 to-blue-600',
      emoji: '💎',
      minReward: 9000,
      maxReward: 20000,
    },
  ];

  const handleOpenChest = (chest: typeof chests[0]) => {
    if (!user || user.points < chest.cost) {
      soundEngine.playWrong();
      alert(`Poin kamu tidak mencukupi (${user?.points || 0} / ${chest.cost} Poin). Selesaikan kuis untuk mengumpulkan poin!`);
      return;
    }

    soundEngine.playChestOpen();
    setOpeningChest(chest.id);

    setTimeout(() => {
      // Award random prize
      const prizePts = Math.floor(Math.random() * (chest.maxReward - chest.minReward + 1)) + chest.minReward;
      const prizeCode = `AUREL-CHEST-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

      setChestPrize({
        name: `${chest.name}`,
        pts: prizePts,
        code: prizeCode,
      });

      // Award difference or points
      awardPoints(prizePts, `Buka ${chest.name}`, `Hadiah gacha misteri peti 3D.`);

      soundEngine.playVictory();
      setOpeningChest(null);
    }, 2000);
  };

  const handleRedeem = async (reward: Reward) => {
    if (!user || user.points < reward.requiredPoints) {
      soundEngine.playWrong();
      alert(`Poin kamu tidak mencukupi untuk klaim ${reward.title}.`);
      return;
    }

    const res = await redeemReward(reward.id);
    if (res.success && res.redemption) {
      soundEngine.playVictory();
      setRedeemSuccessModal({ reward, code: res.redemption.redemptionCode });
    } else if (res.error) {
      soundEngine.playWrong();
      alert(res.error);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner with Balance & Mascot */}
      <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <AurelAvatar mood="excited" size="lg" />
            <div>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider">
                Toko Hadiah & Kotak Misteri
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight mt-1">
                Peti Reward 3D Aurelia Edu
              </h2>
              <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-md">
                Tukarkan poin hasil belajar dan kuis dengan saldo digital, voucher game, atau buka peti hadiah emas!
              </p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl border border-white/30 text-center w-full md:w-auto shrink-0 shadow-lg">
            <div className="text-xs uppercase font-bold text-amber-100 flex items-center justify-center gap-1.5">
              <span>🪙 Saldo Poin Kamu</span>
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-yellow-200 mt-0.5">
              {user?.points.toLocaleString() || '0'}
            </div>
            <div className="text-[11px] text-white/80 mt-1 font-semibold">
              Multiplier Streak: <strong>1.5x Aktif 🔥</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Chests Opening Section */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h3 className="font-display font-black text-lg text-slate-800 flex items-center gap-2">
              <Icon3DGamebox size={24} />
              <span>Peti Misteri Hadiah 3D (Gacha Berhadiah)</span>
            </h3>
            <p className="text-xs text-slate-500">Buka peti untuk kesempatan melipatgandakan poin hingga 20.000 Poin!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {chests.map((chest) => {
            const isOpening = openingChest === chest.id;
            const canAfford = (user?.points || 0) >= chest.cost;

            return (
              <div
                key={chest.id}
                className={`p-6 rounded-3xl bg-white border-2 text-center transition-all flex flex-col justify-between relative overflow-hidden shadow-card-elevated hover:shadow-3d ${
                  canAfford ? 'border-amber-200 hover:border-amber-400' : 'border-slate-200 opacity-90'
                }`}
              >
                {/* 3D Chest Visual */}
                <div className="my-2">
                  <div className={`text-6xl mx-auto transition-transform ${isOpening ? 'animate-bounce scale-125' : 'hover:scale-110'}`}>
                    {chest.emoji}
                  </div>
                  <h4 className="font-display font-extrabold text-base text-slate-800 mt-3">
                    {chest.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Hadiah: {chest.minReward} – {chest.maxReward.toLocaleString()} Poin
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenChest(chest)}
                    disabled={isOpening}
                    className={`w-full py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md ${
                      canAfford
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:scale-105 active:scale-95'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isOpening ? (
                      <span className="animate-spin">✨ Membuka Peti...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Buka ({chest.cost} Poin)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Reward Redemption Catalog */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-black text-xl text-slate-800 flex items-center gap-2">
              <Gift className="w-5 h-5 text-rose-500" />
              <span>Katalog Penukaran Hadiah Resmi</span>
            </h3>
            <p className="text-xs text-slate-500">Tukar poinmu langsung menjadi voucher dan saldo nyata</p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => {
                  setActiveCategory(c.key);
                  soundEngine.playConfirm();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === c.key
                    ? 'bg-white text-sky-700 shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRewards.map((reward) => {
            const canAfford = (user?.points || 0) >= reward.requiredPoints;
            const imgUrl = reward.image || reward.imageUrl || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&auto=format&fit=crop&q=80';
            const badgeText = reward.badge || reward.badgeText || 'VOUCHER';

            return (
              <div
                key={reward.id}
                className="p-5 rounded-3xl bg-slate-50/60 border border-slate-200 hover:border-sky-300 hover:bg-white transition-all flex flex-col justify-between group shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="relative rounded-2xl overflow-hidden mb-3 aspect-video bg-slate-200">
                    <img
                      src={imgUrl}
                      alt={reward.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-black rounded-md">
                      {badgeText}
                    </span>
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-black rounded-md shadow-xs">
                      {reward.requiredPoints.toLocaleString()} Pts
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base line-clamp-1 group-hover:text-sky-700 transition-colors">
                    {reward.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{reward.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="text-[11px] font-bold text-slate-400">
                    Stok: <span className="text-slate-700">{reward.stock} unit</span>
                  </div>

                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                      canAfford
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xs hover:scale-105 active:scale-95'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>{canAfford ? 'Klaim Hadiah' : 'Poin Kurang'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chest Opened Prize Modal */}
      {chestPrize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-3xl mx-auto animate-bounce">
              🎁
            </div>
            <div>
              <h4 className="font-display font-extrabold text-xl text-slate-800">Selamat! Peti Terbuka!</h4>
              <p className="text-xs text-slate-500 mt-1">Kamu mendapatkan hadiah kejutan:</p>
              <div className="font-black text-3xl text-amber-500 my-2">+{chestPrize.pts} Poin</div>
              <div className="p-2.5 bg-slate-100 rounded-xl font-mono text-xs text-slate-700 select-all font-bold">
                KODE KLAIM: {chestPrize.code}
              </div>
            </div>
            <button
              onClick={() => setChestPrize(null)}
              className="w-full py-3 bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-sky-700"
            >
              Simpan ke Dompet
            </button>
          </div>
        </div>
      )}

      {/* Claim Success Modal */}
      {redeemSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl mx-auto">
              🎉
            </div>
            <div>
              <h4 className="font-display font-extrabold text-xl text-slate-800">Hadiah Berhasil Diklaim!</h4>
              <p className="text-xs text-slate-600 mt-1 font-semibold">
                {redeemSuccessModal.reward.title}
              </p>
              <div className="my-3 p-3.5 bg-sky-50 rounded-2xl border border-sky-200 text-xs text-sky-950 space-y-1">
                <div className="text-[10px] font-bold text-sky-600 uppercase">Kode Voucher / Resi Pengiriman:</div>
                <div className="font-mono font-black text-sm text-sky-900">{redeemSuccessModal.code}</div>
              </div>
              <p className="text-[11px] text-slate-400">
                Instruksi penukaran telah dikirim ke email terdaftar ({user?.email}).
              </p>
            </div>
            <button
              onClick={() => setRedeemSuccessModal(null)}
              className="w-full py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-700"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
