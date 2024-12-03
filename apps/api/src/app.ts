import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middleware/error.middleware';
import rateLimit from 'express-rate-limit';
import authRoutes from './routers/auth.route';
import eventRoutes from './routers/event.route';
import ticketRoutes from './routers/ticket.route';
import transactionRoutes from './routers/transaction.route';
// Import referralRoutes
import referralRoutes from './routers/referral.route';

export default class App {
  private app: Express;
  private prisma: PrismaClient;

  constructor() {
    this.app = express();
    this.prisma = new PrismaClient();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));

    // Rate Limiter
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Terlalu banyak permintaan dari IP ini, coba lagi nanti.',
    });

    this.app.use(limiter);
  }

  private handleError(): void {
    // Error handler untuk route yang tidak ditemukan
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found!');
      } else {
        next();
      }
    });

    // Global error handler
    this.app.use(errorHandler);
  }

  // Menambahkan routes ke aplikasi
  private routes(): void {
    this.app.get('/api', (req: Request, res: Response) => {
      res.send('Hello, Purwadhika Student API!');
    });

    // Rute API
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/events', eventRoutes);
    this.app.use('/api/tickets', ticketRoutes);
    this.app.use('/api/transactions', transactionRoutes);
    
    // Referral route
    this.app.use('/api/referrals', referralRoutes);
  }

  public async start(): Promise<void> {
    try {
      // Coba untuk connect ke database
      await this.prisma.$connect();
      console.log('Koneksi ke database berhasil.');

      // Start server
      this.app.listen(PORT, () => {
        console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
      });
    } catch (error) {
      console.error('Gagal terhubung ke database:', error);
      process.exit(1);
    }

    process.on('SIGINT', async () => {
      await this.prisma.$disconnect();
      console.log('Koneksi database ditutup.');
      process.exit(0);
    });
  }
}
