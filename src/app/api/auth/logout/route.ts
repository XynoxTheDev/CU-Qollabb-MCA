import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_COOKIE } from '@/lib/server/auth-middleware';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({ success: true });
}
