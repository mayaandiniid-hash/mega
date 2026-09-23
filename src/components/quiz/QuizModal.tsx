import React, { useState, useEffect } from 'react';
import { useAuth } from '../../lib/authContext';
import { db } from '../../lib/storage';
import { soundEngine } from '../../lib/sound';
import { Quiz, QuizQuestion } from '../../types';
import { AurelAvatar } from '../common/AurelAvatar';
import { Icon3DHeart, Icon3DSparkles } from '../common/3dIcons';
import {
  X,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Trophy,
  Award,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

interface QuizModalProps {
  quizId: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenRewards: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  quizId,
  isOpen,
  onClose,
  onOpenRewards,
}) => {
  const { lives, user, recordQuizAttempt } = useAuth();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, { optionIndex: number; isCorrect: boolean }>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(30); // 30s per question
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [currentLives, setCurrentLives] = useState(lives);

  useEffect(() => {
    if (isOpen && quizId) {
      const q = db.getQuizById(quizId);
      if (q) {
        setQuiz(q);
        setCurrentQuestionIndex(0);
        setSelectedOptionIndex(null);
        setIsAnswerSubmitted(false);
        setUserAnswers({});
        setQuizFinished(false);
        setTimeLeft(30);
        setEarnedPoints(0);
        setCurrentLives(lives);
      }
    }
  }, [isOpen, quizId, lives]);

  // Timer Countdown Effect
  useEffect(() => {
    if (!isOpen || quizFinished || isAnswerSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, quizFinished, isAnswerSubmitted, currentQuestionIndex]);

  if (!isOpen || !quiz) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const correctIdx = currentQuestion?.correctAnswerIndex ?? 0;

  const handleTimeExpired = () => {
    if (isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    soundEngine.playWrong();

    // Deduct life
    setCurrentLives((prev: number) => Math.max(0, prev - 1));

    if (currentQuestion) {
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: { optionIndex: -1, isCorrect: false },
      }));
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(idx);
    soundEngine.playClick();
  };

  const handleConfirmAnswer = () => {
    if (selectedOptionIndex === null || isAnswerSubmitted || !currentQuestion) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOptionIndex === correctIdx;

    if (isCorrect) {
      soundEngine.playCorrect();
    } else {
      soundEngine.playWrong();
      setCurrentLives((prev: number) => Math.max(0, prev - 1));
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        optionIndex: selectedOptionIndex,
        isCorrect,
      },
    }));
  };

  const handleNextQuestion = () => {
    if (currentLives <= 0) {
      soundEngine.playGameOver();
      finishQuiz();
      return;
    }

    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
      setTimeLeft(30);
      soundEngine.playConfirm();
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizFinished(true);

    // Calculate score
    const correctCount = Object.values(userAnswers).filter((a) => a.isCorrect).length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const points = correctCount * 50 + (score === 100 ? 100 : 0);
    setEarnedPoints(points);

    if (score >= 60) {
      soundEngine.playVictory();
    } else {
      soundEngine.playGameOver();
    }

    // Persist attempt to MasterStorage
    recordQuizAttempt({
      quizId: quiz.id,
      quizTitle: quiz.title,
      subjectTitle: quiz.subjectTitle || 'Mata Pelajaran',
      score,
      totalQuestions,
      correctCount,
      wrongCount: totalQuestions - correctCount,
      pointsEarned: points,
      passed: score >= 60,
      livesRemaining: currentLives,
      timeSpentSeconds: 90,
      mistakes: quiz.questions
        .filter((q) => !userAnswers[q.id]?.isCorrect)
        .map((q) => {
          const userChosenIdx = userAnswers[q.id]?.optionIndex;
          const userAnsText = userChosenIdx !== undefined && userChosenIdx >= 0 ? q.options[userChosenIdx] : 'Waktu Habis';
          const correctAnsText = q.options[q.correctAnswerIndex ?? 0] || '';
          return {
            questionId: q.id,
            questionText: q.questionText,
            userAnswer: userAnsText,
            correctAnswer: correctAnsText,
            explanation: q.explanation,
          };
        }),
    });
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setQuizFinished(false);
    setTimeLeft(30);
    setEarnedPoints(0);
    setCurrentLives(5);
    soundEngine.playConfirm();
  };

  const correctAnswersCount = Object.values(userAnswers).filter((a) => a.isCorrect).length;
  const finalScorePercent = Math.round((correctAnswersCount / totalQuestions) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Icon3DHeart key={i} size={20} empty={i > currentLives} />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">
              {currentLives} Nyawa Tersisa
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!quizFinished && (
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black ${
                  timeLeft <= 5 ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-sky-100 text-sky-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            )}

            <button
              onClick={() => {
                onClose();
                soundEngine.playConfirm();
              }}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          {!quizFinished && currentQuestion ? (
            <div className="space-y-6">
              {/* Progress */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-1.5">
                  <span className="text-sky-600 uppercase tracking-wider">{quiz.title}</span>
                  <span>
                    Soal {currentQuestionIndex + 1} dari {totalQuestions}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Box */}
              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80">
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 leading-snug">
                  {currentQuestion.questionText}
                </h3>
                {currentQuestion.codeSnippet && (
                  <div className="mt-3 p-3.5 rounded-xl bg-slate-900 text-sky-200 font-mono text-xs overflow-x-auto shadow-inner">
                    <pre>{currentQuestion.codeSnippet}</pre>
                  </div>
                )}
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((optionText, idx) => {
                  let optionClass = 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/40 text-slate-800';
                  const isThisCorrect = idx === correctIdx;
                  const isThisSelected = idx === selectedOptionIndex;

                  if (isAnswerSubmitted) {
                    if (isThisCorrect) {
                      optionClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-300';
                    } else if (isThisSelected) {
                      optionClass = 'border-rose-500 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-300';
                    } else {
                      optionClass = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                    }
                  } else if (isThisSelected) {
                    optionClass = 'border-sky-500 bg-sky-50 text-sky-900 font-bold shadow-sm ring-2 ring-sky-200';
                  }

                  const optionLetter = ['A', 'B', 'C', 'D', 'E'][idx] || `${idx + 1}`;

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${optionClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs shrink-0">
                          {optionLetter}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold leading-relaxed">
                          {optionText}
                        </span>
                      </div>

                      {isAnswerSubmitted && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isAnswerSubmitted && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Dropdown */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 text-xs sm:text-sm text-sky-950 space-y-1 animate-in fade-in">
                  <div className="font-bold flex items-center gap-1.5 text-sky-900">
                    <HelpCircle className="w-4 h-4 text-sky-600" />
                    <span>Penjelasan Jawaban:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation}</p>
                </div>
              )}
            </div>
          ) : (
            /* QUIZ FINISHED / SCORE SUMMARY SCREEN */
            <div className="text-center space-y-6 py-2">
              <div className="flex justify-center">
                <AurelAvatar
                  mood={finalScorePercent >= 80 ? 'celebrating' : finalScorePercent >= 50 ? 'happy' : 'encouraging'}
                  size="xl"
                />
              </div>

              <div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                  {finalScorePercent === 100
                    ? 'Luar Biasa! Sempurna! 🌟'
                    : finalScorePercent >= 70
                    ? 'Kerja Bagus! Terus Tingkatkan! 🚀'
                    : 'Jangan Menyerah, Pelajari Lagi! 💪'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Kamu berhasil menyelesaikan kuis {quiz.title}
                </p>
              </div>

              {/* Score Badges */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100">
                  <div className="text-[10px] uppercase font-bold text-sky-600">Skor Akhir</div>
                  <div className="font-display font-black text-2xl text-sky-950 mt-0.5">
                    {finalScorePercent}%
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="text-[10px] uppercase font-bold text-emerald-600">Jawaban Benar</div>
                  <div className="font-display font-black text-2xl text-emerald-950 mt-0.5">
                    {correctAnswersCount}/{totalQuestions}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100">
                  <div className="text-[10px] uppercase font-bold text-amber-600">Poin Diperoleh</div>
                  <div className="font-display font-black text-2xl text-amber-950 mt-0.5">
                    +{earnedPoints} pt
                  </div>
                </div>
              </div>

              {/* Review Mistakes Section */}
              {totalQuestions - correctAnswersCount > 0 && (
                <div className="text-left bg-rose-50/60 border border-rose-200 rounded-2xl p-4 space-y-2">
                  <div className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Evaluasi Soal yang Perlu Dipelajari Kembali:</span>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {quiz.questions
                      .filter((q) => !userAnswers[q.id]?.isCorrect)
                      .map((q, i) => (
                        <div key={i} className="text-xs bg-white p-2.5 rounded-xl border border-rose-100">
                          <div className="font-bold text-slate-800">{q.questionText}</div>
                          <div className="text-emerald-700 font-semibold mt-1">
                            ✓ Kunci: {q.options[q.correctAnswerIndex ?? 0]}
                          </div>
                          <p className="text-slate-500 text-[11px] mt-0.5">{q.explanation}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
          {!quizFinished ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl"
              >
                Batalkan
              </button>

              {selectedOptionIndex === null || !isAnswerSubmitted ? (
                <button
                  type="button"
                  disabled={selectedOptionIndex === null}
                  onClick={handleConfirmAnswer}
                  className="px-6 py-3 bg-sky-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:bg-sky-700 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>Kirim Jawaban</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>
                    {currentQuestionIndex + 1 < totalQuestions ? 'Lanjut ke Soal Berikutnya' : 'Lihat Hasil Akhir'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={handleRetry}
                className="w-full sm:w-auto px-5 py-3 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Coba Kuis Lagi</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenRewards();
                  soundEngine.playConfirm();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Buka Peti Reward 3D</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
