import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../lib/authContext';
import { AurelAvatar, AurelMood } from '../common/AurelAvatar';
import { soundEngine } from '../../lib/sound';
import { EducationLevelType, UserProfile, LearningStyle } from '../../types';
import { SMK_MAJORS_LIST, UNIVERSITY_PROGRAMS_LIST } from '../../lib/storage';
import {
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Award,
  BookOpen,
  GraduationCap,
  Laptop,
  Atom,
  Flame
} from 'lucide-react';

interface AurelOnboardingProps {
  onComplete: () => void;
}

type OnboardingStep =
  | 'INTRO'
  | 'NAME'
  | 'AGE'
  | 'EDUCATION_LEVEL'
  | 'GRADE'
  | 'SMK_MAJOR'
  | 'UNIVERSITY_INFO'
  | 'FAVORITE_SUBJECTS'
  | 'AI_INTEREST'
  | 'LEARNING_INTERESTS'
  | 'LEARNING_STYLE'
  | 'LEARNING_GOALS'
  | 'SUMMARY';

export const AurelOnboarding: React.FC<AurelOnboardingProps> = ({ onComplete }) => {
  const { user, completeOnboarding, soundMuted, toggleSound } = useAuth();

  const [step, setStep] = useState<OnboardingStep>('INTRO');
  const [mood, setMood] = useState<AurelMood>('waving');
  const [dialogueText, setDialogueText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState(user?.profile?.fullName || user?.username || '');
  const [age, setAge] = useState<number>(user?.profile?.age || 16);
  const [educationLevel, setEducationLevel] = useState<EducationLevelType>(user?.profile?.educationLevel || 'SMK');
  const [grade, setGrade] = useState<string>(user?.profile?.grade || 'Kelas 10');
  const [major, setMajor] = useState<string>(user?.profile?.major || 'Rekayasa Perangkat Lunak (RPL)');
  const [university, setUniversity] = useState<string>(user?.profile?.university || 'Universitas Indonesia');
  const [studyProgram, setStudyProgram] = useState<string>(user?.profile?.studyProgram || 'Teknik Informatika / Ilmu Komputer');
  const [semester, setSemester] = useState<string>(user?.profile?.semester || 'Semester 3');
  const [favoriteSubjects, setFavoriteSubjects] = useState<string[]>(user?.profile?.favoriteSubjects || []);
  const [aiInterest, setAiInterest] = useState<UserProfile['aiInterest']>(user?.profile?.aiInterest || 'Ya, sangat tertarik');
  const [learningInterests, setLearningInterests] = useState<string[]>(user?.profile?.learningInterests || ['Programming', 'Teknologi']);
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(user?.profile?.learningStyle || 'Game dan tantangan');
  const [learningGoals, setLearningGoals] = useState<string[]>(user?.profile?.learningGoals || ['Meningkatkan nilai', 'Mengembangkan skill']);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Step Dialogue Mapping
  const getStepPrompt = (currentStep: OnboardingStep): { text: string; mood: AurelMood } => {
    switch (currentStep) {
      case 'INTRO':
        return {
          text: 'Halo! Aku Aurel, pendamping belajarmu di AURELIA EDU. Sebelum kita mulai petualangan belajar, aku ingin mengenal kamu sedikit.',
          mood: 'waving',
        };
      case 'NAME':
        return {
          text: 'Siapa namamu?',
          mood: 'happy',
        };
      case 'AGE':
        return {
          text: `Senang bisa bertemu denganmu, ${name || 'teman'}! Kalau boleh tahu, umur kamu berapa tahun?`,
          mood: 'happy',
        };
      case 'EDUCATION_LEVEL':
        return {
          text: 'Sekarang kamu sedang menempuh pendidikan di jenjang apa?',
          mood: 'thinking',
        };
      case 'GRADE':
        return {
          text: educationLevel === 'KULIAH' ? 'Kamu sedang berada di semester berapa?' : 'Kamu saat ini berada di kelas berapa?',
          mood: 'happy',
        };
      case 'SMK_MAJOR':
        return {
          text: 'Wah, SMK hebat! Apa jurusan keahlian yang kamu ambil?',
          mood: 'excited',
        };
      case 'UNIVERSITY_INFO':
        return {
          text: 'Keren sekali! Di universitas mana dan apa program studi yang kamu tekuni?',
          mood: 'thinking',
        };
      case 'FAVORITE_SUBJECTS':
        return {
          text: 'Mata pelajaran atau bidang apa yang paling kamu sukai saat ini?',
          mood: 'happy',
        };
      case 'AI_INTEREST':
        return {
          text: 'Kamu tertarik dengan bidang Artificial Intelligence (AI) dan teknologi masa depan?',
          mood: 'excited',
        };
      case 'LEARNING_INTERESTS':
        return {
          text: 'Apa bidang kompetensi yang paling ingin kamu kembangkan bersama Aurel?',
          mood: 'happy',
        };
      case 'LEARNING_STYLE':
        return {
          text: 'Kamu lebih suka belajar dengan cara apa agar materi cepat dipahami?',
          mood: 'thinking',
        };
      case 'LEARNING_GOALS':
        return {
          text: 'Terakhir, apa target atau impian belajarmu di AURELIA EDU?',
          mood: 'encouraging',
        };
      case 'SUMMARY':
        return {
          text: `Senang mengenal kamu, ${name}! Profil belajarmu sudah siap. Mulai sekarang aku akan menyesuaikan materi dan kuis khusus untukmu!`,
          mood: 'celebrating',
        };
    }
  };

  // Run Typewriter Effect whenever step changes
  useEffect(() => {
    const { text, mood: newMood } = getStepPrompt(step);
    setDialogueText(text);
    setMood(newMood);
    setTypedText('');
    setIsTyping(true);

    soundEngine.playCloudWoosh();

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setTypedText(text.slice(0, currentIndex + 1));
        if (currentIndex % 3 === 0) {
          soundEngine.playTyping();
        }
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [step]);

  // Subject options based on level
  const getSubjectOptions = () => {
    switch (educationLevel) {
      case 'SD':
        return ['Matematika Dasar', 'IPAS (Sains & Sosial)', 'Bahasa Indonesia', 'Bahasa Inggris', 'Pendidikan Pancasila', 'Seni Budaya', 'PJOK'];
      case 'SMP':
        return ['Matematika SMP', 'IPA Terpadu', 'IPS', 'Bahasa Indonesia', 'Bahasa Inggris', 'Informatika Dasar', 'Pendidikan Pancasila'];
      case 'SMA':
        return ['Matematika Peminatan', 'Fisika Modern', 'Kimia', 'Biologi', 'Ekonomi', 'Sosiologi', 'Bahasa Inggris', 'Informatika'];
      case 'SMK':
        return ['Pemrograman Web', 'Basis Data', 'Jaringan Komputer', 'Sistem Komputer', 'Matematika Terapan', 'Bahasa Inggris Teknis', 'Kewirausahaan'];
      case 'KULIAH':
        return ['Machine Learning & AI', 'Struktur Data & Algoritma', 'Sistem Terdistribusi', 'Kalkulus Lanjut', 'Rekayasa Perangkat Lunak', 'Basis Data Lanjut'];
      default:
        return ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Literasi Digital', 'Sains Populer'];
    }
  };

  // Step Progression Logic
  const handleNextStep = () => {
    soundEngine.playConfirm();
    switch (step) {
      case 'INTRO':
        setStep('NAME');
        break;
      case 'NAME':
        if (!name.trim()) return;
        setStep('AGE');
        break;
      case 'AGE':
        setStep('EDUCATION_LEVEL');
        break;
      case 'EDUCATION_LEVEL':
        if (educationLevel === 'SMK') {
          setStep('SMK_MAJOR');
        } else if (educationLevel === 'KULIAH') {
          setStep('UNIVERSITY_INFO');
        } else {
          setStep('GRADE');
        }
        break;
      case 'SMK_MAJOR':
        setStep('GRADE');
        break;
      case 'UNIVERSITY_INFO':
        setStep('GRADE');
        break;
      case 'GRADE':
        setStep('FAVORITE_SUBJECTS');
        break;
      case 'FAVORITE_SUBJECTS':
        setStep('AI_INTEREST');
        break;
      case 'AI_INTEREST':
        setStep('LEARNING_INTERESTS');
        break;
      case 'LEARNING_INTERESTS':
        setStep('LEARNING_STYLE');
        break;
      case 'LEARNING_STYLE':
        setStep('LEARNING_GOALS');
        break;
      case 'LEARNING_GOALS':
        setStep('SUMMARY');
        break;
      case 'SUMMARY':
        handleFinishOnboarding();
        break;
    }
  };

  const handleFinishOnboarding = () => {
    setSubmitting(true);
    completeOnboarding({
      fullName: name.trim() || 'Siswa Berprestasi',
      age: Number(age) || 16,
      educationLevel,
      grade,
      major: educationLevel === 'SMK' ? major : undefined,
      university: educationLevel === 'KULIAH' ? university : undefined,
      studyProgram: educationLevel === 'KULIAH' ? studyProgram : undefined,
      semester: educationLevel === 'KULIAH' ? semester : undefined,
      favoriteSubjects,
      aiInterest,
      learningInterests,
      learningStyle,
      learningGoals,
    });
    onComplete();
  };

  // Calculate numeric progress step (1 to 9)
  const getStepNumber = (): { current: number; total: number } => {
    const stepOrder: OnboardingStep[] = [
      'INTRO',
      'NAME',
      'AGE',
      'EDUCATION_LEVEL',
      educationLevel === 'SMK' ? 'SMK_MAJOR' : educationLevel === 'KULIAH' ? 'UNIVERSITY_INFO' : 'GRADE',
      'FAVORITE_SUBJECTS',
      'AI_INTEREST',
      'LEARNING_INTERESTS',
      'LEARNING_STYLE',
      'LEARNING_GOALS',
      'SUMMARY',
    ];
    const total = 9;
    const idx = Math.min(total, Math.max(1, stepOrder.indexOf(step)));
    return { current: idx, total };
  };

  const { current: currentProgress, total: totalProgress } = getStepNumber();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50/60 flex flex-col justify-between p-4 sm:p-6 md:p-10 relative overflow-hidden">
      {/* Decorative Sky Clouds in Background */}
      <div className="absolute -top-12 -left-12 w-64 h-32 bg-white/80 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/4 -right-16 w-80 h-40 bg-sky-200/50 rounded-full blur-3xl pointer-events-none animate-cloud-drift" />
      <div className="absolute bottom-10 left-1/3 w-96 h-48 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 max-w-4xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
            A
          </div>
          <div>
            <h1 className="font-display font-extrabold text-lg text-slate-800 tracking-tight flex items-center gap-1.5">
              AURELIA <span className="text-sky-500">EDU</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">Teman Belajar Cerdas</p>
          </div>
        </div>

        {/* Sound Toggle & Progress Badge */}
        <div className="flex items-center gap-3">
          {step !== 'INTRO' && step !== 'SUMMARY' && (
            <div className="bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-100 shadow-sm text-xs font-bold text-sky-700 flex items-center gap-1.5">
              <span>0{currentProgress}</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-400">0{totalProgress}</span>
            </div>
          )}

          <button
            onClick={toggleSound}
            className="w-10 h-10 rounded-full bg-white/90 border border-slate-200/80 shadow-sm hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors"
            title={soundMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-sky-600" />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {step !== 'INTRO' && step !== 'SUMMARY' && (
        <div className="relative z-10 max-w-xl w-full mx-auto my-3 bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentProgress / totalProgress) * 100}%` }}
          />
        </div>
      )}

      {/* Main Dialogue & Interactive Stage */}
      <div className="relative z-10 max-w-2xl w-full mx-auto my-auto flex flex-col items-center">
        {/* Mascot Avatar with dynamic reaction */}
        <div className="mb-4 transform hover:scale-105 transition-transform duration-300">
          <AurelAvatar mood={mood} size={step === 'INTRO' || step === 'SUMMARY' ? 'xl' : 'lg'} />
        </div>

        {/* Flying Cloud Dialogue Bubble */}
        <div className="w-full relative">
          {/* Cloud Dialogue Bubble Shape */}
          <div className="relative bg-white/95 backdrop-blur-xl border-2 border-sky-100 shadow-3d rounded-3xl p-6 sm:p-8 text-center transition-all duration-300">
            {/* Cloud tail pointing to Aurel */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-t-2 border-l-2 border-sky-100 rotate-45 rounded-sm" />

            {/* Typewriter Dialogue Text */}
            <div className="min-h-[60px] flex items-center justify-center">
              <p className="text-slate-800 font-display font-semibold text-lg sm:text-xl leading-relaxed">
                {typedText}
                {isTyping && <span className="inline-block w-2 h-5 ml-1 bg-sky-500 rounded-sm animate-pulse" />}
              </p>
            </div>

            {/* Step Inputs & Options (Shown once typing is done or during typing) */}
            <div className={`mt-6 pt-6 border-t border-slate-100 transition-opacity duration-300 ${isTyping ? 'opacity-90' : 'opacity-100'}`}>
              {/* STEP: INTRO */}
              {step === 'INTRO' && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-500 max-w-md mx-auto">
                    Aurel akan mempersonalisasi materi belajar, bank soal, dan tantangan kuis yang cocok untukmu.
                  </p>
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-sky-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 mx-auto"
                  >
                    <span>Mulai Berkenalan</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* STEP: NAME */}
              {step === 'NAME' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNextStep();
                  }}
                  className="space-y-4 max-w-sm mx-auto"
                >
                  <input
                    type="text"
                    required
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap kamu..."
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-sky-100 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none text-center font-bold text-slate-800 text-lg transition-all placeholder:font-normal placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full py-3.5 bg-sky-600 disabled:opacity-50 text-white font-bold rounded-2xl shadow-md hover:bg-sky-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Lanjutkan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* STEP: AGE */}
              {step === 'AGE' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNextStep();
                  }}
                  className="space-y-4 max-w-xs mx-auto"
                >
                  <div className="flex items-center justify-center gap-3">
                    <input
                      type="number"
                      min={6}
                      max={70}
                      required
                      autoFocus
                      value={age || ''}
                      onChange={(e) => setAge(Math.max(6, Math.min(70, Number(e.target.value))))}
                      className="w-28 px-4 py-3 rounded-2xl border-2 border-sky-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none text-center font-extrabold text-2xl text-slate-800"
                    />
                    <span className="text-slate-600 font-bold text-lg">Tahun</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-sky-600 text-white font-bold rounded-2xl shadow-md hover:bg-sky-700 active:scale-95 transition-all"
                  >
                    Lanjut
                  </button>
                </form>
              )}

              {/* STEP: EDUCATION LEVEL */}
              {step === 'EDUCATION_LEVEL' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
                    {[
                      { key: 'SD', label: 'SD / MI', icon: '🌱', desc: 'Kelas 1-6' },
                      { key: 'SMP', label: 'SMP / MTs', icon: '📘', desc: 'Kelas 7-9' },
                      { key: 'SMA', label: 'SMA', icon: '🏛️', desc: 'Kelas 10-12 IPA/IPS' },
                      { key: 'SMK', label: 'SMK', icon: '⚡', desc: 'Kejuruan & Vokasi' },
                      { key: 'MA', label: 'Madrasah (MA)', icon: '🕌', desc: 'Aliyah 10-12' },
                      { key: 'KULIAH', label: 'Universitas', icon: '🎓', desc: 'D3 / S1 / S2' },
                      { key: 'LAINNYA', label: 'Umum / Kursus', icon: '💡', desc: 'Persiapan Karir' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => {
                          setEducationLevel(item.key as EducationLevelType);
                          soundEngine.playConfirm();
                        }}
                        className={`p-3.5 rounded-2xl border-2 text-left flex flex-col justify-between transition-all duration-200 ${
                          educationLevel === item.key
                            ? 'border-sky-500 bg-sky-50/80 shadow-md scale-[1.03]'
                            : 'border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="text-2xl mb-1">{item.icon}</div>
                        <div>
                          <div className="font-bold text-sm text-slate-800">{item.label}</div>
                          <div className="text-[11px] text-slate-500">{item.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-sky-600 text-white font-bold rounded-2xl shadow-md hover:bg-sky-700 active:scale-95 transition-all mx-auto flex items-center gap-2"
                  >
                    <span>Pilih {educationLevel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP: SMK MAJOR */}
              {step === 'SMK_MAJOR' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-lg mx-auto text-left max-h-60 overflow-y-auto pr-1">
                    {SMK_MAJORS_LIST.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setMajor(m);
                          soundEngine.playConfirm();
                        }}
                        className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                          major === m
                            ? 'border-sky-500 bg-sky-50 text-sky-800 shadow-sm'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{m}</span>
                        {major === m && <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-sky-600 text-white font-bold rounded-2xl shadow-md hover:bg-sky-700 active:scale-95 transition-all mx-auto flex items-center gap-2"
                  >
                    <span>Lanjut ke Kelas</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP: UNIVERSITY INFO */}
              {step === 'UNIVERSITY_INFO' && (
                <div className="space-y-3.5 max-w-md mx-auto text-left">
                  <div>
                    <label className="text-xs font-bold text-slate-600 mb-1 block">Nama Universitas / Perguruan Tinggi</label>
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g. Institut Teknologi Bandung (ITB)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm font-semibold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 mb-1 block">Program Studi / Jurusan</label>
                    <select
                      value={studyProgram}
                      onChange={(e) => setStudyProgram(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 outline-none text-sm font-semibold text-slate-800 bg-white"
                    >
                      {UNIVERSITY_PROGRAMS_LIST.map((prog) => (
                        <option key={prog} value={prog}>
                          {prog}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full mt-2 py-3 bg-sky-600 text-white font-bold rounded-xl shadow-md hover:bg-sky-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Lanjut ke Semester</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP: GRADE / SEMESTER */}
              {step === 'GRADE' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-md mx-auto">
                    {educationLevel === 'SD' &&
                      ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            setGrade(g);
                            soundEngine.playConfirm();
                          }}
                          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                            grade === g ? 'bg-sky-600 text-white shadow-md scale-105' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {g}
                        </button>
                      ))}

                    {educationLevel === 'SMP' &&
                      ['Kelas 7', 'Kelas 8', 'Kelas 9'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            setGrade(g);
                            soundEngine.playConfirm();
                          }}
                          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                            grade === g ? 'bg-sky-600 text-white shadow-md scale-105' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {g}
                        </button>
                      ))}

                    {(educationLevel === 'SMA' || educationLevel === 'SMK' || educationLevel === 'MA') &&
                      ['Kelas 10', 'Kelas 11', 'Kelas 12'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            setGrade(g);
                            soundEngine.playConfirm();
                          }}
                          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                            grade === g ? 'bg-sky-600 text-white shadow-md scale-105' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {g}
                        </button>
                      ))}

                    {educationLevel === 'KULIAH' &&
                      ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8+'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            setSemester(s);
                            setGrade(s);
                            soundEngine.playConfirm();
                          }}
                          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                            semester === s ? 'bg-sky-600 text-white shadow-md scale-105' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {s}
                        </button>
                      ))}

                    {educationLevel === 'LAINNYA' &&
                      ['Persiapan UTBK', 'Persiapan CPNS/BUMN', 'Professional Dev', 'Belajar Mandiri'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            setGrade(g);
                            soundEngine.playConfirm();
                          }}
                          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                            grade === g ? 'bg-sky-600 text-white shadow-md scale-105' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-sky-600 text-white font-bold rounded-2xl shadow-md hover:bg-sky-700 active:scale-95 transition-all mx-auto flex items-center gap-2"
                  >
                    <span>Lanjut</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP: FAVORITE SUBJECTS */}
              {step === 'FAVORITE_SUBJECTS' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500">Pilih satu atau lebih mata pelajaran yang paling kamu minati:</p>
                  <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
                    {getSubjectOptions().map((subj) => {
                      const isSelected = favoriteSubjects.includes(subj);
                      return (
                        <button
                          key={subj}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setFavoriteSubjects(favoriteSubjects.filter((s) => s !== subj));
                            } else {
                              setFavoriteSubjects([...favoriteSubjects, subj]);
                            }
                            soundEngine.playConfirm();
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-300'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {subj} {isSelected && '✓'}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-sky-600 text-white font-bold rounded-2xl shadow-md hover:bg-sky-700 active:scale-95 transition-all mx-auto flex items-center gap-2"
                  >
                    <span>Lanjut ({favoriteSubjects.length} Dipilih)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP: AI INTEREST */}
              {step === 'AI_INTEREST' && (
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
                    {[
                      { val: 'Ya, sangat tertarik', icon: '🤖', desc: 'Ingin mendalami coding, ML & prompt engineering' },
                      { val: 'Sedikit tertarik', icon: '💡', desc: 'Penasaran dengan cara kerja AI modern' },
                      { val: 'Masih ingin tahu', icon: '🔍', desc: 'Mau melihat contoh pemanfaatannya dahulu' },
                      { val: 'Belum tertarik', icon: '📚', desc: 'Fokus ke kurikulum standar sekolah saat ini' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => {
                          setAiInterest(item.val as UserProfile['aiInterest']);
                          soundEngine.playConfirm();
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          aiInterest === item.val
                            ? 'border-sky-500 bg-sky-50/90 shadow-md ring-2 ring-sky-300'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-xl mb-1">{item.icon}</div>
                        <div className="font-bold text-xs text-slate-800">{item.val}</div>
                        <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-sky-600 text-white font-bold rounded-2xl shadow-md hover:bg-sky-700 active:scale-95 transition-all mx-auto flex items-center gap-2"
                  >
                    <span>Lanjutkan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP: LEARNING INTERESTS */}
              {step === 'LEARNING_INTERESTS' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500">Pilih target kompetensi yang ingin kamu asah:</p>
                  <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
                    {[
                      'Nilai sekolah',
                      'Matematika',
                      'Bahasa',
                      'Sains',
                      'Teknologi',
                      'Programming',
                      'Artificial Intelligence',
                      'Bisnis',
                      'Kreativitas',
                      'Persiapan ujian',
                      'Pengetahuan umum',
                    ].map((item) => {
                      const isSelected = learningInterests.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setLearningInterests(learningInterests.filter((i) => i !== item));
                            } else {
                              setLearningInterests([...learningInterests, item]);
                            }
                            soundEngine.playConfirm();
                          }}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {item} {isSelected && '✓'}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-sky-600 text-white font-bold rounded-2xl shadow-md hover:bg-sky-700 active:scale-95 transition-all mx-auto flex items-center gap-2"
                  >
                    <span>Lanjut</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP: LEARNING STYLE */}
              {step === 'LEARNING_STYLE' && (
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
                    {[
                      { val: 'Video dan visual', icon: '🎬', desc: 'Animasi, diagram grafik, dan penjelasan visual' },
                      { val: 'Mengerjakan soal', icon: '✏️', desc: 'Langsung latihan soal dan tryout interaktif' },
                      { val: 'Membaca materi', icon: '📖', desc: 'Rangkuman teori terstruktur dan studi kasus' },
                      { val: 'Game dan tantangan', icon: '🎮', desc: 'Kompetisi ranking, streak harian & mini-games' },
                      { val: 'Campuran semuanya', icon: '🌟', desc: 'Kombinasi lengkap sesuai suasana belajar' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => {
                          setLearningStyle(item.val as LearningStyle);
                          soundEngine.playConfirm();
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          learningStyle === item.val
                            ? 'border-sky-500 bg-sky-50 shadow-md ring-2 ring-sky-300'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-xl mb-1">{item.icon}</div>
                        <div className="font-bold text-xs text-slate-800">{item.val}</div>
                        <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-sky-600 text-white font-bold rounded-2xl shadow-md hover:bg-sky-700 active:scale-95 transition-all mx-auto flex items-center gap-2"
                  >
                    <span>Lanjut</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP: LEARNING GOALS */}
              {step === 'LEARNING_GOALS' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
                    {[
                      'Meningkatkan nilai',
                      'Memahami materi',
                      'Persiapan ujian',
                      'Mengejar ranking',
                      'Mengumpulkan reward',
                      'Belajar teknologi',
                      'Mengembangkan skill',
                      'Belajar secara konsisten',
                    ].map((item) => {
                      const isSelected = learningGoals.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setLearningGoals(learningGoals.filter((g) => g !== item));
                            } else {
                              setLearningGoals([...learningGoals, item]);
                            }
                            soundEngine.playConfirm();
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {item} {isSelected && '✓'}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-sky-600 text-white font-bold rounded-2xl shadow-md hover:bg-sky-700 active:scale-95 transition-all mx-auto flex items-center gap-2"
                  >
                    <span>Lihat Rangkuman Profil</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP: SUMMARY */}
              {step === 'SUMMARY' && (
                <div className="space-y-5 max-w-md mx-auto">
                  {/* Summary Profile Badge Card */}
                  <div className="bg-gradient-to-br from-sky-50 to-indigo-50/80 p-5 rounded-2xl border border-sky-200 text-left space-y-2.5 text-xs shadow-inner">
                    <div className="flex items-center justify-between border-b border-sky-200/60 pb-2">
                      <span className="text-slate-500 font-semibold">Nama Siswa:</span>
                      <span className="font-bold text-slate-800 text-sm">{name}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Usia:</span>
                      <span className="font-bold text-slate-800">{age} Tahun</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Jenjang & Kelas:</span>
                      <span className="font-bold text-sky-700">{educationLevel} — {grade}</span>
                    </div>

                    {educationLevel === 'SMK' && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Jurusan:</span>
                        <span className="font-bold text-slate-800 text-right">{major}</span>
                      </div>
                    )}

                    {educationLevel === 'KULIAH' && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-semibold">Universitas:</span>
                          <span className="font-bold text-slate-800">{university}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-semibold">Prodi & Semester:</span>
                          <span className="font-bold text-slate-800">{studyProgram} ({semester})</span>
                        </div>
                      </>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Gaya Belajar:</span>
                      <span className="font-bold text-indigo-700">{learningStyle}</span>
                    </div>

                    <div className="border-t border-sky-200/60 pt-2">
                      <span className="text-slate-500 font-semibold block mb-1">Target Belajar:</span>
                      <div className="flex flex-wrap gap-1">
                        {learningGoals.slice(0, 3).map((g) => (
                          <span key={g} className="px-2 py-0.5 bg-white rounded-md text-[10px] font-bold text-slate-700 border border-slate-200">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bonus callout */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-center gap-2 text-amber-800 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Bonus Selamat Datang: <strong>+500 Poin Belajar</strong> akan ditambahkan!</span>
                  </div>

                  <button
                    type="button"
                    disabled={submitting}
                    onClick={handleFinishOnboarding}
                    className="w-full py-4 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-extrabold text-base rounded-2xl shadow-xl hover:shadow-sky-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Mulai Belajar Sekarang</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 max-w-md w-full mx-auto text-center mt-6 text-xs text-slate-400">
        AURELIA EDU • Kurikulum Nasional Terpersonalisasi • Hak Cipta 2026
      </div>
    </div>
  );
};
