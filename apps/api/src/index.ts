import { PrismaClient } from '@prisma/client';
import App from './app';  

const prisma = new PrismaClient();

const main = async () => {
  try {
    // Inisialisasi koneksi ke database dengan Prisma
    await prisma.$connect();
    console.log('Koneksi ke database berhasil.');

    // Inisialisasi dan mulai aplikasi Express
    const app = new App();
    app.start();

  } catch (error) {
    console.error('Gagal terhubung ke database:', error);
    process.exit(1);  // Keluar dari proses jika koneksi gagal
  }
};

main();

