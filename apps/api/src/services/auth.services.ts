import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '@/middleware/auth.middleware'; // Import CustomRequest yang sudah diekspor

const prisma = new PrismaClient();

// Fungsi untuk membuat token JWT
const generateToken = (email: string, role: string) => {
  return jwt.sign({ email, role }, process.env.JWT_SECRET as string, {
    expiresIn: '1h', // Token berlaku selama 1 jam
  });
};

// Fungsi untuk registrasi pengguna baru
export const registerUser = async (email: string, password: string) => {
  try {
    // Mengecek apakah pengguna sudah terdaftar
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new Error('Email is already registered');
    }

    // Hash password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Membuat pengguna baru
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        pointsBalance: 0,
        referralCode: Math.random().toString(36).substring(2, 10).toUpperCase(), // Generate referral code
      },
    });

    return newUser;
  } catch (error: unknown) { // Menangani error dengan tipe 'unknown'
    if (error instanceof Error) {
      throw new Error(error.message); // Akses error.message jika error bertipe 'Error'
    }
    throw new Error('Failed to register user'); // Untuk kasus lain jika error bukan instance of Error
  }
};

// Fungsi untuk login pengguna
export const loginUser = async (email: string, password: string) => {
  try {
    // Mencari pengguna berdasarkan email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    // Memeriksa apakah password yang dimasukkan cocok
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Membuat token JWT jika login berhasil
    const token = generateToken(user.email, user.role);

    return { user, token };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message); // Akses error.message jika error bertipe 'Error'
    }
    throw new Error('Failed to login');
  }
};

// Fungsi untuk mendapatkan informasi pengguna berdasarkan email
export const getUserByEmail = async (email: string) => {
  try {
    // Mengambil data pengguna berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { email: true, role: true, pointsBalance: true, referralCode: true, discountExpiresAt: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message); // Akses error.message jika error bertipe 'Error'
    }
    throw new Error('Failed to get user information');
  }
};

// Fungsi untuk memverifikasi token JWT
export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Invalid or expired token'); // Akses error.message jika error bertipe 'Error'
    }
    throw new Error('Invalid or expired token');
  }
};
