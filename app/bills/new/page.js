'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { formatCurrency } from '@/lib/currency';
import { FiPlus, FiTrash2, FiDownload } from 'react-icons/fi';
import styles from './page.module.css';

export default function CreateBillPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    customer: {
      name: '',
      phone: '',
      address: '',
    },
    billDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [
      { description: '', quantity: 1, rate: 0, amount: 0 }
    ],
    taxRate: 0,
    discount: 0,
    notes: '',
  });

  const handleCustomerChange = (field, value) => {
    setFormData({
      ...formData,
      customer: {
        ...formData.customer,
        [field]: value,
      },
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    
    // Calculate amount
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, rate: 0, amount: 0 }],
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = (subtotal * formData.taxRate) / 100;
    const grandTotal = subtotal + taxAmount - formData.discount;
    
    return { subtotal, taxAmount, grandTotal };
  };

  const handleSubmit = async (status = 'unpaid') => {
    setLoading(true);
    
    try {
      const { subtotal, taxAmount, grandTotal } = calculateTotals();
      
      const billData = {
        ...formData,
        subtotal,
        taxAmount,
        grandTotal,
        status,
      };
      
      const response = await fetch('/api/bills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(billData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        router.push(`/bills/${result.data._id}`);
      } else {
        alert('Error creating bill: ' + result.error);
      }
    } catch (error) {
      console.error('Error creating bill:', error);
      alert('Error creating bill');
    } finally {
      setLoading(false);
    }
  };

  const { subtotal, taxAmount, grandTotal } = calculateTotals();

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <nav className={styles.breadcrumb}>
              <span onClick={() => router.push('/')}>Dashboard</span>
              <span>/</span>
              <span onClick={() => router.push('/bills')}>Bills</span>
              <span>/</span>
              <span>Create New Bill</span>
            </nav>
            <h1 className={styles.title}>Create New Bill</h1>
            <p className={styles.subtitle}>Fill in the details below to generate a new invoice.</p>
          </div>
        </div>

        <div className={styles.formContainer}>
          {/* Customer Information */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Customer Information</h2>
            <div className={styles.formGrid}>
              <Input
                label="Customer Name"
                placeholder="Enter customer's full name"
                value={formData.customer.name}
                onChange={(e) => handleCustomerChange('name', e.target.value)}
                required
              />
              <Input
                label="Phone Number"
                placeholder="Enter customer's phone"
                value={formData.customer.phone}
                onChange={(e) => handleCustomerChange('phone', e.target.value)}
              />
            </div>
            <Input
              label="Billing Address"
              placeholder="Enter customer's billing address"
              value={formData.customer.address}
              onChange={(e) => handleCustomerChange('address', e.target.value)}
            />
          </div>

          {/* Bill Details */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Bill Details</h2>
            <div className={styles.formGrid}>
              <Input
                label="Bill Date"
                type="date"
                value={formData.billDate}
                onChange={(e) => setFormData({ ...formData, billDate: e.target.value })}
                required
              />
              <Input
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>

          {/* Items */}
          <div className={styles.section}>
            <div className={styles.itemsHeader}>
              <h2 className={styles.sectionTitle}>Items</h2>
              <Button variant="outline" icon={<FiPlus />} onClick={addItem}>
                Add Item
              </Button>
            </div>

            <div className={styles.itemsTable}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ITEM NAME</th>
                    <th>QUANTITY</th>
                    <th>RATE</th>
                    <th>AMOUNT</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          placeholder="Web Design Services"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          className={styles.tableInput}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                          className={styles.tableInput}
                          min="1"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                          className={styles.tableInput}
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className={styles.amount}>
                        {formatCurrency(item.amount)}
                      </td>
                      <td>
                        {formData.items.length > 1 && (
                          <button
                            className={styles.deleteBtn}
                            onClick={() => removeItem(index)}
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Calculations */}
          <div className={styles.calculationsSection}>
            <div className={styles.notesSection}>
              <h3 className={styles.subsectionTitle}>Notes / Terms & Conditions</h3>
              <textarea
                placeholder="e.g. Payment is due within 30 days."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className={styles.textarea}
                rows={5}
              />
            </div>

            <div className={styles.totalsSection}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              
              <div className={styles.totalRow}>
                <div className={styles.taxInput}>
                  <span>Tax (%)</span>
                  <input
                    type="number"
                    value={formData.taxRate}
                    onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })}
                    className={styles.percentInput}
                    min="0"
                    max="100"
                  />
                </div>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
              
              <div className={styles.totalRow}>
                <div className={styles.taxInput}>
                  <span>Discount ($)</span>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
                    className={styles.percentInput}
                    min="0"
                  />
                </div>
                <span>{formatCurrency(formData.discount)}</span>
              </div>
              
              <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                <span>Grand Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <Button
              variant="secondary"
              onClick={() => handleSubmit('draft')}
              disabled={loading}
            >
              Save as Draft
            </Button>
            <Button
              variant="outline"
              icon={<FiDownload />}
              disabled={loading}
            >
              Download PDF
            </Button>
            <Button
              variant="primary"
              onClick={() => handleSubmit('unpaid')}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Bill'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
