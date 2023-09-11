import { Request, Response, NextFunction } from 'express';

export function getUser(req: Request, res: Response, next: NextFunction) {
  res.json({ message: 'HELLO FROM GETUSER' });
}
