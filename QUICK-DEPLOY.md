# Quick Deployment Guide for MVP Demo

## You Already Deployed ✅
- RoleRegistry: `0xfceb98B891246844a5d8D3d5da05e21c3749a860`

## Now Deploy These 2 Contracts:

### 1. Deploy ProductListing Contract

1. Open Remix: https://remix.ethereum.org
2. Create `ProductListing.sol` (copy from `contracts/ProductListing.sol`)
3. Compile with Solidity 0.8.20+
4. Deploy to Sepolia (make sure MetaMask is on Sepolia!)
5. Copy the deployed address
6. Update `src/contracts/productListing.ts` line 4:
   ```typescript
   export const PRODUCT_LISTING_ADDRESS = "0xYOUR_ADDRESS_HERE";
   ```

### 2. Deploy Order Contract

1. In Remix, create `Order.sol` (copy from `contracts/Order.sol`)
2. Compile
3. Deploy to Sepolia
4. Copy the deployed address
5. Update `src/contracts/order.ts` line 4:
   ```typescript
   export const ORDER_ADDRESS = "0xYOUR_ADDRESS_HERE";
   ```

## Test the Complete MVP Flow

### As Exporter:
1. Activate Exporter role (stake 0.05 ETH)
2. Go to "My Products"
3. Click "Add Product"
4. Fill form & upload product image
5. Confirm transaction in MetaMask
6. Wait for IPFS upload + blockchain confirmation
7. Product appears in your list!

### As Importer (use different wallet):
1. Activate Importer role (stake 0.01 ETH)
2. Go to "Browse Products"
3. See exporter's products
4. Click "Place Order"
5. Enter quantity
6. Confirm transaction (pays with escrow)
7. Order placed!

### Back to Exporter:
1. Go to "Orders"
2. See incoming order from importer
3. Confirm order
4. Update status to "Shipped"

### Back to Importer:
1. See order status updated
2. Confirm delivery
3. Payment released to exporter!

## What's Working Now

✅ **Role Activation** - Stake-based, on-chain, decentralized
✅ **Product Listing** - IPFS images, blockchain catalog
✅ **Product Browsing** - View all active products
✅ **Order Placement** - Escrow payment protection
✅ **Order Management** - Status tracking, delivery confirmation

## MVP Demonstration Script

"This is TradeChain - a fully decentralized B2B marketplace.

1. **No Admin** - Roles activated via stake (economic security)
2. **IPFS Storage** - Product images stored decentrally on IPFS
3. **Smart Escrow** - Buyer protection with automatic payment release
4. **On-Chain History** - All transactions verifiable on blockchain
5. **Real Trade Flow** - Complete workflow from listing to delivery

Let me show you a live trade..."

[Then demo the complete flow above]
