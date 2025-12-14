
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useWallet } from '@/context/WalletContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  activateImporter,
  activateExporter,
  activateMicroManufacturer,
  getUIRole,
  STAKE_AMOUNTS,
  Role,
  ROLE_REGISTRY_ADDRESS
} from '@/contracts/roleRegistry';

// Extend Window interface for ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

type UserRole = 'user' | 'exporter' | 'importer' | 'micro-manufacturer' | 'manufacturer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Package,
  ShoppingCart,
  Factory,
  Building2,
  Check,
  Loader2,
  Shield,
  Coins,
} from 'lucide-react';

const roles = [
  {
    id: 'exporter' as UserRole,
    title: 'Exporter',
    description: 'List products, receive orders, collaborate with manufacturers, and use smart escrow.',
    icon: Package,
    stake: '0.05 ETH',
    features: [
      'Create product catalog',
      'Receive purchase inquiries',
      'Collaborate with micro-manufacturers',
      'Smart escrow payments',
      'Build on-chain reputation',
    ],
  },
  {
    id: 'importer' as UserRole,
    title: 'Importer',
    description: 'Browse products, request samples, place orders with escrow protection.',
    icon: ShoppingCart,
    stake: '0.01 ETH',
    features: [
      'Browse verified products',
      'Request samples',
      'Secure escrow deposits',
      'Milestone-based payments',
      'Supplier ratings',
    ],
  },
  {
    id: 'micro-manufacturer' as UserRole,
    title: 'Micro-Manufacturer',
    description: 'Receive collaboration invites, commit capacity, and earn milestone-based payments.',
    icon: Factory,
    stake: 'Free',
    features: [
      'Receive job invitations',
      'Commit production capacity',
      'Upload samples',
      'Automatic payments',
      'Build reputation',
    ],
  },
  {
    id: 'manufacturer' as UserRole,
    title: 'Large Manufacturer',
    description: 'Full production management, collaborate with exporters and micro-manufacturers.',
    icon: Building2,
    stake: 'Free',
    features: [
      'Production management',
      'Sub-supplier network',
      'Quality control',
      'Advanced analytics',
      'Export capabilities',
    ],
  },
];


export default function RoleActivation() {
  const { address, isConnected, provider, signer } = useWallet();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userRole, setUserRole] = useState<UserRole>('user');
  const [loading, setLoading] = useState(false);
  const [fetchingRole, setFetchingRole] = useState(true);

  // Fetch user's role from smart contract on mount
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!address || !provider) {
        setFetchingRole(false);
        return;
      }

      try {

        const role = await getUIRole(provider, address);
        setUserRole(role as UserRole);
      } catch (error) {
        console.error('Failed to fetch user role:', error);
        // If contract not deployed or error, default to 'user'
        setUserRole('user');
      } finally {
        setFetchingRole(false);
      }
    };

    fetchUserRole();
  }, [address, provider]);

  const activateRoleOnChain = async (roleId: UserRole) => {
    if (!signer) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first.',
        variant: 'destructive',
      });
      return false;
    }

    // Check and switch to Sepolia network before transaction
    const SEPOLIA_CHAIN_ID = '0xaa36a7'; // 11155111 in hex
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (switchError: any) {
      // If network not added, add it
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
          toast({
            title: 'Network Switch Failed',
            description: 'Failed to add Sepolia network to MetaMask.',
            variant: 'destructive',
          });
          return false;
        }
      } else if (switchError.code === 4001) {
        // User rejected the request
        toast({
          title: 'Network Switch Rejected',
          description: 'You must switch to Sepolia network to continue.',
          variant: 'destructive',
        });
        return false;
      }
    }

    try {
      let receipt;
      let stakeAmount = '0';

      switch (roleId) {
        case 'importer':
          stakeAmount = STAKE_AMOUNTS[Role.IMPORTER];
          receipt = await activateImporter(signer);
          break;
        case 'exporter':
          stakeAmount = STAKE_AMOUNTS[Role.EXPORTER];
          receipt = await activateExporter(signer);
          break;
        case 'micro-manufacturer':
        case 'manufacturer':
          receipt = await activateMicroManufacturer(signer);
          break;
        default:
          throw new Error('Invalid role');
      }

      return { success: true, receipt, stakeAmount };
    } catch (error: any) {
      console.error('Role activation failed:', error);

      // Handle specific errors
      if (error.code === 'ACTION_REJECTED') {
        toast({
          title: 'Transaction Rejected',
          description: 'You rejected the transaction in MetaMask.',
          variant: 'destructive',
        });
      } else if (error.message?.includes('Role already assigned')) {
        toast({
          title: 'Role Already Assigned',
          description: 'You already have a role assigned on-chain.',
          variant: 'destructive',
        });
      } else if (error.message?.includes('insufficient funds')) {
        toast({
          title: 'Insufficient Funds',
          description: 'You need more ETH for the stake and gas fees.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Activation Failed',
          description: error.message || 'Failed to activate role on-chain.',
          variant: 'destructive',
        });
      }

      return false;
    }
  };

  const handleActivation = async (roleId: UserRole) => {
    setLoading(true);

    const result = await activateRoleOnChain(roleId);

    if (result && result.success) {
      toast({
        title: 'Role Activated!',
        description: `You are now a verified ${roleId}. ${result.stakeAmount !== '0' ? `Staked: ${result.stakeAmount} ETH.` : ''} Transaction confirmed on-chain.`,
      });


      // Refresh role from contract
      if (provider && address) {
        const newRole = await getUIRole(provider, address);
        setUserRole(newRole as UserRole);
      }

      navigate('/dashboard');
    }

    setLoading(false);
  };


  if (userRole !== 'user') {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="w-16 h-16 bg-secondary mx-auto mb-6 flex items-center justify-center rounded-full">
            <Check size={32} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold mb-4">Role Already Activated</h1>
          <p className="text-muted-foreground mb-6">
            You are currently verified as a <strong>{userRole}</strong>.
            <br />
            Your role is permanently recorded on-chain.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold mb-4">Activate Your Role</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Choose a role and stake ETH to activate. This is a decentralized, stake-based verification system.
            No admin approval required - activation is instant and permanent on-chain.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="text-blue-500" size={18} />
              <span>Decentralized Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="text-green-500" size={18} />
              <span>Stake-Based Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="text-purple-500" size={18} />
              <span>Instant Activation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-card border border-border p-6 hover:border-foreground/30 transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center flex-shrink-0 rounded-lg">
                  <role.icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-lg">{role.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${role.stake === 'Free' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      Stake: {role.stake}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {role.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-muted-foreground" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full gap-2"
                onClick={() => handleActivation(role.id)}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Activating...
                  </>
                ) : (
                  <>
                    Activate {role.title}
                    {role.stake !== 'Free' && ` (${role.stake})`}
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-secondary/30 border border-border p-6 rounded-lg">
          <h2 className="font-medium mb-3 flex items-center gap-2">
            <Shield size={20} />
            How Stake-Based Verification Works
          </h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>No Admin Approval:</strong> Your role is activated instantly on-chain through a smart contract. No human intervention required.
            </p>
            <p>
              <strong>Economic Security:</strong> Stakes create "skin in the game" - you demonstrate economic commitment to build trust in the ecosystem.
            </p>
            <p>
              <strong>Permanent & Immutable:</strong> Once activated, your role is permanently recorded on the blockchain and cannot be changed or revoked.
            </p>
            <p>
              <strong>Fully Decentralized:</strong> Everything is managed by smart contracts on Sepolia testnet. No backend servers or databases.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
