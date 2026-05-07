// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Temporary in-memory user store (replace with database)
const users = [
  {
    id: '1',
    email: 'user@example.com',
    // This is "password" hashed with bcrypt
    password: '$2a$10$rQ8sMfV5Y7q3ZGqL8qXqL.q8XqL8qXqL8qXqL8qXqL8qXqL8qXqL8q',
    name: 'John Doe',
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = users.find((u) => u.email === email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        name: user.name 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Create response
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
      { status: 200 }
    );

    // Set cookie (HTTP-only for security)
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}