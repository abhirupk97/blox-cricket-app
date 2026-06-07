import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const staffList = [
      process.env.STAFF_1,
      process.env.STAFF_2,
      process.env.STAFF_3,
      process.env.STAFF_4,
      process.env.STAFF_5,
    ].filter(Boolean);

    const isValidUser = staffList.some(staffPair => {
      const colonIndex = staffPair.indexOf(':');
      if (colonIndex === -1) return false;
      const envUser = staffPair.substring(0, colonIndex).trim();
      const envPass = staffPair.substring(colonIndex + 1).trim();
      return envUser === username.trim() && envPass === password;
      // NOTE: do NOT trim password from user input — only trim env value
    });

    if (!isValidUser) {
      return NextResponse.json({ error: 'Invalid Credentials' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.LOGIN_SECRET);
    const token = await new SignJWT({ username: username.trim() })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('8h')
      .sign(secret);

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set({
      name: 'staff_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',        // changed from 'strict' to 'lax' — fixes redirect loop
      maxAge: 60 * 60 * 8,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}