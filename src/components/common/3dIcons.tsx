import React from 'react';

interface Icon3DProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const Icon3DHome: React.FC<Icon3DProps> = ({ className = 'w-8 h-8', size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="home_roof" x1="24" y1="4" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="home_body" x1="12" y1="20" x2="36" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F0F9FF" />
        <stop offset="1" stopColor="#BAE6FD" />
      </linearGradient>
      <linearGradient id="home_door" x1="20" y1="28" x2="28" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0284C7" />
        <stop offset="1" stopColor="#0369A1" />
      </linearGradient>
      <filter id="shadow_soft" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0284C7" floodOpacity="0.3" />
      </filter>
    </defs>
    <path d="M24 6L6 22H12V42H36V22H42L24 6Z" fill="url(#home_body)" filter="url(#shadow_soft)" />
    <path d="M24 6L6 22H12L24 11L36 22H42L24 6Z" fill="url(#home_roof)" />
    <rect x="20" y="28" width="8" height="14" rx="2" fill="url(#home_door)" />
    <circle cx="26" cy="35" r="1" fill="#F0F9FF" />
    <rect x="14" y="24" width="6" height="6" rx="1.5" fill="#38BDF8" fillOpacity="0.7" />
    <rect x="28" y="24" width="6" height="6" rx="1.5" fill="#38BDF8" fillOpacity="0.7" />
  </svg>
);

export const Icon3DBook: React.FC<Icon3DProps> = ({ className = 'w-8 h-8', size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="book_cover" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366F1" />
        <stop offset="1" stopColor="#4338CA" />
      </linearGradient>
      <linearGradient id="book_pages" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#E0E7FF" />
      </linearGradient>
      <filter id="book_shadow" x="-15%" y="-15%" width="130%" height="135%">
        <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#4338CA" floodOpacity="0.35" />
      </filter>
    </defs>
    <path d="M8 10C8 7.79086 9.79086 6 12 6H38C39.1046 6 40 6.89543 40 8V38C40 39.1046 39.1046 40 38 40H12C9.79086 40 8 38.2091 8 36V10Z" fill="url(#book_cover)" filter="url(#book_shadow)" />
    <path d="M12 8H36V36H12C10.8954 36 10 35.1046 10 34V10C10 8.89543 10.8954 8 12 8Z" fill="url(#book_pages)" />
    <path d="M14 14H32M14 20H30M14 26H26" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M30 6V18L34 15L38 18V6H30Z" fill="#F43F5E" />
  </svg>
);

export const Icon3DTrophy: React.FC<Icon3DProps> = ({ className = 'w-8 h-8', size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="trophy_gold" x1="12" y1="6" x2="36" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE047" />
        <stop offset="0.5" stopColor="#EAB308" />
        <stop offset="1" stopColor="#CA8A04" />
      </linearGradient>
      <linearGradient id="trophy_base" x1="16" y1="36" x2="32" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#713F12" />
        <stop offset="1" stopColor="#451A03" />
      </linearGradient>
      <filter id="trophy_shadow" x="-15%" y="-15%" width="130%" height="135%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#CA8A04" floodOpacity="0.4" />
      </filter>
    </defs>
    <path d="M14 8C14 8 14 24 24 24C34 24 34 8 34 8H14Z" fill="url(#trophy_gold)" filter="url(#trophy_shadow)" />
    <path d="M14 12H8C6.89543 12 6 12.8954 6 14C6 19 10 22 14 22V12Z" fill="#FACC15" />
    <path d="M34 12H40C41.1046 12 42 12.8954 42 14C42 19 38 22 34 22V12Z" fill="#EAB308" />
    <path d="M22 24H26V34H22V24Z" fill="#FACC15" />
    <rect x="14" y="34" width="20" height="8" rx="2" fill="url(#trophy_base)" />
    <circle cx="24" cy="15" r="4" fill="#FEF08A" />
    <path d="M24 13L25 15.5H27.5L25.5 16.8L26.2 19L24 17.5L21.8 19L22.5 16.8L20.5 15.5H23L24 13Z" fill="#CA8A04" />
  </svg>
);

export const Icon3DGamebox: React.FC<Icon3DProps> = ({ className = 'w-8 h-8', size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="box_base" x1="8" y1="16" x2="40" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="box_lid" x1="6" y1="10" x2="42" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" />
        <stop offset="1" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="box_ribbon" x1="20" y1="8" x2="28" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F43F5E" />
        <stop offset="1" stopColor="#E11D48" />
      </linearGradient>
      <filter id="box_shadow" x="-15%" y="-15%" width="130%" height="135%">
        <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#D97706" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="8" y="18" width="32" height="24" rx="4" fill="url(#box_base)" filter="url(#box_shadow)" />
    <rect x="6" y="12" width="36" height="8" rx="2" fill="url(#box_lid)" />
    <rect x="21" y="12" width="6" height="30" fill="url(#box_ribbon)" />
    <path d="M21 12C21 8 16 6 16 10C16 12 21 12 21 12Z" fill="#F43F5E" />
    <path d="M27 12C27 8 32 6 32 10C32 12 27 12 27 12Z" fill="#FB7185" />
    <circle cx="24" cy="12" r="2.5" fill="#FFE4E6" />
  </svg>
);

export const Icon3DHistory: React.FC<Icon3DProps> = ({ className = 'w-8 h-8', size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="hist_bg" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#0284C7" />
      </linearGradient>
      <filter id="hist_shadow" x="-15%" y="-15%" width="130%" height="135%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0284C7" floodOpacity="0.35" />
      </filter>
    </defs>
    <circle cx="24" cy="24" r="18" fill="url(#hist_bg)" filter="url(#hist_shadow)" />
    <circle cx="24" cy="24" r="14" fill="#FFFFFF" fillOpacity="0.9" />
    <path d="M24 16V24L30 28" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="24" r="2" fill="#0369A1" />
  </svg>
);

export const Icon3DGames: React.FC<Icon3DProps> = ({ className = 'w-8 h-8', size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="game_pad" x1="6" y1="12" x2="42" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A855F7" />
        <stop offset="1" stopColor="#7E22CE" />
      </linearGradient>
      <filter id="game_shadow" x="-15%" y="-15%" width="130%" height="135%">
        <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#7E22CE" floodOpacity="0.4" />
      </filter>
    </defs>
    <path d="M14 14C9.58172 14 6 17.5817 6 22L8 34C8.5 37 12 38 15 35L20 30H28L33 35C36 38 39.5 37 40 34L42 22C42 17.5817 38.4183 14 34 14H14Z" fill="url(#game_pad)" filter="url(#game_shadow)" />
    <rect x="12" y="21" width="8" height="3" rx="1" fill="#F3E8FF" />
    <rect x="14.5" y="18.5" width="3" height="8" rx="1" fill="#F3E8FF" />
    <circle cx="34" cy="21" r="2" fill="#F43F5E" />
    <circle cx="30" cy="25" r="2" fill="#FACC15" />
    <circle cx="34" cy="25" r="2" fill="#38BDF8" />
  </svg>
);

export const Icon3DWallet: React.FC<Icon3DProps> = ({ className = 'w-8 h-8', size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="wal_body" x1="6" y1="12" x2="42" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
      <filter id="wal_shadow" x="-15%" y="-15%" width="130%" height="135%">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#047857" floodOpacity="0.35" />
      </filter>
    </defs>
    <rect x="6" y="12" width="36" height="26" rx="5" fill="url(#wal_body)" filter="url(#wal_shadow)" />
    <path d="M10 12C10 9 14 7 24 7C34 7 38 9 38 12" stroke="#A7F3D0" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M28 20H42V30H28C25.7909 30 24 28.2091 24 26C24 23.7909 25.7909 22 28 20Z" fill="#065F46" />
    <circle cx="34" cy="25" r="2.5" fill="#FDE047" />
  </svg>
);

export const Icon3DHelp: React.FC<Icon3DProps> = ({ className = 'w-8 h-8', size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="help_grad" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06B6D4" />
        <stop offset="1" stopColor="#0891B2" />
      </linearGradient>
      <filter id="help_shadow" x="-15%" y="-15%" width="130%" height="135%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0891B2" floodOpacity="0.35" />
      </filter>
    </defs>
    <circle cx="24" cy="24" r="18" fill="url(#help_grad)" filter="url(#help_shadow)" />
    <path d="M19 18C19 15.5 21 14 24 14C27 14 29 15.5 29 18C29 20.5 26.5 22 24.5 24V26" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="24.5" cy="32" r="2" fill="#FFFFFF" />
  </svg>
);

export const Icon3DUser: React.FC<Icon3DProps> = ({ className = 'w-8 h-8', size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="user_grad" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#818CF8" />
        <stop offset="1" stopColor="#4F46E5" />
      </linearGradient>
      <filter id="user_shadow" x="-15%" y="-15%" width="130%" height="135%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#4F46E5" floodOpacity="0.35" />
      </filter>
    </defs>
    <circle cx="24" cy="24" r="18" fill="url(#user_grad)" filter="url(#user_shadow)" />
    <circle cx="24" cy="18" r="6" fill="#EEF2FF" />
    <path d="M12 36C12 30 17 27 24 27C31 27 36 30 36 36" fill="#EEF2FF" />
  </svg>
);

export const Icon3DNotification: React.FC<Icon3DProps> = ({ className = 'w-8 h-8', size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="bell_grad" x1="10" y1="8" x2="38" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
      <filter id="bell_shadow" x="-15%" y="-15%" width="130%" height="135%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#D97706" floodOpacity="0.35" />
      </filter>
    </defs>
    <path d="M24 6C20 6 14 9 14 19V28L10 34H38L34 28V19C34 9 28 6 24 6Z" fill="url(#bell_grad)" filter="url(#bell_shadow)" />
    <path d="M20 36C20 38.2 21.8 40 24 40C26.2 40 28 38.2 28 36H20Z" fill="#B45309" />
    <circle cx="34" cy="10" r="4" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
  </svg>
);

export const Icon3DFlame: React.FC<Icon3DProps> = ({ className = 'w-6 h-6', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="flame_outer" x1="16" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FB923C" />
        <stop offset="1" stopColor="#EA580C" />
      </linearGradient>
      <linearGradient id="flame_inner" x1="16" y1="12" x2="16" y2="26" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FEF08A" />
        <stop offset="1" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <path d="M16 2C13 8 7 12 7 19C7 24 11 28 16 28C21 28 25 24 25 19C25 13 21 8 16 2Z" fill="url(#flame_outer)" />
    <path d="M16 12C14.5 15 11 17 11 21C11 23.5 13 26 16 26C19 26 21 23.5 21 21C21 17 18.5 15 16 12Z" fill="url(#flame_inner)" />
  </svg>
);

export const Icon3DHeart: React.FC<Icon3DProps & { empty?: boolean }> = ({ className = 'w-6 h-6', size = 28, empty = false }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {empty ? (
      <path d="M16 28C16 28 4 20 4 11C4 6.5 7.5 3 12 3C14.5 3 15.5 4.5 16 5.5C16.5 4.5 17.5 3 20 3C24.5 3 28 6.5 28 11C28 20 16 28 16 28Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
    ) : (
      <>
        <defs>
          <linearGradient id="heart_grad" x1="16" y1="3" x2="16" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FB7185" />
            <stop offset="1" stopColor="#E11D48" />
          </linearGradient>
          <filter id="heart_glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#E11D48" floodOpacity="0.4" />
          </filter>
        </defs>
        <path d="M16 28C16 28 4 20 4 11C4 6.5 7.5 3 12 3C14.5 3 15.5 4.5 16 5.5C16.5 4.5 17.5 3 20 3C24.5 3 28 6.5 28 11C28 20 16 28 16 28Z" fill="url(#heart_grad)" filter="url(#heart_glow)" />
        <ellipse cx="11" cy="9" rx="2" ry="1.2" transform="rotate(-30 11 9)" fill="#FFF1F2" />
      </>
    )}
  </svg>
);

export const Icon3DSparkles: React.FC<Icon3DProps> = ({ className = 'w-6 h-6', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="sparkle_grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="0.5" stopColor="#818CF8" />
        <stop offset="1" stopColor="#C084FC" />
      </linearGradient>
    </defs>
    <path d="M16 2L18.5 11.5L28 14L18.5 16.5L16 26L13.5 16.5L4 14L13.5 11.5L16 2Z" fill="url(#sparkle_grad)" />
    <path d="M25 21L26.5 25L30 26L26.5 27L25 31L23.5 27L20 26L23.5 25L25 21Z" fill="#FDE047" />
  </svg>
);

// Map dynamic icon names
export const Dynamic3DIcon: React.FC<{ name: string; className?: string; size?: number }> = ({ name, className = 'w-8 h-8', size = 36 }) => {
  switch (name) {
    case 'Home': return <Icon3DHome className={className} size={size} />;
    case 'Book': return <Icon3DBook className={className} size={size} />;
    case 'Trophy': return <Icon3DTrophy className={className} size={size} />;
    case 'Gamebox': return <Icon3DGamebox className={className} size={size} />;
    case 'History': return <Icon3DHistory className={className} size={size} />;
    case 'Games': return <Icon3DGames className={className} size={size} />;
    case 'Wallet': return <Icon3DWallet className={className} size={size} />;
    case 'Help': return <Icon3DHelp className={className} size={size} />;
    case 'User': return <Icon3DUser className={className} size={size} />;
    case 'Notification': return <Icon3DNotification className={className} size={size} />;
    case 'Sparkles': return <Icon3DSparkles className={className} size={size} />;
    case 'Calculator': return <Icon3DWallet className={className} size={size} />;
    case 'Laptop': return <Icon3DGames className={className} size={size} />;
    case 'Server': return <Icon3DBook className={className} size={size} />;
    case 'Atom': return <Icon3DSparkles className={className} size={size} />;
    default: return <Icon3DBook className={className} size={size} />;
  }
};
