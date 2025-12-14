import { ethers } from 'ethers';

// TODO: Replace with deployed contract address
export const ORDER_ADDRESS = "0x0000000000000000000000000000000000000000";

export const ORDER_ABI = [
  // Write functions
  "function placeOrder(address exporter, uint256 productId, string productName, uint256 quantity, uint256 pricePerUnit) payable returns (uint256)",
  "function confirmOrder(uint256 orderId)",
  "function updateOrderStatus(uint256 orderId, uint8 status)",
  "function addShippingDetails(uint256 orderId, string shippingIpfsHash)",
  "function confirmDelivery(uint256 orderId)",
  "function cancelOrder(uint256 orderId)",

  // View functions
  "function getOrder(uint256 orderId) view returns (tuple(uint256 id, address importer, address exporter, uint256 productId, string productName, uint256 quantity, uint256 pricePerUnit, uint256 totalPrice, uint8 status, string shippingDetails, uint256 createdAt, uint256 updatedAt))",
  "function getImporterOrders(address importer) view returns (uint256[])",
  "function getExporterOrders(address exporter) view returns (uint256[])",
  "function getPendingOrders(address exporter) view returns (uint256[])",
  "function getEscrowAmount(uint256 orderId) view returns (uint256)",
  "function getTotalOrders() view returns (uint256)",

  // Events
  "event OrderPlaced(uint256 indexed orderId, address indexed importer, address indexed exporter, uint256 productId, uint256 quantity, uint256 totalPrice)",
  "event OrderConfirmed(uint256 indexed orderId)",
  "event OrderStatusUpdated(uint256 indexed orderId, uint8 status)",
  "event OrderDelivered(uint256 indexed orderId)",
  "event PaymentReleased(uint256 indexed orderId, uint256 amount)",
  "event OrderCancelled(uint256 indexed orderId)",
  "event RefundIssued(uint256 indexed orderId, uint256 amount)"
];

export enum OrderStatus {
  PENDING = 0,
  CONFIRMED = 1,
  IN_PRODUCTION = 2,
  SHIPPED = 3,
  DELIVERED = 4,
  CANCELLED = 5,
  DISPUTED = 6
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'Pending',
  [OrderStatus.CONFIRMED]: 'Confirmed',
  [OrderStatus.IN_PRODUCTION]: 'In Production',
  [OrderStatus.SHIPPED]: 'Shipped',
  [OrderStatus.DELIVERED]: 'Delivered',
  [OrderStatus.CANCELLED]: 'Cancelled',
  [OrderStatus.DISPUTED]: 'Disputed'
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'text-yellow-500',
  [OrderStatus.CONFIRMED]: 'text-blue-500',
  [OrderStatus.IN_PRODUCTION]: 'text-purple-500',
  [OrderStatus.SHIPPED]: 'text-indigo-500',
  [OrderStatus.DELIVERED]: 'text-green-500',
  [OrderStatus.CANCELLED]: 'text-red-500',
  [OrderStatus.DISPUTED]: 'text-orange-500'
};

export interface Order {
  id: bigint;
  importer: string;
  exporter: string;
  productId: bigint;
  productName: string;
  quantity: bigint;
  pricePerUnit: bigint;
  totalPrice: bigint;
  status: OrderStatus;
  shippingDetails: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export function getOrderContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(
    ORDER_ADDRESS,
    ORDER_ABI,
    signerOrProvider
  );
}

export async function placeOrder(
  signer: ethers.Signer,
  exporterAddress: string,
  productId: bigint,
  productName: string,
  quantity: number,
  pricePerUnit: string
) {
  const contract = getOrderContract(signer);
  const totalPrice = ethers.parseEther((Number(pricePerUnit) * quantity).toString());

  const tx = await contract.placeOrder(
    exporterAddress,
    productId,
    productName,
    quantity,
    ethers.parseEther(pricePerUnit),
    { value: totalPrice }
  );

  const receipt = await tx.wait();

  // Extract order ID from event
  const event = receipt.logs.find((log: any) => {
    try {
      const parsed = contract.interface.parseLog(log);
      return parsed?.name === 'OrderPlaced';
    } catch {
      return false;
    }
  });

  if (event) {
    const parsed = contract.interface.parseLog(event);
    return { receipt, orderId: parsed?.args[0] };
  }

  return { receipt, orderId: null };
}

export async function confirmOrder(signer: ethers.Signer, orderId: bigint) {
  const contract = getOrderContract(signer);
  const tx = await contract.confirmOrder(orderId);
  return await tx.wait();
}

export async function updateOrderStatus(
  signer: ethers.Signer,
  orderId: bigint,
  status: OrderStatus
) {
  const contract = getOrderContract(signer);
  const tx = await contract.updateOrderStatus(orderId, status);
  return await tx.wait();
}

export async function addShippingDetails(
  signer: ethers.Signer,
  orderId: bigint,
  shippingIpfsHash: string
) {
  const contract = getOrderContract(signer);
  const tx = await contract.addShippingDetails(orderId, shippingIpfsHash);
  return await tx.wait();
}

export async function confirmDelivery(signer: ethers.Signer, orderId: bigint) {
  const contract = getOrderContract(signer);
  const tx = await contract.confirmDelivery(orderId);
  return await tx.wait();
}

export async function cancelOrder(signer: ethers.Signer, orderId: bigint) {
  const contract = getOrderContract(signer);
  const tx = await contract.cancelOrder(orderId);
  return await tx.wait();
}

export async function getOrder(provider: ethers.Provider, orderId: bigint): Promise<Order> {
  const contract = getOrderContract(provider);
  return await contract.getOrder(orderId);
}

export async function getImporterOrders(
  provider: ethers.Provider,
  importerAddress: string
): Promise<bigint[]> {
  const contract = getOrderContract(provider);
  return await contract.getImporterOrders(importerAddress);
}

export async function getExporterOrders(
  provider: ethers.Provider,
  exporterAddress: string
): Promise<bigint[]> {
  const contract = getOrderContract(provider);
  return await contract.getExporterOrders(exporterAddress);
}

export async function getPendingOrders(
  provider: ethers.Provider,
  exporterAddress: string
): Promise<bigint[]> {
  const contract = getOrderContract(provider);
  return await contract.getPendingOrders(exporterAddress);
}
