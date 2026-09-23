import React, { useState } from 'react';
import { soundEngine } from '../../lib/sound';
import { AurelAvatar } from '../common/AurelAvatar';
import { Icon3DHelp } from '../common/3dIcons';
import {
  HelpCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Send,
  Mail,
  Phone,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const HelpCenterPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const faqs = [
    {
      q: 'Bagaimana cara mendapatkan poin belajar di Aurelia Edu?',
      a: 'Kamu bisa mendapatkan poin dengan menyelesaikan materi bab (+50 poin), mengerjakan kuis dengan skor tinggi (+250 hingga +500 poin), mempertahankan streak belajar harian, dan memenangkan mini-games Speed Math Arena.',
    },
    {
      q: 'Bagaimana sistem 5 Nyawa (Hearts) pada kuis bekerja?',
      a: 'Setiap siswa memiliki 5 nyawa saat memulai kuis. Jika menjawab salah atau waktu habis, 1 nyawa akan berkurang. Nyawa akan terisi kembali secara otomatis setiap 30 menit atau dipulihkan penuh saat membuka materi baru.',
    },
    {
      q: 'Apakah hadiah dan saldo digital bisa dicairkan ke akun saya?',
      a: 'Ya! Poin yang kamu kumpulkan dapat ditukarkan di menu Toko Reward 3D menjadi saldo GoPay, DANA, ShopeePay, Google Play voucher, atau merchandise resmi Aurelia Edu.',
    },
    {
      q: 'Bagaimana cara mengubah jenjang, kelas, atau jurusan saya?',
      a: 'Kamu dapat mengubah jenjang pendidikan, kelas, atau program studi kapan saja melalui menu Pengaturan Akun di tab profil.',
    },
    {
      q: 'Apakah Aurelia Edu mencakup kurikulum SMK dan Perguruan Tinggi?',
      a: 'Tentu saja! Kami memiliki silabus khusus untuk SMK Vokasi (seperti RPL, TKJ, Akuntansi, dll.) dan tingkat Perguruan Tinggi (Informatika, Data Science, AI, dll.).',
    },
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;
    setTicketSubmitted(true);
    soundEngine.playVictory();
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-cyan-600 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Pusat Informasi & Bantuan</span>
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-0.5">
            Pusat Bantuan & FAQ Siswa
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Temukan jawaban atas pertanyaan umum atau hubungi tim pendamping edukasi Aurelia.
          </p>
        </div>
      </div>

      {/* Mascot Support Hero */}
      <div className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <AurelAvatar mood="happy" size="lg" />
          <div>
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase">
              Bantuan Instan 24/7
            </span>
            <h3 className="font-display font-black text-2xl mt-1">Ada yang bisa Aurel bantu?</h3>
            <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-md">
              Aurel siap memandumu menjelajahi fitur, klaim hadiah reward, atau menyelesaikan kendala teknis kuis.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-4 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 text-center">
            <Mail className="w-5 h-5 mx-auto text-sky-200" />
            <div className="text-[11px] font-bold text-white mt-1">support@aurelia.edu</div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="font-display font-bold text-lg text-slate-800">
          Pertanyaan yang Sering Diajukan (FAQ)
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => {
                    setOpenFaq(isOpen ? null : index);
                    soundEngine.playConfirm();
                  }}
                  className="w-full p-4 text-left font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between gap-3 text-xs sm:text-sm"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-sky-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Ticket Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-sky-600" />
          <span>Kirim Tiket / Masukan ke Tim Pengembang</span>
        </h3>

        {ticketSubmitted ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-emerald-900 text-base">Tiket Berhasil Dikirim!</h4>
            <p className="text-xs text-emerald-700">
              Terima kasih atas masukanmu. Tim Aurelia Edu akan merespons melalui email dalam 1x24 jam.
            </p>
            <button
              onClick={() => setTicketSubmitted(false)}
              className="mt-2 text-xs font-bold text-emerald-800 hover:underline"
            >
              Kirim Pesan Lainnya
            </button>
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">Subjek Kendala / Topik</label>
              <input
                type="text"
                required
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g. Kendala klaim voucher atau pertanyaan materi bab"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 outline-none text-xs font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">Detail Pertanyaan / Masukan</label>
              <textarea
                required
                rows={4}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Tuliskan pesanmu dengan jelas..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 outline-none text-xs text-slate-800"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-sky-700 active:scale-95 transition-all flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Tiket Dukungan</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
