import { Request, Response, NextFunction } from 'express';

// Membuat tipe error khusus untuk menangani error dengan status dan stack trace
class HttpError extends Error {
  status: number;
  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}

// Middleware error handler
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log error detail, terutama saat pengembangan
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack || err);  // Untuk error stack jika ada
  }

  // Set default status code jika tidak ada
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';

  // Menangani error yang datang dari HTTP Error khusus
  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  } else {
    // Tangani error lainnya seperti database errors, dll.
    res.status(status).json({
      error: message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
  }
}

// Meng-export HttpError jika ingin digunakan di tempat lain
export { HttpError };
