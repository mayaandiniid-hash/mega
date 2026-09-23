import React, { useState } from 'react';
import { useAuth } from '../../lib/authContext';
import { db } from '../../lib/storage';
import { soundEngine } from '../../lib/sound';
import { Transaction } from '../../types';
import { Icon3DWallet, Icon3DSparkles, Icon3DGamebox } from '../common/3dIcons';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  Gift,
  CheckCircle2,
  AlertCircle,
  Copy,
  Tag
} from 'lucide-react';

export const WalletTransactionsPage: React.FC = () => {
  const { user, awardPoints } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>(db.getTransactions());
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleClaimPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoStatus(null);
    const clean = promoCode.trim().toUpperCase();

    if (clean === 'AURELIA2026') {
      awardPoints(1000, 'Klaim Promo Spesial AURELIA2026');
      setPromoStatus({ success: true, message: 'Selamat! +1.000 Poin Belajar berhasil ditambahkan!' });
      setTransactions(db.getTransactions());
      setPromoCode('');
      soundEngine.playVictory();
    } else if (clean === 'BELAJAR_INDONESIA') {
      awardPoints(500, 'Klaim Kode Semangat Belajar Indonesia');
      setPromoStatus({ success: true, message: 'Selamat! +500 Poin Belajar berhasil ditambahkan!' });
      setTransactions(db.getTransactions());
      setPromoCode('');
      soundEngine.playVictory();
    } else {
      soundEngine.playWrong();
      setPromoStatus({ success: false, message: 'Kode promo tidak valid atau sudah kadaluarsa.' });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
            <Wallet className="w-4 h-4" />
            <span>Dompet Digital & Riwayat Poin</span>
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-0.5">
            Dompet Poin & Transaksi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Kelola saldo poin, tukarkan voucher reward, dan masukkan kode promo edukasi.
          </p>
        </div>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
              Saldo Poin Edukasi Aktif
            </span>
            <div className="font-display font-black text-3xl sm:text-5xl text-yellow-300 mt-1 flex items-center gap-2">
              <span>🪙 {user?.points.toLocaleString() || '0'}</span>
              <span className="text-lg sm:text-2xl text-white font-bold">Poin</span>
            </div>
            <p className="text-xs text-emerald-100 mt-1">
              Setara dengan Rp {(user ? user.points * 10 : 0).toLocaleString('id-ID')} nilai reward digital
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-4 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 text-center">
              <div className="text-[10px] uppercase font-bold text-emerald-200">Total Didapatkan</div>
              <div className="font-bold text-base text-white mt-0.5">+16.450 pt</div>
            </div>

            <div className="p-4 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 text-center">
              <div className="text-[10px] uppercase font-bold text-emerald-200">Total Ditukarkan</div>
              <div className="font-bold text-base text-amber-300 mt-0.5">-3.600 pt</div>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Code Input Box */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-display font-bold text-base text-slate-800 flex items-center gap-2">
          <Tag className="w-4 h-4 text-emerald-600" />
          <span>Klaim Kode Promo / Voucher Hadiah</span>
        </h3>

        <form onSubmit={handleClaimPromo} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="Coba kode: AURELIA2026 atau BELAJAR_INDONESIA"
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-2xl outline-none font-mono text-sm font-bold text-slate-800 placeholder:font-sans placeholder:font-normal"
          />
          <button
            type="submit"
            disabled={!promoCode.trim()}
            className="px-6 py-3 bg-emerald-600 disabled:opacity-50 text-white font-bold text-xs rounded-2xl hover:bg-emerald-700 active:scale-95 transition-all shadow-md"
          >
            Klaim Bonus Poin
          </button>
        </form>

        {promoStatus && (
          <div
            className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              promoStatus.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {promoStatus.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{promoStatus.message}</span>
          </div>
        )}
      </div>

      {/* Transaction History Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-slate-800">
            Riwayat Mutasi Poin
          </h3>
          <span className="text-xs text-slate-400">Terakhir diperbarui hari ini</span>
        </div>

        <div className="divide-y divide-slate-100">
          {transactions.map((tx) => {
            const isEarn = tx.type === 'EARNED' || tx.type === 'BONUS' || tx.amount > 0;
            const dateStr = new Date(tx.createdAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });
            const absAmount = Math.abs(tx.amount);

            return (
              <div key={tx.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isEarn ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {isEarn ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-800">{tx.description || tx.source}</div>
                    <div className="text-[11px] text-slate-400">{dateStr}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-display font-black text-sm sm:text-base ${isEarn ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isEarn ? `+${absAmount.toLocaleString()}` : `-${absAmount.toLocaleString()}`} pt
                  </div>
                  <span className="inline-block px-1.5 py-0.2 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">
                    {tx.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
