# Paystack SDK

[![npm version](https://img.shields.io/npm/v/paystack-sdk)](https://www.npmjs.com/package/paystack-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Modern TypeScript SDK for the [Paystack](https://paystack.com) payments API.** Full type safety, Promise-based, covers 18+ API modules — transactions, transfers, customers, subscriptions, settlements, and more.

> Built because existing Paystack libraries were untyped, abandoned, or lagging behind the API. This is the one you install when you need reliability in production.

## Quick Start

```bash
npm install @delivast/paystack-sdk
# or
yarn add @delivast/paystack-sdk
```

```ts
import Paystack from '@delivast/paystack-sdk';

const paystack = new Paystack('sk_live_...');

// Initialize a transaction
const initialized = await paystack.transaction.initialize({
  email: 'customer@example.com',
  amount: '500000',
});

// Verify a transaction
const tx = await paystack.transaction.verify('tx_ref_abc123');

// Card pre-authorization (ZAR)
const hold = await paystack.preAuthorization.initialize({
  email: 'customer@example.com',
  amount: '1000',
  currency: 'ZAR',
  expire_after_days: 3,
  expire_action: 'release',
});
```

## Supported Modules

| Module | Status | Module | Status |
|--------|:---:|--------|:---:|
| Transactions | ✅ | Transfers | ✅ |
| Customers | ✅ | Transfer Recipients | ✅ |
| Plans | ✅ | Subaccounts | ✅ |
| Subscriptions | ✅ | Transaction Splits | ✅ |
| Charge | ✅ | Settlements | ✅ |
| Refunds | ✅ | Invoices | ✅ |
| Verification | ✅ | Bulk Charges | ✅ |
| Apple Pay | ✅ | Dedicated Virtual Accounts | ✅ |
| Miscellaneous | ✅ | Transfers Control | ✅ |
| PreAuthorization | ✅ | Direct Debit | ✅ |
| Disputes | ✅ | Payment Requests | ✅ |
| Terminals | ✅ | Virtual Terminals | ✅ |

## License

MIT
