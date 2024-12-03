import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Menambah event baru
export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, date, location, price, availableSeats, organizerId } = req.body;
    
    // Membuat event baru di database
    const newEvent = await prisma.event.create({
      data: {
        name,
        description,
        date: new Date(date),
        location,
        price,
        availableSeats,
        organizerId,
      },
    });

    res.status(201).json({
      message: 'Event created successfully!',
      event: newEvent,
    });
  } catch (err) {
    next(err);
  }
};

// Mendapatkan daftar semua event
export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};

// Mendapatkan detail event berdasarkan ID
export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventId = parseInt(req.params.id);
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};
