# Batch 1: Security Critical - Implementation Plan

> **Status:** PLANNING
> **Tanggal dibuat:** 2 Maret 2026
> **Estimasi waktu:** 8-10 jam kerja
> **Prioritas:** P0 - CRITICAL

---

## Executive Summary

Batch 1 menangani **5 security vulnerabilities kritis** yang harus diperbaiki sebelum production:

| # | Issue | Severity | File Utama |
|---|-------|----------|------------|
| 1 | Debug endpoint publik bisa ubah role | CRITICAL | `convex/debug.ts` |
| 2 | Auth via client-side `adminClerkId` (spoofable) | CRITICAL | `convex/admin.ts`, `events.ts`, dll |
| 3 | Superadmin hardcoded via email | HIGH | `convex/users.ts` |
| 4 | Hardcoded bypass "Erik Admin" | HIGH | `convex/clubs.ts` |
| 5 | Missing `updateAthlete` function | MEDIUM | `convex/clubs.ts` |

---

## Phase 1: Foundation (Estimasi: 2 jam)

### 1.1 Hapus Debug Endpoint

**Problem:** `convex/debug.ts` memiliki mutation `fixUserRole` yang bisa dipanggil siapa saja tanpa auth untuk mengubah role user manapun.

**Solution:** Hapus file sepenuhnya.

#### Checklist

- [ ] **1.1.1** Backup file (optional): `copy convex\debug.ts convex\debug.ts.bak`
- [ ] **1.1.2** Hapus file: `del convex\debug.ts`
- [ ] **1.1.3** Cari referensi di frontend:
  ```powershell
  findstr /s /i "api.debug" src\*.tsx src\*.ts
  ```
- [ ] **1.1.4** Hapus semua import/usage yang ditemukan
- [ ] **1.1.5** Jalankan `npx convex dev` untuk regenerate types
- [ ] **1.1.6** Verifikasi tidak ada error di console
- [ ] **1.1.7** Test: Admin dashboard masih berfungsi normal

**Files to modify:**
```
DELETE: convex/debug.ts
```

---

### 1.2 Buat Auth Helper Module

**Problem:** Semua fungsi admin menggunakan `adminClerkId` dari parameter client yang bisa di-spoof.

**Solution:** Buat module auth helper yang menggunakan `ctx.auth.getUserIdentity()` dari Convex.

#### Checklist

- [ ] **1.2.1** Buat folder `convex/lib/` jika belum ada
- [ ] **1.2.2** Buat file `convex/lib/auth.ts` dengan konten berikut:

```typescript
// convex/lib/auth.ts
import { QueryCtx, MutationCtx } from "../_generated/server";

/**
 * Get authenticated athlete from Convex auth context.
 * Uses Clerk JWT token - CANNOT be spoofed by client.
 */
export async function getAuthedAthlete(ctx: QueryCtx | MutationCtx) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        throw new Error("Not authenticated");
    }

    const athlete = await ctx.db
        .query("athletes")
        .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
        .unique();

    if (!athlete) {
        throw new Error("Athlete profile not found");
    }

    return athlete;
}

/**
 * Require admin or superadmin role.
 * Throws if user is not authorized.
 */
export async function requireAdmin(ctx: QueryCtx | MutationCtx) {
    const athlete = await getAuthedAthlete(ctx);

    if (!athlete.role || !["admin", "superadmin"].includes(athlete.role)) {
        throw new Error("Unauthorized: Admin access required");
    }

    return athlete;
}

/**
 * Require superadmin role only.
 * Throws if user is not superadmin.
 */
export async function requireSuperAdmin(ctx: QueryCtx | MutationCtx) {
    const athlete = await getAuthedAthlete(ctx);

    if (athlete.role !== "superadmin") {
        throw new Error("Unauthorized: Superadmin access required");
    }

    return athlete;
}

/**
 * Get authenticated athlete without throwing.
 * Returns null if not authenticated.
 */
export async function getAuthedAthleteOrNull(ctx: QueryCtx | MutationCtx) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        return null;
    }

    return await ctx.db
        .query("athletes")
        .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
        .unique();
}
```

- [ ] **1.2.3** Test auth helper dengan temporary query:

```typescript
// Tambahkan sementara di convex/admin.ts
export const testAuth = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        return {
            hasIdentity: !!identity,
            subject: identity?.subject || "none"
        };
    },
});
```

- [ ] **1.2.4** Panggil dari frontend dan verifikasi return value cocok dengan Clerk user ID
- [ ] **1.2.5** Hapus test query setelah verifikasi berhasil

**Files to create:**
```
CREATE: convex/lib/auth.ts
```

---

## Phase 2: Refactor Backend Auth (Estimasi: 4 jam)

### 2.1 Refactor `convex/admin.ts`

**Daftar fungsi yang perlu diupdate:**

| Fungsi | Tipe | Auth Required |
|--------|------|---------------|
| `promoteToAdmin` | mutation | superadmin |
| `getAllUsers` | query | admin |
| `getPendingClubs` | query | admin |
| `verifyClub` | mutation | admin |
| `getAdminStats` | query | admin |
| `getRecentActivities` | query | admin |
| `inputResult` | mutation | admin |
| `getAthleteLeaderboard` | query | public (no auth) |

#### Checklist

- [ ] **2.1.1** Tambahkan import di awal file:
  ```typescript
  import { requireAdmin, requireSuperAdmin } from "./lib/auth";
  ```

- [ ] **2.1.2** Refactor `promoteToAdmin`:
  - [ ] Hapus parameter `adminClerkId` dari args
  - [ ] Ganti auth check dengan `await requireSuperAdmin(ctx)`
  - [ ] Test: superadmin bisa promote, user biasa dapat error

- [ ] **2.1.3** Refactor `getAllUsers`:
  - [ ] Hapus parameter `adminClerkId` dari args
  - [ ] Ganti dengan `await requireAdmin(ctx)`

- [ ] **2.1.4** Refactor `getPendingClubs`:
  - [ ] Hapus parameter `adminClerkId` dari args
  - [ ] Ganti dengan `await requireAdmin(ctx)`

- [ ] **2.1.5** Refactor `verifyClub`:
  - [ ] Hapus parameter `adminClerkId` dari args
  - [ ] Ganti dengan `await requireAdmin(ctx)`

- [ ] **2.1.6** Refactor `getAdminStats`:
  - [ ] Hapus parameter `adminClerkId` dari args
  - [ ] Ganti dengan `await requireAdmin(ctx)`

- [ ] **2.1.7** Refactor `getRecentActivities`:
  - [ ] Hapus parameter `adminClerkId` dari args
  - [ ] Ganti dengan `await requireAdmin(ctx)`

- [ ] **2.1.8** Refactor `inputResult`:
  - [ ] Hapus parameter `adminClerkId` dari args
  - [ ] Ganti dengan `await requireAdmin(ctx)`

- [ ] **2.1.9** `getAthleteLeaderboard` - SKIP (public query, tidak perlu auth)

**Template refactor:**

```typescript
// BEFORE
export const verifyClub = mutation({
    args: {
        clubId: v.id("clubs"),
        adminClerkId: v.string(),  // HAPUS INI
    },
    handler: async (ctx, args) => {
        const caller = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.adminClerkId))
            .unique();

        if (!caller || (caller.role !== "superadmin" && caller.role !== "admin")) {
            throw new Error("Unauthorized");
        }
        // ... rest of logic
    },
});

// AFTER
export const verifyClub = mutation({
    args: {
        clubId: v.id("clubs"),
        // adminClerkId REMOVED
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);  // Server-side auth
        // ... rest of logic (unchanged)
    },
});
```

---

### 2.2 Refactor `convex/events.ts`

| Fungsi | Tipe | Auth Required |
|--------|------|---------------|
| `create` | mutation | admin |
| `update` | mutation | admin |
| `remove` | mutation | admin |
| `list` | query | public |
| `getById` | query | public |

#### Checklist

- [ ] **2.2.1** Tambahkan import:
  ```typescript
  import { requireAdmin } from "./lib/auth";
  ```

- [ ] **2.2.2** Refactor `create`:
  - [ ] Hapus parameter `adminClerkId`
  - [ ] Ganti dengan `await requireAdmin(ctx)`
  - [ ] Update: `const { adminClerkId, ...eventData } = args` → hapus destructure

- [ ] **2.2.3** Refactor `update`:
  - [ ] Hapus parameter `adminClerkId`
  - [ ] Ganti dengan `await requireAdmin(ctx)`

- [ ] **2.2.4** Refactor `remove`:
  - [ ] Hapus parameter `adminClerkId`
  - [ ] Ganti dengan `await requireAdmin(ctx)`

- [ ] **2.2.5** `list` dan `getById` - SKIP (public queries)

---

### 2.3 Refactor `convex/news.ts`

#### Checklist

- [ ] **2.3.1** Baca file untuk identifikasi fungsi
- [ ] **2.3.2** Tambahkan import auth helper
- [ ] **2.3.3** Refactor semua mutation yang ada `adminClerkId`
- [ ] **2.3.4** Test create/delete news dari admin panel

---

### 2.4 Refactor `convex/landing.ts`

#### Checklist

- [ ] **2.4.1** Baca file untuk identifikasi fungsi
- [ ] **2.4.2** Tambahkan import auth helper
- [ ] **2.4.3** Refactor semua mutation yang ada `adminClerkId`
- [ ] **2.4.4** Test update hero dari CMS

---

### 2.5 Refactor `convex/clubs.ts`

**Special attention:** File ini punya hardcoded bypass "Erik Admin"

#### Checklist

- [ ] **2.5.1** Tambahkan import:
  ```typescript
  import { requireAdmin, getAuthedAthlete } from "./lib/auth";
  ```

- [ ] **2.5.2** Refactor `getClubRequests`:
  - [ ] Hapus parameter `adminClerkId`
  - [ ] **HAPUS** bypass `caller?.fullName !== "Erik Admin"` (line ~115)
  - [ ] Ganti dengan `await requireAdmin(ctx)`

- [ ] **2.5.3** Refactor `handleRequest`:
  - [ ] Hapus parameter `adminClerkId`
  - [ ] **HAPUS** bypass "Erik Admin" (line ~153)
  - [ ] Ganti dengan `await requireAdmin(ctx)`

- [ ] **2.5.4** **BUAT** fungsi `updateAthlete`:

```typescript
export const updateAthlete = mutation({
    args: {
        id: v.id("athletes"),
        fullName: v.optional(v.string()),
        birthDate: v.optional(v.string()),
        gender: v.optional(v.union(v.literal("male"), v.literal("female"))),
    },
    handler: async (ctx, args) => {
        const authedAthlete = await getAuthedAthlete(ctx);

        // User can only update own profile, OR admin can update anyone
        const isOwnProfile = authedAthlete._id === args.id;
        const isAdmin = authedAthlete.role === "admin" || authedAthlete.role === "superadmin";

        if (!isOwnProfile && !isAdmin) {
            throw new Error("Unauthorized: Cannot update other user's profile");
        }

        const { id, ...updates } = args;

        // Filter out undefined values
        const cleanUpdates = Object.fromEntries(
            Object.entries(updates).filter(([_, v]) => v !== undefined)
        );

        if (Object.keys(cleanUpdates).length === 0) {
            throw new Error("No updates provided");
        }

        await ctx.db.patch(id, cleanUpdates);
        return { success: true };
    },
});
```

- [ ] **2.5.5** Test: User bisa update profile sendiri
- [ ] **2.5.6** Test: Admin bisa update profile user lain
- [ ] **2.5.7** Test: User biasa TIDAK bisa update profile user lain

---

### 2.6 Refactor `convex/registrations.ts`

#### Checklist

- [ ] **2.6.1** Identifikasi fungsi dengan auth check
- [ ] **2.6.2** Refactor sesuai pattern yang sama
- [ ] **2.6.3** Test registration approval flow

---

### 2.7 Refactor `convex/users.ts`

**Issue:** Hardcoded superadmin email `jettjuara@gmail.com`

#### Checklist

- [ ] **2.7.1** Untuk MVP, KEEP hardcoded email tapi tambahkan TODO comment:
  ```typescript
  // TODO: Move superadmin assignment to database-driven system
  // See: docs/progress/batch-1-security-implementation-plan.md
  const SUPERADMIN_EMAIL = "jettjuara@gmail.com";
  const designatedRole = args.email === SUPERADMIN_EMAIL ? "superadmin" : "user";
  ```

- [ ] **2.7.2** Tambahkan auth check di `updateMembershipStatus`:
  ```typescript
  import { getAuthedAthlete } from "./lib/auth";

  export const updateMembershipStatus = mutation({
      args: {
          athleteId: v.id("athletes"),
          status: v.union(...),
      },
      handler: async (ctx, args) => {
          const authedAthlete = await getAuthedAthlete(ctx);

          // Only allow updating own status OR admin can update anyone
          const isOwnProfile = authedAthlete._id === args.athleteId;
          const isAdmin = ["admin", "superadmin"].includes(authedAthlete.role || "");

          if (!isOwnProfile && !isAdmin) {
              throw new Error("Unauthorized");
          }

          await ctx.db.patch(args.athleteId, {
              membershipStatus: args.status,
          });
      },
  });
  ```

---

## Phase 3: Frontend Updates (Estimasi: 1.5 jam)

### 3.1 Cari Semua Usage `adminClerkId`

#### Checklist

- [ ] **3.1.1** Jalankan search:
  ```powershell
  findstr /s /i "adminClerkId" src\*.tsx src\*.ts
  ```

- [ ] **3.1.2** Catat semua file yang perlu diupdate

Expected files:
- `src/app/admin/page.tsx`
- `src/app/admin/events/page.tsx`
- `src/app/admin/news/page.tsx`
- `src/app/admin/cms/hero/page.tsx`
- `src/app/dashboard/my-club/page.tsx`
- dll.

---

### 3.2 Update Frontend Calls

**Pattern perubahan:**

```typescript
// BEFORE
const { user } = useUser();
await createEvent({
    name: formData.name,
    date: formData.date,
    adminClerkId: user?.id || "",  // HAPUS INI
});

// AFTER
await createEvent({
    name: formData.name,
    date: formData.date,
    // adminClerkId tidak perlu - Convex ambil dari auth context
});
```

#### Checklist per file:

- [ ] **3.2.1** `src/app/admin/page.tsx` - Update semua query/mutation calls
- [ ] **3.2.2** `src/app/admin/events/page.tsx` - Update create, update, delete
- [ ] **3.2.3** `src/app/admin/events/[eventId]/results/page.tsx` - Update inputResult
- [ ] **3.2.4** `src/app/admin/news/page.tsx` - Update create, delete
- [ ] **3.2.5** `src/app/admin/cms/hero/page.tsx` - Update save
- [ ] **3.2.6** `src/app/dashboard/my-club/page.tsx` - Update club requests
- [ ] **3.2.7** `src/app/settings/profile/page.tsx` - Sudah pakai `updateAthlete` (akan work setelah fungsi dibuat)

---

## Phase 4: Dead Links Fix (Estimasi: 1 jam)

### 4.1 Fix `/news` Route

**Option A:** Buat halaman news (recommended)
**Option B:** Hapus link dari Header

#### Checklist (Option A)

- [ ] **4.1.1** Buat `src/app/news/page.tsx`:

```typescript
"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function NewsPage() {
    const news = useQuery(api.news.list);

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-[1366px] mx-auto">
                <h1 className="text-6xl font-heading font-black uppercase tracking-tighter italic mb-16">
                    News & <span className="text-brand-blue">Updates</span>
                </h1>

                {news === undefined ? (
                    <div className="text-zinc-500 animate-pulse">Loading...</div>
                ) : news.length === 0 ? (
                    <div className="text-zinc-600 italic">Belum ada berita.</div>
                ) : (
                    <div className="grid gap-8">
                        {news.map((item) => (
                            <article key={item._id} className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl">
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-2 block">
                                    {item.category}
                                </span>
                                <h2 className="text-2xl font-heading font-black uppercase mb-4">{item.title}</h2>
                                <div className="text-zinc-400 font-body text-sm" dangerouslySetInnerHTML={{ __html: item.content }} />
                            </article>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
```

- [ ] **4.1.2** Verifikasi `api.news.list` query exists
- [ ] **4.1.3** Test halaman `/news` di browser

---

### 4.2 Fix CMS Sidebar Dead Links

**Options:**
- A: Buat placeholder pages dengan "Coming Soon"
- B: Hapus links dari sidebar

#### Checklist (Option A - Placeholder)

- [ ] **4.2.1** Buat `src/app/admin/cms/partners/page.tsx`:

```typescript
"use client";

export default function PartnersPage() {
    return (
        <div className="text-center py-20">
            <h1 className="text-4xl font-heading font-black uppercase italic text-zinc-600 mb-4">
                Partners & Sponsors
            </h1>
            <p className="text-zinc-500">Coming Soon</p>
        </div>
    );
}
```

- [ ] **4.2.2** Buat `src/app/admin/cms/spotlight/page.tsx` dengan pattern sama
- [ ] **4.2.3** Test kedua halaman di browser

---

## Phase 5: Testing & Verification (Estimasi: 1 jam)

### 5.1 Unit Tests

#### Checklist

- [ ] **5.1.1** Test superadmin bisa:
  - [ ] Verify club
  - [ ] Promote user ke admin
  - [ ] Create/edit/delete event
  - [ ] Create/delete news
  - [ ] Update CMS hero

- [ ] **5.1.2** Test admin bisa:
  - [ ] Verify club
  - [ ] Create/edit/delete event
  - [ ] Create/delete news
  - [ ] Update CMS hero
  - [ ] **TIDAK BISA** promote user ke admin

- [ ] **5.1.3** Test regular user:
  - [ ] **TIDAK BISA** access admin functions
  - [ ] Dapat error "Unauthorized"

- [ ] **5.1.4** Test unauthenticated:
  - [ ] **TIDAK BISA** call protected mutations
  - [ ] Dapat error "Not authenticated"

---

### 5.2 Security Tests

#### Checklist

- [ ] **5.2.1** Buka DevTools → Network tab
- [ ] **5.2.2** Lakukan action admin (create event)
- [ ] **5.2.3** Verify request body TIDAK mengandung `adminClerkId`
- [ ] **5.2.4** Verify Clerk token dikirim via header (automatic)
- [ ] **5.2.5** Try replay attack: copy request, send via curl → should fail

---

### 5.3 Regression Tests

#### Checklist

- [ ] **5.3.1** Login sebagai superadmin → dashboard loads
- [ ] **5.3.2** Create new event → sukses
- [ ] **5.3.3** Edit event → sukses (jika sudah implement)
- [ ] **5.3.4** Delete event → sukses
- [ ] **5.3.5** Verify club → sukses
- [ ] **5.3.6** Input result → sukses
- [ ] **5.3.7** Update CMS hero → sukses
- [ ] **5.3.8** User dashboard → loads tanpa error

---

## Rollback Plan

Jika terjadi masalah serius:

1. **Git revert** ke commit sebelum batch 1:
   ```bash
   git log --oneline -10  # Cari commit hash
   git revert <commit-hash>
   ```

2. **Restore debug.ts** (jika diperlukan untuk emergency):
   ```bash
   git checkout HEAD~1 -- convex/debug.ts
   ```

3. **Contact** untuk bantuan: [escalation path]

---

## Files Modified Summary

### Created
- `convex/lib/auth.ts`
- `src/app/news/page.tsx`
- `src/app/admin/cms/partners/page.tsx`
- `src/app/admin/cms/spotlight/page.tsx`

### Modified
- `convex/admin.ts`
- `convex/events.ts`
- `convex/news.ts`
- `convex/landing.ts`
- `convex/clubs.ts`
- `convex/users.ts`
- `convex/registrations.ts`
- `src/app/admin/page.tsx`
- `src/app/admin/events/page.tsx`
- `src/app/admin/events/[eventId]/results/page.tsx`
- `src/app/admin/news/page.tsx`
- `src/app/admin/cms/hero/page.tsx`
- `src/app/dashboard/my-club/page.tsx`

### Deleted
- `convex/debug.ts`

---

## Sign-off

| Phase | Completed | Verified By | Date |
|-------|-----------|-------------|------|
| Phase 1: Foundation | [x] | Claude | 2026-03-02 |
| Phase 2: Backend Auth | [x] | Claude | 2026-03-02 |
| Phase 3: Frontend Updates | [x] | Claude | 2026-03-02 |
| Phase 4: Dead Links | [x] | Claude | 2026-03-02 |
| Phase 5: Testing | [ ] | Perlu manual test | - |

**Implementation Completed:** 2026-03-02
**Pending:** Manual testing oleh user untuk verifikasi akhir
