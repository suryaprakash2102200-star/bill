# Bill Generator - Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/billgenerator
# Or use MongoDB Atlas connection string:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/billgenerator?retryWrites=true&w=majority

NEXT_PUBLIC_COMPANY_NAME=BillGen Inc.
NEXT_PUBLIC_COMPANY_ADDRESS=456 Innovation Drive, Tech Park, Suite 200
NEXT_PUBLIC_COMPANY_PHONE=+1 (555) 123-4567
NEXT_PUBLIC_COMPANY_EMAIL=info@billgen.com
```

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use the connection string: `mongodb://localhost:27017/billgenerator`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Replace in `.env.local`

## Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
