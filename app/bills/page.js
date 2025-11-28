'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout/Layout';
import StatusBadge from '@/components/UI/StatusBadge';
import Button from '@/components/UI/Button';
import { formatCurrency } from '@/lib/currency';
import { generateInvoicePDF } from '@/lib/pdfGenerator';
import { FiPlus, FiSearch, FiFilter, FiEye, FiDownload, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import styles from './page.module.css';

export default function BillsPage() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getAuthHeaders = () => {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    fetchBills();
  }, [statusFilter, searchTerm]);

  const fetchBills = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);
      
      const authHeaders = getAuthHeaders();
      if (!authHeaders.Authorization) {
        setLoading(false);
        alert('Please log in again to view bills.');
        return;
      }

      const response = await fetch(`/api/bills?${params}`, { headers: authHeaders });
      const result = await response.json();
      if (result.success) {
        setBills(result.data);
      }
    } catch (error) {
      console.error('Error fetching bills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this bill? This action cannot be undone.')) return;
    
    try {
      const authHeaders = getAuthHeaders();
      if (!authHeaders.Authorization) {
        alert('Please log in again to delete bills.');
        return;
      }

      const response = await fetch(`/api/bills/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Refresh the list immediately
        setBills(bills.filter(bill => bill._id !== id));
        alert('Bill deleted successfully');
      } else {
        alert('Failed to delete bill: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting bill:', error);
      alert('Error deleting bill. Please try again.');
    }
  };

  const handleDownload = (e, bill) => {
    e.preventDefault(); // Prevent navigation if inside a link
    try {
      generateInvoicePDF(bill);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>All Bills</h1>
            <p className={styles.subtitle}>Manage, track, and view all your invoices in one place.</p>
          </div>
          <Link href="/bills/new">
            <Button variant="primary" icon={<FiPlus />}>
              Create New Bill
            </Button>
          </Link>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBar}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by Bill No. or Customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.filterItem}>
              <FiFilter className={styles.filterIcon} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={styles.select}
              >
                <option value="all">Status: All</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.tableCard}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Bill No</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill._id}>
                    <td className={styles.billNo}>
                      <Link href={`/bills/${bill._id}`}>
                        {bill.billNumber}
                      </Link>
                    </td>
                    <td>{bill.customer.name}</td>
                    <td className={styles.amount}>
                      {formatCurrency(bill.grandTotal)}
                    </td>
                    <td>
                      <StatusBadge status={bill.status} />
                    </td>
                    <td>{format(new Date(bill.billDate), 'MMM dd, yyyy')}</td>
                    <td>
                      <div className={styles.actions}>
                        <Link href={`/bills/${bill._id}`}>
                          <button className={styles.actionBtn} title="View">
                            <FiEye />
                          </button>
                        </Link>
                        <button 
                          className={styles.actionBtn} 
                          title="Download"
                          onClick={(e) => handleDownload(e, bill)}
                        >
                          <FiDownload />
                        </button>
                        <button
                          className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          title="Delete"
                          onClick={() => handleDelete(bill._id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && bills.length === 0 && (
            <div className={styles.emptyState}>
              <FiSearch size={48} />
              <p>No bills found</p>
              <Link href="/bills/new">
                <Button variant="primary">Create Your First Bill</Button>
              </Link>
            </div>
          )}
        </div>

        {bills.length > 0 && (
          <div className={styles.pagination}>
            <p className={styles.resultText}>
              Showing 1 to {bills.length} of {bills.length} results
            </p>
            <div className={styles.paginationBtns}>
              <Button variant="secondary">Previous</Button>
              <Button variant="secondary">Next</Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
