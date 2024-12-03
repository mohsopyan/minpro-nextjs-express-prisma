// user.service.ts

import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

// Fungsi untuk memperbarui profil pengguna
export const updateUserProfile = async (
  userId: number,
  updateData: { email?: string; password?: string; role?: string; pointsBalance?: number }
) => {
  try {
    // Pastikan role yang diterima adalah tipe Role, bukan string
    if (updateData.role) {
      const validRoles: Role[] = ['ATTENDEE', 'ORGANIZER']; // Daftar role yang valid
      if (!validRoles.includes(updateData.role.toUpperCase() as Role)) {
        throw new Error('Invalid role');
      }
      updateData.role = updateData.role.toUpperCase() as Role; // Mengonversi string menjadi enum Role
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return updatedUser;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to update user profile');
  }
};
