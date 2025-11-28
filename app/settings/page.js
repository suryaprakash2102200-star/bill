'use client';

import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { FiSave } from 'react-icons/fi';
import styles from './page.module.css';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'BillGen Inc.',
    companyAddress: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || '456 Innovation Drive, Tech Park, Suite 200',
    companyPhone: process.env.NEXT_PUBLIC_COMPANY_PHONE || '+91 98765 43210',
    companyEmail: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@billgen.com',
    bankName: 'State Bank of India',
    accountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    gstNumber: '29ABCDE1234F1Z5',
    panNumber: 'ABCDE1234F',
    taxRate: '18',
    invoicePrefix: 'INV',
    invoiceStartNumber: '001',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleSave = () => {
    // In a real app, this would save to database or backend
    localStorage.setItem('billgen_settings', JSON.stringify(settings));
    setSaved(true);
    
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Settings</h1>
            <p className={styles.subtitle}>Configure your company information and billing preferences.</p>
          </div>
        </div>

        <div className={styles.content}>
          {/* Company Information */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Company Information</h2>
            <div className={styles.formGrid}>
              <Input
                label="Company Name"
                value={settings.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="Your Company Name"
              />
              <Input
                label="Phone Number"
                value={settings.companyPhone}
                onChange={(e) => handleChange('companyPhone', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
            <Input
              label="Address"
              value={settings.companyAddress}
              onChange={(e) => handleChange('companyAddress', e.target.value)}
              placeholder="Company Address"
            />
            <Input
              label="Email"
              type="email"
              value={settings.companyEmail}
              onChange={(e) => handleChange('companyEmail', e.target.value)}
              placeholder="info@company.com"
            />
          </div>

          {/* Bank Details */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Bank Details</h2>
            <div className={styles.formGrid}>
              <Input
                label="Bank Name"
                value={settings.bankName}
                onChange={(e) => handleChange('bankName', e.target.value)}
                placeholder="State Bank of India"
              />
              <Input
                label="Account Number"
                value={settings.accountNumber}
                onChange={(e) => handleChange('accountNumber', e.target.value)}
                placeholder="1234567890"
              />
            </div>
            <Input
              label="IFSC Code"
              value={settings.ifscCode}
              onChange={(e) => handleChange('ifscCode', e.target.value)}
              placeholder="SBIN0001234"
            />
          </div>

          {/* Tax Information */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Tax Information</h2>
            <div className={styles.formGrid}>
              <Input
                label="GST Number"
                value={settings.gstNumber}
                onChange={(e) => handleChange('gstNumber', e.target.value)}
                placeholder="29ABCDE1234F1Z5"
              />
              <Input
                label="PAN Number"
                value={settings.panNumber}
                onChange={(e) => handleChange('panNumber', e.target.value)}
                placeholder="ABCDE1234F"
              />
            </div>
            <Input
              label="Default Tax Rate (%)"
              type="number"
              value={settings.taxRate}
              onChange={(e) => handleChange('taxRate', e.target.value)}
              placeholder="18"
            />
          </div>

          {/* Invoice Settings */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Invoice Settings</h2>
            <div className={styles.formGrid}>
              <Input
                label="Invoice Prefix"
                value={settings.invoicePrefix}
                onChange={(e) => handleChange('invoicePrefix', e.target.value)}
                placeholder="INV"
              />
              <Input
                label="Starting Number"
                value={settings.invoiceStartNumber}
                onChange={(e) => handleChange('invoiceStartNumber', e.target.value)}
                placeholder="001"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className={styles.actions}>
            {saved && (
              <span className={styles.savedMessage}>✓ Settings saved successfully!</span>
            )}
            <Button variant="primary" icon={<FiSave />} onClick={handleSave}>
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
