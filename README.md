

# Sistem Manajemen API Artikel dengan GCP

Sistem ini adalah aplikasi CRUD untuk mengelola artikel, menggunakan **Google Cloud Platform** (GCP) sebagai backend dan **React** sebagai frontend. Backend dideploy ke **Cloud Run**, sementara frontend dideploy ke **Firebase Hosting**.

## Fitur
- Backend:
  - Menyimpan artikel dalam file JSON secara otomatis di Google Cloud Storage.
  - Mendukung pembuatan nama file artikel yang fleksibel dengan format `artikel_[number].json`.
  - Operasi CRUD (Create, Read, Update, Delete) untuk artikel.
  - Auto-initialization: File JSON dibuat otomatis jika belum ada.
  - Mendukung CORS agar dapat diakses oleh frontend.

- Frontend:
  - Menampilkan daftar artikel.
  - Menambahkan artikel baru.
  - Mengedit artikel yang ada.
  - Menghapus artikel.
  - Frontend responsif dan interaktif menggunakan React.

---

## Teknologi yang Digunakan

- **Backend**: Node.js, Express, Google Cloud Storage.
- **Frontend**: React, React Router, Axios.
- **Deployment**:
  - Backend: Cloud Run (Google Cloud Platform).
  - Frontend: Firebase Hosting.

---

## Instalasi dan Penggunaan

### Backend
1. **Clone repositori:**
   ```bash
   https://github.com/Eugenewijaya/sistem-manajemen-api-artikel-gcp.git
   cd repository/backend
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Google Cloud:**
   - Buat bucket di Google Cloud Storage.
   - Tambahkan file kredensial GCP Anda (`keyfile.json`) di root proyek.
   - Atur variabel lingkungan untuk bucket dan file JSON:
     ```bash
     export BUCKET_NAME=<nama-bucket-anda>
     export KEY_FILE=./keyfile.json
     ```

4. **Jalankan server lokal:**
   ```bash
   node server.js
   ```

5. **Deploy ke Cloud Run:**
   - Buat file `Dockerfile`:
     ```dockerfile
     FROM node:14
     WORKDIR /app
     COPY package*.json ./
     RUN npm install
     COPY . .
     CMD ["node", "server.js"]
     ```
   - Build dan push image ke Google Container Registry:
     ```bash
     gcloud builds submit --tag gcr.io/[PROJECT_ID]/article-api
     ```
   - Deploy ke Cloud Run:
     ```bash
     gcloud run deploy --image gcr.io/[PROJECT_ID]/article-api --platform managed
     ```

6. **Dapatkan URL backend dari Cloud Run.**

---

### Frontend
1. **Navigasi ke direktori frontend:**
   ```bash
   cd repository/frontend
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi URL backend di `src/api/axios.js`:**
   ```javascript
   import axios from 'axios';

   const instance = axios.create({
     baseURL: 'https://your-cloud-run-url.a.run.app', // Ganti dengan URL backend
   });

   export default instance;
   ```

4. **Jalankan aplikasi secara lokal:**
   ```bash
   npm start
   ```

5. **Deploy ke Firebase Hosting:**
   - Build aplikasi React:
     ```bash
     npm run build
     ```
   - Deploy ke Firebase Hosting:
     ```bash
     firebase deploy
     ```

---

## Konfigurasi Tambahan

### CORS (Backend)
Tambahkan middleware untuk mengatur domain yang diizinkan:
```javascript
const cors = require('cors');
app.use(cors({ origin: 'https://your-firebase-app.web.app' })); // Ganti dengan URL frontend
```

### Penyimpanan Artikel
Setiap artikel disimpan sebagai file terpisah dengan format `artikel_[number].json` di Google Cloud Storage. Sistem secara otomatis menentukan angka berikutnya untuk penamaan file.

---

## Struktur Proyek

```
repository/
├── backend/
│   ├── server.js         # Server utama
│   ├── articleController.js # Logika CRUD untuk artikel
│   ├── package.json      # Dependencies backend
│   └── Dockerfile        # File konfigurasi Docker untuk Cloud Run
├── frontend/
│   ├── src/
│   │   ├── components/   # Komponen React
│   │   ├── api/axios.js  # API helper
│   ├── public/           # File statis
│   ├── package.json      # Dependencies frontend
│   └── firebase.json     # Konfigurasi Firebase Hosting
└── README.md             # Dokumentasi proyek
```

---

## Cara Kerja

1. **Inisialisasi:**
   - File JSON dibuat otomatis di Google Cloud Storage jika belum ada.

2. **CRUD Artikel:**
   - Artikel disimpan sebagai file JSON dalam bucket GCP.
   - Nama file mengikuti format `artikel_[number].json`.

3. **Integrasi Frontend dan Backend:**
   - Backend melayani permintaan CRUD dari frontend.
   - Frontend menggunakan Axios untuk berkomunikasi dengan backend.

---

## Deployment URL
- **Frontend (Firebase Hosting)**: [https://your-firebase-app.web.app](https://your-firebase-app.web.app)
- **Backend (Cloud Run)**: [https://your-cloud-run-url.a.run.app](https://your-cloud-run-url.a.run.app)


---

Silakan sesuaikan URL, nama proyek, atau langkah-langkah tambahan sesuai dengan kebutuhan Anda! 😊
