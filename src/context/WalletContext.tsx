import { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  address: string | null;
  setAddress: (address: string | null) => void;
  provider: any;
  setProvider: (provider: any) => void;
  signer: any;
  setSigner: (signer: any) => void;
  isConnected: boolean;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);

  const isConnected = address !== null;

  return (
    <WalletContext.Provider
      value={{
        address,
        setAddress,
        provider,
        setProvider,
        signer,
        setSigner,
        isConnected,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
