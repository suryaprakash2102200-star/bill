import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatCurrencyForPDF } from '@/lib/currency';
import { format } from 'date-fns';

export const generateInvoicePDF = (bill) => {
  const doc = new jsPDF();
  
  // Add company logo/header
  doc.setFontSize(20);
  doc.setTextColor(43, 124, 255); // Primary blue
  doc.text('INVOICE', 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`#${bill.billNumber}`, 14, 28);
  
  // Company Info (Right side)
  doc.setFontSize(12);
  doc.setTextColor(0);
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'BillGen Inc.';
  const companyAddress = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || '456 Innovation Drive, Tech Park';
  
  doc.text(companyName, 200, 22, { align: 'right' });
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(companyAddress, 200, 28, { align: 'right' });
  
  // Bill To Section
  doc.line(14, 35, 196, 35);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('BILLED TO', 14, 45);
  
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(bill.customer.name, 14, 52);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  if (bill.customer.address) doc.text(bill.customer.address, 14, 58);
  if (bill.customer.phone) doc.text(bill.customer.phone, 14, 64);
  
  // Bill Details (Right side)
  doc.text(`Date: ${format(new Date(bill.billDate), 'dd MMM yyyy')}`, 200, 52, { align: 'right' });
  if (bill.dueDate) {
    doc.text(`Due Date: ${format(new Date(bill.dueDate), 'dd MMM yyyy')}`, 200, 58, { align: 'right' });
  }
  
  // Items Table
  const tableColumn = ["Item Description", "Qty", "Rate", "Amount"];
  const tableRows = [];

  if (bill.items && bill.items.length > 0) {
    bill.items.forEach(item => {
      const itemData = [
        item.description,
        item.quantity,
        formatCurrencyForPDF(item.rate),
        formatCurrencyForPDF(item.amount)
      ];
      tableRows.push(itemData);
    });
  }

  autoTable(doc, {
    startY: 75,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [43, 124, 255], textColor: 255 },
    styles: { fontSize: 10, cellPadding: 3 },
  });
  
  // Totals
  const finalY = doc.lastAutoTable.finalY + 10;
  
  doc.text(`Subtotal:`, 140, finalY);
  doc.text(formatCurrencyForPDF(bill.subtotal), 196, finalY, { align: 'right' });
  
  let currentY = finalY + 6;
  
  if (bill.taxRate > 0) {
    doc.text(`Tax (${bill.taxRate}%):`, 140, currentY);
    doc.text(formatCurrencyForPDF(bill.taxAmount), 196, currentY, { align: 'right' });
    currentY += 6;
  }
  
  if (bill.discount > 0) {
    doc.text(`Discount:`, 140, currentY);
    doc.text(`-${formatCurrencyForPDF(bill.discount)}`, 196, currentY, { align: 'right' });
    currentY += 6;
  }
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Grand Total:`, 140, currentY + 2);
  doc.setTextColor(43, 124, 255);
  doc.text(formatCurrencyForPDF(bill.grandTotal), 196, currentY + 2, { align: 'right' });
  
  // Footer / Notes
  if (bill.notes) {
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'normal');
    doc.text('Notes:', 14, currentY + 20);
    doc.setTextColor(100);
    doc.text(bill.notes, 14, currentY + 26);
  }
  
  const cleanBillNumber = bill.billNumber.replace(/[^a-zA-Z0-9-_]/g, '-');
  doc.save(`Invoice-${cleanBillNumber}.pdf`);
};
