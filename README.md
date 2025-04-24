
# Food Ordering System

A full-stack food ordering application built with React.js and Node.js, featuring user authentication, order management, and an admin dashboard.

## Features

### Customer Features
- User authentication and profile management
- Browse food items by categories
- Search functionality for food items
- Shopping cart management
- Order placement and tracking
- Order history with status updates
- Real-time order status monitoring

### Admin Features
- Comprehensive dashboard
- Order management system
- Food item management (add, edit, delete)
- Order status updates
- Sales analytics with charts
- User management

## Tech Stack

### Frontend
- React.js
- Redux Toolkit for state management
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API requests

### Backend
- Node.js
- Express.js
- MySQL with Sequelize ORM
- JWT for authentication
- Multer for file uploads

## Project Structure

```bash
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── store/        # Redux store configuration
│   │   ├── dashboard/    # Admin dashboard components
│   │   └── utils/        # Utility functions
│   └── public/           # Static files
│
└── server/               # Backend Node.js application
    ├── controllers/      # Request handlers
    ├── models/          # Database models
    ├── routes/          # API routes
    ├── middlewares/     # Custom middlewares
    └── migrations/      # Database migrations
```

## Web3 Integration Guide

This application uses USDT as a payment method on the Base Sepolia testnet network. Follow these steps to set up your wallet and make payments:

### Prerequisites

1. **Install MetaMask**
   - Download and install MetaMask from [MetaMask Official Website](https://metamask.io/)
   - Create a new wallet or import existing one

2. **Add Base Sepolia Network**
   - Visit [Chainlist](https://chainlist.org)
   - Search for "Base Sepolia"
   - Click "Add to MetaMask" to add the network

3. **Get Test ETH**
   - Visit [Chainlink Faucet](https://faucets.chain.link)
   - Request at least 0.01 ETH for Base Sepolia network
   - Wait for the transaction to complete

### Setting up USDT

1. **Add USDT Token to MetaMask**
   - Open MetaMask
   - Click "Import tokens"
   - Add the following contract address:
     ```
     0x323e78f944A9a1FcF3a10efcC5319DBb0bB6e673
     ```

2. **Mint Test USDT**
   - Visit [Base Sepolia USDT Contract](https://sepolia.basescan.org/token/0x323e78f944a9a1fcf3a10efcc5319dbb0bb6e673)
   - Go to "Contract" tab
   - Click "Write Contract"
   - Connect your MetaMask wallet
   - Find the "mint" function
   - Enter your wallet address
   - Use 6 decimals for the amount (e.g., 100000000 for 100 USDT)
   - Click "Execute" and confirm the transaction in MetaMask

### Making Payments

1. Ensure you have sufficient USDT balance
2. Select items and proceed to checkout
3. Confirm the transaction in MetaMask when prompted
4. Wait for transaction confirmation
5. Your order will be processed once the payment is confirmed

### Important Notes

- This is a testnet implementation using test USDT
- Never send real cryptocurrency to testnet addresses
- Keep your wallet credentials secure
- Transaction times may vary based on network conditions

