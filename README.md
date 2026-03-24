# Food Ordering System

Full-stack food ordering platform with customer ordering, real-time order tracking, and an admin dashboard. Supports **Stripe card payments** and **optional Web3 payments** on Ethereum Sepolia.

---

## 1. What You Can Do

### For Customers

- Sign up, sign in, and manage your profile
- Browse food items grouped by category
- Search for specific dishes
- Add items to a cart and update quantities
- Place orders using **Stripe card payments** or **Web3 (Ethereum)**
- Track order status in real time
- View full order history with status updates

### For Admins

- Access a dedicated admin dashboard
- Manage orders (view, update status, track history)
- Manage menu items (add, edit, delete)
- View sales analytics with charts and metrics
- Manage users (view and moderate accounts)

---

## 2. Tech Stack

### Frontend

- React.js
- Redux Toolkit (state management)
- Tailwind CSS (styling)
- Framer Motion (animations)
- React Router (navigation)
- Axios (API client)
- **Stripe.js & React-Stripe.js** (card payments)

### Backend

- Node.js
- Express.js
- MySQL with Sequelize ORM
- JWT (authentication)
- Multer (file uploads)
- **Stripe API** (payment processing)

---

## 3. Project Structure (High-Level)

```bash
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── store/          # Redux store/configuration
│   │   ├── dashboard/      # Admin dashboard UI
│   │   └── utils/          # Shared utilities
│   └── public/             # Static assets
│
└── server/                 # Backend Node.js application
    ├── controllers/        # Request handlers
    ├── models/             # Sequelize models
    ├── routes/             # API routes
    ├── middlewares/        # Auth & other middlewares
    └── migrations/         # Database migrations
```

---

## 4. Getting Started (Interactive Walkthrough)

### 4.1 Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- MySQL server running locally or accessible remotely
- **Stripe account** (for card payments) – [Sign up free](https://stripe.com)
- Optional: MetaMask browser extension (for Web3 payments)

### 4.2 Clone the Repository

```bash
git clone <repo-url>
cd Food-Ordering-System
```

### 4.3 Install Dependencies

From the project root:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

## 5. Backend Setup (Server)

### 5.1 Configure Environment Variables

Create a `.env` file inside the `server/` folder and provide your MySQL and Stripe credentials. The Sequelize config in
`server/config/config.js` expects variables like:

- `DB_USERNAME_DEV`, `DB_PASSWORD_DEV`, `DB_DATABASE_DEV`, `DB_HOST_DEV`, `DB_PORT_DEV`
- `STRIPE_SECRET_KEY` (from your Stripe dashboard)

You can open `server/config/config.js` to see the full list of variables used for development and production and set them accordingly.

### 5.2 Run Database Migrations & Seeders

From `server/`:

```bash
# Run migrations
npx sequelize-cli db:migrate

# (Optional) Seed initial data (e.g., admin user)
npx sequelize-cli db:seed:all
```

### 5.3 Start the Backend Server

From `server/`:

```bash
# Development mode (with nodemon)
npm run dev

# Or production style
npm start
```

By default, the API usually runs on `http://localhost:<port>` (check `server/index.js` or `server/app.js` for the exact port).

---

## 6. Frontend Setup (Client)

### 6.1 Configure Environment

Create a `.env` file in `client/` with:

```
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_publishable_key_here
REACT_APP_API_URL=http://localhost:5000
```

### 6.2 Start the React App

From `client/`:

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

The development server typically runs at `http://localhost:3000`.

---

## 7. Stripe Setup (Card Payments)

This application supports Stripe for secure card payments. Follow these steps to enable card payments.

For backend-only details, see [server/STRIPE_SETUP.md](server/STRIPE_SETUP.md).

### 7.1 Get Your Stripe Keys

1. Sign up or log in at [Stripe Dashboard](https://dashboard.stripe.com).
2. Go to **Developers** > **API Keys** in the left sidebar.
3. Copy your **Publishable Key** (starts with `pk_test_`) and **Secret Key** (starts with `sk_test_`).

### 7.2 Configure Stripe Keys

**Backend (`server/.env`):**

```
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

**Frontend (`client/.env`):**

```
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_publishable_key_here
```

### 7.3 Making a Test Payment

1. Add items to your cart and proceed to checkout.
2. Click **"Pay with Card"** on the payment method selection screen.
3. Use Stripe's test card: `4242 4242 4242 4242`
4. Enter any future expiry date (e.g., `12/25`) and any 3-digit CVC.
5. Complete the payment and confirm your order.

For detailed frontend setup, see [client/STRIPE_FRONTEND_SETUP.md](client/STRIPE_FRONTEND_SETUP.md).

---

## 8. Web3 Integration Guide (Sepolia Testnet)

This application supports native ETH as a payment method on the Ethereum Sepolia testnet. Follow these steps to set up your wallet and make test payments.

### 8.1 Prerequisites

1. **Install MetaMask**
    - Download and install MetaMask from the [official website](https://metamask.io/).
    - Create a new wallet or import an existing one.

2. **Add Sepolia Network**
    - Visit [Chainlist](https://chainlist.org).
    - Search for "Sepolia".
    - Click **Add to MetaMask** to add the network.

3. **Get Test ETH**
    - Go to the [Google Cloud Ethereum Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia).
    - Request test ETH to your Sepolia wallet address.
    - Wait for the faucet transaction to confirm.

### 8.2 Making a Test Payment

1. Ensure your Sepolia wallet has enough test ETH.
2. In the app, add items to your cart and proceed to checkout.
3. Choose the **"Pay with Ethereum"** payment option.
4. When MetaMask pops up, review and confirm the transaction.
5. Wait for on-chain confirmation.
6. Once confirmed, the order status in the app will update and the order will be processed.

### 8.3 Important Notes

- This is a **testnet-only** integration using test ETH.
- Do **not** send real/mainnet cryptocurrency to testnet addresses.
- Keep your wallet seed phrase and private keys secure.
- Confirmation times depend on Sepolia network conditions and your chosen gas settings.

---

## 9. Next Steps & Customization

- Extend the admin dashboard with new analytics or reports.
- Add more payment methods (e.g., UPI, PayPal, Apple Pay).
- Customize the UI theme and branding in the React components and Tailwind config.
- Harden security (rate limiting, input validation, stricter auth policies) before any production deployment.
