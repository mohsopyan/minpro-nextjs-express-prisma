import { Role } from '@prisma/client'; 
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        role: Role; 
        discountExpiresAt?: Date;
      };
    }
  }
}
