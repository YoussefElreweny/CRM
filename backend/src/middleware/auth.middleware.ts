import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { AppError } from '../utils/AppError';

// 1. Extend the Request type so TypeScript knows 'req.user' exists
interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // 1. Get token from Header (Bearer ...)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. Check if token exists
  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  try {
    // 3. Verify Token
    // We force typescript to understand that the process.env string is definitely defined
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    // 4. Check if User still exists
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { client: true } // We load the client details too
    });

    if (!currentUser) {
      return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }

    // 5. GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
    
  } catch (error) {
    return next(new AppError('Invalid token. Please log in again.', 401));
  }
};

// Helper: Allow only specific roles (Admin, Client, QA)
export const restrictTo = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // req.user is guaranteed to exist because 'protect' runs first
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};