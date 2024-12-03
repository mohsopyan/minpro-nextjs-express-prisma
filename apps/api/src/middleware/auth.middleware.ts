// auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Menambahkan tipe untuk `req.user`
export interface CustomRequest extends Request {
  user?: {
    email: string;
    role: string;
    discountExpiresAt?: Date;
  };
}

// Middleware untuk memverifikasi token JWT dan menambahkan data user ke `req.user`
export const isAuthenticated = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Access denied. Token not found." });
  }

  try {
    // Verifikasi token menggunakan JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string; role: string };
    req.user = decoded; // Menyimpan informasi user dalam req.user
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

// Middleware untuk memverifikasi peran pengguna (role)
export const protectRoute = (role: 'attendee' | 'ORGANIZER') => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: "Access denied. You do not have permission to access this resource." });
    }
    next();
  };
};
