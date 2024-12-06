import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).send({ error: 'Access denied. No token provided.' });
    return; 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = (decoded as any).userId; 
    next(); 
  } catch (error) {
    res.status(400).send({ error: 'Invalid token.' });
  }
  
};

export const validateAdminInput = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
        return;
    }

    next();
};

export default auth;
