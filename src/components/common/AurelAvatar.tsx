import React from 'react';

export type AurelMood = 'waving' | 'happy' | 'thinking' | 'excited' | 'encouraging' | 'celebrating';

interface AurelAvatarProps {
  mood?: AurelMood;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showClouds?: boolean;
  showSparkles?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AurelAvatar: React.FC<AurelAvatarProps> = ({
  mood = 'happy',
  size = 'lg',
  showClouds = true,
  showSparkles = true,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44',
    '2xl': 'w-56 h-56',
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''} ${className}`}
    >
      {/* Background Soft Glow & Clouds */}
      {showClouds && (
        <div className="absolute inset-0 -m-4 pointer-events-none">
          <div className="absolute inset-0 bg-sky-200/40 rounded-full blur-xl animate-pulse-glow" />
          <svg className="absolute -top-2 -left-3 w-10 h-6 text-white/80 filter drop-shadow-sm animate-cloud-drift" viewBox="0 0 64 36" fill="currentColor">
            <path d="M18 30H50C57 30 62 25 62 18C62 11 56 7 50 7C48 3 43 0 36 0C28 0 22 5 21 11C19 10 16 10 14 10C6 10 0 16 0 23C0 27 3 30 18 30Z" />
          </svg>
          <svg className="absolute -bottom-2 -right-3 w-12 h-7 text-white/80 filter drop-shadow-sm animate-cloud-drift" style={{ animationDelay: '2s' }} viewBox="0 0 64 36" fill="currentColor">
            <path d="M18 30H50C57 30 62 25 62 18C62 11 56 7 50 7C48 3 43 0 36 0C28 0 22 5 21 11C19 10 16 10 14 10C6 10 0 16 0 23C0 27 3 30 18 30Z" />
          </svg>
        </div>
      )}

      {/* Sparkles */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute -top-1 right-2 text-amber-300 text-sm animate-bounce">✨</span>
          <span className="absolute bottom-2 -left-2 text-sky-400 text-xs animate-pulse">⭐</span>
          <span className="absolute top-1/2 -right-3 text-indigo-400 text-xs animate-ping" style={{ animationDuration: '3s' }}>✦</span>
        </div>
      )}

      {/* Mascot 3D Visual Rendering */}
      <div className={`${sizeMap[size]} relative animate-float-slow`}>
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-lg">
          <defs>
            {/* Gradients */}
            <linearGradient id="aurel_halo" x1="80" y1="10" x2="80" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FACC15" stopOpacity="0.9" />
              <stop offset="1" stopColor="#38BDF8" stopOpacity="0.4" />
            </linearGradient>
            
            <linearGradient id="aurel_skin" x1="80" y1="40" x2="80" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF1E8" />
              <stop offset="1" stopColor="#FCE4D6" />
            </linearGradient>

            <linearGradient id="aurel_hair" x1="40" y1="20" x2="120" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.5" stopColor="#0284C7" />
              <stop offset="1" stopColor="#0369A1" />
            </linearGradient>

            <linearGradient id="aurel_suit" x1="40" y1="105" x2="120" y2="155" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.6" stopColor="#E0F2FE" />
              <stop offset="1" stopColor="#BAE6FD" />
            </linearGradient>

            <linearGradient id="aurel_collar" x1="80" y1="100" x2="80" y2="125" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284C7" />
              <stop offset="1" stopColor="#0369A1" />
            </linearGradient>

            <linearGradient id="aurel_headset" x1="30" y1="40" x2="130" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#4338CA" />
            </linearGradient>

            <filter id="aurel_drop" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0369A1" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Halo Glow */}
          <ellipse cx="80" cy="30" rx="42" ry="12" stroke="url(#aurel_halo)" strokeWidth="4" fill="none" opacity="0.85" />

          {/* Hair Back */}
          <path d="M40 75C35 50 50 30 80 30C110 30 125 50 120 75C125 90 120 100 115 105C105 105 100 85 80 85C60 85 55 105 45 105C40 100 35 90 40 75Z" fill="url(#aurel_hair)" filter="url(#aurel_drop)" />

          {/* Head & Face */}
          <ellipse cx="80" cy="76" rx="36" ry="34" fill="url(#aurel_skin)" />

          {/* Hair Front Bangs */}
          <path d="M44 65C50 45 65 38 80 38C95 38 110 45 116 65C108 55 98 52 88 56C82 58 76 54 68 54C58 54 50 58 44 65Z" fill="url(#aurel_hair)" />

          {/* Cheeks Blush */}
          <ellipse cx="58" cy="85" rx="6" ry="3.5" fill="#FB7185" fillOpacity="0.45" />
          <ellipse cx="102" cy="85" rx="6" ry="3.5" fill="#FB7185" fillOpacity="0.45" />

          {/* Eyes based on mood */}
          {mood === 'happy' || mood === 'celebrating' || mood === 'waving' ? (
            <>
              {/* Happy Arc Eyes */}
              <path d="M57 74C59 69 67 69 69 74" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M91 74C93 69 101 69 103 74" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : mood === 'thinking' ? (
            <>
              <circle cx="63" cy="73" r="4.5" fill="#0F172A" />
              <circle cx="65" cy="71" r="1.5" fill="#FFFFFF" />
              <path d="M91 72C93 68 101 68 103 72" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Wide Open Sparkling Eyes */}
              <ellipse cx="63" cy="73" rx="5" ry="6" fill="#0F172A" />
              <circle cx="61.5" cy="70.5" r="2.2" fill="#FFFFFF" />
              <circle cx="64.5" cy="75" r="1.2" fill="#38BDF8" />

              <ellipse cx="97" cy="73" rx="5" ry="6" fill="#0F172A" />
              <circle cx="95.5" cy="70.5" r="2.2" fill="#FFFFFF" />
              <circle cx="98.5" cy="75" r="1.2" fill="#38BDF8" />
            </>
          )}

          {/* Mouth */}
          {mood === 'celebrating' || mood === 'excited' ? (
            <path d="M72 88C72 94 88 94 88 88H72Z" fill="#F43F5E" />
          ) : mood === 'thinking' ? (
            <path d="M76 90C79 89 83 89 86 91" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          ) : (
            <path d="M73 87C75 92 85 92 87 87" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
          )}

          {/* Modern Headset / Earphones */}
          <path d="M44 74C40 74 38 68 38 62C38 42 56 32 80 32C104 32 122 42 122 62C122 68 120 74 116 74" stroke="url(#aurel_headset)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <rect x="36" y="64" width="8" height="16" rx="4" fill="url(#aurel_headset)" />
          <rect x="116" y="64" width="8" height="16" rx="4" fill="url(#aurel_headset)" />
          <circle cx="40" cy="72" r="2" fill="#38BDF8" />
          <circle cx="120" cy="72" r="2" fill="#38BDF8" />

          {/* Body & Academic Collar */}
          <path d="M50 114C50 108 58 104 80 104C102 104 110 108 110 114L118 150H42L50 114Z" fill="url(#aurel_suit)" />
          <path d="M68 104L80 120L92 104H68Z" fill="url(#aurel_collar)" />
          <circle cx="80" cy="126" r="3" fill="#FACC15" />
          <circle cx="80" cy="136" r="3" fill="#0284C7" />

          {/* Waving Hand or Badge */}
          {mood === 'waving' && (
            <g className="animate-bounce" style={{ animationDuration: '1.2s' }}>
              <ellipse cx="126" cy="98" rx="8" ry="10" transform="rotate(30 126 98)" fill="url(#aurel_skin)" />
              <circle cx="130" cy="92" r="3.5" fill="url(#aurel_skin)" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
