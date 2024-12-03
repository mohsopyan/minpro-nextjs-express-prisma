import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

const prisma = new PrismaClient();

// Helper untuk membuat referral code
function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Register function - untuk mendaftar user baru
async function Register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, referredBy, role } = req.body; // `referredBy` adalah kode referral yang digunakan oleh user

    // Validasi role
    if (role !== 'ATTENDEE' && role !== 'ORGANIZER') {
      return res.status(400).json({ message: 'Role tidak valid. Pilih antara ATTENDEE atau ORGANIZER.' });
    }

    // Cek apakah email sudah terdaftar
    const findUser = await prisma.user.findUnique({
      where: { email },
    });

    if (findUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Hash password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Buat kode referral untuk user baru
    const referralCode = generateReferralCode();

    // Jika ada referral yang valid, beri poin ke referrer
    if (referredBy) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode: referredBy },
      });

      if (!referrer) {
        return res.status(400).json({ message: 'Referral code tidak valid' });
      }

      // Tambahkan data referral ke database
      const expiresAt = new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000); 
      await prisma.referral.create({
        data: {
          userId: referrer.id,        // User yang mendapatkan referral
          referrerId: referrer.id,    // User yang memberikan referral
          points: 10000,              // Poin referral
          expiresAt,                 // Tanggal kedaluwarsa poin
        },
      });

      // Update poin pada referrer
      await prisma.user.update({
        where: { id: referrer.id },
        data: {
          pointsBalance: referrer.pointsBalance + 10000, // Menambah poin ke referrer
        },
      });
    }

    // Simpan user baru ke database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        referralCode,
        pointsBalance: 0, // Default poin balance
        discountExpiresAt: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000),  // Menambahkan discountExpiresAt dengan masa berlaku 3 bulan
      },
    });

    res.status(201).send({
      message: 'User berhasil terdaftar',
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
}

// Login function - untuk login user
async function Login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    // Cek apakah email sudah terdaftar
    const findUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!findUser) {
      return res.status(400).json({ message: 'Email tidak terdaftar' });
    }

    // Cek apakah password cocok
    const isValidPassword = await compare(password, findUser.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: 'Password salah' });
    }

    // Generate token JWT
    const payload = {
      email,
      role: findUser.role, // Tentukan peran user (ATTENDEE atau ORGANIZER)
      id: findUser.id,     // User ID untuk keperluan authorization
    };

    const token = sign(payload, process.env.SECRET_KEY as string, { expiresIn: '1d' });

    res.status(200).send({
      message: 'Login berhasil',
      access_token: token,
    });
  } catch (err) {
    next(err);
  }
}

// Middleware untuk melindungi rute berdasarkan role
function protectRoute(role: 'ATTENDEE' | 'ORGANIZER') {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Ambil token dari header Authorization

    if (!token) {
      return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan' });
    }

    try {
      // Verifikasi token JWT
      const decoded: any = verify(token, process.env.SECRET_KEY as string);

      // Cek apakah role sesuai
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Akses ditolak. Role tidak sesuai' });
      }

      // Simpan informasi user pada request untuk digunakan di rute berikutnya
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token tidak valid atau telah kadaluarsa' });
    }
  };
}

// Middleware untuk melindungi rute yang membutuhkan status login
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan' });
  }

  try {
    // Verifikasi token JWT
    const decoded: any = verify(token, process.env.SECRET_KEY as string);

    // Simpan informasi user pada request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid atau telah kadaluarsa' });
  }
}

export { Register, Login, protectRoute, isAuthenticated };
