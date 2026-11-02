# Web Presentasi — Metaheuristic Cloud Task Scheduling

Presentasi interaktif untuk mata kuliah Strategi Optimasi Komputasi Awan.
Topik: **Dragonfly Algorithm (DA)** dan **Dung Beetle Optimization (DBO)**
untuk penjadwalan task di cloud.

## Menjalankan lokal

Prasyarat: Node.js 22+ dan npm.

```bash
cd web-presentation
npm install
npm run dev
```

Buka URL yang ditampilkan Vite (default `http://localhost:5173`).

Perintah lain:

```bash
npm run typecheck   # cek TypeScript
npm run build       # build produksi ke dist/
npm run preview     # preview hasil build
```

## Navigasi presentasi

- `→` / `Space`: slide berikutnya
- `←`: slide sebelumnya
- `Esc`: overview semua slide
- `S`: speaker notes (jendela terpisah)
- `F`: fullscreen
- `B`: pause / blackout
- `T`: ganti light / dark
- `?`: buka panduan navigasi

Tombol di kanan atas: peta presentasi, overview, tema, dan panduan.
Tema disimpan di `localStorage` browser.

## Deploy ke GitHub Pages

Target utama: GitHub Pages, repo `cloud-metaheuristic`, dengan folder
`web-presentation/` di root repo.

Build memakai `base: './'`, sehingga isi `dist/` portabel untuk GitHub Pages,
Netlify, dan Vercel tanpa mengubah konfigurasi.

### Opsi A — GitHub Actions (disarankan)

1. Salin template workflow secara manual ke root repo:

   ```bash
   cp web-presentation/deploy/github-pages.yml .github/workflows/github-pages.yml
   ```

   File harus berada di `<repo-root>/.github/workflows/github-pages.yml`.
   Template **tidak** disalin otomatis oleh agent.

2. Commit dan push ke branch `main`. Workflow berjalan bila ada perubahan di
   `web-presentation/**`, atau bisa dijalankan manual lewat `workflow_dispatch`.

3. Di GitHub repo: **Settings → Pages → Build and deployment → Source:
   GitHub Actions**.

4. Setelah workflow selesai, buka URL yang muncul di environment
   `github-pages`, biasanya:

   ```text
   https://<username>.github.io/cloud-metaheuristic/
   ```

Workflow memakai:

- `working-directory: web-presentation`
- `npm ci`
- artifact dari `web-presentation/dist`
- permissions `pages: write` dan `id-token: write`
- trigger push ke `main` dengan filter `web-presentation/**`

### Opsi B — Deploy manual

```bash
cd web-presentation
npm ci
npm run build
```

Unggah isi `web-presentation/dist/` ke hosting statis pilihan Anda. Untuk
GitHub Pages manual, isi `dist/` bisa di-push ke branch `gh-pages` lewat
antarmuka git Anda sendiri. Repo ini tidak menyertakan paket atau script
`gh-pages`; proses publish dilakukan manual oleh pemilik repo.

### Netlify / Vercel

- Build command: `npm run build`
- Publish directory: `web-presentation/dist` (atau `dist` bila root project
  diarahkan ke `web-presentation`)
- Base path default `./` sudah portabel. Override env `BASE_PATH` hanya bila
  memakai domain/subpath khusus.

## Struktur

```text
web-presentation/
├── index.html
├── src/
│   ├── main.ts              # mount slide + init Reveal
│   ├── data/                # data paper, referensi, shortcut
│   ├── lib/                 # helper render slide
│   ├── slides/              # modul slide
│   ├── styles/              # theme, slide, deck UI
│   └── ui/                  # kontrol deck (tema, help, navigasi)
├── deploy/
│   └── github-pages.yml     # template workflow, salin manual ke root repo
├── public/.nojekyll
└── dist/                    # hasil build, tidak di-commit
```

## Catatan data

- Angka hasil paper wajib diberi rujukan tabel/gambar sumber.
- Data demo atau simulasi buatan sendiri wajib diberi label **ILUSTRASI**.
- Rumus ditandai sumbernya: paper tugas, Mirjalili (2015), atau Xue & Shen
  (2022).
