// src/controllers/sample.controller.ts

import { Request, Response } from 'express';

export const getSample = (req: Request, res: Response) => {
  try {
    // Logic untuk menangani GET request ke /sample
    res.status(200).json({ message: "Sample data retrieved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
