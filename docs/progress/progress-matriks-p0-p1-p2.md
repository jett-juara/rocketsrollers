# Progress Matriks Prioritas

## Konteks Audit
- Tanggal audit: 2 Maret 2026
- Cakupan modul: `auth`, `onboarding`, `admin`, `CMS`, `landing`
- Basis analisis: kondisi file terbaru di working directory `rocketsrollers/rocketsrollers`

## Definisi Prioritas
- `P0`: blocker kritis, wajib beres sebelum dianggap aman/siap produksi
- `P1`: penting, memengaruhi kualitas rilis dan stabilitas fitur
- `P2`: penyempurnaan, konsistensi, dan peningkatan pengalaman

---

## Matriks P0/P1/P2 per Modul

### AUTH

| Prioritas | Issue | File Reference | Status |
|-----------|-------|----------------|--------|
| **P0** | ~~Otorisasi backend mengandalkan `adminClerkId` dari client (spoofable)~~ | `convex/lib/auth.ts` - sekarang pakai server-side auth | ✅ Fixed |
| **P0** | ~~Endpoint debug publik bisa ubah role siapa saja tanpa auth~~ | `convex/debug.ts` dihapus | ✅ Fixed |
| **P1** | Penentuan superadmin hardcoded via email | `convex/users.ts:7` → `jettjuara@gmail.com` (dengan TODO comment) | ⚠️ Mitigated |
| **P1** | ~~`updateMembershipStatus` mutation tanpa auth check~~ | `convex/users.ts` - sekarang ada auth check | ✅ Fixed |
| **P2** | Konsistensi teks/status autentikasi di UI guard admin | `src/components/auth/AdminGuard.tsx` | ❌ Open |

### ONBOARDING

| Prioritas | Issue | File Reference | Status |
|-----------|-------|----------------|--------|
| **P0** | Validasi form onboarding dimatikan untuk dev mode, belum dikunci | `DEV_FORMS_LOCK.md` - lihat daftar lengkap di dokumen | ❌ Open |
| **P1** | Alur submit data kosong bisa lolos di beberapa form | `/onboarding/complete-profile`, `/onboarding/register-club`, `/onboarding/join-club` | ❌ Open |
| **P1** | Photo upload belum ada saat onboarding | `/onboarding/complete-profile` | ❌ Open |
| **P2** | Perapihan copywriting dan konsistensi bahasa | Seluruh halaman `/onboarding/*` | ❌ Open |
| **P2** | Onboarding progress indicator belum ada | `/onboarding/*` | ❌ Open |

### ADMIN

| Prioritas | Issue | File Reference | Status |
|-----------|-------|----------------|--------|
| **P0** | ~~Halaman profil memanggil `api.clubs.updateAthlete` yang tidak diekspor~~ | `convex/clubs.ts:162` - fungsi sudah dibuat | ✅ Fixed |
| **P1** | Tombol Edit event belum terhubung ke form (mutation sudah ada) | `src/app/admin/events/page.tsx:187` - button ada, `convex/events.ts:31` - mutation `update` ada | ❌ Open |
| **P1** | Result EDIT (update existing) belum ada | `convex/admin.ts` - hanya ada `inputResult`, tidak ada `updateResult` | ❌ Open |
| **P1** | Registration approval flow perlu verifikasi lengkap | `convex/registrations.ts` | ⚠️ Review |
| **P2** | Optimasi query - beberapa `collect()` tanpa limit berisiko saat data besar | `convex/admin.ts` | ❌ Open |
| **P2** | ~~Hardcoded auth bypass di `getClubRequests`~~ | `convex/clubs.ts` - Erik Admin bypass dihapus | ✅ Fixed |
| **P2** | Activity log lengkap belum ada | Dashboard admin | ❌ Open |
| **P2** | Export data (CSV/PDF) belum ada | Dashboard admin | ❌ Open |

### CMS

| Prioritas | Issue | File Reference | Status |
|-----------|-------|----------------|--------|
| **P0** | ~~Sidebar mengarah ke route yang belum dibuat~~ | `src/app/admin/cms/partners/page.tsx`, `src/app/admin/cms/spotlight/page.tsx` - halaman placeholder dibuat | ✅ Fixed |
| **P1** | Duplikasi area kelola `/admin/*` dan `/admin/cms/*` berpotensi drift | `src/app/admin/news/page.tsx` vs kemungkinan `/admin/cms/news` | ⚠️ Review |
| **P1** | Partners section CMS perlu implementasi lengkap | Halaman placeholder ada, perlu CRUD | ⚠️ Partial |
| **P1** | Athletes/Spotlight CMS perlu implementasi lengkap | Halaman placeholder ada, perlu CRUD | ⚠️ Partial |
| **P2** | Angka status CMS hardcoded | `src/app/admin/cms/page.tsx:34,38,42` → `v0.8.2-PRE`, `12.4 MB`, `OPERATIONAL` | ❌ Open |
| **P2** | Gallery management belum lengkap | Backend upload system | ❌ Open |
| **P2** | SEO meta editor belum ada | CMS area | ❌ Open |

### LANDING

| Prioritas | Issue | File Reference | Status |
|-----------|-------|----------------|--------|
| **P0** | ~~Navigasi `/news` mengarah ke halaman yang tidak ada~~ | `src/app/news/page.tsx` - halaman sudah dibuat | ✅ Fixed |
| **P1** | Halaman `/gallery` masih placeholder | `src/app/gallery/page.tsx` | ⚠️ Review |
| **P1** | Halaman `/schedule` masih placeholder | `src/app/schedule/page.tsx` | ⚠️ Review |
| **P1** | Beberapa section memakai fallback data statis | `src/components/home/SeriesSection.tsx`, `src/components/home/NewsSection.tsx` | ⚠️ Review |
| **P2** | Branding lama SLS masih ada di footer | `src/components/layout/Footer.tsx:8,9,37,60` → "SLS", "Street League Skateboarding" | ❌ Open |
| **P2** | Branding lama SLS di metadata | `src/app/layout.tsx:25-26` → title & description | ❌ Open |
| **P2** | Mobile menu hamburger belum ada logic interaksi | `src/components/layout/Header.tsx:94-98` | ❌ Open |
| **P2** | Subscribe/newsletter hanya UI, belum ada backend | `src/components/home/SubscribeSection.tsx` | ❌ Open |

---

## Summary

| Modul | P0 Fixed | P0 Open | P1 | P2 | Total Open |
|-------|----------|---------|----|----|------------|
| **Auth** | 2 ✅ | 0 | 1 | 1 | 2 |
| **Onboarding** | 0 | 1 | 2 | 2 | 5 |
| **Admin** | 1 ✅ | 0 | 3 | 3 | 6 |
| **CMS** | 1 ✅ | 0 | 3 | 3 | 6 |
| **Landing** | 1 ✅ | 0 | 3 | 4 | 7 |
| **TOTAL** | **5 ✅** | **1** | **12** | **13** | **26** |

> **Update 2026-03-02:** Batch 1 Security Critical selesai diimplementasi. 5 dari 6 P0 issues sudah fixed. Tersisa 1 P0 di Onboarding (form validation) yang butuh review `DEV_FORMS_LOCK.md`.

---

## Bukti Referensi Utama

### Backend (Convex)
- `convex/admin.ts` - admin queries & mutations (refactored with server-side auth)
- ~~`convex/debug.ts`~~ - **DELETED** (security fix)
- `convex/lib/auth.ts` - **NEW** auth helper module
- `convex/users.ts` - user sync & membership (auth check added)
- `convex/clubs.ts` - club management + `updateAthlete` added
- `convex/events.ts` - event CRUD (refactored)
- `convex/registrations.ts` - event registration (refactored)
- `convex/news.ts` - news management (refactored)
- `convex/landing.ts` - CMS landing page (refactored)

### Frontend Pages
- ~~`src/app/settings/profile/page.tsx` - broken mutation call~~ ✅ Fixed
- `src/app/admin/events/page.tsx` - edit button masih belum connect ke form
- `src/app/admin/cms/layout.tsx` - dead links

### Frontend Components
- `src/components/layout/Header.tsx` - dead `/news` link
- `src/components/layout/Footer.tsx` - SLS branding
- `src/components/auth/AdminGuard.tsx` - UI guard

### Documentation
- `DEV_FORMS_LOCK.md` - dev mode unlock tracker

---

## Prioritas Penyelesaian (Rekomendasi)

### Batch 1: Security Critical (P0)
1. Hapus/proteksi `convex/debug.ts` → `fixUserRole`
2. Refactor auth: ganti `adminClerkId` dari client ke server-side auth
3. Buat fungsi `updateAthlete` di `convex/clubs.ts`
4. Buat halaman `/news` atau hapus link dari Header
5. Buat halaman `/admin/cms/partners` dan `/admin/cms/spotlight` atau hapus dari sidebar

### Batch 2: Functional (P1)
1. Lock kembali validasi form onboarding (ikuti `DEV_FORMS_LOCK.md`)
2. Hubungkan tombol Edit event ke form edit
3. Tambah `updateResult` mutation
4. Tambah auth check di `updateMembershipStatus`
5. Lengkapi halaman placeholder (gallery, schedule)

### Batch 3: Polish (P2)
1. Ganti branding SLS → Rockets Rollers
2. Implementasi mobile menu
3. Optimasi query dengan pagination/limit
4. Hapus hardcoded values di CMS status
5. Hapus hardcoded "Erik Admin" bypass
