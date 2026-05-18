import { cookies } from 'next/headers';
import { verifyToken, AuthUser } from '@/lib/server/auth';

export const AUTH_COOKIE = 'auth-token';

export async function authMiddleware(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return null;
  }

  return payload;
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await authMiddleware();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireAdmin(): Promise<AuthUser> {
  const user = await authMiddleware();
  if (!user || user.role !== 'admin') {
    throw new Error('Forbidden');
  }
  return user;
}
