import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, UserProfile, QuizAttempt, RewardRedemption, SupportTicket, SecurityEvent, Role } from '../types';
import { db } from './storage';
import { soundEngine } from './sound';
import confetti from 'canvas-confetti';

interface AuthContextType {
  user: User | null;
  lives: number;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, username: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchAccount: (userId: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  completeOnboarding: (profileData: Partial<UserProfile>) => void;
  awardPoints: (amount: number, source: string, description?: string) => void;
  deductPoints: (amount: number, source: string, description?: string) => boolean;
  deductLife: () => number;
  replenishLives: () => void;
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'userId' | 'userName' | 'date'>) => Promise<QuizAttempt>;
  redeemReward: (rewardId: string, recipientAccount?: string, recipientNote?: string) => Promise<{ success: boolean; error?: string; redemption?: RewardRedemption }>;
  submitSupportTicket: (category: string, subject: string, message: string) => Promise<SupportTicket>;
  addTicketReply: (ticketId: string, message: string, isAdmin?: boolean) => void;
  logSecurityEvent: (eventType: SecurityEvent['eventType'], severity: SecurityEvent['severity'], description: string) => void;
  resetProgress: () => void;
  soundMuted: boolean;
  toggleSound: () => void;
  refreshUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [soundMuted, setSoundMuted] = useState(false);

  const refreshUserData = useCallback(() => {
    const current = db.getCurrentUser();
    setUser(current);
  }, []);

  useEffect(() => {
    refreshUserData();
    setSoundMuted(soundEngine.getIsMuted());
    setIsLoading(false);
  }, [refreshUserData]);

  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setSoundMuted(muted);
  };

  const login = async (email: string): Promise<{ success: boolean; error?: string }> => {
    const users = db.getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find(
      u => u.email.toLowerCase() === cleanEmail || u.username.toLowerCase() === cleanEmail
    );

    if (!found) {
      // Create user on the fly if not existing
      const newUser: User = {
        id: 'user_' + Date.now(),
        email: cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@aurelia.edu`,
        username: cleanEmail.split('@')[0],
        role: 'USER',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        points: 250,
        lives: 5,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        profile: {
          id: 'prof_' + Date.now(),
          userId: 'user_' + Date.now(),
          fullName: cleanEmail.split('@')[0],
          age: 17,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          educationLevel: 'SMK',
          grade: 'Kelas 11',
          favoriteSubjects: [],
          aiInterest: 'Ya, sangat tertarik',
          learningInterests: ['Programming', 'Teknologi'],
          learningStyle: 'Campuran semuanya',
          learningGoals: ['Memahami materi'],
          onboardingCompleted: false,
        },
      };
      users.push(newUser);
      db.saveUsers(users);
      db.setCurrentUserId(newUser.id);
      setUser(newUser);
      soundEngine.playConfirm();
      return { success: true };
    }

    if (found.status === 'SUSPENDED') {
      return { success: false, error: `Akun ini ditangguhkan oleh Administrator. Alasan: ${found.suspensionReason || 'Pelanggaran keamanan'}` };
    }

    db.setCurrentUserId(found.id);
    setUser(found);
    soundEngine.playConfirm();
    return { success: true };
  };

  const register = async (email: string, username: string, fullName: string): Promise<{ success: boolean; error?: string }> => {
    const users = db.getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'Email sudah terdaftar. Silakan login.' };
    }

    const newUser: User = {
      id: 'user_' + Date.now(),
      email: cleanEmail,
      username: cleanUsername,
      role: 'USER',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      points: 500, // Welcome bonus points
      lives: 5,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      profile: {
        id: 'prof_' + Date.now(),
        userId: 'user_' + Date.now(),
        fullName: fullName.trim() || cleanUsername,
        age: 16,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        educationLevel: 'SMK',
        grade: 'Kelas 10',
        favoriteSubjects: [],
        aiInterest: 'Ya, sangat tertarik',
        learningInterests: ['Programming', 'Teknologi'],
        learningStyle: 'Campuran semuanya',
        learningGoals: ['Meningkatkan nilai'],
        onboardingCompleted: false,
      },
    };

    users.push(newUser);
    db.saveUsers(users);
    db.setCurrentUserId(newUser.id);
    setUser(newUser);

    // Initial bonus transaction
    db.saveTransaction({
      id: 'tx_' + Date.now(),
      userId: newUser.id,
      type: 'BONUS',
      amount: 500,
      source: 'Bonus Pendaftaran Aurelia Edu',
      description: 'Selamat datang di AURELIA EDU!',
      createdAt: new Date().toISOString(),
      balanceAfter: 500,
    });

    db.addNotification({
      userId: newUser.id,
      title: 'Selamat Datang di AURELIA EDU! 🎉',
      message: 'Kamu mendapatkan 500 poin selamat datang. Mulai jelajahi materi dan kuis bersama Aurel!',
      type: 'SYSTEM',
      isRead: false,
      linkUrl: '/home',
    });

    soundEngine.playVictory();
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aurelia_edu_current_user_id_v2');
    }
  };

  const switchAccount = (userId: string) => {
    db.setCurrentUserId(userId);
    const target = db.getUsers().find(u => u.id === userId);
    if (target) {
      setUser(target);
      soundEngine.playConfirm();
    }
  };

  const updateProfile = (profileData: Partial<UserProfile>) => {
    if (!user) return;
    const updated: User = {
      ...user,
      profile: {
        ...user.profile,
        ...profileData,
      },
    };
    db.updateUser(updated);
    setUser(updated);
  };

  const completeOnboarding = (profileData: Partial<UserProfile>) => {
    if (!user) return;
    const updated: User = {
      ...user,
      points: user.points + 500, // Onboarding completion bonus!
      profile: {
        ...user.profile,
        ...profileData,
        onboardingCompleted: true,
      },
    };
    db.updateUser(updated);
    setUser(updated);

    // Record bonus points
    db.saveTransaction({
      id: 'tx_onboard_' + Date.now(),
      userId: user.id,
      type: 'BONUS',
      amount: 500,
      source: 'Bonus Selesai Onboarding Aurel',
      description: 'Menyelesaikan perkenalan dan personalisasi akun belajar',
      createdAt: new Date().toISOString(),
      balanceAfter: updated.points,
    });

    db.addNotification({
      userId: user.id,
      title: 'Profil Belajar Terpersonalisasi! 🌟',
      message: `Aurel telah menyesuaikan kurikulum untuk jenjang ${profileData.educationLevel || user.profile.educationLevel}. +500 Poin bonus ditambahkan!`,
      type: 'POINTS',
      isRead: false,
      linkUrl: '/home',
    });

    soundEngine.playVictory();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  const awardPoints = (amount: number, source: string, description: string = 'Aktivitas belajar Aurelia Edu') => {
    if (!user || amount <= 0) return;
    const newPoints = user.points + amount;
    const updated: User = {
      ...user,
      points: newPoints,
    };
    db.updateUser(updated);
    setUser(updated);

    db.saveTransaction({
      id: 'tx_' + Date.now(),
      userId: user.id,
      type: 'EARNED',
      amount,
      source,
      description,
      createdAt: new Date().toISOString(),
      balanceAfter: newPoints,
    });

    db.addNotification({
      userId: user.id,
      title: `+${amount} Poin Berhasil Diraih! ✨`,
      message: `Poin dari: ${source}`,
      type: 'POINTS',
      isRead: false,
      linkUrl: '/transactions',
    });

    // Update leaderboard points dynamically
    const leaderboard = db.getLeaderboard();
    const idx = leaderboard.findIndex(l => l.userId === user.id);
    if (idx !== -1) {
      leaderboard[idx].points = newPoints;
      leaderboard[idx].weeklyPoints = (leaderboard[idx].weeklyPoints || 0) + amount;
      leaderboard[idx].monthlyPoints = (leaderboard[idx].monthlyPoints || 0) + amount;
      db.saveLeaderboard(leaderboard);
    }
  };

  const deductPoints = (amount: number, source: string, description: string = 'Pengurangan poin'): boolean => {
    if (!user || user.points < amount) return false;
    const newPoints = user.points - amount;
    const updated: User = {
      ...user,
      points: newPoints,
    };
    db.updateUser(updated);
    setUser(updated);

    db.saveTransaction({
      id: 'tx_' + Date.now(),
      userId: user.id,
      type: 'REDEEMED',
      amount: -amount,
      source,
      description,
      createdAt: new Date().toISOString(),
      balanceAfter: newPoints,
    });

    return true;
  };

  const deductLife = (): number => {
    if (!user) return 0;
    const newLives = Math.max(0, user.lives - 1);
    const updated: User = {
      ...user,
      lives: newLives,
    };
    db.updateUser(updated);
    setUser(updated);
    soundEngine.playWrong();
    return newLives;
  };

  const replenishLives = () => {
    if (!user) return;
    const updated: User = {
      ...user,
      lives: 5,
    };
    db.updateUser(updated);
    setUser(updated);
  };

  const recordQuizAttempt = async (attemptData: Omit<QuizAttempt, 'id' | 'userId' | 'userName' | 'date'>): Promise<QuizAttempt> => {
    if (!user) throw new Error('Not authenticated');

    const newAttempt: QuizAttempt = {
      ...attemptData,
      id: 'attempt_' + Date.now(),
      userId: user.id,
      userName: user.profile.fullName || user.username,
      date: new Date().toISOString(),
    };

    db.saveQuizAttempt(newAttempt);

    // Calculate and award points server-side
    const earned = newAttempt.pointsEarned ?? newAttempt.earnedPoints ?? 0;
    if (earned > 0) {
      awardPoints(
        earned,
        `Kuis: ${newAttempt.subjectTitle || newAttempt.quizTitle || 'Kuis'} (${newAttempt.score}%)`,
        `Menjawab benar ${newAttempt.correctCount || newAttempt.correctAnswers || 0} dari ${newAttempt.totalQuestions} soal.`
      );
    }

    // Update subject progress
    const subjects = db.getSubjects();
    const subject = subjects.find(s => s.title === newAttempt.subjectTitle || s.chapters.some(c => c.quizId === newAttempt.quizId));
    if (subject) {
      const chapter = subject.chapters.find(c => c.quizId === newAttempt.quizId);
      if (chapter) {
        chapter.isCompleted = true;
        chapter.score = newAttempt.score;
        const completed = subject.chapters.filter(c => c.isCompleted).length;
        subject.completedLessons = completed;
        subject.progressPercent = Math.round((completed / subject.chapters.length) * 100);
        db.saveSubjects(subjects);
      }
    }

    // Replenish lives for next quiz attempt
    replenishLives();

    return newAttempt;
  };

  const redeemReward = async (rewardId: string, recipientAccount?: string, recipientNote?: string): Promise<{ success: boolean; error?: string; redemption?: RewardRedemption }> => {
    if (!user) return { success: false, error: 'Silakan login terlebih dahulu' };

    const rewards = db.getRewards();
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return { success: false, error: 'Reward tidak ditemukan' };

    if (user.points < reward.requiredPoints) {
      return { success: false, error: `Poin kamu belum mencukupi. Butuh ${reward.requiredPoints.toLocaleString()} poin (kamu memiliki ${user.points.toLocaleString()} poin).` };
    }

    if (reward.stock <= 0) {
      return { success: false, error: 'Maaf, stok reward ini sedang habis.' };
    }

    // Deduct points server-side
    const deducted = deductPoints(
      reward.requiredPoints,
      `Penukaran ${reward.title}`,
      `Penukaran reward kode: ${reward.badge}`
    );

    if (!deducted) {
      return { success: false, error: 'Gagal memproses penukaran poin.' };
    }

    // Decrease stock
    reward.stock -= 1;
    db.saveRewards(rewards);

    // Create redemption record
    const redemption: RewardRedemption = {
      id: 'rdm_' + Date.now(),
      userId: user.id,
      userName: user.profile.fullName || user.username,
      userEmail: user.email,
      rewardId: reward.id,
      rewardTitle: reward.title,
      requiredPoints: reward.requiredPoints,
      status: 'PROCESSING',
      redemptionCode: 'AUREL-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      recipientAccount,
      recipientNote,
      createdAt: new Date().toISOString(),
    };

    db.saveRedemption(redemption);

    db.addNotification({
      userId: user.id,
      title: 'Penukaran Reward Berhasil! 🎁',
      message: `Permintaan penukaran ${reward.title} sedang diproses. Kode Tiket: ${redemption.redemptionCode}`,
      type: 'REWARD',
      isRead: false,
      linkUrl: '/transactions',
    });

    db.addAuditLog({
      adminId: 'SYSTEM',
      adminName: 'Automated Reward Engine',
      action: 'REWARD_REDEEMED',
      target: reward.id,
      details: `User ${user.email} menukar ${reward.title} (-${reward.requiredPoints} poin). Kode: ${redemption.redemptionCode}`,
      ipAddress: '127.0.0.1',
    });

    soundEngine.playUnlockShimmer();
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
      });
    } catch {}

    return { success: true, redemption };
  };

  const submitSupportTicket = async (category: string, subject: string, message: string): Promise<SupportTicket> => {
    if (!user) throw new Error('Not authenticated');

    const newTicket: SupportTicket = {
      id: 'tkt_' + Date.now(),
      userId: user.id,
      userName: user.profile.fullName || user.username,
      userEmail: user.email,
      category,
      subject,
      message,
      status: 'OPEN',
      priority: 'MEDIUM',
      createdAt: new Date().toISOString(),
      replies: [
        {
          sender: user.profile.fullName || user.username,
          isAdmin: false,
          message,
          createdAt: new Date().toISOString(),
        },
      ],
    };

    db.saveTickets([newTicket, ...db.getTickets()]);

    db.addNotification({
      userId: user.id,
      title: 'Tiket Bantuan Terkirim 📬',
      message: `Tiket "${subject}" telah diterima tim Aurel Support. Kami akan membalas segera.`,
      type: 'SYSTEM',
      isRead: false,
      linkUrl: '/help',
    });

    soundEngine.playConfirm();
    return newTicket;
  };

  const addTicketReply = (ticketId: string, message: string, isAdmin = false) => {
    const tickets = db.getTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    ticket.replies.push({
      sender: isAdmin ? 'Aurel Support Specialist' : (user?.profile.fullName || 'User'),
      isAdmin,
      message,
      createdAt: new Date().toISOString(),
    });

    if (isAdmin) {
      ticket.status = 'IN_PROGRESS';
      db.addNotification({
        userId: ticket.userId,
        title: 'Balasan Baru dari Aurel Support 💬',
        message: `Admin membalas tiket: "${ticket.subject}"`,
        type: 'SYSTEM',
        isRead: false,
        linkUrl: '/help',
      });
    }

    db.saveTickets(tickets);
    soundEngine.playConfirm();
  };

  const logSecurityEvent = (eventType: SecurityEvent['eventType'], severity: SecurityEvent['severity'], description: string) => {
    db.addSecurityEvent({
      userId: user?.id,
      userName: user?.profile.fullName || user?.username || 'Unknown',
      eventType,
      severity,
      description,
      resolved: false,
    });
  };

  const resetProgress = () => {
    db.resetToFactory();
    refreshUserData();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        lives: user?.lives ?? 5,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        switchAccount,
        updateProfile,
        completeOnboarding,
        awardPoints,
        deductPoints,
        deductLife,
        replenishLives,
        recordQuizAttempt,
        redeemReward,
        submitSupportTicket,
        addTicketReply,
        logSecurityEvent,
        resetProgress,
        soundMuted,
        toggleSound,
        refreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
