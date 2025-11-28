'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout/Layout';
import StatsCard from '@/components/Dashboard/StatsCard';
import RevenueChart from '@/components/Dashboard/RevenueChart';
import StatusBadge from '@/components/UI/StatusBadge';
import Button from '@/components/UI/Button';
import { formatCurrency } from '@/lib/currency';
import { FiFileText, FiDollarSign, FiAlertCircle, FiEye, FiDownload, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import styles from './page.module.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      const result = await response.json();
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>Welcome back, here's an overview of your billing activity.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <StatsCard
            title="Total Bills Generated"
            value={stats?.totalBills?.toLocaleString() || '0'}
            change={5.2}
            icon={<FiFileText />}
            trend="up"
          />
          <StatsCard
            title="Revenue (This Month)"
            value={formatCurrency(stats?.revenueThisMonth || 0)}
            change={stats?.revenueChange || 0}
            icon={<FiDollarSign />}
            trend={stats?.revenueChange >= 0 ? 'up' : 'down'}
          />
          <StatsCard
            title="Outstanding Bills"
            value={stats?.outstandingBills?.toLocaleString() || '0'}
            change={-2.1}
            icon={<FiAlertCircle />}
            trend="down"
          />
        </div>

        {/* Revenue Chart */}
        <div className={styles.chartSection}>
          <RevenueChart data={stats?.monthlyRevenue || []} />
        </div>

        {/* Recent Bills */}
        <div className={styles.recentBills}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Bills</h2>
            <Link href="/bills">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Bill ID</th>
                  <th>Client Name</th>
                  <th>Date Issued</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentBills?.map((bill) => (
                  <tr key={bill._id}>
                    <td className={styles.billId}>
                      <Link href={`/bills/${bill._id}`}>
                        {bill.billNumber}
                      </Link>
                    </td>
                    <td>{bill.customer.name}</td>
                    <td>{format(new Date(bill.billDate), 'MMM dd, yyyy')}</td>
                    <td className={styles.amount}>
                      {formatCurrency(bill.grandTotal)}
                    </td>
                    <td>
                      <StatusBadge status={bill.status} />
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Link href={`/bills/${bill._id}`}>
                          <button className={styles.actionBtn} title="View">
                            <FiEye />
                          </button>
                        </Link>
                        <button className={styles.actionBtn} title="Download">
                          <FiDownload />
                        </button>
                        <button className={styles.actionBtn} title="Delete">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {(!stats?.recentBills || stats.recentBills.length === 0) && (
              <div className={styles.emptyState}>
                <FiFileText size={48} />
                <p>No bills yet</p>
                <Link href="/bills/new">
                  <Button variant="primary">Create Your First Bill</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <h3 className={styles.sectionTitle}>Quick Actions</h3>
          <div className={styles.actionsGrid}>
            <Link href="/bills/new">
              <Button variant="primary" fullWidth>
                Create New Bill
              </Button>
            </Link>
            <Link href="/clients">
              <Button variant="secondary" fullWidth>
                Manage Clients
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
