'use client';

import { useState, useEffect, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import Layout from '@/components/Layout/Layout';
import Button from '@/components/UI/Button';
import StatusBadge from '@/components/UI/StatusBadge';
import { FiPrinter, FiDownload, FiShare2, FiFileText } from 'react-icons/fi';
import { format } from 'date-fns';
import { formatCurrency } from '@/lib/currency';
import { generateInvoicePDF } from '@/lib/pdfGenerator';
import styles from './page.module.css';

export default function BillViewPage({ params }) {
  const router = useRouter();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef();
  
  // Unwrap the async params Promise
  const { id } = use(params);

  useEffect(() => {
    if (id) {
      fetchBill();
    }
  }, [id]);

  const fetchBill = async () => {
    try {
      const response = await fetch(`/api/bills/${id}`);
      const result = await response.json();
      if (result.success) {
        setBill(result.data);
      } else {
        alert('Bill not found');
        router.push('/bills');
      }
    } catch (error) {
      console.error('Error fetching bill:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
  });

  const handleDownload = () => {
    try {
      generateInvoicePDF(bill);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Invoice ${bill?.billNumber}`,
        text: `Invoice for ${bill?.customer.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Loading...</div>
      </Layout>
    );
  }

  if (!bill) {
    return (
      <Layout>
        <div className={styles.error}>Bill not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header with Actions */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Invoice #{bill.billNumber}</h1>
            <p className={styles.subtitle}>Here is a preview of the invoice for {bill.customer.name}.</p>
          </div>
          <div className={styles.actions}>
            <Button variant="outline" icon={<FiPrinter />} onClick={handlePrint}>
              Print
            </Button>
            <Button variant="outline" icon={<FiDownload />} onClick={handleDownload}>
              Download
            </Button>
            <Button variant="outline" icon={<FiShare2 />} onClick={handleShare}>
              Share
            </Button>
          </div>
        </div>

        {/* Invoice Preview */}
        <div className={styles.invoiceContainer}>
          <div ref={invoiceRef} className={styles.invoice}>
            {/* Invoice Header */}
            <div className={styles.invoiceHeader}>
              <div className={styles.companyInfo}>
                <div className={styles.logoIcon}>
                  <FiFileText size={28} />
                </div>
                <div>
                  <h2 className={styles.companyName}>
                    {process.env.NEXT_PUBLIC_COMPANY_NAME || 'BillGen Inc.'}
                  </h2>
                  <p className={styles.companyAddress}>
                    {process.env.NEXT_PUBLIC_COMPANY_ADDRESS || '456 Innovation Drive, Tech Park, Suite 200'}
                  </p>
                </div>
              </div>
              
              <div className={styles.invoiceTitle}>
                <h1>INVOICE</h1>
                <p className={styles.invoiceNumber}>#{bill.billNumber}</p>
              </div>
            </div>

            <div className={styles.divider}></div>

            {/* Bill Info */}
            <div className={styles.infoSection}>
              <div>
                <h3 className={styles.infoTitle}>BILLED TO</h3>
                <p className={styles.customerName}>{bill.customer.name}</p>
                {bill.customer.address && (
                  <p className={styles.infoText}>{bill.customer.address}</p>
                )}
                {bill.customer.phone && (
                  <p className={styles.infoText}>{bill.customer.phone}</p>
                )}
              </div>
              
              <div className={styles.billDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Invoice Number</span>
                  <span className={styles.detailValue}>{bill.billNumber}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Date of Issue</span>
                  <span className={styles.detailValue}>
                    {format(new Date(bill.billDate), 'dd MMM yyyy')}
                  </span>
                </div>
                {bill.dueDate && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Due Date</span>
                    <span className={styles.detailValue}>
                      {format(new Date(bill.dueDate), 'dd MMM yyyy')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className={styles.itemsSection}>
              <table className={styles.itemsTable}>
                <thead>
                  <tr>
                    <th>ITEM DESCRIPTION</th>
                    <th>QTY</th>
                    <th>RATE</th>
                    <th>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {bill.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.rate)}</td>
                      <td>{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className={styles.totalsSection}>
              <div className={styles.totalsRows}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>{formatCurrency(bill.subtotal)}</span>
                </div>
                {bill.taxRate > 0 && (
                  <div className={styles.totalRow}>
                    <span>Tax (VAT {bill.taxRate}%)</span>
                    <span>{formatCurrency(bill.taxAmount)}</span>
                  </div>
                )}
                {bill.discount > 0 && (
                  <div className={styles.totalRow}>
                    <span>Discount</span>
                    <span>-{formatCurrency(bill.discount)}</span>
                  </div>
                )}
                <div className={styles.grandTotalRow}>
                  <span>Grand Total</span>
                  <span>{formatCurrency(bill.grandTotal)}</span>
                </div>
              </div>
            </div>

            {/* Notes & Payment Details */}
            <div className={styles.footer}>
              {bill.notes && (
                <div className={styles.notesSection}>
                  <h3 className={styles.footerTitle}>Notes & Terms</h3>
                  <p className={styles.footerText}>{bill.notes}</p>
                </div>
              )}
              
              <div className={styles.paymentSection}>
                <h3 className={styles.footerTitle}>Payment Details</h3>
                <p className={styles.footerText}>
                  Bank: {bill.paymentDetails?.bankName || 'Global Bank Inc.'}
                </p>
                <p className={styles.footerText}>
                  Account #: {bill.paymentDetails?.accountNumber || '123-456-7890'}
                </p>
                <p className={styles.footerText}>
                  SWIFT/BIC: {bill.paymentDetails?.swiftBic || 'GBIUS33'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
