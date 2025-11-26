import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    // Try to connect
    await connectDB();
    
    // Try to count users
    const userCount = await User.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connected successfully!',
      userCount,
      database: 'weather-app',
    });
  } catch (error: any) {
    console.error('MongoDB test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      details: error.toString(),
    }, { status: 500 });
  }
}
