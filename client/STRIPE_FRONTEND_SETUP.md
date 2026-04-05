# Stripe Frontend Setup

Quick setup for Stripe card payments in the React client.

## Setup Steps

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Create `.env` File

Create `.env` in the `client` folder and add:

```env
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_key_here
REACT_APP_API_URL=http://localhost:5000
```

Get your key from: https://dashboard.stripe.com/apikeys

Also make sure the backend Stripe key is configured in `server/.env`:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

### 3. Start the App

```bash
npm run dev
```

App runs at: http://localhost:3000

---

## Test Payment

- Add items to cart -> Proceed to Order -> Select "Card"
- Use card: `4242 4242 4242 4242`
- Any future expiry, any 3-digit CVC
- Click "Pay with Card"

If payment succeeds, an order is created and the cart is cleared.

## What's Been Implemented

- Stripe card payment integration
- Secure payment modal with validation
- Backend payment processing
- Order creation on successful payment
- Cart clearing after payment
