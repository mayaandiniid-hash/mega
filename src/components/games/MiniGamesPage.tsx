import React, { useState, useEffect } from 'react';
import { useAuth } from '../../lib/authContext';
import { soundEngine } from '../../lib/sound';
import { Icon3DGames, Icon3DSparkles, Icon3DTrophy } from '../common/3dIcons';
import { AurelAvatar } from '../common/AurelAvatar';
import {
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Timer,
  Award,
  CheckCircle2,
  XCircle,
  Flame,
  ArrowRight
} from 'lucide-react';

interface MiniGamesPageProps {
  initialGameId?: string;
}

export const MiniGamesPage: React.FC<MiniGamesPageProps> = ({ initialGameId }) => {
  const { user, awardPoints } = useAuth();
  const [activeGame, setActiveGame] = useState<string | null>(initialGameId || null);

  // Speed Math State
  const [mathNum1, setMathNum1] = useState(0);
  const [mathNum2, setMathNum2] = useState(0);
  const [mathOperator, setMathOperator] = useState<'+' | '-' | '×'>('+');
  const [mathOptions, setMathOptions] = useState<number[]>([]);
  const [correctMathAnswer, setCorrectMathAnswer] = useState(0);
  const [mathScore, setMathScore] = useState(0);
  const [mathTimeLeft, setMathTimeLeft] = useState(30);
  const [isMathPlaying, setIsMathPlaying] = useState(false);
  const [mathGameOver, setMathGameOver] = useState(false);
  const [mathCombo, setMathCombo] = useState(0);

  // Generate new math problem
  const generateMathProblem = () => {
    const ops: ('+' | '-' | '×')[] = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let n1 = Math.floor(Math.random() * 20) + 1;
    let n2 = Math.floor(Math.random() * 15) + 1;
    let ans = 0;

    if (op === '+') ans = n1 + n2;
    else if (op === '-') {
      if (n1 < n2) [n1, n2] = [n2, n1];
      ans = n1 - n2;
    } else {
      n1 = Math.floor(Math.random() * 12) + 2;
      n2 = Math.floor(Math.random() * 9) + 2;
      ans = n1 * n2;
    }

    setMathNum1(n1);
    setMathNum2(n2);
    setMathOperator(op);
    setCorrectMathAnswer(ans);

    // Options
    const fake1 = ans + (Math.random() > 0.5 ? 2 : -2);
    const fake2 = ans + (Math.random() > 0.5 ? 5 : -3);
    const fake3 = Math.max(1, ans + (Math.random() > 0.5 ? 10 : -7));
    const opts = Array.from(new Set([ans, fake1, fake2, fake3]));
    while (opts.length < 4) opts.push(ans + opts.length * 3);
    setMathOptions(opts.sort(() => Math.random() - 0.5));
  };

  const startSpeedMath = () => {
    setIsMathPlaying(true);
    setMathGameOver(false);
    setMathScore(0);
    setMathCombo(0);
    setMathTimeLeft(30);
    generateMathProblem();
    soundEngine.playConfirm();
  };

  // Math Timer
  useEffect(() => {
    if (!isMathPlaying || mathGameOver) return;
    const timer = setInterval(() => {
      setMathTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endSpeedMath();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isMathPlaying, mathGameOver]);

  const handleMathAnswer = (chosen: number) => {
    if (!isMathPlaying || mathGameOver) return;

    if (chosen === correctMathAnswer) {
      soundEngine.playCorrect();
      setMathScore((prev) => prev + 10 + mathCombo * 2);
      setMathCombo((prev) => prev + 1);
      generateMathProblem();
    } else {
      soundEngine.playWrong();
      setMathCombo(0);
    }
  };

  const endSpeedMath = () => {
    setMathGameOver(true);
    setIsMathPlaying(false);
    soundEngine.playVictory();
    // Award points
    const earned = Math.max(50, mathScore * 2);
    awardPoints(earned, 'Menyelesaikan Speed Math Arena');
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4" />
            <span>Mini-Games & Logika Cepat</span>
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-0.5">
            Arena Game Edukasi Interaktif
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Latih kecepatan berpikir, ketangkasan kognitif, dan dapatkan bonus koin setiap ronde!
          </p>
        </div>
      </div>

      {/* Speed Math Arena Game Window */}
      {activeGame === 'game_speed_math' && (
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-950 text-white rounded-3xl p-6 sm:p-10 border border-indigo-500/30 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">⚡</span>
              <div>
                <h3 className="font-display font-black text-xl text-white">Speed Math Arena</h3>
                <p className="text-xs text-sky-300">Hitung secepat mungkin dalam 30 detik!</p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveGame(null);
                setIsMathPlaying(false);
              }}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold"
            >
              Tutup Game
            </button>
          </div>

          {!isMathPlaying && !mathGameOver && (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <AurelAvatar mood="excited" size="lg" />
              <h4 className="font-display font-bold text-2xl text-yellow-300">Siap Menguji Kecepatan Hitung?</h4>
              <p className="text-xs text-sky-200">
                Pilih jawaban yang benar secepat mungkin. Setiap jawaban tepat beruntun memberikan Combo Poin ekstra!
              </p>
              <button
                onClick={startSpeedMath}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-sm rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all mx-auto flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Mulai Ronde (30 Detik)</span>
              </button>
            </div>
          )}

          {isMathPlaying && (
            <div className="max-w-md mx-auto space-y-6 text-center">
              {/* Stats Bar */}
              <div className="flex items-center justify-between bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                <div className="flex items-center gap-1.5 text-amber-300 font-black text-sm">
                  <Timer className="w-4 h-4" />
                  <span>{mathTimeLeft}s</span>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-400 font-black text-sm">
                  <Flame className="w-4 h-4" />
                  <span>Combo: {mathCombo}x</span>
                </div>

                <div className="text-yellow-300 font-black text-sm">
                  Skor: {mathScore}
                </div>
              </div>

              {/* Math Question Card */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-inner">
                <div className="font-display font-black text-5xl sm:text-6xl text-white tracking-wider">
                  {mathNum1} {mathOperator} {mathNum2} = ?
                </div>
              </div>

              {/* 4 Answer Options */}
              <div className="grid grid-cols-2 gap-3.5">
                {mathOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleMathAnswer(opt)}
                    className="py-5 px-4 bg-white/15 hover:bg-sky-500 text-white font-display font-black text-2xl sm:text-3xl rounded-2xl border border-white/20 hover:scale-105 active:scale-95 transition-all shadow-md"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {mathGameOver && (
            <div className="text-center py-8 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-3xl mx-auto">
                🏆
              </div>
              <h4 className="font-display font-black text-2xl text-white">Waktu Habis! Ronde Selesai</h4>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20 space-y-1">
                <div className="text-xs text-sky-200">Total Skor Akhir:</div>
                <div className="font-black text-4xl text-amber-300">{mathScore} Poin Game</div>
                <div className="text-xs text-emerald-400 font-bold mt-2">
                  ✓ +{Math.max(50, mathScore * 2)} Koin Ditambahkan ke Dompetmu!
                </div>
              </div>
              <button
                onClick={startSpeedMath}
                className="px-8 py-3 bg-white text-slate-950 font-black text-xs rounded-xl shadow-md hover:bg-slate-100 flex items-center justify-center gap-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Main Sekali Lagi</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Game Catalog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            id: 'game_speed_math',
            title: 'Speed Math Arena',
            category: 'Matematika & Logika',
            reward: '+300 Poin',
            desc: 'Adu cepat menyelesaikan persamaan penjumlahan, pengurangan, dan perkalian dalam 30 detik.',
            icon: '⚡',
            gradient: 'from-amber-500 to-orange-600',
          },
          {
            id: 'game_word_master',
            title: 'Science & Vocabulary Rush',
            category: 'Sains & Bahasa',
            reward: '+250 Poin',
            desc: 'Tebak istilah sains, anatomi, astronomi, dan kosakata bahasa Inggris modern.',
            icon: '🧬',
            gradient: 'from-blue-500 to-indigo-600',
          },
          {
            id: 'game_code_trivia',
            title: 'Tech & AI Code Sprint',
            category: 'Informatika & AI',
            reward: '+450 Poin',
            desc: 'Tantangan logika algoritma, tebak output coding, dan arsitektur data.',
            icon: '💻',
            gradient: 'from-emerald-500 to-teal-600',
          },
        ].map((game) => (
          <div
            key={game.id}
            className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-card-elevated hover:shadow-3d hover:border-sky-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl group-hover:scale-110 transition-transform">{game.icon}</span>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-black rounded-full border border-amber-200">
                  {game.reward}
                </span>
              </div>

              <div className="text-[11px] font-extrabold text-sky-600 uppercase tracking-wider">
                {game.category}
              </div>
              <h3 className="font-display font-extrabold text-lg text-slate-800 group-hover:text-sky-700 transition-colors mt-0.5">
                {game.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{game.desc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold">Tantangan Harian</span>
              <button
                onClick={() => {
                  setActiveGame(game.id);
                  if (game.id === 'game_speed_math') startSpeedMath();
                  soundEngine.playConfirm();
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Mainkan</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
