import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../config/prisma';
import { AppError } from '../../utils/AppError';

// Helper: Generate Token
const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '90d',
  });
};

export const registerUser = async (data: any) => {
  const { name, email, password, companyName } = data;

  // 1. Check if email exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError('Email already exists', 400);
  }

  // 2. Hash Password
  const hashedPassword = await bcrypt.hash(password, 12);

  // 3. Transaction: Create User AND Client Profile together
  const newUser = await prisma.$transaction(async (tx) => {
    // A. Create User
    const user = await tx.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'CLIENT', // Default registration is always Client
      },
    });

    // B. Create Client Profile
    await tx.client.create({
      data: {
        userId: user.id,
        companyName: companyName || `${name}'s Company`,
      },
    });

    return user;
  });

  // 4. Generate Token
  const token = signToken(newUser.id);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return { user: userWithoutPassword, token };
};

export const loginUser = async (data: any) => {
  const { email, password } = data;

  // 1. Check if user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  // 2. Check Password
  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    throw new AppError('Invalid email or password', 401);
  }

  // 3. Generate Token
  const token = signToken(user.id);

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};