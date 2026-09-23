# Aurelia Edu - Platform Gamifikasi Edukasi Indonesia

Aurelia Edu adalah platform gamifikasi edukasi interaktif untuk siswa SD, SMP, SMA, dan Mahasiswa di Indonesia, dilengkapi dengan kuis berhadiah poin, leaderboard nasional, maskot Aurel, gacha peti hadiah 3D, dan penukaran reward digital.

---

## 🚀 Menjalankan Proyek Secara Lokal

1. **Instal dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

3. **Build untuk produksi:**
   ```bash
   npm run build
   ```

---

## ⚡ Deployment ke Vercel

Proyek ini sudah dilengkapi dengan konfigurasi `vercel.json` untuk SPA rewrite dan routing otomatis.

### Cara 1: Menggunakan Vercel CLI

1. Pasang Vercel CLI (jika belum):
   ```bash
   npm i -g vercel
   ```

2. Login dan deploy:
   ```bash
   vercel
   ```

3. Untuk deploy ke production domain:
   ```bash
   vercel --prod
   ```

### Cara 2: Import Repository di Vercel Dashboard

1. Push kode ke GitHub, GitLab, atau Bitbucket.
2. Buka dashboard [Vercel](https://vercel.com/new).
3. Import repository Aurelia Edu.
4. Vercel akan otomatis mendeteksi framework preset: **Vite**.
   - **Build Command**: `npm run build` (atau `npm run vercel-build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Klik **Deploy**.

---

## ⚙️ Konfigurasi Vercel (`vercel.json`)

File `vercel.json` sudah disiapkan dengan:
- **Rewrites**: Mengarahkan semua rute halaman ke `/index.html` (dukungan Single Page App).
- **Headers**: Cache immutable untuk asset statis di `/assets/*`.
