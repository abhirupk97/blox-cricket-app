import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
 
export async function middleware(request) {
  const token = request.cookies.get('staff_session')?.value;
 
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
 
  try {
    const secret = new TextEncoder().encode(process.env.LOGIN_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('staff_session');
    return response;
  }
}
 
export const config = {
  matcher: ['/studio/:path*'],
}