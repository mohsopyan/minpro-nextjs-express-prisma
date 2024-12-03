import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fungsi untuk mendapatkan profil pengguna
export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(400).json({ message: 'User email not found' });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { email: true, pointsBalance: true, referralCode: true, discountExpiresAt: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Fungsi untuk memperbarui profil pengguna
export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(400).json({ message: 'User email not found' });
    }

    const { pointsBalance, discountExpiresAt } = req.body;  // Mengambil data yang ingin diperbarui

    // Memperbarui data pengguna
    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: { pointsBalance, discountExpiresAt },
    });

    res.status(200).json({
      message: 'User profile updated successfully',
      updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

// Fungsi untuk mendapatkan data pengguna berdasarkan email
export const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.params.email;
    
    const user = await prisma.user.findUnique({
      where: { email },
      select: { email: true, pointsBalance: true, referralCode: true, discountExpiresAt: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
