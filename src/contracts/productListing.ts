import { ethers } from 'ethers';

// TODO: Replace with deployed contract address
export const PRODUCT_LISTING_ADDRESS = "0x0000000000000000000000000000000000000000";

export const PRODUCT_LISTING_ABI = [
  // Write functions
  "function listProduct(string name, string description, string category, uint256 pricePerUnit, uint256 quantity, string ipfsHash) returns (uint256)",
  "function updateProduct(uint256 productId, uint256 pricePerUnit, uint256 quantity)",
  "function deactivateProduct(uint256 productId)",
  "function reduceQuantity(uint256 productId, uint256 quantity)",

  // View functions
  "function getProduct(uint256 productId) view returns (tuple(uint256 id, address exporter, string name, string description, string category, uint256 pricePerUnit, uint256 availableQuantity, string ipfsHash, bool active, uint256 createdAt))",
  "function getExporterProducts(address exporter) view returns (uint256[])",
  "function getAllActiveProducts() view returns (uint256[])",
  "function getProductsByCategory(string category) view returns (uint256[])",
  "function getTotalProducts() view returns (uint256)",

  // Events
  "event ProductListed(uint256 indexed productId, address indexed exporter, string name, uint256 pricePerUnit, uint256 quantity, string ipfsHash)",
  "event ProductUpdated(uint256 indexed productId, uint256 pricePerUnit, uint256 quantity)",
  "event ProductDeactivated(uint256 indexed productId)",
  "event QuantityReduced(uint256 indexed productId, uint256 reducedBy, uint256 newQuantity)"
];

export interface Product {
  id: bigint;
  exporter: string;
  name: string;
  description: string;
  category: string;
  pricePerUnit: bigint;
  availableQuantity: bigint;
  ipfsHash: string;
  active: boolean;
  createdAt: bigint;
}

export function getProductListingContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(
    PRODUCT_LISTING_ADDRESS,
    PRODUCT_LISTING_ABI,
    signerOrProvider
  );
}

export async function listProduct(
  signer: ethers.Signer,
  name: string,
  description: string,
  category: string,
  pricePerUnit: string, // in ETH
  quantity: number,
  ipfsHash: string
) {
  const contract = getProductListingContract(signer);
  const tx = await contract.listProduct(
    name,
    description,
    category,
    ethers.parseEther(pricePerUnit),
    quantity,
    ipfsHash
  );
  const receipt = await tx.wait();

  // Extract product ID from event
  const event = receipt.logs.find((log: any) => {
    try {
      const parsed = contract.interface.parseLog(log);
      return parsed?.name === 'ProductListed';
    } catch {
      return false;
    }
  });

  if (event) {
    const parsed = contract.interface.parseLog(event);
    return { receipt, productId: parsed?.args[0] };
  }

  return { receipt, productId: null };
}

export async function getAllActiveProducts(provider: ethers.Provider): Promise<bigint[]> {
  const contract = getProductListingContract(provider);
  return await contract.getAllActiveProducts();
}

export async function getProduct(provider: ethers.Provider, productId: bigint): Promise<Product> {
  const contract = getProductListingContract(provider);
  return await contract.getProduct(productId);
}

export async function getExporterProducts(provider: ethers.Provider, exporterAddress: string): Promise<bigint[]> {
  const contract = getProductListingContract(provider);
  return await contract.getExporterProducts(exporterAddress);
}

export async function updateProduct(
  signer: ethers.Signer,
  productId: bigint,
  pricePerUnit: string,
  quantity: number
) {
  const contract = getProductListingContract(signer);
  const tx = await contract.updateProduct(
    productId,
    ethers.parseEther(pricePerUnit),
    quantity
  );
  return await tx.wait();
}

export async function deactivateProduct(signer: ethers.Signer, productId: bigint) {
  const contract = getProductListingContract(signer);
  const tx = await contract.deactivateProduct(productId);
  return await tx.wait();
}
