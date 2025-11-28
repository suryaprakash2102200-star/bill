// Currency formatter for Indian Rupees
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '₹0.00';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format number in Indian numbering system (lakhs, crores)
export const formatIndianNumber = (num) => {
  if (!num && num !== 0) return '0';
  
  const x = num.toString();
  const lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  
  if (otherNumbers !== '') {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  }
  
  return lastThree;
};

// Simple currency symbol
export const CURRENCY_SYMBOL = '₹';
export const CURRENCY_CODE = 'INR';

// Formatter specifically for PDF generation (uses Rs. instead of symbol to avoid font issues)
export const formatCurrencyForPDF = (amount) => {
  if (!amount && amount !== 0) return 'Rs. 0.00';
  
  const numberPart = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  
  return `Rs. ${numberPart}`;
};
