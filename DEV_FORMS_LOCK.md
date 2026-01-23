# DEV FORMS UNLOCK - RocketsRollers

> [!WARNING]
> **DOKUMEN INI ADALAH CATATAN INTERNAL DEVELOPMENT.**
> Seluruh validasi `required` dan mandatory di form onboarding telah dihapus sementara demi kemudahan testing flow. **WAJIB DIKUNCI KEMBALI SEBELUM PRODUKSI.**

## Daftar Perubahan (Mode Development)

### 1. Complete Profile (`/onboarding/complete-profile`)
- [x] Atribut `required` dihapus dari Full Name.
- [x] Atribut `required` dihapus dari Birth Date.

### 2. Register Club (`/onboarding/register-club`)
- [x] Atribut `required` dihapus dari Nama Klub, Alamat, Kota, PIC, dan No HP.

### 3. Join Club (`/onboarding/join-club`)
- [x] Atribut `required` dihapus dari pemilihan klub (Sudah bebas pilih).

### 4. Confirm Private (`/onboarding/confirm-private`)
- [x] Validasi checkbox atau confirm button dipermudah (Klik langsung tembus).

### 5. Onboarding Router (`/onboarding`)
- [x] Proteksi auto-redirect ke `/complete-profile` dimatikan. User bisa akses `/onboarding` secara bebas.

---

## Cara Mengembalikan (Lockdown)
1. Cari keyword `required` yang dikomentari atau dihapus di file-file di atas.
2. Tambahkan kembali prop `required` pada setiap elemen `<input>`, `<select>`, atau `<textarea>`.
3. Pastikan submit handler mengecek nilai kosong.
