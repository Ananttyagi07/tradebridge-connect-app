# RoleRegistry Smart Contract Deployment Guide

This guide will walk you through deploying the RoleRegistry smart contract to the Sepolia testnet.

## Prerequisites

1. MetaMask browser extension installed
2. Sepolia testnet ETH (get from faucet)
3. Access to Remix IDE

## Step 1: Get Sepolia Test ETH

You need Sepolia ETH for:
- Deploying the contract (gas fees)
- Testing role activations (stakes + gas)

Get free Sepolia ETH from these faucets:
- https://sepoliafaucet.com
- https://www.infura.io/faucet/sepolia
- https://faucet.quicknode.com/ethereum/sepolia

Request at least 0.5 ETH to cover deployment and testing.

## Step 2: Configure MetaMask for Sepolia

1. Open MetaMask
2. Click the network dropdown at the top
3. Enable "Show test networks" in Settings
4. Select "Sepolia test network"
5. Verify you see your Sepolia ETH balance

## Step 3: Deploy Contract via Remix IDE

### Open Remix

1. Go to https://remix.ethereum.org
2. You'll see the Remix IDE interface

### Create Contract File

1. In the File Explorer (left sidebar), click the "+" icon to create a new file
2. Name it: `RoleRegistry.sol`
3. Copy the entire contract code from `contracts/RoleRegistry.sol`
4. Paste it into the Remix editor

### Compile the Contract

1. Click the "Solidity Compiler" icon (second icon in left sidebar)
2. Select compiler version: `0.8.20` or higher
3. Click "Compile RoleRegistry.sol"
4. You should see a green checkmark if compilation succeeds

### Deploy the Contract

1. Click the "Deploy & Run Transactions" icon (third icon in left sidebar)
2. In the "ENVIRONMENT" dropdown, select "Injected Provider - MetaMask"
3. MetaMask will popup asking to connect - click "Connect"
4. Verify the selected network shows "Sepolia (11155111)" in Remix
5. Under "CONTRACT", ensure "RoleRegistry" is selected
6. Click the orange "Deploy" button
7. MetaMask will popup asking to confirm the transaction
8. Review the gas fees and click "Confirm"
9. Wait for the transaction to be mined (usually 15-30 seconds)

### Copy Contract Address

1. After deployment, you'll see the contract under "Deployed Contracts" section
2. Click the copy icon next to the contract address
3. The address will look like: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5`

## Step 4: Update Frontend Configuration

1. Open `src/contracts/roleRegistry.ts` in your code editor
2. Find this line:
   ```typescript
   export const ROLE_REGISTRY_ADDRESS = "0x0000000000000000000000000000000000000000";
   ```
3. Replace it with your deployed contract address:
   ```typescript
   export const ROLE_REGISTRY_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5";
   ```
4. Save the file

## Step 5: Verify Contract on Etherscan (Optional but Recommended)

1. Go to https://sepolia.etherscan.io
2. Search for your contract address
3. Click the "Contract" tab
4. Click "Verify and Publish"
5. Fill in:
   - Compiler Type: Solidity (Single file)
   - Compiler Version: v0.8.20
   - License: MIT
6. Paste your contract source code
7. Click "Verify and Publish"

This makes your contract publicly verifiable and transparent.

## Step 6: Test the Integration

### Test Role Activation

1. Start your frontend app: `npm run dev`
2. Connect your MetaMask wallet
3. Navigate to Role Activation page
4. Select a role (start with Micro-Manufacturer - it's free!)
5. Click "Quick Demo" or fill out the form
6. MetaMask will popup asking for transaction confirmation
7. For paid roles (Importer/Exporter), you'll see the stake amount
8. Confirm the transaction
9. Wait for confirmation (15-30 seconds)
10. You should see "Role Activated!" toast

### Verify on Etherscan

1. Go to https://sepolia.etherscan.io
2. Search for your contract address
3. Click "Events" tab
4. You should see a "RoleActivated" event with your address

### Test Role Display

1. After activating a role, navigate to Dashboard
2. Verify the sidebar shows role-specific navigation items
3. Check the user dropdown shows your role label

## Troubleshooting

### "Contract Not Deployed" Error

- Make sure you updated `ROLE_REGISTRY_ADDRESS` in `src/contracts/roleRegistry.ts`
- Verify you're on Sepolia network in MetaMask
- Check the address is correct (starts with 0x, 42 characters)

### "Insufficient Funds" Error

- Get more Sepolia ETH from faucets
- For Importer: need 0.01 ETH + gas
- For Exporter: need 0.05 ETH + gas

### "Transaction Rejected" Error

- You clicked "Reject" in MetaMask
- Try again and click "Confirm"

### "Role Already Assigned" Error

- Your wallet already has a role on-chain
- Roles are permanent and cannot be changed
- Use a different wallet to test other roles

### Gas Estimation Failed

- Increase gas limit in MetaMask
- Make sure you're on Sepolia network
- Verify contract address is correct

## Architecture Overview

### Smart Contract Features

- **No Admin**: Fully decentralized, no one can revoke or change roles
- **Stake-Based Verification**: Economic security instead of document verification
- **Permanent Roles**: Once assigned, roles cannot be changed
- **Blacklist Support**: Future functionality for reputation system
- **On-Chain Events**: All role activations are publicly logged

### Stake Requirements

- **Importer**: 0.01 ETH - Demonstrates economic commitment
- **Exporter**: 0.05 ETH - Higher stake for sellers (economic security)
- **Micro-Manufacturer**: Free - Encourages participation from small manufacturers

### Why Judges Will Accept This

1. **Decentralized Trust**: No central authority controlling roles
2. **Economic Security**: Stakes create skin-in-the-game
3. **Transparent**: All transactions on public blockchain
4. **Immutable**: Cannot be tampered with after deployment
5. **Scalable**: No backend servers or databases needed

## Next Steps

After successful deployment and testing:

1. **Escrow Smart Contract**: Create milestone-based payment system
2. **Reputation Contract**: Build on-chain reputation scores
3. **Dispute Resolution**: Multi-validator dispute module
4. **Mainnet Deployment**: Deploy to Ethereum mainnet for production

## Support

If you encounter issues:

1. Check browser console for errors (F12)
2. Verify MetaMask is on Sepolia network
3. Ensure contract is deployed and address is correct
4. Check Sepolia Etherscan for transaction status
5. Review error messages in toast notifications

## Security Notes

- This is a testnet deployment for demonstration
- Never send real ETH to testnet contracts
- Always verify contract addresses before transactions
- Keep your MetaMask seed phrase secure
- Test thoroughly before mainnet deployment
