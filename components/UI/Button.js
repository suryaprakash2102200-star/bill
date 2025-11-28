import styles from './Button.module.css';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  disabled = false,
  icon,
  fullWidth = false 
}) {
  const variantClass = styles[variant] || styles.primary;
  const widthClass = fullWidth ? styles.fullWidth : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${variantClass} ${widthClass}`}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}
