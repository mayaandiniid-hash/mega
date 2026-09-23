import React, { useState } from 'react';
import { db } from '../../lib/storage';
import { useAuth } from '../../lib/authContext';
import { soundEngine } from '../../lib/sound';
import { QuizAttempt } from '../../types';
import { Icon3DHistory, Icon3DSparkles } from '../common/3dIcons';
import {
  History,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  AlertTriangle,
  Play,
  RotateCcw,
  Calendar,
  Filter
} from 'lucide-react';

interface HistoryPageProps {
  onLaunchQuiz: (quizId: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onLaunchQuiz }) => {
  const { user } = useAuth();
  const [attempts, setAttempts] = useState<QuizAttempt[]>(db.getQuizAttempts());
  const [selectedAttempt, setSelectedAttempt] = useState<QuizAttempt | null>(null);

  const averageScore = attempts.length
    ? Math.round(attempts.reduce((acc, a) => acc + a.score, 0) / attempts.length)
    : 0;

  const totalPointsEarned = attempts.reduce(
    (acc, a) => acc + (a.pointsEarned ?? a.earnedPoints ?? 0),
    0
  );

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-sky-600 uppercase tracking-wider flex items-center gap-1.5">
            <History className="w-4 h-4" />
            <span>Rekam Jejak Belajar</span>
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-0.5">
            Riwayat Pengerjaan & Evaluasi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Tinjau hasil kuis, analisis kesalahan soal, dan lakukan remedial untuk meningkatkan akurasi.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="bg-sky-50 border border-sky-100 p-3 rounded-2xl text-center">
            <div className="text-[10px] font-bold text-sky-700 uppercase">Rata-Rata Skor</div>
            <div className="font-black text-xl text-sky-950">{averageScore}%</div>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-3 rounded-2xl text-center">
            <div className="text-[10px] font-bold text-amber-700 uppercase">Total Poin</div>
            <div className="font-black text-xl text-amber-950">+{totalPointsEarned.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* History Items List */}
      <div className="space-y-4">
        {attempts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
            <Icon3DHistory size={48} className="mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-base">Belum Ada Riwayat Pengerjaan</h4>
            <p className="text-xs text-slate-400 mt-1">Selesaikan kuis pertamamu untuk melihat hasil analisis di sini.</p>
          </div>
        ) : (
          attempts.map((att) => {
            const isPassed = att.score >= 60;
            const dateStr = new Date(att.completedAt || att.date || new Date().toISOString()).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            const subjectDisplayName = att.subjectName || att.subjectTitle || 'Mata Pelajaran';
            const quizDisplayName = att.quizTitle || att.subjectTitle || 'Kuis Interaktif';
            const pointsVal = att.earnedPoints ?? att.pointsEarned ?? 0;

            return (
              <div
                key={att.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card-elevated hover:shadow-3d transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        isPassed ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                          {subjectDisplayName}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">{dateStr}</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-slate-900 mt-0.5">
                        {quizDisplayName}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right">
                      <div className="font-black text-lg text-slate-900">
                        Skor: <span className={isPassed ? 'text-emerald-600' : 'text-rose-600'}>{att.score}%</span>
                      </div>
                      <div className="text-xs font-bold text-amber-600">+{pointsVal} Poin</div>
                    </div>

                    <button
                      onClick={() => {
                        onLaunchQuiz(att.quizId);
                        soundEngine.playConfirm();
                      }}
                      className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-xs font-bold border border-sky-200 transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ulangi Kuis</span>
                    </button>
                  </div>
                </div>

                {/* Mistakes breakdown if any */}
                {att.mistakes && att.mistakes.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                      <span>{att.mistakes.length} Soal Perlu Dipelajari Kembali:</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {att.mistakes.map((m, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1 border border-slate-200/70">
                          <div className="font-semibold text-slate-800">{m.questionText}</div>
                          <div className="text-rose-600 text-[11px]">Jawabanmu: {m.userAnswer}</div>
                          <div className="text-emerald-700 font-bold text-[11px]">✓ Kunci: {m.correctAnswer}</div>
                          <p className="text-slate-500 text-[10px] mt-0.5">{m.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
