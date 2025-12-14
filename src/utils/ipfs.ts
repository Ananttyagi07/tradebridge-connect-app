import axios from 'axios';

// Pinata API configuration
const PINATA_API_KEY = '2f933252a336ee92fd11';
const PINATA_API_SECRET = '7167f1c07345e5045fde75b70dda835ec12255ecae63e54575b5ae2ae8728d10';
const PINATA_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjN2FjNTQwYS1hYTZlLTQ5ZDEtODViMy1mN2M2NDEyZTVjMjAiLCJlbWFpbCI6InR5YWdpYWFkaTM2OEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMmY5MzMyNTJhMzM2ZWU5MmZkMTEiLCJzY29wZWRLZXlTZWNyZXQiOiI3MTY3ZjFjMDczNDVlNTA0NWZkZTc1YjcwZGRhODM1ZWMxMjI1NWVjYWU2M2U1NDU3NWI1YWUyYWU4NzI4ZDEwIiwiZXhwIjoxNzk3MjAwMzEwfQ.frMykfmQ1VQVLip2cglyuDw_vS-cxYVsKoL0r9X62JQ';

const PINATA_API_URL = 'https://api.pinata.cloud';
const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs';

/**
 * Upload file to IPFS via Pinata
 * @param file File to upload
 * @param metadata Optional metadata for the file
 * @returns IPFS hash
 */
export async function uploadFileToIPFS(
  file: File,
  metadata?: { name?: string; keyvalues?: Record<string, string> }
): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    // Add metadata if provided
    if (metadata) {
      const pinataMetadata = {
        name: metadata.name || file.name,
        keyvalues: metadata.keyvalues || {}
      };
      formData.append('pinataMetadata', JSON.stringify(pinataMetadata));
    }

    const response = await axios.post(
      `${PINATA_API_URL}/pinning/pinFileToIPFS`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${PINATA_JWT}`,
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_API_SECRET
        }
      }
    );

    return response.data.IpfsHash;
  } catch (error: any) {
    console.error('IPFS upload failed:', error);
    throw new Error(error.response?.data?.message || 'Failed to upload to IPFS');
  }
}

/**
 * Upload multiple files to IPFS
 * @param files Array of files
 * @returns Array of IPFS hashes
 */
export async function uploadMultipleFilesToIPFS(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(file => uploadFileToIPFS(file));
  return await Promise.all(uploadPromises);
}

/**
 * Upload JSON data to IPFS
 * @param data JSON object
 * @param filename Optional filename
 * @returns IPFS hash
 */
export async function uploadJSONToIPFS(
  data: any,
  filename: string = 'data.json'
): Promise<string> {
  try {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const file = new File([blob], filename, { type: 'application/json' });

    return await uploadFileToIPFS(file, { name: filename });
  } catch (error: any) {
    console.error('JSON upload to IPFS failed:', error);
    throw new Error('Failed to upload JSON to IPFS');
  }
}

/**
 * Upload product data with images to IPFS
 * @param productData Product information
 * @param images Array of product images
 * @returns IPFS hash containing all product data
 */
export async function uploadProductToIPFS(
  productData: {
    name: string;
    description: string;
    category: string;
    specifications?: string;
    [key: string]: any;
  },
  images: File[]
): Promise<string> {
  try {
    // First upload all images
    const imageHashes = await uploadMultipleFilesToIPFS(images);

    // Create product metadata with image hashes
    const productMetadata = {
      ...productData,
      images: imageHashes,
      timestamp: Date.now()
    };

    // Upload metadata JSON
    return await uploadJSONToIPFS(productMetadata, `product-${Date.now()}.json`);
  } catch (error) {
    console.error('Product upload to IPFS failed:', error);
    throw error;
  }
}

/**
 * Upload sample data with images to IPFS
 * @param sampleData Sample information
 * @param images Array of sample images
 * @returns IPFS hash
 */
export async function uploadSampleToIPFS(
  sampleData: {
    requestId: string;
    notes?: string;
    [key: string]: any;
  },
  images: File[]
): Promise<string> {
  try {
    const imageHashes = await uploadMultipleFilesToIPFS(images);

    const sampleMetadata = {
      ...sampleData,
      images: imageHashes,
      timestamp: Date.now()
    };

    return await uploadJSONToIPFS(sampleMetadata, `sample-${Date.now()}.json`);
  } catch (error) {
    console.error('Sample upload to IPFS failed:', error);
    throw error;
  }
}

/**
 * Get IPFS gateway URL for a hash
 * @param ipfsHash IPFS hash
 * @returns Full gateway URL
 */
export function getIPFSUrl(ipfsHash: string): string {
  if (!ipfsHash) return '';
  // Remove ipfs:// prefix if present
  const hash = ipfsHash.replace('ipfs://', '');
  return `${PINATA_GATEWAY}/${hash}`;
}

/**
 * Fetch JSON data from IPFS
 * @param ipfsHash IPFS hash
 * @returns Parsed JSON data
 */
export async function fetchFromIPFS(ipfsHash: string): Promise<any> {
  try {
    const url = getIPFSUrl(ipfsHash);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch from IPFS:', error);
    throw new Error('Failed to fetch data from IPFS');
  }
}

/**
 * Test Pinata connection
 * @returns true if connection successful
 */
export async function testPinataConnection(): Promise<boolean> {
  try {
    const response = await axios.get(
      `${PINATA_API_URL}/data/testAuthentication`,
      {
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}`,
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_API_SECRET
        }
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error('Pinata connection test failed:', error);
    return false;
  }
}
