'use client';

import Layout from '@/components/Layout/Layout';
import { FiBook, FiHelpCircle, FiMail, FiPhone } from 'react-icons/fi';
import styles from './page.module.css';

export default function HelpPage() {
  const faqs = [
    {
      question: 'How do I create a new bill?',
      answer: 'Click on the "Create New Bill" button in the header or navigate to Bills > Create New Bill. Fill in the customer details, add items, and click "Generate Bill".',
    },
    {
      question: 'How do I print an invoice?',
      answer: 'Open any bill and click the "Print" button. This will open the browser print dialog where you can print or save as PDF.',
    },
    {
      question: 'Can I edit a bill after creating it?',
      answer: 'Yes, navigate to the bill you want to edit and make your changes. The bill will be updated automatically.',
    },
    {
      question: 'How do I add my company logo?',
      answer: 'Go to Settings and upload your company logo in the Company Information section. It will appear on all invoices.',
    },
    {
      question: 'How do I change tax rates?',
      answer: 'Go to Settings > Tax Information and update the default tax rate. You can also set custom tax rates for individual bills.',
    },
    {
      question: 'Can I export my bills?',
      answer: 'Yes, you can download individual bills as PDF using the Download button, or export all bills from the Reports page.',
    },
    {
      question: 'How do I track payments?',
      answer: 'Update the bill status to "Paid" once payment is received. You can view all outstanding bills on the Dashboard.',
    },
    {
      question: 'What currency is supported?',
      answer: 'The application uses Indian Rupees (₹) by default. Support for multiple currencies is planned for future updates.',
    },
  ];

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Help & Support</h1>
            <p className={styles.subtitle}>Find answers to common questions and get support.</p>
          </div>
        </div>

        <div className={styles.content}>
          {/* Quick Links */}
          <div className={styles.quickLinks}>
            <div className={styles.linkCard}>
              <div className={styles.linkIcon}>
                <FiBook size={24} />
              </div>
              <h3 className={styles.linkTitle}>Documentation</h3>
              <p className={styles.linkText}>Learn how to use all features</p>
            </div>
            
            <div className={styles.linkCard}>
              <div className={styles.linkIcon}>
                <FiMail size={24} />
              </div>
              <h3 className={styles.linkTitle}>Email Support</h3>
              <p className={styles.linkText}>support@billgen.com</p>
            </div>
            
            <div className={styles.linkCard}>
              <div className={styles.linkIcon}>
                <FiPhone size={24} />
              </div>
              <h3 className={styles.linkTitle}>Phone Support</h3>
              <p className={styles.linkText}>+91 98765 43210</p>
            </div>
          </div>

          {/* FAQs */}
          <div className={styles.faqSection}>
            <h2 className={styles.sectionTitle}>
              <FiHelpCircle /> Frequently Asked Questions
            </h2>
            
            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{faq.question}</h3>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Getting Started */}
          <div className={styles.gettingStarted}>
            <h2 className={styles.sectionTitle}>Getting Started</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Configure Settings</h3>
                  <p className={styles.stepText}>
                    Go to Settings and add your company information, bank details, and tax information.
                  </p>
                </div>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Add Clients</h3>
                  <p className={styles.stepText}>
                    Navigate to Clients page and add your customers' information for quick bill generation.
                  </p>
                </div>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Create Your First Bill</h3>
                  <p className={styles.stepText}>
                    Click "Create New Bill", fill in the details, add items, and generate your invoice!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className={styles.contactSection}>
            <h2 className={styles.sectionTitle}>Still Need Help?</h2>
            <p className={styles.contactText}>
              Our support team is here to help you. Reach out via email or phone, and we'll get back to you as soon as possible.
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FiMail size={20} />
                <span>support@billgen.com</span>
              </div>
              <div className={styles.contactItem}>
                <FiPhone size={20} />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
