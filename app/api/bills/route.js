import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Bill from '@/models/Bill';
import jwt from 'jsonwebtoken';

// Helper to get user from token
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

// GET all bills
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    const user = getUser(request);
    
    // Build query
    let query = {};
    
    // RBAC: If not admin, only show own bills
    if (!user) {
       // Allow public access for now if no token, OR return 401?
       // The user requested "user view them data only".
       // If we return 401 here, the frontend must handle it.
       // Let's return 401 to enforce auth.
       return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 });
    }
    
    if (user.role !== 'admin') {
      query.userId = user.id;
    }

    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { billNumber: { $regex: search, $options: 'i' } },
        { 'customer.name': { $regex: search, $options: 'i' } },
      ];
    }
    
    const bills = await Bill.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: bills });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create new bill
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const user = getUser(request);
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 });
    }

    // Generate Bill Number (INV-YYYY-MM-XXX)
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const prefix = `INV-${year}-${month}-`;
    
    // Find last bill number with this prefix
    const lastBill = await Bill.findOne({ billNumber: { $regex: `^${prefix}` } })
      .sort({ billNumber: -1 });
      
    let nextNum = 1;
    if (lastBill) {
      const parts = lastBill.billNumber.split('-');
      nextNum = parseInt(parts[parts.length - 1]) + 1;
    }
    
    data.billNumber = `${prefix}${String(nextNum).padStart(3, '0')}`;
    
    // Calculate totals
    if (data.items) {
      data.subtotal = data.items.reduce((sum, item) => sum + item.amount, 0);
      data.taxAmount = (data.subtotal * (data.taxRate || 0)) / 100;
      data.grandTotal = data.subtotal + data.taxAmount - (data.discount || 0);
    }
    
    // Attach user ID
    data.userId = user.id;
    
    const bill = await Bill.create(data);
    
    return NextResponse.json({ success: true, data: bill }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
