import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Bill from '@/models/Bill';

// GET single bill by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const bill = await Bill.findById(id);
    
    if (!bill) {
      return NextResponse.json(
        { success: false, error: 'Bill not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: bill });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update bill
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await request.json();
    
    // Recalculate totals
    if (data.items) {
      data.subtotal = data.items.reduce((sum, item) => sum + item.amount, 0);
      data.taxAmount = (data.subtotal * (data.taxRate || 0)) / 100;
      data.grandTotal = data.subtotal + data.taxAmount - (data.discount || 0);
    }
    
    const bill = await Bill.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    
    if (!bill) {
      return NextResponse.json(
        { success: false, error: 'Bill not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: bill });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE bill
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const bill = await Bill.findByIdAndDelete(id);
    
    if (!bill) {
      return NextResponse.json(
        { success: false, error: 'Bill not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
