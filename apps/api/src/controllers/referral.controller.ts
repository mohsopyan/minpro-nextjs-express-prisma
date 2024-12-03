import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fungsi untuk mendaftar dengan referral code
export const registerWithReferral = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { referralCode } = req.body;
    const userEmail = req.user?.email;  // Mendapatkan email pengguna yang sedang login

    if (!referralCode) {
      return res.status(400).json({ message: 'Referral code is required.' });
    }

    // Cek apakah referralCode yang dimasukkan valid
    const referrer = await prisma.user.findUnique({
      where: { referralCode },
    });

    if (!referrer) {
      return res.status(400).json({ message: 'Referral code tidak valid' });
    }

    // Cari pengguna yang sedang mendaftar berdasarkan email
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    // Generate referral code untuk pengguna baru
    const newReferralCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Buat pengguna baru dengan referral code
    const newUser = await prisma.user.create({
      data: {
        email: userEmail as string,  // Pastikan email sudah ada dan valid
        password: 'defaultPassword', // Gantilah dengan proses registrasi yang benar
        referralCode: newReferralCode, // Generate referral code untuk user baru
        pointsBalance: 0, // Saldo awal poin
        discountExpiresAt: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000), // Referral code berlaku selama 3 bulan
      },
    });

    // Tambahkan referral untuk referrer
    await prisma.referral.create({
      data: {
        userId: newUser.id, // User yang mendaftar dengan referral code
        referrerId: referrer.id, // Referrer yang mengundang
        points: 10000, // Poin yang didapat oleh referrer
        expiresAt: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000), // Poin berlaku selama 3 bulan
      },
    });

    // Update poin pada referrer
    await prisma.user.update({
      where: { id: referrer.id },
      data: { pointsBalance: referrer.pointsBalance + 10000 },  // Menambahkan poin referral ke referrer
    });

    res.status(201).json({
      message: 'Registration successful with referral code.',
      user: newUser,
    });
  } catch (err) {
    next(err);  // Tangani error
  }
};

// Fungsi untuk mendapatkan informasi referral user
export const getReferralInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userEmail = req.user?.email;
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { referralCode: true, pointsBalance: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      referralCode: user.referralCode,
      pointsBalance: user.pointsBalance,
    });
  } catch (err) {
    next(err);
  }
};

// Fungsi untuk mendapatkan daftar pengguna yang menggunakan referral code milik user
export const getReferredUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userEmail = req.user?.email;
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const referredUsers = await prisma.referral.findMany({
      where: { referrerId: user.id },
      include: { user: true }, // Include referred user info
    });

    res.status(200).json({
      referredUsers: referredUsers.map((referral) => referral.user),
    });
  } catch (err) {
    next(err);
  }
};
