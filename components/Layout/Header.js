'use client';

import { FiSearch, FiPlus, FiUser, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Button from '../UI/Button';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  return (
    <header className={styles.header}>
      <div className={styles.searchBar}>
        <FiSearch className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Search for bills or clients..." 
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.actions}>
        {user ? (
          <>
            <Button 
              variant="primary" 
              icon={<FiPlus />}
              onClick={() => router.push('/bills/new')}
            >
              Create New Bill
            </Button>
            
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name}</span>
              <div className={styles.userAvatar} onClick={() => router.push('/profile')} style={{ cursor: 'pointer' }} title="Profile">
                <FiUser />
              </div>
              <button onClick={logout} className={styles.logoutBtn} title="Logout">
                <FiLogOut />
              </button>
            </div>
          </>
        ) : (
          <Button 
            variant="primary" 
            onClick={() => router.push('/login')}
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
