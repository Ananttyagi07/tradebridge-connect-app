import { ethers } from 'ethers';

// TODO: Replace with deployed contract address
export const COLLABORATION_ADDRESS = "0x0000000000000000000000000000000000000000";

export const COLLABORATION_ABI = [
  // Write functions
  "function createRequest(address manufacturer, uint256 productId, string productName, uint256 quantity, uint256 pricePerUnit, string specifications) returns (uint256)",
  "function submitSample(uint256 requestId, string sampleIpfsHash)",
  "function checkQuality(uint256 requestId, bool approved, string notes)",
  "function placeOrder(uint256 requestId, uint256 quantity) payable",
  "function completeOrder(uint256 requestId)",
  "function cancelRequest(uint256 requestId)",

  // View functions
  "function getRequest(uint256 requestId) view returns (tuple(uint256 id, address exporter, address microManufacturer, uint256 productId, string productName, uint256 requestedQuantity, uint256 pricePerUnit, string specifications, uint8 status, string sampleIpfsHash, string qualityNotes, uint256 createdAt, uint256 updatedAt))",
  "function getExporterRequests(address exporter) view returns (uint256[])",
  "function getManufacturerRequests(address manufacturer) view returns (uint256[])",
  "function getPendingRequests(address manufacturer) view returns (uint256[])",
  "function getTotalRequests() view returns (uint256)",

  // Events
  "event RequestCreated(uint256 indexed requestId, address indexed exporter, address indexed microManufacturer, uint256 productId, uint256 quantity)",
  "event SampleSubmitted(uint256 indexed requestId, string sampleIpfsHash)",
  "event QualityChecked(uint256 indexed requestId, bool approved, string notes)",
  "event OrderPlaced(uint256 indexed requestId, uint256 quantity, uint256 totalPrice)",
  "event RequestCancelled(uint256 indexed requestId)"
];

export enum RequestStatus {
  PENDING = 0,
  SAMPLE_SENT = 1,
  QUALITY_APPROVED = 2,
  QUALITY_REJECTED = 3,
  ORDER_PLACED = 4,
  COMPLETED = 5,
  CANCELLED = 6
}

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  [RequestStatus.PENDING]: 'Pending',
  [RequestStatus.SAMPLE_SENT]: 'Sample Sent',
  [RequestStatus.QUALITY_APPROVED]: 'Quality Approved',
  [RequestStatus.QUALITY_REJECTED]: 'Quality Rejected',
  [RequestStatus.ORDER_PLACED]: 'Order Placed',
  [RequestStatus.COMPLETED]: 'Completed',
  [RequestStatus.CANCELLED]: 'Cancelled'
};

export interface CollaborationRequest {
  id: bigint;
  exporter: string;
  microManufacturer: string;
  productId: bigint;
  productName: string;
  requestedQuantity: bigint;
  pricePerUnit: bigint;
  specifications: string;
  status: RequestStatus;
  sampleIpfsHash: string;
  qualityNotes: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export function getCollaborationContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(
    COLLABORATION_ADDRESS,
    COLLABORATION_ABI,
    signerOrProvider
  );
}

export async function createRequest(
  signer: ethers.Signer,
  manufacturerAddress: string,
  productId: bigint,
  productName: string,
  quantity: number,
  pricePerUnit: string,
  specifications: string
) {
  const contract = getCollaborationContract(signer);
  const tx = await contract.createRequest(
    manufacturerAddress,
    productId,
    productName,
    quantity,
    ethers.parseEther(pricePerUnit),
    specifications
  );
  const receipt = await tx.wait();

  // Extract request ID from event
  const event = receipt.logs.find((log: any) => {
    try {
      const parsed = contract.interface.parseLog(log);
      return parsed?.name === 'RequestCreated';
    } catch {
      return false;
    }
  });

  if (event) {
    const parsed = contract.interface.parseLog(event);
    return { receipt, requestId: parsed?.args[0] };
  }

  return { receipt, requestId: null };
}

export async function submitSample(
  signer: ethers.Signer,
  requestId: bigint,
  sampleIpfsHash: string
) {
  const contract = getCollaborationContract(signer);
  const tx = await contract.submitSample(requestId, sampleIpfsHash);
  return await tx.wait();
}

export async function checkQuality(
  signer: ethers.Signer,
  requestId: bigint,
  approved: boolean,
  notes: string
) {
  const contract = getCollaborationContract(signer);
  const tx = await contract.checkQuality(requestId, approved, notes);
  return await tx.wait();
}

export async function placeCollaborationOrder(
  signer: ethers.Signer,
  requestId: bigint,
  quantity: number,
  pricePerUnit: string
) {
  const contract = getCollaborationContract(signer);
  const totalPrice = ethers.parseEther((Number(pricePerUnit) * quantity).toString());
  const tx = await contract.placeOrder(requestId, quantity, { value: totalPrice });
  return await tx.wait();
}

export async function getRequest(
  provider: ethers.Provider,
  requestId: bigint
): Promise<CollaborationRequest> {
  const contract = getCollaborationContract(provider);
  return await contract.getRequest(requestId);
}

export async function getManufacturerRequests(
  provider: ethers.Provider,
  manufacturerAddress: string
): Promise<bigint[]> {
  const contract = getCollaborationContract(provider);
  return await contract.getManufacturerRequests(manufacturerAddress);
}

export async function getExporterRequests(
  provider: ethers.Provider,
  exporterAddress: string
): Promise<bigint[]> {
  const contract = getCollaborationContract(provider);
  return await contract.getExporterRequests(exporterAddress);
}

export async function getPendingRequests(
  provider: ethers.Provider,
  manufacturerAddress: string
): Promise<bigint[]> {
  const contract = getCollaborationContract(provider);
  return await contract.getPendingRequests(manufacturerAddress);
}
