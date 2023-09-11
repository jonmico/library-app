import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import AppError from './errors/AppError';

const MONGO_STRING = process.env.MONGO_STRING ?? '';
const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());
app.use(cors());

async function connectDB() {
  try {
    await mongoose.connect(MONGO_STRING);
    console.log('Connected to database.');
  } catch (err) {
    console.error(`Database error: ${err}`);
  }
}

connectDB();

app.use((req, res, next) => {
  res.status(404).json({
    statusCode: 404,
    statusMessage: "We can't find what you are looking for.",
  });
});

app.use(
  (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    console.error(err);

    const statusMessage =
      err instanceof AppError ? err.statusMessage : 'An error has occurred.';
    const statusCode = err instanceof AppError ? err.statusCode : 500;

    res.status(statusCode).json({ statusCode, statusMessage });
  }
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
