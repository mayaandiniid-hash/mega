import {
  User,
  Subject,
  Quiz,
  QuizAttempt,
  Reward,
  RewardRedemption,
  PointTransaction,
  AppNotification,
  LeaderboardUser,
  SupportTicket,
  AuditLog,
  SecurityEvent,
  GameItem,
  EducationLevelType
} from '../types';

const STORAGE_KEYS = {
  USERS: 'aurelia_edu_users_v2',
  CURRENT_USER_ID: 'aurelia_edu_current_user_id_v2',
  SUBJECTS: 'aurelia_edu_subjects_v2',
  QUIZZES: 'aurelia_edu_quizzes_v2',
  ATTEMPTS: 'aurelia_edu_attempts_v2',
  REWARDS: 'aurelia_edu_rewards_v2',
  REDEMPTIONS: 'aurelia_edu_redemptions_v2',
  TRANSACTIONS: 'aurelia_edu_transactions_v2',
  NOTIFICATIONS: 'aurelia_edu_notifications_v2',
  LEADERBOARD: 'aurelia_edu_leaderboard_v2',
  TICKETS: 'aurelia_edu_tickets_v2',
  AUDIT_LOGS: 'aurelia_edu_audit_logs_v2',
  SECURITY_EVENTS: 'aurelia_edu_security_events_v2',
  GAMES: 'aurelia_edu_games_v2',
  MAJORS: 'aurelia_edu_majors_v2',
  STUDY_PROGRAMS: 'aurelia_edu_study_programs_v2',
};

export const SMK_MAJORS_LIST = [
  'Rekayasa Perangkat Lunak (RPL)',
  'Teknik Komputer & Jaringan (TKJ)',
  'Multimedia / DKV',
  'Akuntansi & Keuangan Lembaga',
  'Manajemen Perkantoran',
  'Bisnis Daring & Pemasaran',
  'Teknik Kendaraan Ringan (TKR)',
  'Teknik Bisnis Sepeda Motor (TBSM)',
  'Tata Boga / Kuliner',
  'Tata Busana / Fashion',
  'Farmasi Klinis & Komunitas',
  'Broadcasting & Perfilman',
];

export const UNIVERSITY_PROGRAMS_LIST = [
  'Teknik Informatika / Ilmu Komputer',
  'Sistem Informasi',
  'Manajemen & Bisnis Digital',
  'Akuntansi',
  'Kedokteran & Kesehatan',
  'Psikologi',
  'Ilmu Komunikasi',
  'Teknik Elektro',
  'Teknik Sipil & Arsitektur',
  'Hukum',
  'Pendidikan Guru (PGSD)',
  'Desain Komunikasi Visual (DKV)',
];

// Initial Seed Users
const SEED_USERS: User[] = [
  {
    id: 'user_david',
    email: 'david@aurelia.edu',
    username: 'david_rpl',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2026-08-10T08:00:00.000Z',
    updatedAt: '2026-09-23T08:00:00.000Z',
    points: 12850,
    lives: 5,
    streakDays: 7,
    lastActiveDate: '2026-09-23',
    profile: {
      id: 'prof_david',
      userId: 'user_david',
      fullName: 'David Pratama',
      age: 17,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      educationLevel: 'SMK',
      grade: 'Kelas 11',
      major: 'Rekayasa Perangkat Lunak (RPL)',
      schoolName: 'SMK Negeri 1 Jakarta',
      favoriteSubjects: ['Pemrograman Web & Perangkat Bergerak', 'Basis Data', 'Matematika Terapan'],
      aiInterest: 'Ya, sangat tertarik',
      learningInterests: ['Programming', 'Artificial Intelligence', 'Teknologi', 'Nilai sekolah'],
      learningStyle: 'Game dan tantangan',
      learningGoals: ['Mengembangkan skill', 'Mengejar ranking', 'Belajar teknologi', 'Mengumpulkan reward'],
      onboardingCompleted: true,
      phone: '081234567890',
      bio: 'Siswa SMK RPL yang antusias belajar web development, backend engineering, dan AI!',
    },
  },
  {
    id: 'user_maya',
    email: 'maya@aurelia.edu',
    username: 'maya_andini',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2026-08-15T09:00:00.000Z',
    updatedAt: '2026-09-23T08:00:00.000Z',
    points: 9450,
    lives: 5,
    streakDays: 14,
    lastActiveDate: '2026-09-23',
    profile: {
      id: 'prof_maya',
      userId: 'user_maya',
      fullName: 'Maya Andini',
      age: 18,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      educationLevel: 'SMA',
      grade: 'Kelas 12',
      schoolName: 'SMA Negeri 3 Bandung',
      favoriteSubjects: ['Fisika Modern', 'Matematika Lanjut', 'Biologi Molekuler'],
      aiInterest: 'Ya, sangat tertarik',
      learningInterests: ['Sains', 'Matematika', 'Persiapan ujian', 'Artificial Intelligence'],
      learningStyle: 'Video dan visual',
      learningGoals: ['Persiapan ujian', 'Meningkatkan nilai', 'Belajar secara konsisten'],
      onboardingCompleted: true,
      phone: '081987654321',
      bio: 'Persiapan SNBT 2027 dan Olimpiade Sains Nasional!',
    },
  },
  {
    id: 'user_budi',
    email: 'budi@aurelia.edu',
    username: 'budi_cilik',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2026-09-01T10:00:00.000Z',
    updatedAt: '2026-09-23T08:00:00.000Z',
    points: 3200,
    lives: 5,
    streakDays: 4,
    lastActiveDate: '2026-09-23',
    profile: {
      id: 'prof_budi',
      userId: 'user_budi',
      fullName: 'Budi Santoso',
      age: 11,
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      educationLevel: 'SD',
      grade: 'Kelas 5',
      schoolName: 'SDN Menteng 01',
      favoriteSubjects: ['Matematika Dasar', 'IPAS (Ilmu Pengetahuan Alam & Sosial)', 'Bahasa Indonesia'],
      aiInterest: 'Masih ingin tahu',
      learningInterests: ['Matematika', 'Sains', 'Pengetahuan umum'],
      learningStyle: 'Game dan tantangan',
      learningGoals: ['Memahami materi', 'Meningkatkan nilai', 'Mengumpulkan reward'],
      onboardingCompleted: true,
      bio: 'Suka belajar sains dan kuis matematika seru bareng Aurel!',
    },
  },
  {
    id: 'user_citra',
    email: 'citra@aurelia.edu',
    username: 'citra_it',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2026-07-20T08:00:00.000Z',
    updatedAt: '2026-09-23T08:00:00.000Z',
    points: 15200,
    lives: 5,
    streakDays: 21,
    lastActiveDate: '2026-09-23',
    profile: {
      id: 'prof_citra',
      userId: 'user_citra',
      fullName: 'Citra Lestari',
      age: 20,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      educationLevel: 'KULIAH',
      grade: 'Semester 4',
      studyProgram: 'Teknik Informatika / Ilmu Komputer',
      university: 'Institut Teknologi Bandung (ITB)',
      semester: 'Semester 4',
      favoriteSubjects: ['Struktur Data & Algoritma Lanjut', 'Machine Learning & AI', 'Sistem Terdistribusi'],
      aiInterest: 'Ya, sangat tertarik',
      learningInterests: ['Artificial Intelligence', 'Programming', 'Teknologi', 'Bisnis'],
      learningStyle: 'Campuran semuanya',
      learningGoals: ['Mengembangkan skill', 'Belajar teknologi', 'Mengejar ranking'],
      onboardingCompleted: true,
      bio: 'Mahasiswi Informatika yang berfokus pada deep learning dan cloud architecture.',
    },
  },
  {
    id: 'user_admin',
    email: 'admin@aurelia.edu',
    username: 'admin_aurelia',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-23T08:00:00.000Z',
    points: 50000,
    lives: 5,
    streakDays: 100,
    lastActiveDate: '2026-09-23',
    profile: {
      id: 'prof_admin',
      userId: 'user_admin',
      fullName: 'Administrator Aurelia Edu',
      age: 30,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      educationLevel: 'LAINNYA',
      grade: 'Executive',
      favoriteSubjects: ['Sistem Manajemen Edukasi', 'Kurikulum Nasional'],
      aiInterest: 'Ya, sangat tertarik',
      learningInterests: ['Teknologi', 'Artificial Intelligence', 'Bisnis'],
      learningStyle: 'Campuran semuanya',
      learningGoals: ['Mengembangkan skill'],
      onboardingCompleted: true,
      bio: 'Lead System Administrator & Curriculum Director Aurelia Edu.',
    },
  },
  {
    id: 'user_new',
    email: 'siswa.baru@aurelia.edu',
    username: 'siswa_baru',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2026-09-23T08:00:00.000Z',
    updatedAt: '2026-09-23T08:00:00.000Z',
    points: 100,
    lives: 5,
    streakDays: 1,
    lastActiveDate: '2026-09-23',
    profile: {
      id: 'prof_new',
      userId: 'user_new',
      fullName: '',
      age: 0,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      educationLevel: 'SMK',
      grade: 'Kelas 10',
      favoriteSubjects: [],
      aiInterest: 'Belum tertarik',
      learningInterests: [],
      learningStyle: 'Campuran semuanya',
      learningGoals: [],
      onboardingCompleted: false,
    },
  },
];

// Seed Subjects with 8 Chapters each & Real Curriculum Content
export const SEED_SUBJECTS: Subject[] = [
  // SMK - RPL
  {
    id: 'subj_smk_rpl_web',
    title: 'Pemrograman Web & Bergerak',
    code: 'SMK-RPL-01',
    educationLevel: 'SMK',
    grade: 'Kelas 11',
    major: 'Rekayasa Perangkat Lunak (RPL)',
    category: 'Kejuruan RPL',
    iconName: 'Laptop',
    themeColor: 'from-blue-600 to-indigo-600',
    accentColor: 'blue',
    description: 'Kuasai arsitektur web modern, React, Next.js, API RESTful, dan pengembangan aplikasi mobile hybrid responsif.',
    totalLessons: 8,
    completedLessons: 6,
    averageScore: 88,
    progressPercent: 75,
    isPublished: true,
    chapters: [
      {
        id: 'chap_rpl_01',
        subjectId: 'subj_smk_rpl_web',
        chapterNumber: 1,
        title: 'Arsitektur Web Modern & DOM Interaktif',
        description: 'Memahami cara kerja browser, rendering pipeline, Document Object Model (DOM), dan Javascript ES6+ modern.',
        durationMinutes: 25,
        content: `### 🚀 Arsitektur Web Modern
Browser memproses halaman web melalui tahapan:
1. **HTML Parsing** -> Membentuk Document Object Model (DOM Tree)
2. **CSS Parsing** -> Membentuk CSS Object Model (CSSOM Tree)
3. **Render Tree Generation** -> Menggabungkan DOM + CSSOM
4. **Layout & Reflow** -> Menghitung koordinat posisi elemen piksel
5. **Painting & Compositing** -> Melukis piksel ke layar GPU

\`\`\`javascript
// Contoh Manipulasi Modern DOM & Async Data Fetching
async function loadUserData(userId) {
  try {
    const res = await fetch('/api/users/' + userId);
    const data = await res.json();
    document.getElementById('user-name').textContent = data.name;
  } catch (err) {
    console.error('Gagal memuat data user:', err);
  }
}
\`\`\`

#### Prinsip Clean Code:
- Selalu pisahkan struktur (*HTML*), presentasi (*CSS*), dan logika perilaku (*TypeScript/JavaScript*).
- Gunakan Semantic HTML (\`<main>\`, \`<article>\`, \`<nav>\`, \`<section>\`) untuk performa SEO dan aksesibilitas maksimal.`,
        keyPoints: [
          'DOM adalah representasi struktur node dokumen HTML di memori browser.',
          'Event Delegation memungkinkan penanganan event dinamis secara hemat memori.',
          'Gunakan async/await dan Promise untuk operasi asynchronous non-blocking.',
        ],
        examples: [
          {
            title: 'Event Listener Modern',
            explanation: 'Menggunakan event delegation untuk mendengarkan klik pada tombol dinamis.',
            codeOrFormula: 'document.querySelector("#list").addEventListener("click", (e) => {\n  if (e.target.matches("button.item")) handleItemClick(e.target);\n});',
          },
        ],
        isCompleted: true,
        score: 95,
        quizId: 'quiz_rpl_01',
      },
      {
        id: 'chap_rpl_02',
        subjectId: 'subj_smk_rpl_web',
        chapterNumber: 2,
        title: 'Komponen Reaktif & State Management',
        description: 'Konsep dasar state, props, lifecycle komponen, dan immutable state updates.',
        durationMinutes: 30,
        content: `### ⚛️ Komponen Reaktif dan State Management
State adalah data internal yang menentukan tampilan UI pada suatu saat tertentu. Ketika state berubah, sistem secara otomatis melakukan re-render komponen secara efisien.

Prinsip Immutable Update:
\`\`\`typescript
// Benar (Immutable):
setItems(prev => [...prev, newItem]);

// Salah (Mutasi langsung objek):
// items.push(newItem); // JANGAN lakukan ini!
\`\`\``,
        keyPoints: [
          'Komponen murni (pure components) selalu mengembalikan output yang sama untuk props yang sama.',
          'Hindari mutasi langsung pada array atau object state.',
          'Manfaatkan Custom Hooks untuk memisahkan business logic dari presentational UI.',
        ],
        examples: [
          {
            title: 'Penulisan State Hook',
            explanation: 'Menggunakan functional updates untuk mencegah race condition.',
            codeOrFormula: 'const [counter, setCounter] = useState(0);\nconst increment = () => setCounter(prev => prev + 1);',
          },
        ],
        isCompleted: true,
        score: 90,
        quizId: 'quiz_rpl_02',
      },
      {
        id: 'chap_rpl_03',
        subjectId: 'subj_smk_rpl_web',
        chapterNumber: 3,
        title: 'RESTful API & Server-Client Communication',
        description: 'Desain endpoint HTTP yang baik, status code, otentikasi token Bearer, dan header HTTP.',
        durationMinutes: 35,
        content: `### 🌐 RESTful API Standards
Metode HTTP Standar:
- **GET**: Membaca data (Idempotent & Safe)
- **POST**: Membuat data baru
- **PUT / PATCH**: Memperbarui data keseluruhan / sebagian
- **DELETE**: Menghapus data

Kode Status HTTP Populer:
- \`200 OK\` / \`201 Created\`
- \`400 Bad Request\` / \`401 Unauthorized\` / \`403 Forbidden\` / \`404 Not Found\`
- \`500 Internal Server Error\``,
        keyPoints: [
          'REST menggunakan kata benda plural untuk endpoint (/api/subjects, /api/quizzes).',
          'Token otentikasi dikirimkan via Header `Authorization: Bearer <TOKEN>`.',
          'Validasi input harus dilakukan secara ketat di sisi server menggunakan schema validator.',
        ],
        examples: [
          {
            title: 'Struktur REST Response',
            explanation: 'Format respon JSON yang standar dan informatif.',
            codeOrFormula: '{\n  "success": true,\n  "data": { "id": "123", "title": "Aurelia Edu" },\n  "message": "Data berhasil dimuat"\n}',
          },
        ],
        isCompleted: true,
        score: 85,
        quizId: 'quiz_rpl_03',
      },
      {
        id: 'chap_rpl_04',
        subjectId: 'subj_smk_rpl_web',
        chapterNumber: 4,
        title: 'Desain Responsif & Tailwind CSS Mastery',
        description: 'Mobile-first breakpoints, flexbox layouting, CSS Grid, dan optimalisasi rendering.',
        durationMinutes: 20,
        content: `### 🎨 Mobile-First Responsive Design
Pendekatan Mobile-First merancang layout dasar untuk layar kecil terlebih dahulu, kemudian menambahkan enhancement untuk layar tablet (\`md:\`) dan desktop (\`lg:\`, \`xl:\`).`,
        keyPoints: ['Gunakan Flexbox untuk 1D layout dan CSS Grid untuk 2D matrix layout.', 'Pertahankan tap target minimal 44x44px untuk mobile.'],
        examples: [{ title: 'Grid Responsif', explanation: 'Grid 1 kolom di mobile, 3 kolom di desktop', codeOrFormula: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' }],
        isCompleted: true,
        score: 92,
        quizId: 'quiz_rpl_04',
      },
      {
        id: 'chap_rpl_05',
        subjectId: 'subj_smk_rpl_web',
        chapterNumber: 5,
        title: 'Database Relasional & Query Optimasi',
        description: 'Skema tabel, relasi Foreign Key, indeksasi database, dan pencegahan SQL Injection.',
        durationMinutes: 30,
        content: `### 🗄️ Relasional Database & Indexing
Indeks database bekerja seperti indeks pada buku, memungkinkan pencarian data dengan kompleksitas O(log N) dibandingkan full-table scan O(N).`,
        keyPoints: ['Foreign Key menjamin integritas referensial data.', 'Gunakan prepared statements atau ORM untuk mencegah SQL injection.'],
        examples: [{ title: 'Relasi 1 to Many', explanation: 'User memiliki banyak QuizAttempts', codeOrFormula: 'CREATE TABLE quiz_attempts (\n  id UUID PRIMARY KEY,\n  user_id UUID REFERENCES users(id) ON DELETE CASCADE\n);' }],
        isCompleted: true,
        score: 88,
        quizId: 'quiz_rpl_05',
      },
      {
        id: 'chap_rpl_06',
        subjectId: 'subj_smk_rpl_web',
        chapterNumber: 6,
        title: 'Keamanan Web & Otentikasi Modern',
        description: 'Hashing password dengan bcrypt/argon2, JWT tokens, proteksi XSS, CSRF, dan HTTP-Only Cookies.',
        durationMinutes: 25,
        content: `### 🔒 Keamanan Aplikasi Web
Jangan pernah menyimpan password dalam bentuk plaintext. Gunakan algoritma hashing berkekuatan tinggi dengan random salt.`,
        keyPoints: ['HTTP-Only cookies mencegah pencurian token melalui serangan XSS.', 'Sanitasi semua input pengguna di sisi server.'],
        examples: [{ title: 'Bcrypt Hash Verification', explanation: 'Memverifikasi hash password', codeOrFormula: 'const isValid = await bcrypt.compare(inputPassword, user.passwordHash);' }],
        isCompleted: true,
        score: 95,
        quizId: 'quiz_rpl_06',
      },
      {
        id: 'chap_rpl_07',
        subjectId: 'subj_smk_rpl_web',
        chapterNumber: 7,
        title: 'Progressive Web Apps (PWA) & Offline Mode',
        description: 'Service Worker, caching strategies (Network First, Cache First), Web App Manifest, dan push notifications.',
        durationMinutes: 30,
        content: `### 📱 PWA & Service Workers
Service Worker bertindak sebagai programmable proxy network di antara browser pengguna dan server cloud.`,
        keyPoints: ['PWA memungkinkan aplikasi dipasang di homescreen seperti aplikasi native.', 'IndexedDB menyediakan penyimpanan data offline berkapasitas besar.'],
        examples: [{ title: 'Cache First Strategy', explanation: 'Mengambil aset statis dari cache lokal untuk kecepatan instan.', codeOrFormula: 'self.addEventListener("fetch", (e) => {\n  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));\n});' }],
        isCompleted: false,
        quizId: 'quiz_rpl_07',
      },
      {
        id: 'chap_rpl_08',
        subjectId: 'subj_smk_rpl_web',
        chapterNumber: 8,
        title: 'Integrasi Artificial Intelligence & Cloud Services',
        description: 'Menghubungkan model AI Generatif (LLM), embedding vektor, dan deployment cloud.',
        durationMinutes: 40,
        content: `### 🤖 Integrasi AI Generatif dalam Aplikasi Web
Menggunakan API berbasis LLM modern untuk fitur smart tutor, pembuatan kuis otomatis, dan personalisasi konten belajar.`,
        keyPoints: ['Kunci API harus disimpan aman di server-side environment variables.', 'Gunakan streaming response untuk memberikan UX cepat dan interaktif.'],
        examples: [{ title: 'AI API Call di Backend', explanation: 'Memanggil model AI secara aman dari backend handler', codeOrFormula: 'const result = await aiClient.models.generateContent({\n  model: "gemini-2.5-flash",\n  contents: userPrompt\n});' }],
        isCompleted: false,
        quizId: 'quiz_rpl_08',
      },
    ],
  },

  // SMK - TKJ
  {
    id: 'subj_smk_tkj_network',
    title: 'Administrasi Jaringan & Keamanan Cyber',
    code: 'SMK-TKJ-01',
    educationLevel: 'SMK',
    grade: 'Kelas 11',
    major: 'Teknik Komputer & Jaringan (TKJ)',
    category: 'Kejuruan TKJ',
    iconName: 'Server',
    themeColor: 'from-cyan-600 to-blue-600',
    accentColor: 'cyan',
    description: 'Routing dinamis OSPF/BGP, subnetting IPv4/IPv6, firewall MikroTik/Cisco, dan keamanan perimeter jaringan.',
    totalLessons: 8,
    completedLessons: 4,
    averageScore: 82,
    progressPercent: 50,
    isPublished: true,
    chapters: [
      {
        id: 'chap_tkj_01',
        subjectId: 'subj_smk_tkj_network',
        chapterNumber: 1,
        title: 'Subnetting VLSM & Alokasi IP Address',
        description: 'Perhitungan Variable Length Subnet Mask (VLSM) untuk efisiensi alokasi host.',
        durationMinutes: 30,
        content: `### 🌐 Subnetting & VLSM
VLSM memungkinkan pembagian subnet dengan ukuran prefix berbeda (/24, /26, /30) sesuai kebutuhan jumlah perangkat pada setiap divisi organisasi.`,
        keyPoints: ['/30 digunakan untuk link point-to-point antar router (2 host valid).', 'Network address adalah IP awal dan Broadcast address adalah IP akhir pada subnet.'],
        examples: [{ title: 'Rumus Jumlah Host Valid', explanation: 'Menghitung host yang dapat digunakan', codeOrFormula: 'Jumlah Host Valid = 2^(32 - Prefix) - 2' }],
        isCompleted: true,
        score: 85,
        quizId: 'quiz_tkj_01',
      },
      {
        id: 'chap_tkj_02',
        subjectId: 'subj_smk_tkj_network',
        chapterNumber: 2,
        title: 'Routing Dinamis OSPF & Multi-Area',
        description: 'Konsep Link-State Routing, Dijkstra Algorithm, dan penetapan Designated Router (DR/BDR).',
        durationMinutes: 35,
        content: `### 🔄 Open Shortest Path First (OSPF)
OSPF menggunakan metrik Cost berdasarkan bandwidth link untuk menentukan rute terpendek tercepat.`,
        keyPoints: ['Area 0 (Backbone Area) wajib ada pada arsitektur OSPF multi-area.', 'Hello packet dikirimkan secara periodik untuk mendeteksi status tetangga.'],
        examples: [{ title: 'Konfigurasi OSPF Dasar', explanation: 'Mendaftarkan network ke area backbone', codeOrFormula: 'router ospf 1\n network 192.168.10.0 0.0.0.255 area 0' }],
        isCompleted: true,
        score: 80,
        quizId: 'quiz_tkj_02',
      },
      {
        id: 'chap_tkj_03',
        subjectId: 'subj_smk_tkj_network',
        chapterNumber: 3,
        title: 'VLAN & Inter-VLAN Routing',
        description: 'Isolasi broadcast domain dengan VLAN tagging 802.1Q dan Trunking antar Switch.',
        durationMinutes: 25,
        content: `### 🏢 Virtual Local Area Network (VLAN)
VLAN membagi switch fisik menjadi beberapa jaringan logis yang terisolasi untuk meningkatkan keamanan dan performa transmisi data.`,
        keyPoints: ['Mode Trunk melewatkan paket banyak VLAN dengan header 802.1Q.', 'Mode Access menghubungkan port ke satu VLAN spesifik untuk end-device.'],
        examples: [{ title: 'VLAN Interface', explanation: 'Membuat sub-interface untuk routing router-on-a-stick', codeOrFormula: 'interface GigabitEthernet0/0.10\n encapsulation dot1Q 10\n ip address 10.10.10.1 255.255.255.0' }],
        isCompleted: true,
        score: 90,
        quizId: 'quiz_tkj_03',
      },
      {
        id: 'chap_tkj_04',
        subjectId: 'subj_smk_tkj_network',
        chapterNumber: 4,
        title: 'Firewall Filtering & NAT (Network Address Translation)',
        description: 'Konfigurasi Chain Input, Forward, Output, Masquerade NAT, dan proteksi Port Scanning.',
        durationMinutes: 30,
        content: `### 🛡️ Firewall & NAT
NAT memungkinkan ratusan komputer dengan IP Private mengakses internet secara bersamaan menggunakan satu IP Public.`,
        keyPoints: ['Src-NAT (Masquerade) mentranslasikan IP sumber private ke public.', 'Dst-NAT (Port Forwarding) mengarahkan lalu lintas internet ke server lokal.'],
        examples: [{ title: 'MikroTik Masquerade Rule', explanation: 'NAT rule untuk koneksi internet keluar', codeOrFormula: '/ip firewall nat add chain=srcnat out-interface=ether1-gateway action=masquerade' }],
        isCompleted: true,
        score: 88,
        quizId: 'quiz_tkj_04',
      },
      {
        id: 'chap_tkj_05',
        subjectId: 'subj_smk_tkj_network',
        chapterNumber: 5,
        title: 'VPN & Enkripsi IPsec / WireGuard',
        description: 'Membangun tunnel komunikasi terenkripsi antar kantor cabang melalui jaringan publik.',
        durationMinutes: 35,
        content: `### 🔐 Virtual Private Network (VPN)
VPN menciptakan kanal tunnel aman yang melindungi kerahasiaan dan integritas data dari penyadapan (Eavesdropping).`,
        keyPoints: ['WireGuard menggunakan kriptografi modern berkecepatan tinggi.', 'IPsec menyediakan autentikasi dan enkripsi level network layer.'],
        examples: [{ title: 'Tunnel Handshake', explanation: 'Kunci enkripsi ditukar secara asimetris', codeOrFormula: 'PublicKey / PrivateKey Pair Verification' }],
        isCompleted: false,
        quizId: 'quiz_tkj_05',
      },
      {
        id: 'chap_tkj_06',
        subjectId: 'subj_smk_tkj_network',
        chapterNumber: 6,
        title: 'Monitoring Jaringan & SNMP / Prometheus',
        description: 'Pemantauan utilisasi bandwidth, latency, packet loss, dan alert sistem secara real-time.',
        durationMinutes: 25,
        content: `### 📊 Network Monitoring
Sistem monitoring memberikan visibilitas penuh terhadap kesehatan infrastruktur jaringan dan server.`,
        keyPoints: ['SNMP v3 mendukung enkripsi dan autentikasi pengguna.', 'Grafana memvisualisasikan metrik time-series dengan dashboard interaktif.'],
        examples: [{ title: 'SNMP Walk Query', explanation: 'Mengambil data status interface', codeOrFormula: 'snmpwalk -v2c -c public 192.168.1.1 IF-MIB::ifDescr' }],
        isCompleted: false,
        quizId: 'quiz_tkj_06',
      },
      {
        id: 'chap_tkj_07',
        subjectId: 'subj_smk_tkj_network',
        chapterNumber: 7,
        title: 'Cloud Infrastructure & Server Virtualization',
        description: 'Proxmox, VMware ESXi, Docker Container, dan arsitektur microservices.',
        durationMinutes: 35,
        content: `### ☁️ Virtualisasi & Container
Container mengemas aplikasi bersama seluruh dependensinya sehingga dapat dijalankan secara konsisten di lingkungan apa pun.`,
        keyPoints: ['Container berbagi kernel OS host sehingga jauh lebih ringan dari Virtual Machine (VM).', 'Hypervisor Type 1 berjalan langsung di atas bare-metal hardware.'],
        examples: [{ title: 'Dockerfile Sederhana', explanation: 'Membangun image server web ringan', codeOrFormula: 'FROM nginx:alpine\nCOPY ./html /usr/share/nginx/html\nEXPOSE 80' }],
        isCompleted: false,
        quizId: 'quiz_tkj_07',
      },
      {
        id: 'chap_tkj_08',
        subjectId: 'subj_smk_tkj_network',
        chapterNumber: 8,
        title: 'Cyber Security Defending & Penetration Testing',
        description: 'Prinsip CIA Triad, analisis kerentanan jaringan, proteksi DDoS, dan mitigasi Malware.',
        durationMinutes: 40,
        content: `### 🚨 Keamanan Siber Pertahanan
Keamanan siber yang solid menerapkan prinsip Defense in Depth (keamanan berlapis) dari fisik hingga aplikasi.`,
        keyPoints: ['Terapkan prinsip Least Privilege untuk semua akun pengguna dan sistem.', 'Audit log secara berkala untuk mendeteksi anomali akses.'],
        examples: [{ title: 'Audit Port Scan', explanation: 'Mendeteksi port terbuka yang rentan', codeOrFormula: 'nmap -sV -sC -T4 target-ip' }],
        isCompleted: false,
        quizId: 'quiz_tkj_08',
      },
    ],
  },

  // SMA - Matematika & Sains
  {
    id: 'subj_sma_matematika',
    title: 'Matematika Peminatan & Lanjut',
    code: 'SMA-MAT-01',
    educationLevel: 'SMA',
    grade: 'Kelas 12',
    category: 'MIPA (Matematika & IPA)',
    iconName: 'Calculator',
    themeColor: 'from-emerald-600 to-teal-600',
    accentColor: 'emerald',
    description: 'Kalkulus diferensial & integral, trigonometri analitik, vektor dimensi tiga, dan statistika probabilitas.',
    totalLessons: 8,
    completedLessons: 7,
    averageScore: 94,
    progressPercent: 88,
    isPublished: true,
    chapters: [
      {
        id: 'chap_mat_01',
        subjectId: 'subj_sma_matematika',
        chapterNumber: 1,
        title: 'Limit Fungsi Trigonometri & Tak Hingga',
        description: 'Menentukan nilai limit fungsi trigonometri menggunakan teorema apit dan sifat dasar limit.',
        durationMinutes: 25,
        content: `### 📐 Sifat Dasar Limit Trigonometri
Rumus Inti:
$$\\lim_{x \\to 0} \\frac{\\sin(ax)}{bx} = \\frac{a}{b}$$
$$\\lim_{x \\to 0} \\frac{\\tan(ax)}{bx} = \\frac{a}{b}$$

Ingat bahwa sifat ini berlaku jika variabel mendekati 0 dan bentuk trigonometrinya adalah sin atau tan.`,
        keyPoints: [
          'Ubah bentuk cos(x) menjadi 1 - 2*sin^2(x/2) saat menyelesaikan bentuk tak tentu 0/0.',
          'Bagi dengan pangkat tertinggi penyebut pada limit menuju tak hingga.',
        ],
        examples: [
          {
            title: 'Penyelesaian Limit',
            explanation: 'Hitung limit sin(4x) / (2x) saat x mendekati 0',
            codeOrFormula: 'lim (x->0) sin(4x)/(2x) = 4/2 = 2',
          },
        ],
        isCompleted: true,
        score: 95,
        quizId: 'quiz_mat_01',
      },
      {
        id: 'chap_mat_02',
        subjectId: 'subj_sma_matematika',
        chapterNumber: 2,
        title: 'Turunan Pertama & Aplikasi Laju Perubahan',
        description: 'Aturan rantai turunan fungsi trigonometri, titik stasioner, kecekungan kurva, dan garis singgung.',
        durationMinutes: 30,
        content: `### 📈 Turunan Fungsi Aljabar & Trigonometri
Jika $f(x) = u(x) \\cdot v(x)$, maka $f'(x) = u'(x)v(x) + u(x)v'(x)$.
Turunan fungsi trigonometri:
- $(\\sin x)' = \\cos x$
- $(\\cos x)' = -\\sin x$
- $(\\tan x)' = \\sec^2 x$`,
        keyPoints: ['Titik stasioner terjadi ketika f\'(x) = 0.', 'Titik belok ditemukan saat turunan kedua f\'\'(x) = 0 dan berganti tanda.'],
        examples: [{ title: 'Mencari Turunan Rantai', explanation: 'Turunan f(x) = sin(3x^2 + 5)', codeOrFormula: "f'(x) = 6x * cos(3x^2 + 5)" }],
        isCompleted: true,
        score: 92,
        quizId: 'quiz_mat_02',
      },
      {
        id: 'chap_mat_03',
        subjectId: 'subj_sma_matematika',
        chapterNumber: 3,
        title: 'Integral Tak Tentu & Integral Substitusi',
        description: 'Teknik pengintegralan substitusi aljabar, trigonometri, dan aplikasi integral tentu.',
        durationMinutes: 30,
        content: `### ♾️ Teorema Dasar Kalkulus & Integral
Integral merupakan antiturunan.
$$\\int x^n dx = \\frac{1}{n+1} x^{n+1} + C, \\quad n \\neq -1$$`,
        keyPoints: ['Gunakan substitusi u saat terdapat perkalian fungsi dengan turunannya.', 'Integral tentu menghasilkan nilai skalar luas daerah di bawah kurva.'],
        examples: [{ title: 'Integral Luas Daerah', explanation: 'Luas di bawah kurva y = 2x dari x=0 sampai x=3', codeOrFormula: '[x^2] dari 0 ke 3 = 3^2 - 0 = 9 satuan luas' }],
        isCompleted: true,
        score: 96,
        quizId: 'quiz_mat_03',
      },
      {
        id: 'chap_mat_04',
        subjectId: 'subj_sma_matematika',
        chapterNumber: 4,
        title: 'Integral Parsial & Volume Benda Putar',
        description: 'Metode integral parsial (udv = uv - vdu) dan menghitung volume putar metode cakram/cincin.',
        durationMinutes: 35,
        content: `### 🔄 Volume Benda Putar
Memutar daerah kurva f(x) mengelilingi sumbu-X menghasilkan volume:
$$V = \\pi \\int_a^b [f(x)]^2 dx$$`,
        keyPoints: ['Metode tabung digunakan jika perputaran mengelilingi sumbu tegak lurus.', 'Aturan Tanzalin mempermudah pengintegralan parsial berulang.'],
        examples: [{ title: 'Integral Parsial x * e^x', explanation: 'u = x, dv = e^x dx', codeOrFormula: 'Integral x*e^x dx = x*e^x - e^x + C' }],
        isCompleted: true,
        score: 90,
        quizId: 'quiz_mat_04',
      },
      {
        id: 'chap_mat_05',
        subjectId: 'subj_sma_matematika',
        chapterNumber: 5,
        title: 'Geometri Ruang (Dimensi Tiga)',
        description: 'Jarak titik ke garis, jarak titik ke bidang, dan sudut antar dua bidang pada kubus/limas.',
        durationMinutes: 25,
        content: `### 📦 Jarak dan Proyeksi Dimensi Tiga
Jarak titik ke bidang selalu diukur tegak lurus (ortogonal) terhadap bidang tersebut.`,
        keyPoints: ['Panjang diagonal sisi kubus rusuk s adalah s*akar(2).', 'Panjang diagonal ruang kubus rusuk s adalah s*akar(3).'],
        examples: [{ title: 'Diagonal Ruang Kubus Rusuk 6 cm', explanation: 'Menghitung diagonal ruang', codeOrFormula: 'd = 6 * sqrt(3) cm' }],
        isCompleted: true,
        score: 94,
        quizId: 'quiz_mat_05',
      },
      {
        id: 'chap_mat_06',
        subjectId: 'subj_sma_matematika',
        chapterNumber: 6,
        title: 'Statistika Inferensial & Distribusi Normal',
        description: 'Uji hipotesis, Z-Score, probabilitas kurva normal standar Gauss, dan selang kepercayaan.',
        durationMinutes: 30,
        content: `### 📊 Distribusi Normal & Z-Score
Transformasi Z-Score mengonversi nilai data ke distribusi standar dengan rata-rata 0 dan variansi 1:
$$Z = \\frac{X - \\mu}{\\sigma}$$`,
        keyPoints: ['68% data berada dalam rentang ±1 standar deviasi.', '95% data berada dalam rentang ±2 standar deviasi.'],
        examples: [{ title: 'Perhitungan Z-Score', explanation: 'Nilai ujian 85, rata-rata 75, simpangan baku 5', codeOrFormula: 'Z = (85 - 75) / 5 = +2.00 (Top 2.5% nasional)' }],
        isCompleted: true,
        score: 98,
        quizId: 'quiz_mat_06',
      },
      {
        id: 'chap_mat_07',
        subjectId: 'subj_sma_matematika',
        chapterNumber: 7,
        title: 'Polinomial & Teorema Sisa Horner',
        description: 'Operasi suku banyak, algoritma pembagian Horner, dan penentuan akar-akar rasional persamaan.',
        durationMinutes: 25,
        content: `### 🔢 Teorema Sisa dan Faktor
Jika polinomial P(x) dibagi oleh (x - k), maka sisa pembagiannya adalah tepat sama dengan P(k).`,
        keyPoints: ['(x - k) adalah faktor dari P(x) jika dan hanya jika P(k) = 0.', 'Metode Horner menghemat perkalian pada perhitungan evaluasi polinomial.'],
        examples: [{ title: 'Sisa Pembagian Horner', explanation: 'P(x) = x^3 - 2x^2 + 5x - 4 dibagi (x - 2)', codeOrFormula: 'Sisa = P(2) = 8 - 8 + 10 - 4 = 6' }],
        isCompleted: true,
        score: 91,
        quizId: 'quiz_mat_07',
      },
      {
        id: 'chap_mat_08',
        subjectId: 'subj_sma_matematika',
        chapterNumber: 8,
        title: 'Irisan Kerucut & Persamaan Elips/Parabola',
        description: 'Persamaan standar lingkaran, elips horizontal/vertikal, parabola, dan hiperbola.',
        durationMinutes: 30,
        content: `### 🪐 Irisan Kerucut & Eksentrisitas
Eksentrisitas (e) mengklasifikasikan bentuk irisan kerucut:
- $e = 0$: Lingkaran sempurna
- $0 < e < 1$: Elips (orbit planet)
- $e = 1$: Parabola
- $e > 1$: Hiperbola`,
        keyPoints: ['Titik fokus elips berjarak c dari pusat dengan c^2 = a^2 - b^2.', 'Sumbu mayor adalah sumbu terpanjang pada elips.'],
        examples: [{ title: 'Persamaan Lingkaran Pusat (0,0)', explanation: 'Jari-jari 5 satuan', codeOrFormula: 'x^2 + y^2 = 25' }],
        isCompleted: false,
        quizId: 'quiz_mat_08',
      },
    ],
  },

  // SMA - Fisika Modern
  {
    id: 'subj_sma_fisika',
    title: 'Fisika Modern & Elektromagnetik',
    code: 'SMA-FIS-01',
    educationLevel: 'SMA',
    grade: 'Kelas 12',
    category: 'MIPA (Matematika & IPA)',
    iconName: 'Atom',
    themeColor: 'from-purple-600 to-indigo-600',
    accentColor: 'purple',
    description: 'Relativitas khusus Einstein, efek fotolistrik kuantum, struktur atom Bohr, dan induksi Faraday.',
    totalLessons: 8,
    completedLessons: 5,
    averageScore: 90,
    progressPercent: 62,
    isPublished: true,
    chapters: [
      {
        id: 'chap_fis_01',
        subjectId: 'subj_sma_fisika',
        chapterNumber: 1,
        title: 'Teori Relativitas Khusus Einstein',
        description: 'Postulat Einstein, dilatasi waktu, kontraksi panjang Lorentz, dan kesetaraan massa-energi E=mc^2.',
        durationMinutes: 30,
        content: `### 🌌 Postulat Relativitas Khusus
1. Hukum-hukum fisika memiliki bentuk yang sama di semua kerangka acuan inersial.
2. Kecepatan cahaya di ruang hampa bernilai konstan ($c \\approx 3 \\times 10^8$ m/s) untuk semua pengamat, terlepas dari gerak sumber cahaya.

Faktor Lorentz:
$$\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}$$`,
        keyPoints: ['Waktu berjalan lebih lambat bagi pengamat yang bergerak dengan kecepatan mendekati c (Dilatasi Waktu).', 'Panjang benda terukur memendek searah arah gerak (Kontraksi Lorentz).'],
        examples: [{ title: 'Dilatasi Waktu', explanation: 'Waktu pada roket berkecepatan 0.6c', codeOrFormula: 'gamma = 1 / sqrt(1 - 0.36) = 1 / 0.8 = 1.25' }],
        isCompleted: true,
        score: 95,
        quizId: 'quiz_fis_01',
      },
      {
        id: 'chap_fis_02',
        subjectId: 'subj_sma_fisika',
        chapterNumber: 2,
        title: 'Fisika Kuantum & Efek Fotolistrik',
        description: 'Foton cahaya, fungsi kerja logam (work function), energi kinetik elektron terpancar, dan efek Compton.',
        durationMinutes: 25,
        content: `### ⚡ Efek Fotolistrik
Einstein membuktikan bahwa cahaya memiliki sifat partikel (foton).
$$E_k = hf - W_0$$
Di mana $h$ adalah konstanta Planck ($6.63 \\times 10^{-34}$ J.s) dan $W_0$ adalah fungsi kerja logam.`,
        keyPoints: ['Elektron hanya terlepas jika frekuensi cahaya lebih besar dari frekuensi ambang f0.', 'Intensitas cahaya memperbanyak jumlah elektron yang lepas, tetapi tidak menaikkan energi kinetik maksimumnya.'],
        examples: [{ title: 'Energi Foton', explanation: 'Foton dengan frekuensi 5x10^14 Hz', codeOrFormula: 'E = h*f = 6.63e-34 * 5e14 = 3.315e-19 Joule' }],
        isCompleted: true,
        score: 90,
        quizId: 'quiz_fis_02',
      },
      {
        id: 'chap_fis_03',
        subjectId: 'subj_sma_fisika',
        chapterNumber: 3,
        title: 'Radiasi Benda Hitam & Hukum Wien',
        description: 'Hukum pergeseran Wien, hukum Stefan-Boltzmann, dan bencana ultraviolet yang memicu lahirnya mekanika kuantum.',
        durationMinutes: 25,
        content: `### 🔥 Pergeseran Wien
Panjang gelombang intensitas maksimum berbanding terbalik dengan suhu mutlak benda dalam Kelvin:
$$\\lambda_{max} \\cdot T = C \\quad (C = 2.898 \\times 10^{-3} \\text{ m.K})$$`,
        keyPoints: ['Semakin panas suatu bintang, puncak spektrum cahayanya bergeser ke arah warna biru/ungu (panjang gelombang pendek).', 'Total daya radiasi sebanding dengan T^4 (Hukum Stefan-Boltzmann).'],
        examples: [{ title: 'Suhu Permukaan Bintang', explanation: 'Bintang dengan panjang gelombang puncak 500 nm', codeOrFormula: 'T = 2.898e-3 / 500e-9 = 5796 Kelvin' }],
        isCompleted: true,
        score: 88,
        quizId: 'quiz_fis_03',
      },
      {
        id: 'chap_fis_04',
        subjectId: 'subj_sma_fisika',
        chapterNumber: 4,
        title: 'Struktur Inti Atom & Radioaktivitas',
        description: 'Defek massa, energi ikat inti atom, peluruhan sinar alfa, beta, gama, dan waktu paruh.',
        durationMinutes: 30,
        content: `### ☢️ Peluruhan Radioaktif & Waktu Paruh
Jumlah partikel yang tersisa setelah waktu t:
$$N(t) = N_0 \\left(\\frac{1}{2}\\right)^{\\frac{t}{T_{1/2}}}$$`,
        keyPoints: ['Defek massa diubah menjadi energi ikat inti sesuai rumus E = delta m * c^2.', 'Sinar gama adalah gelombang elektromagnetik berdaya tembus paling kuat.'],
        examples: [{ title: 'Sisa Sampel Radioaktif', explanation: 'Sampel 100 gram meluruh selama 3 waktu paruh', codeOrFormula: 'N = 100 * (1/2)^3 = 12.5 gram tersisa' }],
        isCompleted: true,
        score: 92,
        quizId: 'quiz_fis_04',
      },
      {
        id: 'chap_fis_05',
        subjectId: 'subj_sma_fisika',
        chapterNumber: 5,
        title: 'Induksi Elektromagnetik & Hukum Faraday-Lenz',
        description: 'Fluks magnetik, GGL induksi pada kumparan, generator listrik AC/DC, dan transformator daya.',
        durationMinutes: 30,
        content: `### 🧲 Hukum Induksi Faraday & Hukum Lenz
GGL Induksi yang dihasilkan berbanding lurus dengan laju perubahan fluks magnetik:
$$\\varepsilon = -N \\frac{d\\Phi}{dt}$$
Tanda negatif (Hukum Lenz) menunjukkan arus induksi selalu melawan penyebab perubahannya.`,
        keyPoints: ['Transformator step-up menaikkan tegangan dengan memperbanyak lilitan sekunder.', 'Efisiensi transformator ideal adalah 100% (Daya primer = Daya sekunder).'],
        examples: [{ title: 'Perbandingan Trafo', explanation: 'Tegangan dan lilitan transformator', codeOrFormula: 'Vp / Vs = Np / Ns = Is / Ip' }],
        isCompleted: true,
        score: 85,
        quizId: 'quiz_fis_05',
      },
      {
        id: 'chap_fis_06',
        subjectId: 'subj_sma_fisika',
        chapterNumber: 6,
        title: 'Rangkaian Arus Bolak-Balik (RLC Seri)',
        description: 'Impedansi rangkaian, reaktansi induktif/kapasitif, diagram fasor, dan frekuensi resonansi.',
        durationMinutes: 35,
        content: `### ⚡ Rangkaian RLC & Resonansi
Impedansi total:
$$Z = \\sqrt{R^2 + (X_L - X_C)^2}$$
Kondisi resonansi tercapai saat $X_L = X_C$, menghasilkan impedansi minimum $Z = R$.`,
        keyPoints: ['Frekuensi resonansi fo = 1 / (2*pi*sqrt(L*C)).', 'Pada kondisi resonansi, faktor daya rangkaian sama dengan 1 (maksimal).'],
        examples: [{ title: 'Impedansi RLC', explanation: 'R = 30 ohm, XL = 80 ohm, XC = 40 ohm', codeOrFormula: 'Z = sqrt(30^2 + (80-40)^2) = sqrt(900 + 1600) = 50 Ohm' }],
        isCompleted: false,
        quizId: 'quiz_fis_06',
      },
      {
        id: 'chap_fis_07',
        subjectId: 'subj_sma_fisika',
        chapterNumber: 7,
        title: 'Gelombang Elektromagnetik & Spektrum Cahaya',
        description: 'Persamaan gelombang Maxwell, polarisasi, interferensi celah ganda Young, dan difraksi kisi.',
        durationMinutes: 25,
        content: `### 🌈 Spektrum Gelombang Elektromagnetik
Urutan frekuensi rendah ke tinggi:
Gelombang Radio -> Gelombang Mikro -> Inframerah -> Cahaya Tampak (MeJiKuHiBiNiU) -> Ultraviolet -> Sinar-X -> Sinar Gamma.`,
        keyPoints: ['Semua gelombang elektromagnetik merambat dengan kecepatan konstan c di ruang hampa.', 'Interferensi maksimum (terang) terjadi saat beda lintasan d*sin(theta) = n*lambda.'],
        examples: [{ title: 'Interferensi Celah Ganda', explanation: 'Jarak terang pusat ke terang ke-1', codeOrFormula: 'y = (n * lambda * L) / d' }],
        isCompleted: false,
        quizId: 'quiz_fis_07',
      },
      {
        id: 'chap_fis_08',
        subjectId: 'subj_sma_fisika',
        chapterNumber: 8,
        title: 'Teknologi Semikonduktor & Nanoteknologi',
        description: 'Dioda p-n junction, transistor BJT/MOSFET, solar cell fotovoltaik, dan material superkonduktor.',
        durationMinutes: 30,
        content: `### 🔬 Semikonduktor & Mikroelektronika
Doping atom pengotor pada kristal silikon murni menciptakan semikonduktor tipe-p (kelebihan hole) atau tipe-n (kelebihan elektron bebas).`,
        keyPoints: ['Dioda mengalirkan arus hanya pada kondisi Forward Bias.', 'Superkonduktor menghantarkan listrik tanpa hambatan di bawah suhu kritisnya.'],
        examples: [{ title: 'Prinsip Solar Cell', explanation: 'Foton mengeksitasi elektron pada sambungan p-n menghasilkan arus DC.', codeOrFormula: 'P = V_oc * I_sc * FF' }],
        isCompleted: false,
        quizId: 'quiz_fis_08',
      },
    ],
  },

  // SD - Matematika & IPAS
  {
    id: 'subj_sd_matematika',
    title: 'Matematika Dasar & Pecahan',
    code: 'SD-MAT-05',
    educationLevel: 'SD',
    grade: 'Kelas 5',
    category: 'Pendidikan Dasar',
    iconName: 'Calculator',
    themeColor: 'from-amber-500 to-orange-500',
    accentColor: 'amber',
    description: 'Operasi hitung pecahan biasa/campuran, desimal, persentase, perbandingan skala, dan bangun ruang sederhana.',
    totalLessons: 8,
    completedLessons: 4,
    averageScore: 92,
    progressPercent: 50,
    isPublished: true,
    chapters: [
      {
        id: 'chap_sd_mat_01',
        subjectId: 'subj_sd_matematika',
        chapterNumber: 1,
        title: 'Penjumlahan & Pengurangan Pecahan',
        description: 'Menyamakan penyebut dengan KPK, menyederhanakan pecahan, dan pecahan campuran.',
        durationMinutes: 15,
        content: `### 🍰 Belajar Pecahan Bersama Aurel!
Pecahan adalah bagian dari satu kesatuan yang utuh.
Contoh: Membagi 1 pizza menjadi 4 potong sama besar, 1 potong bernilai $1/4$.

Untuk menjumlahkan pecahan yang berbeda penyebut:
1. Cari KPK dari penyebutnya
2. Ubah pembilang sesuai kelipatannya
3. Jumlahkan pembilang, penyebut tetap sama!`,
        keyPoints: ['Penyebut pecahan tidak boleh nol.', 'Selalu sederhanakan hasil akhir dengan membagi FPB pembilang dan penyebut.'],
        examples: [{ title: 'Contoh Penjumlahan', explanation: 'Hitung 1/2 + 1/4', codeOrFormula: '1/2 + 1/4 = 2/4 + 1/4 = 3/4' }],
        isCompleted: true,
        score: 95,
        quizId: 'quiz_sd_mat_01',
      },
      {
        id: 'chap_sd_mat_02',
        subjectId: 'subj_sd_matematika',
        chapterNumber: 2,
        title: 'Perkalian & Pembagian Pecahan',
        description: 'Mengalikan pembilang dengan pembilang, penyebut dengan penyebut, dan konsep membalik pecahan pada pembagian.',
        durationMinutes: 15,
        content: `### ✖️ Perkalian Pecahan Sangat Mudah!
Trik cepat: Langsung kalikan atas dengan atas, bawah dengan bawah!
$$\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}$$`,
        keyPoints: ['Pembagian pecahan diubah menjadi perkalian dengan membalik pecahan kedua.', 'Pecahan campuran harus diubah ke pecahan biasa terlebih dahulu.'],
        examples: [{ title: 'Contoh Perkalian', explanation: '2/3 * 3/5', codeOrFormula: '(2 * 3) / (3 * 5) = 6/15 = 2/5' }],
        isCompleted: true,
        score: 90,
        quizId: 'quiz_sd_mat_02',
      },
      {
        id: 'chap_sd_mat_03',
        subjectId: 'subj_sd_matematika',
        chapterNumber: 3,
        title: 'Desimal & Persen',
        description: 'Mengubah pecahan biasa ke desimal dan persen serta operasi hitung belanjaan sehari-hari.',
        durationMinutes: 20,
        content: `### 💯 Memahami Persen (%)
Persen artinya per seratus.
- $1/2 = 50/100 = 50\\% = 0.5$
- $1/4 = 25/100 = 25\\% = 0.25$
- $3/4 = 75/100 = 75\\% = 0.75$`,
        keyPoints: ['Diskon 20% artinya kita membayar 80% dari harga asli.', 'Gunakan perkalian silang untuk menghitung nilai persen dari suatu jumlah.'],
        examples: [{ title: 'Hitung Diskon Belanja', explanation: 'Diskon 20% dari mainan seharga Rp50.000', codeOrFormula: 'Potongan = 20/100 * 50.000 = Rp10.000' }],
        isCompleted: true,
        score: 94,
        quizId: 'quiz_sd_mat_03',
      },
      {
        id: 'chap_sd_mat_04',
        subjectId: 'subj_sd_matematika',
        chapterNumber: 4,
        title: 'Perbandingan & Skala Peta',
        description: 'Membaca skala peta (1 : 500.000) dan menghitung jarak sebenarnya di lapangan.',
        durationMinutes: 20,
        content: `### 🗺️ Skala pada Peta
Skala 1 : 100.000 artinya 1 cm di peta mewakili 100.000 cm (atau 1 km) pada jarak sebenarnya.
$$\\text{Jarak Sebenarnya} = \\text{Jarak Peta} \\times \\text{Skala}$$`,
        keyPoints: ['1 kilometer = 1.000 meter = 100.000 centimeter.', 'Perbandingan senilai: jika satu bertambah, yang lain bertambah.'],
        examples: [{ title: 'Jarak Sebenarnya', explanation: 'Jarak di peta 3 cm dengan skala 1 : 200.000', codeOrFormula: 'Jarak Asli = 3 * 200.000 cm = 600.000 cm = 6 km' }],
        isCompleted: true,
        score: 88,
        quizId: 'quiz_sd_mat_04',
      },
      {
        id: 'chap_sd_mat_05',
        subjectId: 'subj_sd_matematika',
        chapterNumber: 5,
        title: 'Bangun Ruang Kubus & Balok',
        description: 'Menghitung volume, luas permukaan, jaring-jaring kubus, dan jumlah rusuk/titik sudut.',
        durationMinutes: 15,
        content: `### 📦 Volume Kubus dan Balok
- **Volume Kubus** = $s \\times s \\times s = s^3$
- **Volume Balok** = $p \\times l \\times t$`,
        keyPoints: ['Kubus memiliki 6 sisi persegi yang kongruen, 12 rusuk sama panjang, dan 8 titik sudut.', '1 liter = 1 dm^3 = 1.000 cm^3.'],
        examples: [{ title: 'Volume Kubus', explanation: 'Kubus dengan panjang rusuk 5 cm', codeOrFormula: 'V = 5 * 5 * 5 = 125 cm^3' }],
        isCompleted: false,
        quizId: 'quiz_sd_mat_05',
      },
      {
        id: 'chap_sd_mat_06',
        subjectId: 'subj_sd_matematika',
        chapterNumber: 6,
        title: 'Pengumpulan & Penyajian Data Diagram Batang',
        description: 'Membaca tabel frekuensi, diagram batang, piktogram, dan diagram lingkaran sederhana.',
        durationMinutes: 15,
        content: `### 📊 Membaca Diagram Batang
Diagram batang menggunakan tinggi batang untuk menunjukkan banyak frekuensi dari setiap kategori data.`,
        keyPoints: ['Sumbu mendatar biasanya berisi nama kategori, sumbu tegak berisi jumlah frekuensi.', 'Modus adalah data yang paling sering muncul.'],
        examples: [{ title: 'Menemukan Modus', explanation: 'Data nilai: 7, 8, 8, 9, 8. Modus = 8 (muncul 3 kali).' }],
        isCompleted: false,
        quizId: 'quiz_sd_mat_06',
      },
      {
        id: 'chap_sd_mat_07',
        subjectId: 'subj_sd_matematika',
        chapterNumber: 7,
        title: 'Satuan Kecepatan & Debit Air',
        description: 'Konversi km/jam ke m/detik, rumus kecepatan $v = s/t$, dan debit aliran pipa $Q = V/t$.',
        durationMinutes: 20,
        content: `### 🚗 Kecepatan dan Debit
Rumus Segitiga Kecepatan:
- Jarak ($s$) = Kecepatan ($v$) $\\times$ Waktu ($t$)
- Waktu ($t$) = Jarak ($s$) / Kecepatan ($v$)`,
        keyPoints: ['Debit adalah volume air yang mengalir dalam satu satuan waktu.', '1 m^3/detik = 1.000 liter/detik.'],
        examples: [{ title: 'Waktu Perjalanan', explanation: 'Jarak 120 km ditempuh dengan kecepatan 60 km/jam', codeOrFormula: 't = 120 / 60 = 2 jam' }],
        isCompleted: false,
        quizId: 'quiz_sd_mat_07',
      },
      {
        id: 'chap_sd_mat_08',
        subjectId: 'subj_sd_matematika',
        chapterNumber: 8,
        title: 'Tantangan Master Matematika Cilik',
        description: 'Soal cerita gabungan, teka-teki logika angka, dan persiapan asesmen kompetensi.',
        durationMinutes: 25,
        content: `### 🏆 Tantangan Juara Matematika
Latih keterampilan pemecahan masalah dengan langkah Polya:
1. Pahami apa yang diketahui dan ditanyakan
2. Rencanakan model matematikanya
3. Selesaikan perhitungannya
4. Periksa kembali jawabanmu!`,
        keyPoints: ['Teliti membaca satuan yang diminta pada soal cerita.', 'Tulis langkah pengerjaan secara rapi dan terstruktur.'],
        examples: [{ title: 'Soal Cerita Logika', explanation: 'Kombinasi belanja dan uang kembalian' }],
        isCompleted: false,
        quizId: 'quiz_sd_mat_08',
      },
    ],
  },

  // KULIAH - Informatika & AI
  {
    id: 'subj_kuliah_ai_ds',
    title: 'Machine Learning & Artificial Intelligence',
    code: 'CS-AI-401',
    educationLevel: 'KULIAH',
    grade: 'Semester 4',
    studyProgram: 'Teknik Informatika / Ilmu Komputer',
    category: 'Computer Science Core',
    iconName: 'Sparkles',
    themeColor: 'from-violet-600 to-fuchsia-600',
    accentColor: 'violet',
    description: 'Algoritma Supervised & Unsupervised Learning, Deep Neural Networks, Backpropagation, NLP, dan Computer Vision.',
    totalLessons: 8,
    completedLessons: 6,
    averageScore: 92,
    progressPercent: 75,
    isPublished: true,
    chapters: [
      {
        id: 'chap_ai_01',
        subjectId: 'subj_kuliah_ai_ds',
        chapterNumber: 1,
        title: 'Fondasi Linear Algebra & Gradient Descent',
        description: 'Vektor, matriks dot product, cost function MSE, turunan parsial, dan optimasi gradien.',
        durationMinutes: 40,
        content: `### 🧮 Matematika Machine Learning
Optimasi model supervised learning meminimalkan Loss Function $J(\\theta)$ menggunakan aturan pembaruan Gradient Descent:
$$\\theta_j := \\theta_j - \\alpha \\frac{\\partial}{\\partial \\theta_j} J(\\theta)$$
Di mana $\\alpha$ adalah Learning Rate.`,
        keyPoints: ['Learning rate yang terlalu besar menyebabkan model divergen.', 'Learning rate yang terlalu kecil membuat proses konvergensi sangat lambat.'],
        examples: [{ title: 'Pembaruan Bobot', explanation: 'Stochastic Gradient Descent update rule', codeOrFormula: 'w = w - learning_rate * grad_loss' }],
        isCompleted: true,
        score: 95,
        quizId: 'quiz_ai_01',
      },
      {
        id: 'chap_ai_02',
        subjectId: 'subj_kuliah_ai_ds',
        chapterNumber: 2,
        title: 'Regresi & Klasifikasi (Logistic Regression, SVM)',
        description: 'Fungsi Sigmoid, Cross-Entropy Loss, Margin Support Vector Machine, dan Kernel Trick.',
        durationMinutes: 35,
        content: `### 🎯 Logistic Regression & Fungsi Sigmoid
Fungsi Sigmoid memetakan output bilangan riil apa pun ke probabilitas rentang 0 hingga 1:
$$\\sigma(z) = \\frac{1}{1 + e^{-z}}$$`,
        keyPoints: ['Threshold standar klasifikasi biner adalah 0.5.', 'ROC-AUC mengevaluasi performa classifier pada berbagai threshold.'],
        examples: [{ title: 'Sigmoid Probability', explanation: 'z = 0 menghasilkan probabilitas 0.5', codeOrFormula: 'sigma(0) = 1 / (1 + 1) = 0.5' }],
        isCompleted: true,
        score: 90,
        quizId: 'quiz_ai_02',
      },
      {
        id: 'chap_ai_03',
        subjectId: 'subj_kuliah_ai_ds',
        chapterNumber: 3,
        title: 'Artificial Neural Networks & Backpropagation',
        description: 'Arsitektur perceptron multi-layer, fungsi aktivasi (ReLU, GELU, Softmax), dan algoritma chain rule backpropagation.',
        durationMinutes: 45,
        content: `### 🧠 Deep Neural Networks
Algoritma Backpropagation menghitung gradien kesalahan terhadap setiap bobot jaringan menggunakan aturan rantai kalkulus (Chain Rule) dari layer output kembali ke input.`,
        keyPoints: ['ReLU (Rectified Linear Unit) mencegah masalah Vanishing Gradient pada deep network.', 'Softmax digunakan pada layer terakhir untuk klasifikasi multi-kelas.'],
        examples: [{ title: 'ReLU Formula', explanation: 'f(x) = max(0, x)' }],
        isCompleted: true,
        score: 94,
        quizId: 'quiz_ai_03',
      },
      {
        id: 'chap_ai_04',
        subjectId: 'subj_kuliah_ai_ds',
        chapterNumber: 4,
        title: 'Convolutional Neural Networks (CNN) & Computer Vision',
        description: 'Filter konvolusi, feature maps, pooling layers, ResNet skip connections, dan deteksi objek.',
        durationMinutes: 40,
        content: `### 👁️ CNN untuk Pengolahan Citra
Operasi konvolusi 2D mengekstrak fitur spasial lokal seperti tepi, tekstur, sudut hingga pola objek visual kompleks.`,
        keyPoints: ['Max Pooling mereduksi dimensi spasial sembari mempertahankan fitur paling dominan.', 'Residual connections (ResNet) memungkinkan training jaringan hingga ratusan layer tanpa degradasi.'],
        examples: [{ title: 'Ukuran Output Konvolusi', explanation: 'Menghitung dimensi spasial output', codeOrFormula: 'Output Size = ((Input - Kernel + 2*Padding) / Stride) + 1' }],
        isCompleted: true,
        score: 92,
        quizId: 'quiz_ai_04',
      },
      {
        id: 'chap_ai_05',
        subjectId: 'subj_kuliah_ai_ds',
        chapterNumber: 5,
        title: 'Natural Language Processing & Transformer Architecture',
        description: 'Tokenisasi, word embeddings, mekanisme Self-Attention, arsitektur encoder-decoder Transformer, dan LLM.',
        durationMinutes: 45,
        content: `### 📖 Arsitektur Transformer & Self-Attention
Mekanisme Scaled Dot-Product Attention:
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$
Memungkinkan model menghubungkan konteks antar kata terlepas dari jarak posisinya dalam kalimat.`,
        keyPoints: ['Transformer menggantikan model recurrent (RNN/LSTM) dengan komputasi paralel masif.', 'Positional Encoding menyuntikkan informasi urutan kata ke dalam vektor embedding.'],
        examples: [{ title: 'Attention Formula', explanation: 'Query, Key, Value interaction' }],
        isCompleted: true,
        score: 96,
        quizId: 'quiz_ai_05',
      },
      {
        id: 'chap_ai_06',
        subjectId: 'subj_kuliah_ai_ds',
        chapterNumber: 6,
        title: 'Evaluasi Model, Overfitting & Regularisasi',
        description: 'Confusion Matrix, Precision, Recall, F1-Score, K-Fold Cross Validation, Dropout, dan L1/L2 Weight Decay.',
        durationMinutes: 30,
        content: `### ⚖️ Bias-Variance Tradeoff
- **Underfitting (High Bias)**: Model terlalu sederhana untuk menangkap pola data.
- **Overfitting (High Variance)**: Model menghafal noise data latih sehingga gagal generalisasi pada data uji.`,
        keyPoints: ['Dropout menonaktifkan neuron secara acak selama training untuk mencegah ko-adaptasi bobot.', 'F1-Score adalah rata-rata harmonik dari Precision dan Recall.'],
        examples: [{ title: 'Rumus F1-Score', explanation: 'Metrik seimbang untuk dataset tidak seimbang', codeOrFormula: 'F1 = 2 * (Precision * Recall) / (Precision + Recall)' }],
        isCompleted: true,
        score: 88,
        quizId: 'quiz_ai_06',
      },
      {
        id: 'chap_ai_07',
        subjectId: 'subj_kuliah_ai_ds',
        chapterNumber: 7,
        title: 'Reinforcement Learning & Q-Learning',
        description: 'Markov Decision Process (MDP), Bellman Equation, eksplorasi vs eksploitasi (epsilon-greedy), dan Deep Q-Networks (DQN).',
        durationMinutes: 40,
        content: `### 🎮 Reinforcement Learning
Agen belajar memaksimalkan reward kumulatif jangka panjang melalui interaksi terus-menerus dengan lingkungan (Environment).`,
        keyPoints: ['Discount factor gamma (0 < gamma < 1) menentukan seberapa penting reward di masa depan.', 'Bellman Optimality Equation menjadi dasar algoritma Value Iteration.'],
        examples: [{ title: 'Persamaan Bellman', explanation: 'Q(s, a) = R + gamma * max Q(s\', a\')' }],
        isCompleted: false,
        quizId: 'quiz_ai_07',
      },
      {
        id: 'chap_ai_08',
        subjectId: 'subj_kuliah_ai_ds',
        chapterNumber: 8,
        title: 'Etika AI, Bias Algoritmik & MLOps Deployment',
        description: 'Fairness in AI, pipeline MLOps, containerization model dengan FastAPI/ONNX, dan continuous monitoring data drift.',
        durationMinutes: 35,
        content: `### 🚀 MLOps & Etika AI
Model AI yang diproduksi membutuhkan pemantauan berkala terhadap Data Drift dan Concept Drift untuk memastikan akurasi tetap terjaga di dunia nyata.`,
        keyPoints: ['Transparansi dan mitigasi bias data latih adalah tanggung jawab mutlak engineer AI.', 'Gunakan model quantization untuk efisiensi inferensi di perangkat edge/mobile.'],
        examples: [{ title: 'FastAPI Model Inference Endpoint', explanation: 'Menyajikan prediksi model via REST API', codeOrFormula: '@app.post("/predict")\ndef predict(features: ModelInput):\n    return {"prediction": model.predict([features.data])}' }],
        isCompleted: false,
        quizId: 'quiz_ai_08',
      },
    ],
  },
];

// Seed Quizzes with full Questions Bank
export const SEED_QUIZZES: Quiz[] = [
  {
    id: 'quiz_rpl_01',
    title: 'Kuis Bab 1: Arsitektur Web & DOM Interaktif',
    subjectId: 'subj_smk_rpl_web',
    chapterId: 'chap_rpl_01',
    subjectTitle: 'Pemrograman Web & Bergerak',
    durationSeconds: 180,
    passingScore: 70,
    totalLives: 5,
    bonusPoints: 250,
    questions: [
      {
        id: 'q_rpl_1_1',
        questionText: 'Tahapan apa di browser yang bertugas menghitung ukuran dan koordinat posisi eksak setiap elemen piksel pada layar?',
        options: ['DOM Parsing', 'CSSOM Tree', 'Layout / Reflow', 'Compositing'],
        correctAnswerIndex: 2,
        explanation: 'Tahap Layout (atau Reflow) menghitung geometri, ukuran, dan koordinat posisi eksak setiap node sebelum masuk ke tahap Painting.',
        points: 100,
        difficulty: 'Sedang',
      },
      {
        id: 'q_rpl_1_2',
        questionText: 'Manakah cara yang paling tepat dan hemat memori untuk menangani event klik pada 100 item dinamis di dalam sebuah list?',
        options: ['Memasang addEventListener pada setiap 100 elemen satu per satu', 'Menggunakan Event Delegation pada elemen induk (parent)', 'Membuat variabel global untuk setiap elemen', 'Menggunakan event handler onclick di dalam tag HTML string'],
        correctAnswerIndex: 1,
        explanation: 'Event Delegation memanfaatkan Event Bubbling untuk mendengarkan event pada satu elemen induk (parent), sangat menghemat memori.',
        points: 100,
        difficulty: 'Mudah',
      },
      {
        id: 'q_rpl_1_3',
        questionText: 'Dalam JavaScript modern, keyword apa yang digunakan untuk menunggu selesainya eksekusi sebuah Promise tanpa memblokir thread utama?',
        options: ['wait', 'defer', 'await', 'pause'],
        correctAnswerIndex: 2,
        explanation: 'Keyword `await` digunakan di dalam fungsi `async` untuk menunggu hasil Promise secara non-blocking.',
        points: 100,
        difficulty: 'Mudah',
      },
      {
        id: 'q_rpl_1_4',
        questionText: 'Tag semantic HTML5 manakah yang paling tepat digunakan untuk membungkus navigasi utama sebuah website?',
        options: ['<section>', '<nav>', '<aside>', '<menu>'],
        correctAnswerIndex: 1,
        explanation: 'Tag `<nav>` dikhususkan untuk elemen navigasi utama agar mudah diindeks oleh mesin pencari dan screen reader.',
        points: 100,
        difficulty: 'Mudah',
      },
      {
        id: 'q_rpl_1_5',
        questionText: 'Apa keuntungan utama menggunakan TypeScript dibandingkan JavaScript standar dalam proyek skala besar?',
        options: ['Kecepatan rendering browser menjadi 10x lebih cepat secara otomatis', 'Static type-checking saat kompilasi untuk mencegah bug tipe data saat runtime', 'Tidak memerlukan CSS lagi untuk styling', 'Ukuran file bundel menjadi 0 kb'],
        correctAnswerIndex: 1,
        explanation: 'TypeScript memberikan static typing sehingga bug dan kesalahan struktur data dapat dideteksi sebelum kode dijalankan di browser.',
        points: 100,
        difficulty: 'Sedang',
      },
    ],
  },
  {
    id: 'quiz_mat_01',
    title: 'Kuis Bab 1: Limit Fungsi Trigonometri',
    subjectId: 'subj_sma_matematika',
    chapterId: 'chap_mat_01',
    subjectTitle: 'Matematika Peminatan & Lanjut',
    durationSeconds: 180,
    passingScore: 70,
    totalLives: 5,
    bonusPoints: 250,
    questions: [
      {
        id: 'q_mat_1_1',
        questionText: 'Berapakah nilai dari lim (x -> 0) [ sin(6x) / (3x) ] ?',
        options: ['1', '2', '3', '0.5'],
        correctAnswerIndex: 1,
        explanation: 'Sesuai sifat dasar limit trigonometri lim (x->0) sin(ax)/(bx) = a/b. Jadi 6 / 3 = 2.',
        points: 100,
        difficulty: 'Mudah',
      },
      {
        id: 'q_mat_1_2',
        questionText: 'Berapakah nilai dari lim (x -> 0) [ (1 - cos(2x)) / (x^2) ] ?',
        options: ['1', '2', '4', '0'],
        correctAnswerIndex: 1,
        explanation: 'Ingat identitas 1 - cos(2x) = 2 sin^2(x). Maka limit menjadi lim (x->0) [ 2 * sin(x)*sin(x) / (x*x) ] = 2 * 1 * 1 = 2.',
        points: 100,
        difficulty: 'Sedang',
      },
      {
        id: 'q_mat_1_3',
        questionText: 'Berapakah nilai dari lim (x -> tak hingga) [ (4x^2 + 3x) / (2x^2 - 5) ] ?',
        options: ['Tak Hingga', '0', '2', '4'],
        correctAnswerIndex: 2,
        explanation: 'Bagi pembilang dan penyebut dengan pangkat tertinggi x^2. Koefisien tertinggi pembilang adalah 4 dan penyebut 2, sehingga 4/2 = 2.',
        points: 100,
        difficulty: 'Mudah',
      },
      {
        id: 'q_mat_1_4',
        questionText: 'Berapakah nilai dari lim (x -> 0) [ tan(8x) / sin(2x) ] ?',
        options: ['16', '4', '8', '2'],
        correctAnswerIndex: 1,
        explanation: 'lim (x->0) tan(8x)/sin(2x) = 8/2 = 4.',
        points: 100,
        difficulty: 'Mudah',
      },
      {
        id: 'q_mat_1_5',
        questionText: 'Jika f(x) = (x^2 - 9) / (x - 3), berapakah nilai limit f(x) saat x mendekati 3?',
        options: ['0', '3', '6', 'Tak Terdefinisi'],
        correctAnswerIndex: 2,
        explanation: 'Faktorkan pembilang: (x-3)(x+3)/(x-3) = x+3. Substitusi x = 3 menghasilkan 3 + 3 = 6.',
        points: 100,
        difficulty: 'Mudah',
      },
    ],
  },
  {
    id: 'quiz_sd_mat_01',
    title: 'Kuis Seru: Pecahan Ceria Bersama Aurel',
    subjectId: 'subj_sd_matematika',
    chapterId: 'chap_sd_mat_01',
    subjectTitle: 'Matematika Dasar & Pecahan',
    durationSeconds: 120,
    passingScore: 60,
    totalLives: 5,
    bonusPoints: 200,
    questions: [
      {
        id: 'q_sd_1',
        questionText: 'Berapakah hasil dari 1/4 + 2/4 ?',
        options: ['3/4', '3/8', '2/4', '1/2'],
        correctAnswerIndex: 0,
        explanation: 'Karena penyebutnya sudah sama (4), kita cukup menjumlahkan pembilangnya: 1 + 2 = 3. Jadi jawabannya 3/4!',
        points: 100,
        difficulty: 'Mudah',
      },
      {
        id: 'q_sd_2',
        questionText: 'Berapa hasil dari 1/2 + 1/3 ?',
        options: ['2/5', '5/6', '1/6', '3/6'],
        correctAnswerIndex: 1,
        explanation: 'KPK dari 2 dan 3 adalah 6. 1/2 = 3/6 dan 1/3 = 2/6. Jumlahnya adalah 3/6 + 2/6 = 5/6.',
        points: 100,
        difficulty: 'Sedang',
      },
      {
        id: 'q_sd_3',
        questionText: 'Bentuk paling sederhana dari pecahan 8/12 adalah...',
        options: ['4/6', '2/3', '1/3', '3/4'],
        correctAnswerIndex: 1,
        explanation: 'Bagi pembilang dan penyebut dengan FPB-nya yaitu 4: 8:4 = 2 dan 12:4 = 3, menghasilkan 2/3.',
        points: 100,
        difficulty: 'Mudah',
      },
      {
        id: 'q_sd_4',
        questionText: 'Ibu memiliki 1 loyang kue bolu. Dibagikan ke adik 1/4 bagian dan ke kakak 2/4 bagian. Berapa sisa kue bolu ibu?',
        options: ['1/4 bagian', '2/4 bagian', '3/4 bagian', 'Habis'],
        correctAnswerIndex: 0,
        explanation: 'Total dibagikan = 1/4 + 2/4 = 3/4. Sisa kue = 1 - 3/4 = 4/4 - 3/4 = 1/4 bagian.',
        points: 100,
        difficulty: 'Sedang',
      },
      {
        id: 'q_sd_5',
        questionText: 'Pecahan 3/5 jika diubah ke bentuk desimal adalah...',
        options: ['0.3', '0.5', '0.6', '0.35'],
        correctAnswerIndex: 2,
        explanation: '3 dibagi 5 = 0.6 (atau 3/5 = 6/10 = 0.6).',
        points: 100,
        difficulty: 'Mudah',
      },
    ],
  },
  {
    id: 'quiz_ai_01',
    title: 'Kuis Bab 1: Linear Algebra & Gradient Descent',
    subjectId: 'subj_kuliah_ai_ds',
    chapterId: 'chap_ai_01',
    subjectTitle: 'Machine Learning & Artificial Intelligence',
    durationSeconds: 200,
    passingScore: 70,
    totalLives: 5,
    bonusPoints: 300,
    questions: [
      {
        id: 'q_ai_1_1',
        questionText: 'Apa yang terjadi pada proses training Machine Learning jika Learning Rate (alpha) disetel terlalu besar?',
        options: ['Model langsung mencapai global minimum dalam 1 iterasi', 'Algoritma dapat overshoot (melewati minimum) dan menjadi divergen / tidak stabil', 'Waktu training menjadi lambat tak terhingga', 'Parameter bobot otomatis bernilai 0'],
        correctAnswerIndex: 1,
        explanation: 'Learning rate yang terlalu besar menyebabkan langkah gradient descent melompat melewati lembah konveksitas sehingga nilai loss meledak (diverge).',
        points: 100,
        difficulty: 'Sedang',
      },
      {
        id: 'q_ai_1_2',
        questionText: 'Dalam operasi matriks, jika matriks A berukuran 3x4 dan matriks B berukuran 4x2, berapakah dimensi matriks hasil perkalian dot A * B?',
        options: ['3 x 2', '4 x 4', '3 x 4', 'Tidak dapat dikalikan'],
        correctAnswerIndex: 0,
        explanation: 'Perkalian matriks (m x k) dengan (k x n) menghasilkan matriks berukuran (m x n), yaitu 3 x 2.',
        points: 100,
        difficulty: 'Mudah',
      },
      {
        id: 'q_ai_1_3',
        questionText: 'Fungsi aktivasi manakah yang memetakan nilai input z ke rentang probabilitas [0, 1] dan sangat sering digunakan pada klasifikasi biner?',
        options: ['ReLU', 'Sigmoid', 'Tanh', 'Leaky ReLU'],
        correctAnswerIndex: 1,
        explanation: 'Fungsi Sigmoid f(z) = 1 / (1 + e^-z) memiliki kurva S dengan rentang output eksak antara 0 dan 1.',
        points: 100,
        difficulty: 'Mudah',
      },
      {
        id: 'q_ai_1_4',
        questionText: 'Manakah metrik evaluasi yang paling tepat digunakan ketika dataset memiliki kelas yang sangat tidak seimbang (imbalanced dataset)?',
        options: ['Accuracy murni', 'F1-Score / PR-AUC', 'Mean Squared Error', 'R-Squared'],
        correctAnswerIndex: 1,
        explanation: 'F1-Score memperhitungkan harmoni Precision dan Recall sehingga tidak tertipu oleh tingginya akurasi pada kelas mayoritas.',
        points: 100,
        difficulty: 'Sedang',
      },
      {
        id: 'q_ai_1_5',
        questionText: 'Apa fungsi utama teknik Dropout dalam pelatihan Deep Neural Network?',
        options: ['Mempercepat koneksi internet server', 'Mencegah Overfitting dengan menonaktifkan neuron acak selama masa training', 'Menghilangkan data uji yang salah', 'Mengubah jaringan neural menjadi Decision Tree'],
        correctAnswerIndex: 1,
        explanation: 'Dropout secara acak mematikan persentase neuron selama forward-backward pass untuk memecah ko-dependensi berlebih antar neuron.',
        points: 100,
        difficulty: 'Sedang',
      },
    ],
  },
];

// Seed Rewards Catalog
export const SEED_REWARDS: Reward[] = [
  {
    id: 'rew_gopay_50',
    title: 'Saldo GoPay Rp50.000',
    category: 'E-Wallet',
    requiredPoints: 10000,
    description: 'Voucher saldo digital GoPay langsung masuk ke nomor handphone akun terdaftar dalam 1x24 jam kerja.',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80',
    badge: 'Paling Populer',
    provider: 'GoPay Indonesia',
  },
  {
    id: 'rew_dana_100',
    title: 'Saldo DANA Rp100.000',
    category: 'E-Wallet',
    requiredPoints: 18000,
    description: 'Voucher saldo digital DANA untuk kebutuhan belajar, buku, dan kuota internet sekolah.',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=300&auto=format&fit=crop&q=80',
    badge: 'Super Reward',
    provider: 'DANA Indonesia',
  },
  {
    id: 'rew_aurel_vip',
    title: 'Aurelia Pro VIP 1 Bulan',
    category: 'Langganan',
    requiredPoints: 5000,
    description: 'Akses tanpa batas ke seluruh bank soal UTBK/SNBT, pembahasan video eksklusif, dan tutor pintar Aurel 24/7.',
    stock: 999,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&auto=format&fit=crop&q=80',
    badge: 'Best Value',
    provider: 'Aurelia Edu Official',
  },
  {
    id: 'rew_tryout_nasional',
    title: 'Voucher Try Out Akbar Nasional',
    category: 'Voucher',
    requiredPoints: 7500,
    description: 'Tiket Try Out serentak nasional dengan sistem IRT (Item Response Theory) dan perangkingan real-time.',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&auto=format&fit=crop&q=80',
    badge: 'Persiapan Ujian',
    provider: 'Aurelia Edu Assessment',
  },
  {
    id: 'rew_merch_hoodie',
    title: 'Hoodie Eksklusif Aurelia Edu',
    category: 'Merchandise',
    requiredPoints: 25000,
    description: 'Hoodie premium cotton fleece edisi terbatas dengan bordir 3D maskot Aurel & nama siswa.',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&auto=format&fit=crop&q=80',
    badge: 'Limited Edition',
    provider: 'Aurelia Merch Studio',
  },
  {
    id: 'rew_ebook_pack',
    title: 'Paket E-Book Master Sains & Koding',
    category: 'E-Book',
    requiredPoints: 6000,
    description: 'Kumpulan 10 E-book komprehensif rumus praktis, ringkasan materi, dan studi kasus pemrograman.',
    stock: 500,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80',
    badge: 'Instant Download',
    provider: 'Aurelia Publishing',
  },
];

// Seed Point Transactions
const SEED_TRANSACTIONS: PointTransaction[] = [
  {
    id: 'tx_01',
    userId: 'user_david',
    type: 'EARNED',
    amount: 500,
    source: 'Kuis Pemrograman Web Bab 1',
    description: 'Menyelesaikan kuis dengan nilai sempurna (100) dan bonus speed',
    createdAt: '2026-09-23T06:30:00.000Z',
    balanceAfter: 12850,
  },
  {
    id: 'tx_02',
    userId: 'user_david',
    type: 'BONUS',
    amount: 350,
    source: 'Streak Belajar 7 Hari Berturut-turut',
    description: 'Bonus konsistensi belajar harian',
    createdAt: '2026-09-22T07:10:00.000Z',
    balanceAfter: 12350,
  },
  {
    id: 'tx_03',
    userId: 'user_david',
    type: 'EARNED',
    amount: 400,
    source: 'Speed Math Challenge Game',
    description: 'Meraih skor 1.450 poin dalam tantangan hitung cepat',
    createdAt: '2026-09-21T14:20:00.000Z',
    balanceAfter: 12000,
  },
  {
    id: 'tx_04',
    userId: 'user_david',
    type: 'EARNED',
    amount: 500,
    source: 'Kuis Basis Data Bab 2',
    description: 'Menyelesaikan kuis relasional database',
    createdAt: '2026-09-20T10:15:00.000Z',
    balanceAfter: 11600,
  },
];

// Seed Notifications
const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_01',
    userId: 'user_david',
    title: 'Kuis Selesai! +500 Poin',
    message: 'Selamat! Kamu berhasil menyelesaikan Kuis Pemrograman Web dengan akurasi 100%.',
    type: 'QUIZ',
    isRead: false,
    createdAt: '2026-09-23T06:30:00.000Z',
    linkUrl: '/history',
  },
  {
    id: 'notif_02',
    userId: 'user_david',
    title: 'Peti Reward 3D Terbuka! 🎁',
    message: 'Poin kamu telah menembus 10.000! Kamu sekarang bisa membuka Kotak Hadiah Gamebox di menu Reward.',
    type: 'REWARD',
    isRead: false,
    createdAt: '2026-09-22T12:00:00.000Z',
    linkUrl: '/rewards',
  },
  {
    id: 'notif_03',
    userId: 'user_david',
    title: 'Naik ke Peringkat #24 Nasional 🏆',
    message: 'Hebat! Konsistensi belajarmu mendorongmu masuk ke jajaran 30 besar SMK Nasional.',
    type: 'RANKING',
    isRead: true,
    createdAt: '2026-09-21T18:00:00.000Z',
    linkUrl: '/ranking',
  },
  {
    id: 'notif_04',
    userId: 'user_david',
    title: 'Materi Baru Tersedia ✨',
    message: 'Bab 8: Integrasi AI & Cloud Services telah diterbitkan untuk jurusan RPL.',
    type: 'SYSTEM',
    isRead: true,
    createdAt: '2026-09-20T09:00:00.000Z',
    linkUrl: '/subjects',
  },
];

// Seed Leaderboard
const SEED_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    userId: 'user_citra',
    fullName: 'Citra Lestari',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    educationLevel: 'KULIAH',
    schoolOrUniv: 'Institut Teknologi Bandung',
    points: 15200,
    weeklyPoints: 2450,
    monthlyPoints: 8900,
    streakDays: 21,
    badge: '👑 Grand Master',
  },
  {
    rank: 2,
    userId: 'user_fauzan',
    fullName: 'Fauzan Akbar',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    educationLevel: 'SMA',
    schoolOrUniv: 'SMA Taruna Nusantara',
    points: 14600,
    weeklyPoints: 2100,
    monthlyPoints: 7800,
    streakDays: 19,
    badge: '🥈 Master Sains',
  },
  {
    rank: 3,
    userId: 'user_nadhira',
    fullName: 'Nadhira Shafa',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    educationLevel: 'SMA',
    schoolOrUniv: 'SMAN 8 Jakarta',
    points: 13900,
    weeklyPoints: 1950,
    monthlyPoints: 7200,
    streakDays: 15,
    badge: '🥉 Cendekia Emas',
  },
  {
    rank: 24,
    userId: 'user_david',
    fullName: 'David Pratama',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    educationLevel: 'SMK',
    schoolOrUniv: 'SMKN 1 Jakarta',
    points: 12850,
    weeklyPoints: 1750,
    monthlyPoints: 6400,
    streakDays: 7,
    badge: '⭐ Bintang RPL',
  },
  {
    rank: 35,
    userId: 'user_maya',
    fullName: 'Maya Andini',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    educationLevel: 'SMA',
    schoolOrUniv: 'SMAN 3 Bandung',
    points: 9450,
    weeklyPoints: 1400,
    monthlyPoints: 4900,
    streakDays: 14,
    badge: '🚀 Penjelajah Sains',
  },
  {
    rank: 78,
    userId: 'user_budi',
    fullName: 'Budi Santoso',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    educationLevel: 'SD',
    schoolOrUniv: 'SDN Menteng 01',
    points: 3200,
    weeklyPoints: 850,
    monthlyPoints: 2100,
    streakDays: 4,
    badge: '🌱 Tunas Muda',
  },
];

// Seed Support Tickets
const SEED_TICKETS: SupportTicket[] = [
  {
    id: 'tkt_01',
    userId: 'user_david',
    userName: 'David Pratama',
    userEmail: 'david@aurelia.edu',
    category: 'Rewards & Hadiah',
    subject: 'Konfirmasi Penukaran Saldo GoPay',
    message: 'Halo tim Aurelia, saya sudah mencapai 10.000 poin dan ingin menanyakan apakah penukaran GoPay membutuhkan waktu berapa lama?',
    status: 'RESOLVED',
    priority: 'MEDIUM',
    createdAt: '2026-09-22T08:30:00.000Z',
    replies: [
      {
        sender: 'David Pratama',
        isAdmin: false,
        message: 'Halo tim Aurelia, saya sudah mencapai 10.000 poin dan ingin menanyakan apakah penukaran GoPay membutuhkan waktu berapa lama?',
        createdAt: '2026-09-22T08:30:00.000Z',
      },
      {
        sender: 'Aurel Support Specialist',
        isAdmin: true,
        message: 'Halo David! Penukaran reward saldo GoPay diproses secara otomatis maksimal dalam 1x24 jam kerja ke nomor ponsel yang terdaftar di akunmu. Selamat atas pencapaian 10.000 poinmu!',
        createdAt: '2026-09-22T09:15:00.000Z',
      },
    ],
  },
];

// Seed Mini-Games
export const SEED_GAMES: GameItem[] = [
  {
    id: 'game_speed_math',
    title: 'Speed Math Arena',
    category: 'Matematika & Logika',
    difficulty: 'Sedang',
    description: 'Jawab sebanyak mungkin soal aritmatika kilat dalam 30 detik untuk melipatgandakan combo skor!',
    rewardPoints: 300,
    highScore: 1450,
    playCount: 124,
    iconName: 'Calculator',
    bgGradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'game_word_master',
    title: 'Word & Vocab Challenge',
    category: 'Bahasa & Literasi',
    difficulty: 'Mudah',
    description: 'Susun kata acak dan temukan sinonim/antonim kosakata Bahasa Indonesia & Inggris berstandar UTBK.',
    rewardPoints: 250,
    highScore: 980,
    playCount: 89,
    iconName: 'Book',
    bgGradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'game_memory_matrix',
    title: 'Memory Science Match',
    category: 'Sains & Ingatan',
    difficulty: 'Sedang',
    description: 'Buka dan cocokkan pasangan kartu rumus fisika, unsur kimia, dan simbol matematika sebelum waktu habis.',
    rewardPoints: 350,
    highScore: 1200,
    playCount: 65,
    iconName: 'Sparkles',
    bgGradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 'game_code_trivia',
    title: 'Tech & AI Code Sprint',
    category: 'Teknologi & Koding',
    difficulty: 'Tantangan',
    description: 'Tebak output kode pemrograman, algoritma dasar, dan konsep Artificial Intelligence modern!',
    rewardPoints: 450,
    highScore: 1850,
    playCount: 142,
    iconName: 'Laptop',
    bgGradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'game_daily_quest',
    title: 'Aurel Daily Quest',
    category: 'Misi Harian',
    difficulty: 'Sedang',
    description: 'Misi harian 5 soal acak lintas mata pelajaran untuk mempertahankan streak belajar dan multiplier poin.',
    rewardPoints: 500,
    highScore: 500,
    playCount: 310,
    iconName: 'Trophy',
    bgGradient: 'from-sky-500 to-blue-700',
  },
];

// Seed Audit Logs
const SEED_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit_01',
    adminId: 'user_admin',
    adminName: 'Administrator Aurelia Edu',
    action: 'SUBJECT_PUBLISH',
    target: 'SMK-RPL-01',
    details: 'Menerbitkan Bab 8: Integrasi AI & Cloud Services ke kurikulum aktif',
    ipAddress: '192.168.1.100',
    createdAt: '2026-09-20T09:00:00.000Z',
  },
  {
    id: 'audit_02',
    adminId: 'user_admin',
    adminName: 'Administrator Aurelia Edu',
    action: 'REWARD_STOCK_UPDATE',
    target: 'rew_gopay_50',
    details: 'Menambahkan 50 kuota voucher GoPay Rp50.000',
    ipAddress: '192.168.1.100',
    createdAt: '2026-09-18T14:30:00.000Z',
  },
];

// Master Storage Helper
class MasterStorage {
  private isClient = typeof window !== 'undefined';

  constructor() {
    this.initSeedData();
  }

  private initSeedData() {
    if (!this.isClient) return;

    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, 'user_david');
    }
    if (!localStorage.getItem(STORAGE_KEYS.SUBJECTS)) {
      localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(SEED_SUBJECTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) {
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(SEED_QUIZZES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REWARDS)) {
      localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(SEED_REWARDS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(SEED_TRANSACTIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LEADERBOARD)) {
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(SEED_LEADERBOARD));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TICKETS)) {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(SEED_TICKETS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(SEED_AUDIT_LOGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.GAMES)) {
      localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(SEED_GAMES));
    }
  }

  // Users
  public getUsers(): User[] {
    if (!this.isClient) return SEED_USERS;
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    return raw ? JSON.parse(raw) : SEED_USERS;
  }

  public saveUsers(users: User[]) {
    if (!this.isClient) return;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  public getCurrentUserId(): string {
    if (!this.isClient) return 'user_david';
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) || 'user_david';
  }

  public setCurrentUserId(id: string) {
    if (!this.isClient) return;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, id);
  }

  public getCurrentUser(): User | null {
    const users = this.getUsers();
    const currentId = this.getCurrentUserId();
    return users.find(u => u.id === currentId) || users[0] || null;
  }

  public updateUser(updated: User) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === updated.id);
    if (index !== -1) {
      users[index] = { ...updated, updatedAt: new Date().toISOString() };
      this.saveUsers(users);
    }
  }

  // Subjects
  public getSubjects(): Subject[] {
    if (!this.isClient) return SEED_SUBJECTS;
    const raw = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    return raw ? JSON.parse(raw) : SEED_SUBJECTS;
  }

  public saveSubjects(subjects: Subject[]) {
    if (!this.isClient) return;
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  }

  // Quizzes
  public getQuizzes(): Quiz[] {
    if (!this.isClient) return SEED_QUIZZES;
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    return raw ? JSON.parse(raw) : SEED_QUIZZES;
  }

  public getQuizById(id: string): Quiz | null {
    const quizzes = this.getQuizzes();
    return quizzes.find((q) => q.id === id) || null;
  }

  public saveQuizzes(quizzes: Quiz[]) {
    if (!this.isClient) return;
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
  }

  // Games
  public getGames(): GameItem[] {
    if (!this.isClient) return SEED_GAMES;
    const raw = localStorage.getItem(STORAGE_KEYS.GAMES);
    return raw ? JSON.parse(raw) : SEED_GAMES;
  }

  public saveGames(games: GameItem[]) {
    if (!this.isClient) return;
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
  }

  // Quiz Attempts
  public getQuizAttempts(): QuizAttempt[] {
    if (!this.isClient) return [];
    const raw = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    return raw ? JSON.parse(raw) : [];
  }

  public saveQuizAttempt(attempt: QuizAttempt) {
    if (!this.isClient) return;
    const attempts = this.getQuizAttempts();
    attempts.unshift(attempt);
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
  }

  // Rewards
  public getRewards(): Reward[] {
    if (!this.isClient) return SEED_REWARDS;
    const raw = localStorage.getItem(STORAGE_KEYS.REWARDS);
    return raw ? JSON.parse(raw) : SEED_REWARDS;
  }

  public saveRewards(rewards: Reward[]) {
    if (!this.isClient) return;
    localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(rewards));
  }

  // Redemptions
  public getRedemptions(): RewardRedemption[] {
    if (!this.isClient) return [];
    const raw = localStorage.getItem(STORAGE_KEYS.REDEMPTIONS);
    return raw ? JSON.parse(raw) : [];
  }

  public saveRedemption(redemption: RewardRedemption) {
    if (!this.isClient) return;
    const redemptions = this.getRedemptions();
    redemptions.unshift(redemption);
    localStorage.setItem(STORAGE_KEYS.REDEMPTIONS, JSON.stringify(redemptions));
  }

  // Point Transactions
  public getTransactions(): PointTransaction[] {
    if (!this.isClient) return SEED_TRANSACTIONS;
    const raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return raw ? JSON.parse(raw) : SEED_TRANSACTIONS;
  }

  public saveTransaction(tx: PointTransaction) {
    if (!this.isClient) return;
    const list = this.getTransactions();
    list.unshift(tx);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(list));
  }

  // Notifications
  public getNotifications(): AppNotification[] {
    if (!this.isClient) return SEED_NOTIFICATIONS;
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return raw ? JSON.parse(raw) : SEED_NOTIFICATIONS;
  }

  public saveNotifications(notifs: AppNotification[]) {
    if (!this.isClient) return;
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  }

  public addNotification(notif: Omit<AppNotification, 'id' | 'createdAt'>) {
    const list = this.getNotifications();
    const newNotif: AppNotification = {
      ...notif,
      id: 'notif_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
      createdAt: new Date().toISOString(),
    };
    list.unshift(newNotif);
    this.saveNotifications(list);
  }

  // Leaderboard
  public getLeaderboard(): LeaderboardUser[] {
    if (!this.isClient) return SEED_LEADERBOARD;
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    return raw ? JSON.parse(raw) : SEED_LEADERBOARD;
  }

  public saveLeaderboard(users: LeaderboardUser[]) {
    if (!this.isClient) return;
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(users));
  }

  // Support Tickets
  public getTickets(): SupportTicket[] {
    if (!this.isClient) return SEED_TICKETS;
    const raw = localStorage.getItem(STORAGE_KEYS.TICKETS);
    return raw ? JSON.parse(raw) : SEED_TICKETS;
  }

  public saveTickets(tickets: SupportTicket[]) {
    if (!this.isClient) return;
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  }

  // Audit Logs
  public getAuditLogs(): AuditLog[] {
    if (!this.isClient) return SEED_AUDIT_LOGS;
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    return raw ? JSON.parse(raw) : SEED_AUDIT_LOGS;
  }

  public addAuditLog(log: Omit<AuditLog, 'id' | 'createdAt'>) {
    if (!this.isClient) return;
    const logs = this.getAuditLogs();
    logs.unshift({
      ...log,
      id: 'audit_' + Date.now(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));
  }

  // Security Events (Anti-Cheat)
  public getSecurityEvents(): SecurityEvent[] {
    if (!this.isClient) return [];
    const raw = localStorage.getItem(STORAGE_KEYS.SECURITY_EVENTS);
    return raw ? JSON.parse(raw) : [];
  }

  public addSecurityEvent(event: Omit<SecurityEvent, 'id' | 'createdAt'>) {
    if (!this.isClient) return;
    const events = this.getSecurityEvents();
    events.unshift({
      ...event,
      id: 'sec_' + Date.now(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.SECURITY_EVENTS, JSON.stringify(events));
  }

  // Reset demo
  public resetToFactory() {
    if (!this.isClient) return;
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    localStorage.removeItem(STORAGE_KEYS.SUBJECTS);
    localStorage.removeItem(STORAGE_KEYS.QUIZZES);
    localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.REWARDS);
    localStorage.removeItem(STORAGE_KEYS.REDEMPTIONS);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.LEADERBOARD);
    localStorage.removeItem(STORAGE_KEYS.TICKETS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    localStorage.removeItem(STORAGE_KEYS.SECURITY_EVENTS);
    localStorage.removeItem(STORAGE_KEYS.GAMES);
    this.initSeedData();
  }
}

export const db = new MasterStorage();
