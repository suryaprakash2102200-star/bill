import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Bill from '@/models/Bill';

export async function GET() {
  try {
    await connectDB();
    
    // Get total bills count
    const totalBills = await Bill.countDocuments();
    
    // Get revenue this month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    const monthlyBills = await Bill.find({
      billDate: { $gte: startOfMonth, $lte: endOfMonth },
      status: 'paid',
    });
    
    const revenueThisMonth = monthlyBills.reduce((sum, bill) => sum + bill.grandTotal, 0);
    
    // Get outstanding bills
    const outstandingBills = await Bill.countDocuments({
      status: { $in: ['unpaid', 'overdue'] },
    });
    
    // Get monthly revenue for last 6 months
    const monthlyRevenue = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      
      const bills = await Bill.find({
        billDate: { $gte: monthStart, $lte: monthEnd },
        status: 'paid',
      });
      
      const revenue = bills.reduce((sum, bill) => sum + bill.grandTotal, 0);
      
      monthlyRevenue.push({
        month: monthStart.toLocaleString('default', { month: 'short' }),
        revenue: revenue,
      });
    }
    
    // Get recent bills
    const recentBills = await Bill.find().sort({ createdAt: -1 }).limit(5);
    
    // Calculate previous month metrics for percentage change
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    
    const prevMonthBills = await Bill.find({
      billDate: { $gte: prevMonthStart, $lte: prevMonthEnd },
    });
    
    const prevMonthRevenue = prevMonthBills
      .filter(b => b.status === 'paid')
      .reduce((sum, bill) => sum + bill.grandTotal, 0);
    
    const revenueChange = prevMonthRevenue > 0
      ? ((revenueThisMonth - prevMonthRevenue) / prevMonthRevenue) * 100
      : 0;
    
    return NextResponse.json({
      success: true,
      data: {
        totalBills,
        revenueThisMonth,
        outstandingBills,
        monthlyRevenue,
        recentBills,
        revenueChange,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
