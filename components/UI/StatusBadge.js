import styles from './StatusBadge.module.css';

export default function StatusBadge({ status }) {
  const statusClass = styles[status?.toLowerCase()] || styles.default;
  
  const statusText = {
    paid: 'Paid',
    unpaid: 'Unpaid',
    overdue: 'Overdue',
    draft: 'Draft'
  };
  
  return (
    <span className={`${styles.badge} ${statusClass}`}>
      {statusText[status?.toLowerCase()] || status}
    </span>
  );
}
