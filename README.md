# BillGen - Professional Invoice & Bill Generator

A modern, full-stack bill generation system built with Next.js, JavaScript, and MongoDB. Create, manage, and track invoices with a beautiful, responsive UI inspired by modern design principles.

## ✨ Features

### 📊 Dashboard
- Real-time analytics and statistics
- Monthly revenue charts
- Recent bills overview
- Quick action buttons

### 📄 Bill Management
- Create new bills with dynamic item entries
- Automatic calculations (subtotal, tax, discount, grand total)
- Edit and delete bills
- Search and filter functionality
- Status tracking (Paid, Unpaid, Overdue, Draft)

### 🖨️ Invoice Preview & Export
- Professional invoice layout
- Print functionality
- PDF download (planned)
- Share via native sharing API

### 👥 Client Management
- Store customer information
- Track billing history
- Quick customer selection

### 🎨 Modern UI/UX
- Clean, professional design
- Responsive layout (mobile-friendly)
- Smooth animations and transitions
- Intuitive navigation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB (local or Atlas cloud)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd d:\Billgenerator\billgen-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/billgenerator
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/billgenerator
   
   NEXT_PUBLIC_COMPANY_NAME=Your Company Name
   NEXT_PUBLIC_COMPANY_ADDRESS=Your Company Address
   NEXT_PUBLIC_COMPANY_PHONE=+1 (555) 123-4567
   NEXT_PUBLIC_COMPANY_EMAIL=info@yourcompany.com
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
billgen-app/
├── app/
│   ├── api/                    # API routes
│   │   ├── bills/             # Bill CRUD endpoints
│   │   ├── clients/           # Client endpoints
│   │   └── dashboard/         # Dashboard stats
│   ├── bills/                 # Bill pages
│   │   ├── [id]/             # View/edit bill
│   │   ├── new/              # Create new bill
│   │   └── page.js           # Bills list
│   ├── clients/              # Clients page
│   ├── reports/              # Reports page
│   ├── settings/             # Settings page
│   ├── help/                 # Help page
│   ├── layout.js             # Root layout
│   ├── page.js               # Dashboard
│   └── globals.css           # Global styles
├── components/
│   ├── Layout/               # Layout components
│   │   ├── Layout.js
│   │   ├── Sidebar.js
│   │   └── Header.js
│   ├── UI/                   # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   └── StatusBadge.js
│   └── Dashboard/            # Dashboard components
│       ├── StatsCard.js
│       └── RevenueChart.js
├── lib/
│   └── mongodb.js            # MongoDB connection
├── models/
│   ├── Bill.js               # Bill schema
│   └── Client.js             # Client schema
└── package.json
```

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Database**: MongoDB with Mongoose ODM
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: React Icons (Feather Icons)
- **Styling**: CSS Modules
- **Print**: react-to-print
- **Date Handling**: date-fns

## 📝 API Endpoints

### Bills
- `GET /api/bills` - Get all bills (with optional filters)
- `POST /api/bills` - Create new bill
- `GET /api/bills/:id` - Get single bill
- `PUT /api/bills/:id` - Update bill
- `DELETE /api/bills/:id` - Delete bill

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create new client

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 💡 Usage

### Creating a Bill

1. Click "Create New Bill" button
2. Fill in customer information
3. Add line items with description, quantity, and rate
4. Amounts are calculated automatically
5. Add tax percentage and discount if needed
6. Add notes or terms
7. Click "Generate Bill" or "Save as Draft"

### Viewing/Printing Bills

1. Navigate to Bills page
2. Click on a bill number to view
3. Use Print, Download, or Share buttons
4. Print directly from browser

### Dashboard Analytics

- View total bills generated
- Track monthly revenue
- Monitor outstanding bills
- See revenue trends over the last 6 months

## 🎨 Design Features

- Color scheme based on professional blue tones
- Glassmorphism effects on cards
- Smooth hover states and transitions
- Responsive grid layouts
- Mobile-optimized sidebar
- Print-friendly invoice layouts

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXT_PUBLIC_COMPANY_NAME` | Your company name | No |
| `NEXT_PUBLIC_COMPANY_ADDRESS` | Your company address | No |
| `NEXT_PUBLIC_COMPANY_PHONE` | Your phone number | No |
| `NEXT_PUBLIC_COMPANY_EMAIL` | Your email address | No |

## 🚧 Future Enhancements

- [ ] Advanced PDF generation with custom templates
- [ ] Email invoices directly to clients
- [ ] Recurring bills/subscriptions
- [ ] Payment gateway integration
- [ ] Multi-currency support
- [ ] User authentication and multi-user support
- [ ] Role-based access control
- [ ] Invoice templates customization
- [ ] Advanced reporting and analytics
- [ ] Export data (CSV, Excel)

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px and above)
- Laptop (1440px)
- Tablet (768px)
- Mobile (375px and below)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your connection string in `.env.local`
- Verify network access if using MongoDB Atlas

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, email support@billgen.com or open an issue in the repository.

---

Built with ❤️ using Next.js and MongoDB
