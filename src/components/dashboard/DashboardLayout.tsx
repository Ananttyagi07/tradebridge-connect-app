import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { getUIRole } from '@/contracts/roleRegistry';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Factory,
  FileCheck,
  MessageSquare,
  Star,
  Shield,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardLayoutProps {
  children: ReactNode;
}

const roleBasedNavItems = {
  user: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Browse Products', href: '/dashboard/products', icon: Package },
    { name: 'My Orders', href: '/dashboard/orders', icon: ShoppingCart },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  ],
  exporter: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Products', href: '/dashboard/my-products', icon: Package },
    { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
    { name: 'Collaborations', href: '/dashboard/collaborations', icon: Users },
    { name: 'Escrow', href: '/dashboard/escrow', icon: Wallet },
    { name: 'Quality', href: '/dashboard/quality', icon: FileCheck },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Reputation', href: '/dashboard/reputation', icon: Star },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  ],
  importer: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Browse Products', href: '/dashboard/products', icon: Package },
    { name: 'My Orders', href: '/dashboard/orders', icon: ShoppingCart },
    { name: 'Sample Requests', href: '/dashboard/samples', icon: FileCheck },
    { name: 'Escrow', href: '/dashboard/escrow', icon: Wallet },
    { name: 'Suppliers', href: '/dashboard/suppliers', icon: Users },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  ],
  'micro-manufacturer': [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Invitations', href: '/dashboard/invitations', icon: Users },
    { name: 'Active Jobs', href: '/dashboard/jobs', icon: Factory },
    { name: 'Samples', href: '/dashboard/samples', icon: FileCheck },
    { name: 'Payments', href: '/dashboard/payments', icon: Wallet },
    { name: 'Reputation', href: '/dashboard/reputation', icon: Star },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  ],
  manufacturer: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Production', href: '/dashboard/production', icon: Factory },
    { name: 'Collaborations', href: '/dashboard/collaborations', icon: Users },
    { name: 'Sub-Suppliers', href: '/dashboard/sub-suppliers', icon: Users },
    { name: 'Quality Control', href: '/dashboard/quality', icon: FileCheck },
    { name: 'Escrow', href: '/dashboard/escrow', icon: Wallet },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Reputation', href: '/dashboard/reputation', icon: Star },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  ],
};


export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { address, isConnected, provider, setAddress, setProvider, setSigner } = useWallet();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>('user');
  const navItems = roleBasedNavItems[userRole] || roleBasedNavItems.user;

  // Fetch user's role from smart contract
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!address || !provider) {
        setUserRole('user');
        return;
      }

      try {
        const role = await getUIRole(provider, address);
        setUserRole(role);
      } catch (error) {
        console.error('Failed to fetch user role:', error);
        // If contract not deployed or error, default to 'user'
        setUserRole('user');
      }
    };

    fetchUserRole();
  }, [address, provider]);

  const handleLogout = () => {
    // Clear wallet state
    setAddress(null);
    setProvider(null);
    setSigner(null);
    setUserRole('user');
    navigate('/auth');
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      user: 'User',
      exporter: 'Exporter',
      importer: 'Importer',
      'micro-manufacturer': 'Micro-Manufacturer',
      manufacturer: 'Manufacturer',
    };
    return labels[role] || 'User';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/dashboard" className="flex items-center gap-2">
              <img src="/images/logo.png" alt="TradeChain Logo" className="w-48 h-48 object-contain" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">

                  <div className="w-8 h-8 bg-secondary flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {address ? address.slice(2, 4).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'User'}</p>
                    <p className="text-xs text-muted-foreground">
                      {getRoleLabel(userRole)}
                    </p>
                  </div>
                  <ChevronDown size={16} className="hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                  <Settings size={16} className="mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard/role-activation')}>
                  <Shield size={16} className="mr-2" />
                  Role Activation
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-card border-r border-border transform transition-transform lg:translate-x-0 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-secondary text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>


        {userRole === 'user' && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-4 bg-secondary/50 border border-border">
              <p className="text-sm font-medium mb-2">Upgrade your account</p>
              <p className="text-xs text-muted-foreground mb-3">
                Become an exporter, importer, or manufacturer to unlock more features.
              </p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => navigate('/dashboard/role-activation')}
              >
                Activate Role
              </Button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-6">{children}</div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
