'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  FiHome, 
  FiFileText, 
  FiUsers, 
  FiBarChart2, 
  FiSettings, 
  FiHelpCircle 
} from 'react-icons/fi';
import styles from './Sidebar.module.css';

const navItems = [
  { name: 'Dashboard', icon: <FiHome />, path: '/' },
  { name: 'Bills', icon: <FiFileText />, path: '/bills' },
  { name: 'Clients', icon: <FiUsers />, path: '/clients' },
  { name: 'Reports', icon: <FiBarChart2 />, path: '/reports' },
  { name: 'Settings', icon: <FiSettings />, path: '/settings' },
  { name: 'Help', icon: <FiHelpCircle />, path: '/help' },
];

export default function Sidebar() {
  const pathname = usePathname();
  
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <FiFileText size={24} />
        </div>
        <span className={styles.logoText}>BillGen</span>
      </div>
      
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.path || 
            (item.path !== '/' && pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navText}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
