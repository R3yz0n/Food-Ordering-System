# Stripe Payment Backend Setup

Backend setup for Stripe payment endpoints in this project.

## 1. Install Dependencies

```bash
cd server
npm install
```

## 2. Configure Environment Variables

Create or update `server/.env`:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

Get keys from Stripe dashboard:

- API keys: https://dashboard.stripe.com/apikeys
- Webhooks: https://dashboard.stripe.com/webhooks

## 3. Run Migrations

```bash
npx sequelize-cli db:migrate
```

This project stores Stripe payment data in `orders` (payment intent, payment status, method, customer id).

## 4. Start the Backend

```bash
npm run dev
```

## 5. Available Payment Endpoints

All endpoints are prefixed with `/payment`.

- `POST /create-payment-intent` (auth required)
- `POST /confirm-payment` (auth required)
- `GET /status/:paymentIntentId` (auth required)
- `POST /refund` (auth required)
- `POST /webhook` (public)

## 6. Webhook Events Handled

- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `payment_intent.canceled`
- `charge.refunded`

## 7. Local Webhook Testing (Optional)

```bash
stripe login
stripe listen --forward-to localhost:5000/payment/webhook
```

Copy the printed webhook secret into `STRIPE_WEBHOOK_SECRET`.

## 8. Test Cards

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

Use any future expiry date and any CVC.
