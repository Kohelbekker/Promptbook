export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/create-prompt', '/profile', '/update-prompt'],
};

export async function middleware(request) {
  const token = await getToken({ req: request });
  if (!token && process.env.NEXTAUTH_URL) {
    return NextResponse.redirect(process.env.NEXTAUTH_URL);
  }
}
