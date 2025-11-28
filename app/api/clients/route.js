import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Client from '@/models/Client';
import jwt from 'jsonwebtoken';

const getUser = (request) => {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret');
  } catch (error) {
    return null;
  }
};

export async function GET(request) {
  try {
    await connectDB();
    const user = getUser(request);
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 });
    }

    let query = {};
    if (user.role !== 'admin') {
      query.userId = user.id;
    }

    const clients = await Client.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: clients });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const user = getUser(request);

    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 });
    }

    data.userId = user.id;
    const client = await Client.create(data);
    
    return NextResponse.json({ success: true, data: client }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
