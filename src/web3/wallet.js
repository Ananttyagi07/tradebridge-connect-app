import { ethers } from "ethers";

let isConnecting = false;
let connectionPromise = null;

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  // If already connecting, return the existing promise instead of creating a new request
  if (isConnecting && connectionPromise) {
    console.log("Connection already in progress, waiting for existing request...");
    return connectionPromise;
  }

  // Start new connection
  isConnecting = true;

  connectionPromise = (async () => {
    try {
      // First, switch to Sepolia network (Chain ID: 11155111)
      const SEPOLIA_CHAIN_ID = '0xaa36a7'; // 11155111 in hex

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SEPOLIA_CHAIN_ID }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: SEPOLIA_CHAIN_ID,
                  chainName: 'Sepolia Testnet',
                  rpcUrls: ['https://sepolia.infura.io/v3/'],
                  nativeCurrency: {
                    name: 'Sepolia ETH',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  blockExplorerUrls: ['https://sepolia.etherscan.io'],
                },
              ],
            });
          } catch (addError) {
            throw new Error('Failed to add Sepolia network to MetaMask');
          }
        } else {
          throw switchError;
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);

      // ONLY request accounts when user explicitly clicks button
      // This triggers MetaMask popup - never call this in useEffect or on mount
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      return {
        address: accounts[0],
        provider,
        signer,
      };
    } catch (err) {
      console.error("MetaMask connection failed:", err);

      // Check if error is due to pending request
      if (err.code === -32002) {
        throw new Error("Please respond to the pending MetaMask request in your browser extension");
      }

      throw err;
    } finally {
      isConnecting = false;
      connectionPromise = null;
    }
  })();

  return connectionPromise;
}

export async function getCurrentAccount() {
  try {
    if (!window.ethereum) {
      return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    // Use eth_accounts instead of listAccounts to avoid triggering permission popup
    const accounts = await provider.send("eth_accounts", []);

    if (accounts && accounts.length > 0) {
      const signer = await provider.getSigner();
      const address = accounts[0];
      return {
        address,
        provider,
        signer
      };
    }

    return null;
  } catch (error) {
    console.error('Failed to get current account:', error);
    return null;
  }
}

export async function disconnectWallet() {
  // Note: MetaMask doesn't support programmatic disconnection
  // This is mainly for state cleanup in your app
  return { success: true };
}

export async function getNetwork() {
  try {
    if (!window.ethereum) {
      return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    
    return {
      chainId: network.chainId.toString(),
      name: network.name
    };
  } catch (error) {
    console.error('Failed to get network:', error);
    return null;
  }
}

export async function switchNetwork(chainId) {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to switch network:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
