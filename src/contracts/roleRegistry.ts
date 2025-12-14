import { ethers } from 'ethers';

/**
 * RoleRegistry Contract Configuration
 *
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to https://remix.ethereum.org
 * 2. Create new file: RoleRegistry.sol (copy from contracts/RoleRegistry.sol)
 * 3. Compile with Solidity 0.8.20+
 * 4. Deploy to Sepolia testnet via MetaMask
 * 5. Copy deployed contract address and paste below
 * 6. Get Sepolia ETH from: https://sepoliafaucet.com
 */











// Deployed contract address on Sepolia testnet
export const ROLE_REGISTRY_ADDRESS = "0xfceb98B891246844a5d8D3d5da05e21c3749a860";

// Human-readable ABI for ethers.js v6
export const ROLE_REGISTRY_ABI = [
  // Role activation functions
  "function activateImporter() payable",
  "function activateExporter() payable",
  "function activateMicroManufacturer()",

  // View functions
  "function getRole(address user) view returns (uint8)",
  "function hasRole(address user, uint8 role) view returns (bool)",
  "function roles(address user) view returns (uint8)",
  "function blacklisted(address user) view returns (bool)",
  "function getContractBalance() view returns (uint256)",

  // Events
  "event RoleActivated(address indexed user, uint8 role, uint256 stakeAmount)",
  "event RoleRevoked(address indexed user, uint8 previousRole)"
];

// Role enum matching smart contract
export enum Role {
  NONE = 0,
  IMPORTER = 1,
  EXPORTER = 2,
  MICRO_MANUFACTURER = 3
}

// Mapping for UI display
export const ROLE_LABELS: Record<Role, string> = {
  [Role.NONE]: 'user',
  [Role.IMPORTER]: 'importer',
  [Role.EXPORTER]: 'exporter',
  [Role.MICRO_MANUFACTURER]: 'micro-manufacturer'
};

// Reverse mapping from UI role to contract role
export const UI_ROLE_TO_CONTRACT: Record<string, Role> = {
  'user': Role.NONE,
  'importer': Role.IMPORTER,
  'exporter': Role.EXPORTER,
  'micro-manufacturer': Role.MICRO_MANUFACTURER,
  'manufacturer': Role.MICRO_MANUFACTURER // Large manufacturer uses same role
};

// Stake amounts in ETH
export const STAKE_AMOUNTS = {
  [Role.IMPORTER]: '0.01',
  [Role.EXPORTER]: '0.05',
  [Role.MICRO_MANUFACTURER]: '0'
};


/**
 * Get RoleRegistry contract instance
 * @param signerOrProvider Ethers signer or provider
 * @returns Contract instance
 */
export function getRoleRegistryContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  try {
    return new ethers.Contract(
      ROLE_REGISTRY_ADDRESS,
      ROLE_REGISTRY_ABI,
      signerOrProvider
    );
  } catch (error) {
    // Fallback: use the raw address without checksum validation
    console.warn("Address validation failed, using raw address:", error);
    return new ethers.Contract(
      ROLE_REGISTRY_ADDRESS.toLowerCase(),
      ROLE_REGISTRY_ABI,
      signerOrProvider
    );
  }
}

/**
 * Activate importer role with stake
 * @param signer Ethers signer
 * @returns Transaction receipt
 */
export async function activateImporter(signer: ethers.Signer) {
  const contract = getRoleRegistryContract(signer);
  const tx = await contract.activateImporter({
    value: ethers.parseEther(STAKE_AMOUNTS[Role.IMPORTER])
  });
  return await tx.wait();
}

/**
 * Activate exporter role with stake
 * @param signer Ethers signer
 * @returns Transaction receipt
 */
export async function activateExporter(signer: ethers.Signer) {
  const contract = getRoleRegistryContract(signer);
  const tx = await contract.activateExporter({
    value: ethers.parseEther(STAKE_AMOUNTS[Role.EXPORTER])
  });
  return await tx.wait();
}

/**
 * Activate micro-manufacturer role (no stake)
 * @param signer Ethers signer
 * @returns Transaction receipt
 */
export async function activateMicroManufacturer(signer: ethers.Signer) {
  const contract = getRoleRegistryContract(signer);
  const tx = await contract.activateMicroManufacturer();
  return await tx.wait();
}

/**
 * Get user's role from contract
 * @param provider Ethers provider
 * @param address User address
 * @returns Role enum value
 */
export async function getUserRole(provider: ethers.Provider, address: string): Promise<Role> {
  const contract = getRoleRegistryContract(provider);
  const role = await contract.getRole(address);
  return Number(role) as Role;
}

/**
 * Get UI role string from contract role
 * @param provider Ethers provider
 * @param address User address
 * @returns UI role string ('user', 'importer', 'exporter', 'micro-manufacturer')
 */
export async function getUIRole(provider: ethers.Provider, address: string): Promise<string> {
  const contractRole = await getUserRole(provider, address);
  return ROLE_LABELS[contractRole];
}
