export type Role = 'USER' | 'ADMIN' | 'SUPER_ADMIN' | 'SUPPORT' | 'CONTENT_MANAGER';

export type EducationLevelType = 'SD' | 'SMP' | 'SMA' | 'SMK' | 'MA' | 'KULIAH' | 'LAINNYA';

export type LearningStyle = 'Video dan visual' | 'Mengerjakan soal' | 'Membaca materi' | 'Game dan tantangan' | 'Campuran semuanya';

export interface UserProfile {
  id: string;
  userId: string;
  fullName: string;
  age: number;
  avatar: string;
  educationLevel: EducationLevelType;
  grade: string;
  major?: string;
  studyProgram?: string;
  university?: string;
  semester?: string;
  favoriteSubjects: string[];
  aiInterest: 'Ya, sangat tertarik' | 'Sedikit tertarik' | 'Masih ingin tahu' | 'Belum tertarik';
  learningInterests: string[];
  learningStyle: LearningStyle;
  learningGoals: string[];
  onboardingCompleted: boolean;
  onboardingStep?: number;
  schoolName?: string;
  phone?: string;
  bio?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
  suspensionReason?: string;
  createdAt: string;
  updatedAt: string;
  points: number;
  lives: number;
  streakDays: number;
  lastActiveDate: string;
  profile: UserProfile;
}

export interface Chapter {
  id: string;
  subjectId: string;
  chapterNumber: number;
  title: string;
  description: string;
  durationMinutes: number;
  content: string; // rich markdown / HTML
  keyPoints: string[];
  examples: { title: string; explanation: string; codeOrFormula?: string }[];
  isCompleted?: boolean;
  score?: number;
  quizId?: string;
}

export interface Subject {
  id: string;
  title: string;
  code: string;
  educationLevel: EducationLevelType;
  grade?: string; // e.g. "Kelas 10", "Kelas 5", "Semester 3"
  major?: string; // For SMK e.g. "Rekayasa Perangkat Lunak"
  studyProgram?: string; // For University e.g. "Informatika"
  category: string;
  iconName: string;
  themeColor: string;
  accentColor: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  averageScore: number;
  progressPercent: number;
  chapters: Chapter[];
  isPublished: boolean;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex?: number;
  correctOptionId?: string;
  explanation: string;
  points?: number;
  difficulty?: 'Mudah' | 'Sedang' | 'Sulit';
  category?: string;
  imageOrDiagram?: string;
  codeSnippet?: string;
}

export interface Quiz {
  id: string;
  title: string;
  subjectId: string;
  chapterId?: string;
  subjectTitle: string;
  educationLevel?: EducationLevelType;
  grade?: string;
  description?: string;
  durationSeconds?: number;
  timeLimitMinutes?: number;
  passingScore?: number;
  totalLives?: number;
  bonusPoints?: number;
  rewardPoints?: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  userId: string;
  userName: string;
  quizId: string;
  quizTitle?: string;
  subjectId?: string;
  subjectName?: string;
  subjectTitle?: string;
  chapterTitle?: string;
  score: number;
  totalQuestions: number;
  correctAnswers?: number;
  correctCount?: number;
  wrongCount?: number;
  pointsEarned?: number;
  earnedPoints?: number;
  passed?: boolean;
  livesRemaining: number;
  timeSpentSeconds?: number;
  date?: string;
  completedAt?: string;
  mistakes?: {
    questionId?: string;
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[];
}

export interface Reward {
  id: string;
  title: string;
  category: string;
  requiredPoints: number;
  description: string;
  stock: number;
  image?: string;
  imageUrl?: string;
  badge?: string;
  badgeText?: string;
  provider?: string;
  isUnlocked?: boolean;
}

export type Transaction = PointTransaction;

export interface RewardRedemption {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  rewardId: string;
  rewardTitle: string;
  requiredPoints: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  redemptionCode: string;
  recipientAccount?: string;
  recipientNote?: string;
  createdAt: string;
  completedAt?: string;
}

export interface PointTransaction {
  id: string;
  userId: string;
  type: 'EARNED' | 'REDEEMED' | 'BONUS' | 'ADMIN_ADJUSTMENT';
  amount: number;
  source: string; // e.g. "Kuis Matematika Bab 1", "Tukar GoPay Rp50.000", "Daily Streak 7 Hari"
  description: string;
  createdAt: string;
  balanceAfter: number;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'QUIZ' | 'REWARD' | 'POINTS' | 'RANKING' | 'SYSTEM' | 'STREAK';
  isRead: boolean;
  createdAt: string;
  linkUrl?: string;
}

export interface LeaderboardUser {
  rank: number;
  userId: string;
  fullName: string;
  avatar: string;
  educationLevel: EducationLevelType;
  schoolOrUniv?: string;
  schoolName?: string;
  points: number;
  weeklyPoints?: number;
  monthlyPoints?: number;
  streakDays: number;
  badge?: string;
  accuracy?: number;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  category: string;
  subject: string;
  message: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  replies: {
    sender: string;
    isAdmin: boolean;
    message: string;
    createdAt: string;
  }[];
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  target: string;
  details: string;
  ipAddress: string;
  createdAt: string;
}

export interface SecurityEvent {
  id: string;
  userId?: string;
  userName?: string;
  eventType: 'RAPID_SUBMISSION' | 'POINT_ANOMALY' | 'SUSPICIOUS_LOGIN' | 'MULTIPLE_FAILED_ATTEMPTS' | 'SESSION_MISMATCH';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  description: string;
  createdAt: string;
  resolved: boolean;
}

export interface GameItem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan';
  description: string;
  rewardPoints: number;
  highScore: number;
  playCount: number;
  iconName: string;
  bgGradient: string;
}
