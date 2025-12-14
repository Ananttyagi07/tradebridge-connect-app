


import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import { connectWallet, getCurrentAccount } from '@/web3/wallet';
import { useWallet } from '@/context/WalletContext';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const { address, setAddress, setProvider, setSigner, isConnected } = useWallet();


  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if wallet is already connected and redirect
  useEffect(() => {
    if (isConnected && address) {
      navigate('/dashboard');
    }
  }, [isConnected, address, navigate]);









  const handleMetaMaskLogin = async () => {
    if (connecting) return;

    try {
      setConnecting(true);
      setLoading(true);
      

      const wallet = await connectWallet();
      if (wallet) {
        setAddress(wallet.address);
        setProvider(wallet.provider);
        setSigner(wallet.signer);
        toast({
          title: 'Wallet Connected!',
          description: `Connected: ${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`,
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('MetaMask connection failed:', error);
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to connect to MetaMask',
        variant: 'destructive',
      });
    } finally {
      setConnecting(false);
      setLoading(false);
    }
  };

  const handleWalletConnectLogin = async () => {
    setLoading(true);
    try {
      // For now, WalletConnect will show as not available
      // This will be implemented in a future phase
      toast({
        title: 'Coming Soon',
        description: 'WalletConnect integration will be available soon.',
        variant: 'destructive',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'WalletConnect connection failed. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-md mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className="mb-8">
            <img src="/images/logo.png" alt="TradeChain Logo" className="w-96 h-96 object-contain mx-auto mb-6" />

            <h1 className="text-3xl font-semibold mb-3 text-center">
              Connect Your Wallet
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Choose your preferred wallet to start trading on the blockchain
            </p>
          </div>



          <div className="space-y-3 mb-6">
            {address ? (
              <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Wallet Connected
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-300 font-mono">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </p>
                  </div>
                </div>
                <Button 
                  className="w-full mt-3" 
                  onClick={() => navigate('/dashboard')}
                >
                  Continue to Dashboard
                </Button>
              </div>
            ) : (
              <>

                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleMetaMaskLogin}
                  disabled={connecting || loading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M20.5 6.5L13 2L5.5 6.5L12 11L20.5 6.5Z" fill="#E17726" stroke="#E17726" strokeWidth="0.5"/>
                    <path d="M5.5 6.5L12 11V17L5.5 13.5V6.5Z" fill="#E27625" stroke="#E27625" strokeWidth="0.5"/>
                    <path d="M20.5 6.5V13.5L12 17V11L20.5 6.5Z" fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="0.5"/>
                    <path d="M12 17L5.5 13.5L8 20L12 22L16 20L18.5 13.5L12 17Z" fill="#E27625" stroke="#E27625" strokeWidth="0.5"/>
                  </svg>
                  {connecting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    'Continue with MetaMask'
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleWalletConnectLogin}
                  disabled={loading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M6.5 9C6.5 9 8.5 7 12 7C15.5 7 17.5 9 17.5 9M9 12.5C9 12.5 10 11.5 12 11.5C14 11.5 15 12.5 15 12.5M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Continue with WalletConnect (Coming Soon)
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right side - Visual */}
      <div
        className="hidden lg:flex flex-1 text-background p-16 items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/login-background.jpeg')" }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-md relative z-10">
          <h2 className="text-3xl font-semibold mb-6">
            Trade with confidence on the blockchain
          </h2>
          <p className="text-background/70 mb-8">
            Join thousands of exporters, importers, and manufacturers
            building trust through transparent, secure transactions.
          </p>
          <div className="space-y-4">
            {[
              'Smart escrow protects every transaction',
              'Build verifiable on-chain reputation',
              'Connect with micro-manufacturers globally',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-background/20 flex items-center justify-center">
                  <span className="text-background text-xs">✓</span>
                </div>
                <span className="text-sm text-background/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
