'use client';

import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { FiSave, FiUser, FiCamera } from 'react-icons/fi';
import styles from './page.module.css';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: 'Admin User',
    email: 'admin@billgen.com',
    phone: '+91 98765 43210',
    role: 'Administrator',
    bio: 'Managing billing and invoices.',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  const handleSave = () => {
    // In a real app, this would save to database
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
            <h1 className={styles.title}>My Profile</h1>
            <p className={styles.subtitle}>Manage your personal information and account settings.</p>
          </div>
        </div>

        <div className={styles.content}>
          {/* Profile Header */}
          <div className={styles.profileHeader}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                <FiUser size={40} />
              </div>
              <button className={styles.changePhotoBtn}>
                <FiCamera size={16} />
              </button>
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>{profile.fullName}</h2>
              <p className={styles.profileRole}>{profile.role}</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className={styles.formSection}>
            <div className={styles.formGrid}>
              <Input
                label="Full Name"
                value={profile.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
              />
              <Input
                label="Email Address"
                type="email"
                value={profile.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              <Input
                label="Phone Number"
                value={profile.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              <Input
                label="Role"
                value={profile.role}
                disabled={true}
              />
            </div>
            
            <div className={styles.bioSection}>
              <label className={styles.label}>Bio</label>
              <textarea
                className={styles.textarea}
                value={profile.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                rows={4}
              />
            </div>

            <div className={styles.actions}>
              {saved && (
                <span className={styles.savedMessage}>✓ Profile updated successfully!</span>
              )}
              <Button variant="primary" icon={<FiSave />} onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
