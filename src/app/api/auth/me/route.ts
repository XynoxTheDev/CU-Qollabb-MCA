import { NextResponse } from 'next/server';
import { prisma } from '@/lib/server/db';
import { authMiddleware } from '@/lib/server/auth-middleware';

export async function GET() {
  const auth = await authMiddleware();

  if (!auth) {
    return NextResponse.json({ user: null });
  }

  const user = await prisma.user.findUnique({
    where: { id: auth.userId },
    select: { id: true, name: true, email: true, role: true },
  });

  return NextResponse.json({ user });
}
