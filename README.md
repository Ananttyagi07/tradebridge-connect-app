# TradeChain

## A Fully Decentralized B2B Global Trade Platform

TradeChain is a **fully decentralized, serverless, blockchain-native B2B trade platform** designed to connect **Importers, Exporters, Manufacturers, and Micro‑Manufacturers** in a trust‑minimized, transparent, and peer‑to‑peer manner.

Unlike traditional platforms like Alibaba or IndiaMART that rely on centralized control, TradeChain uses **smart contracts, on‑chain identity, decentralized escrow, and IPFS storage** to eliminate middlemen and enable fair global trade.

---

## 🚀 Vision

> Build a trust‑first, censorship‑resistant, and transparent global trade network where:
>
> * Wallet = Identity
> * Smart Contracts = Rules & Enforcement
> * Blockchain = Source of Truth
> * No single company controls user access or funds

---

## 🧩 Core Problems We Solve

* ❌ Fake suppliers & scam buyers
* ❌ No transparency in order fulfillment
* ❌ Centralized escrow & payment abuse
* ❌ Micro‑manufacturers excluded from global trade
* ❌ No portable reputation across platforms

---

## ✅ TradeChain Solution

TradeChain introduces:

* **On‑chain Role Verification** (no admin approval)
* **Smart‑Contract Escrow** (milestone‑based payments)
* **Decentralized Product Listings**
* **Micro‑Manufacturer Collaboration Model**
* **On‑chain Reputation System**
* **IPFS‑based product & document storage**

---

## 🏗️ Platform Roles

### 1️⃣ Importer

* Browse verified exporter products
* Request samples
* Create purchase orders
* Fund smart‑contract escrow
* Approve milestones to release payments

### 2️⃣ Exporter

* List products on‑chain
* Accept importer orders
* Manage fulfillment capacity
* Collaborate with micro‑manufacturers
* Distribute orders across suppliers

### 3️⃣ Manufacturer

* Produce goods at scale
* Track production milestones
* Maintain quality metrics

### 4️⃣ Micro‑Manufacturer

* Participate without minimum order barriers
* Receive collaboration requests
* Submit samples
* Fulfill partial orders
* Build on‑chain reputation

---

## 🔐 Authentication & Identity

* **No email / password login**
* **Wallet‑based authentication only**
* MetaMask / WalletConnect
* One wallet = one on‑chain identity

---

## 🧠 Role Activation (Decentralized)

Roles are assigned via the `RoleRegistry` smart contract using **economic verification** instead of documents.

| Role               | Requirement    |
| ------------------ | -------------- |
| Micro‑Manufacturer | Free           |
| Importer           | 0.01 ETH stake |
| Exporter           | 0.05 ETH stake |

Once activated:

* Role is permanent
* Publicly verifiable
* Cannot be revoked by any admin

---

## 🔁 High‑Level Workflow

### 🔹 Step 1: Wallet Connection
<img width="1842" height="1002" alt="image" src="https://github.com/user-attachments/assets/4212cbea-c07a-43f8-accc-853d03c8ce30" />


User connects wallet → identity established

### 🔹 Step 2: Role Activation
<img width="1839" height="964" alt="image" src="https://github.com/user-attachments/assets/50ae35f2-a725-4380-966b-2e4d24376846" />


User selects role → smart contract verifies eligibility

### 🔹 Step 3: Product Listing (Exporter)

Exporter uploads product data + images → stored on IPFS

### 🔹 Step 4: Discovery (Importer)

Importer browses products → requests samples

### 🔹 Step 5: Order Creation

Importer creates order → funds escrow smart contract

### 🔹 Step 6: Collaboration

Exporter splits order → assigns micro‑manufacturers

### 🔹 Step 7: Fulfillment & Quality

Samples → production → inspection

### 🔹 Step 8: Milestone Payments

Importer approvals → automatic escrow release

---

## 🖼️ Architecture Diagrams

> 📌 **Add diagrams in this section**

```
/docs/diagrams/
├── system-architecture.png
├── role-workflow.png
├── smart-contract-flow.png
├── escrow-state-machine.png
```

---

## 📦 Smart Contract Architecture

### 1️⃣ RoleRegistry.sol

* Manages role activation
* Stake‑based verification
* No admin control

### 2️⃣ ProductRegistry.sol (Planned)

* Exporter product listings
* IPFS CIDs for images & metadata

### 3️⃣ OrderEscrow.sol (Planned)

* Milestone‑based escrow
* P2P payments

### 4️⃣ Collaboration.sol (Planned)

* Exporter ↔ Micro‑Manufacturer workflow

---

## 🗂️ IPFS & Pinata Usage

* Product images
* Certificates
* Sample reports
* Quality documents

Stored via **Pinata** → referenced on‑chain using CID hashes.

---

## 🛠️ Tech Stack

### Frontend

* React + Vite
* TypeScript
* Tailwind CSS
* Ethers.js v6

### Blockchain

* Ethereum (Sepolia Testnet)
* Solidity (v0.8.x)
* Smart Contracts

### Storage

* IPFS
* Pinata

### Wallets

* MetaMask
* WalletConnect (planned)

---

## 📁 Project Structure

```
TradeChain/
├── contracts/
│   ├── RoleRegistry.sol
│   ├── ProductRegistry.sol
│   ├── OrderEscrow.sol
│
├── src/
│   ├── contracts/
│   ├── pages/
│   ├── components/
│   ├── context/
│   └── utils/
│
├── docs/
│   ├── diagrams/
│   └── architecture.md
│
├── README.md
└── DEPLOYMENT.md
```

---

## 🧪 Local Development

```bash
npm install
npm run dev
```

---

## 🌍 Deployment

* Smart contracts deployed via Remix
* Frontend hosted statically
* No backend servers required

See **DEPLOYMENT.md** for full instructions.

---

## 🧠 Why TradeChain Is Truly Decentralized

* No centralized login
* No backend database
* No admin approval system
* No custody of user funds
* All logic enforced by smart contracts

---

## 🏆 Hackathon Relevance

TradeChain aligns with:

* Web3‑native architecture
* P2P systems
* Decentralized finance
* Real‑world blockchain use case
* Social impact (micro‑manufacturers)

---

## 📌 Future Enhancements

* DAO‑based dispute resolution
* Validator‑based arbitration
* On‑chain reputation scoring
* Cross‑chain support
* AI‑assisted supplier discovery

---

## 👤 Author

**Path-Finders**
**Anant Tyagi**
**Ayush Kumar**
**kushargh mishra**

> Building the future of decentralized global trade.

---

## 📄 License

MIT License
