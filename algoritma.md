<!-- REACT + PRISMA -->
- npm create vite@latest -- --template react-ts
- npm tailinwdcss @tailinwdcss/vite
- import tailinwdcss


<!-- SETTING BACKEND UNTUK REST API-->
- bikin struktur untuk backend
- npm install express prisma @prisma/client cors
- npm install dotenv
- npx prisma init
- npm install tsx --save-dev
- npm i --save-dev @types/express
- npm i --save-dev @types/cors
- setting database di folder prisma
- npx prisma generate
- bikin model
- wajib tambahkan relasi cascade
- npx prisma migrate dev --name init
- isi data dulu ke database 
- npx tsx src/seed.ts
- KALAU SUDAH DI SETUP SEMUA PERBARUI PACKAGE.JSON TAMBAHKAN PERINTAH BERIKUT
- npx tsx src/server.ts
- OPSIONAL setting package.json

<!-- UNTUK TESTING API -->
- GET
-curl http://localhost/3000/
- POST 
- curl -X POST -H "Content-Type: application/json" -d '{'nama': '',}' http://localhost:3000/api/users 
- curl -X DELETE http://localhost:3000/api/customers/1



<!-- MENAMPILKAN KE UI REACT -->
- npm install axios
- bikin services 
- di file env VITE_API_URL="http://localhost:3000/api"

<!-- TIPS -->
- saat menghapus data yang berelasi perhatikan ya
