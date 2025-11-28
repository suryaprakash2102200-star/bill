import styles from './StatsCard.module.css';

export default function StatsCard({ title, value, change, icon, trend = 'up' }) {
  const trendClass = trend === 'up' ? styles.trendUp : styles.trendDown;
  
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      
      <div className={styles.value}>{value}</div>
      
      {change !== undefined && (
        <div className={`${styles.change} ${trendClass}`}>
          <span className={styles.changeIcon}>{trend === 'up' ? '↑' : '↓'}</span>
          <span>{Math.abs(change).toFixed(1)}%</span>
        </div>
      )}
    </div>
  );
}
