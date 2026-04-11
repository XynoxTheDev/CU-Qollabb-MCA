import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken, AuthUser } from '@/lib/auth';

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export async function authMiddleware(request: AuthRequest): Promise<AuthUser | null> {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');
  const payload = await verifyToken(token);

  if (!payload) {
    return null;
  }

  return payload;
}

export async function requireAuth(request: AuthRequest) {
  const user = await authMiddleware(request);
  
  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

export async function requireAdmin(request: AuthRequest) {
  const user = await authMiddleware(request);
  
  if (!user || user.role !== 'admin') {
    throw new Error('Forbidden');
  }

  return user;
}