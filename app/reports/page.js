'use client';

import Layout from '@/components/Layout/Layout';
import styles from './page.module.css';

export default function ReportsPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Reports</h1>
            <p className={styles.subtitle}>View detailed analytics and export reports.</p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.placeholder}>
            <h2>Financial Reports</h2>
            <p>This page will display comprehensive reports including revenue analytics, payment tracking, and exportable financial statements.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
