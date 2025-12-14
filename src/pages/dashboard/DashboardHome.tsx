
import { useWallet } from '@/context/WalletContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Factory,
  FileCheck,
  Star,
  Lock,
  Shield,
  MapPin,
  Award,
  Globe,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
];

const performanceData = [
  { month: 'Jan', orders: 20, completed: 18 },
  { month: 'Feb', orders: 25, completed: 22 },
  { month: 'Mar', orders: 30, completed: 28 },
  { month: 'Apr', orders: 35, completed: 32 },
  { month: 'May', orders: 40, completed: 38 },
  { month: 'Jun', orders: 45, completed: 42 },
];

const recentOrders = [
  { id: 'ORD-001', product: 'Organic Mangoes', buyer: 'ABC Corp', status: 'Processing', amount: '$12,500' },
  { id: 'ORD-002', product: 'Cotton Fabric', buyer: 'XYZ Ltd', status: 'Shipped', amount: '$8,200' },
  { id: 'ORD-003', product: 'Electronics Parts', buyer: 'Tech Inc', status: 'Pending', amount: '$25,000' },
  { id: 'ORD-004', product: 'Spices Mix', buyer: 'Global Foods', status: 'Delivered', amount: '$5,800' },
];

const notifications = [
  { type: 'order', message: 'New order received from ABC Corp', time: '5 min ago' },
  { type: 'sample', message: 'Sample request approved by buyer', time: '1 hour ago' },
  { type: 'payment', message: 'Milestone payment released - $5,000', time: '2 hours ago' },
  { type: 'collaboration', message: 'Micro-manufacturer accepted invitation', time: '3 hours ago' },
];

function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Welcome to TradeChain</h1>
        <p className="text-muted-foreground">
          A coordination protocol, not a marketplace.
        </p>
      </div>

      {/* 1. PROTOCOL STATUS PANEL */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">TradeChain Network Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-secondary/30 rounded">
            <div className="text-2xl font-bold mb-1">2,847</div>
            <div className="text-xs text-muted-foreground">Active Verified Exporters</div>
          </div>
          <div className="text-center p-4 bg-secondary/30 rounded">
            <div className="text-2xl font-bold mb-1">12,450</div>
            <div className="text-xs text-muted-foreground">Micro-Manufacturers Onboarded</div>
          </div>
          <div className="text-center p-4 bg-secondary/30 rounded">
            <div className="text-2xl font-bold mb-1">$24.5M</div>
            <div className="text-xs text-muted-foreground">Escrow Value Locked</div>
          </div>
          <div className="text-center p-4 bg-secondary/30 rounded">
            <div className="text-2xl font-bold mb-1">8,932</div>
            <div className="text-xs text-muted-foreground">Orders Coordinated</div>
          </div>
          <div className="text-center p-4 bg-secondary/30 rounded">
            <div className="text-2xl font-bold mb-1">47</div>
            <div className="text-xs text-muted-foreground">Countries Active</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. ESCROW & TRUST EXPLAINER WIDGET */}
        <div className="bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield size={20} className="text-green-600" />
            How TradeChain Prevents Fraud
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Lock size={18} className="mt-1 text-blue-600" />
              <div>
                <p className="font-medium text-sm">Funds locked in smart escrow</p>
                <p className="text-xs text-muted-foreground">Money is secured on-chain before work begins</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={18} className="mt-1 text-green-600" />
              <div>
                <p className="font-medium text-sm">Released only on milestone approval</p>
                <p className="text-xs text-muted-foreground">Importer controls when payment is released</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle size={18} className="mt-1 text-red-600" />
              <div>
                <p className="font-medium text-sm">No advance-payment scams</p>
                <p className="text-xs text-muted-foreground">Suppliers can't vanish with your money</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileCheck size={18} className="mt-1 text-purple-600" />
              <div>
                <p className="font-medium text-sm">On-chain audit trail</p>
                <p className="text-xs text-muted-foreground">Every action is permanently recorded</p>
              </div>
            </div>
          </div>
          <Button className="w-full mt-4" variant="outline" size="sm">
            View Demo Transaction
          </Button>
        </div>

        {/* 3. MICRO-MANUFACTURER VISIBILITY MAP */}
        <div className="bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Invisible Manufacturers Made Visible</h2>
          <div className="space-y-3 max-h-[280px] overflow-y-auto">
            {[
              { location: 'Nashik, Maharashtra', product: 'Organic Grapes', capacity: '500-1000 kg/day', reputation: 4.8, status: 'Available' },
              { location: 'Coimbatore, Tamil Nadu', product: 'Cotton Fabric', capacity: '2000-5000 m/day', reputation: 4.6, status: 'Busy' },
              { location: 'Jaipur, Rajasthan', product: 'Handicrafts', capacity: '100-500 units/day', reputation: 4.9, status: 'Available' },
              { location: 'Surat, Gujarat', product: 'Diamond Cutting', capacity: '200-400 units/day', reputation: 4.7, status: 'Available' },
              { location: 'Ludhiana, Punjab', product: 'Bicycle Parts', capacity: '1000-2000 units/day', reputation: 4.5, status: 'Busy' },
            ].map((mfg, index) => (
              <div key={index} className="p-3 bg-secondary/30 rounded border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-blue-600" />
                    <span className="font-medium text-sm">{mfg.location}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded ${mfg.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {mfg.status}
                  </span>
                </div>
                <p className="text-sm mb-1">{mfg.product}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Capacity: {mfg.capacity}</span>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-yellow-500 text-yellow-500" />
                    <span>{mfg.reputation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic">
            * Activate a role to connect with manufacturers
          </p>
        </div>
      </div>

      {/* 4. ON-CHAIN REPUTATION PREVIEW */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award size={20} className="text-purple-600" />
          Portable Reputation Identity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-secondary/30 rounded border-l-4 border-blue-600">
            <h3 className="font-semibold text-sm mb-2">Example: Exporter Reputation</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Orders Completed:</span>
                <span className="font-medium">142</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quality Approvals:</span>
                <span className="font-medium">98.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">On-Time Delivery:</span>
                <span className="font-medium">96.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dispute Rate:</span>
                <span className="font-medium">0.7%</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-secondary/30 rounded border-l-4 border-green-600">
            <h3 className="font-semibold text-sm mb-2">Example: Micro-Manufacturer Reputation</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Jobs Completed:</span>
                <span className="font-medium">67</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sample Approvals:</span>
                <span className="font-medium">94.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quality Score:</span>
                <span className="font-medium">4.7/5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trust Level:</span>
                <span className="font-medium">High</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Reputation is built from: Completed milestones • Quality approvals • Delivery success • On-chain verification
        </p>
      </div>

      {/* 5. GLOBAL TRADE INTELLIGENCE */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Globe size={20} className="text-blue-600" />
          Live Trade Signals
        </h2>
        <p className="text-xs text-yellow-600 mb-4">(Demo / Simulation)</p>
        <div className="space-y-3">
          {[
            { icon: TrendingUp, type: 'Price Alert', message: 'Mango prices up 12% due to weather in Konkan region', color: 'text-green-600' },
            { icon: AlertTriangle, type: 'Logistics', message: 'Shipping delay expected at Mumbai Port - 3-5 days', color: 'text-orange-600' },
            { icon: ShoppingCart, type: 'Demand Spike', message: 'Textile demand increased 18% in EU market', color: 'text-blue-600' },
            { icon: Globe, type: 'Market Insight', message: 'New trade agreement favorable for electronics exports', color: 'text-purple-600' },
          ].map((signal, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-secondary/30 rounded">
              <signal.icon size={18} className={`mt-0.5 ${signal.color}`} />
              <div className="flex-1">
                <p className="font-medium text-sm">{signal.type}</p>
                <p className="text-xs text-muted-foreground">{signal.message}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* 6. ROLE PATHWAY SECTION */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">How You Can Participate</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-secondary/30 rounded border border-border hover:border-foreground transition-colors cursor-pointer" onClick={() => navigate('/dashboard/role-activation')}>
            <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mb-3">
              <ShoppingCart size={20} className="text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Become an Importer</h3>
            <p className="text-sm text-muted-foreground mb-3">Apply for verification and start sourcing with escrow protection</p>
            <Button variant="outline" size="sm" className="w-full">
              Apply Now <ArrowRight size={14} className="ml-2" />
            </Button>
          </div>
          <div className="p-4 bg-secondary/30 rounded border border-border hover:border-foreground transition-colors cursor-pointer" onClick={() => navigate('/dashboard/role-activation')}>
            <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center mb-3">
              <Package size={20} className="text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Become an Exporter</h3>
            <p className="text-sm text-muted-foreground mb-3">List products and connect with micro-manufacturers</p>
            <Button variant="outline" size="sm" className="w-full">
              Get Started <ArrowRight size={14} className="ml-2" />
            </Button>
          </div>
          <div className="p-4 bg-secondary/30 rounded border border-border hover:border-foreground transition-colors cursor-pointer" onClick={() => navigate('/dashboard/role-activation')}>
            <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center mb-3">
              <Factory size={20} className="text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Become a Micro-Manufacturer</h3>
            <p className="text-sm text-muted-foreground mb-3">Get work directly without middlemen brokers</p>
            <Button variant="outline" size="sm" className="w-full">
              Join Network <ArrowRight size={14} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* 7. WHY TRADECHAIN IS DIFFERENT */}
      <div className="bg-foreground text-background p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-6 text-center">Why TradeChain is Different</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Alibaba</h3>
            <p className="text-sm opacity-80 mb-2">Platform trust, opaque processes</p>
            <p className="text-xs opacity-60">You trust the marketplace</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">IndiaMART</h3>
            <p className="text-sm opacity-80 mb-2">Leads only, no protection</p>
            <p className="text-xs opacity-60">You're on your own after contact</p>
          </div>
          <div className="text-center border-2 border-background/30 rounded p-3 bg-background/10">
            <h3 className="font-bold mb-2">TradeChain</h3>
            <p className="text-sm opacity-90 mb-2">Protocol trust, transparent coordination</p>
            <p className="text-xs opacity-80 font-medium">You control the escrow and milestones</p>
          </div>
        </div>
        <p className="text-center text-sm mt-6 opacity-80 italic">
          Alibaba is a marketplace • IndiaMART is a directory • TradeChain is a coordination protocol
        </p>
      </div>
    </div>
  );
}

function ExporterDashboard() {
  const navigate = useNavigate();

  const orderFulfillmentData = [
    { id: 'ORD-003', product: 'Organic Mangoes', totalQty: 1000, myQty: 500, microQty: 450, fulfillment: 95, buyers: 'ABC Corp' },
    { id: 'ORD-007', product: 'Cotton Fabric', totalQty: 2000, myQty: 1200, microQty: 700, fulfillment: 95, buyers: 'XYZ Ltd' },
    { id: 'ORD-012', product: 'Handicrafts', totalQty: 500, myQty: 300, microQty: 180, fulfillment: 96, buyers: 'Global Traders' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Exporter Dashboard</h1>
          <p className="text-muted-foreground">
            You are coordinating a decentralized supply network.
          </p>
        </div>
        {/* Role Switching */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Switch Role:</span>
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/role-activation')}>
            <Users size={14} className="mr-2" />
            Change Role
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Sales (Monthly)"
          value="$45,250"
          change={12.5}
          icon={<DollarSign size={20} />}
        />
        <StatCard
          title="Orders Received"
          value="127"
          change={8.2}
          icon={<ShoppingCart size={20} />}
        />
        <StatCard
          title="Active Collaborations"
          value="12"
          change={25}
          icon={<Users size={20} />}
        />
        <StatCard
          title="Pending Samples"
          value="5"
          icon={<Package size={20} />}
          subtitle="Awaiting approval"
        />
      </div>

      {/* 1. ORDER FULFILLMENT INTELLIGENCE PANEL */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">Order Fulfillment Status</h2>
        <div className="space-y-4">
          {orderFulfillmentData.map((order) => (
            <div key={order.id} className="p-4 bg-secondary/30 rounded border border-border">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.product} • {order.buyers}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">{order.fulfillment}% complete</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 text-sm">
                <div className="p-2 bg-background rounded">
                  <p className="text-xs text-muted-foreground">Required</p>
                  <p className="font-semibold">{order.totalQty} units</p>
                </div>
                <div className="p-2 bg-blue-50 rounded">
                  <p className="text-xs text-muted-foreground">You Supply</p>
                  <p className="font-semibold text-blue-700">{order.myQty} units</p>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <p className="text-xs text-muted-foreground">Micro-Mfg</p>
                  <p className="font-semibold text-purple-700">{order.microQty} units</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded">
                  <p className="text-xs text-muted-foreground">Gap</p>
                  <p className="font-semibold text-yellow-700">{order.totalQty - order.myQty - order.microQty} units</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. MICRO-MANUFACTURER COLLABORATION PANEL */}
        <div className="bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">My Supplier Network</h2>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {[
              { name: 'Nashik Agro Co-op', product: 'Organic Mangoes', capacity: '500-1000 kg/day', quality: 4.8, current: 'ORD-003', available: true },
              { name: 'Coimbatore Textiles', product: 'Cotton Fabric', capacity: '2000 m/day', quality: 4.6, current: 'ORD-007', available: false },
              { name: 'Jaipur Handicrafts', product: 'Handmade Items', capacity: '100-200/day', quality: 4.9, current: 'ORD-012', available: true },
              { name: 'Surat Gems Ltd', product: 'Gemstone Cutting', capacity: '300-500/day', quality: 4.7, current: 'None', available: true },
            ].map((supplier, index) => (
              <div key={index} className="p-3 bg-secondary/30 rounded border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{supplier.name}</p>
                    <p className="text-xs text-muted-foreground">{supplier.product}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-medium">{supplier.quality}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Capacity: {supplier.capacity}</span>
                  <span className={`px-2 py-0.5 rounded ${supplier.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {supplier.available ? 'Available' : 'Busy'}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" className="flex-1 h-7 text-xs">
                    Assign Qty
                  </Button>
                  <Button size="sm" variant="ghost" className="flex-1 h-7 text-xs">
                    Request Sample
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-3" size="sm">
            <Users size={14} className="mr-2" />
            Invite Supplier
          </Button>
        </div>

        {/* 3. ESCROW STATUS VISIBILITY */}
        <div className="bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lock size={18} className="text-green-600" />
            Escrow Overview
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded">
              <p className="text-xs text-muted-foreground mb-1">Total Escrow Locked</p>
              <p className="text-2xl font-bold text-green-700">$87,500</p>
              <p className="text-xs text-green-600 mt-1">🔒 Locked on-chain</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 rounded">
                <p className="text-xs text-muted-foreground mb-1">Releasing Soon</p>
                <p className="text-lg font-semibold text-blue-700">$12,000</p>
              </div>
              <div className="p-3 bg-purple-50 rounded">
                <p className="text-xs text-muted-foreground mb-1">Last Payout</p>
                <p className="text-lg font-semibold text-purple-700">$5,000</p>
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <p className="text-sm font-medium mb-2">Next Milestone Pending</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">ORD-003 • Sample Approval</span>
                <span className="text-green-600 font-medium">$2,500</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View All Escrows
            </Button>
          </div>
        </div>
      </div>

      {/* 4. QUALITY & MILESTONE CHECKPOINTS */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">Quality & Milestone Timeline</h2>
        <div className="space-y-4">
          {[
            { order: 'ORD-003', product: 'Organic Mangoes', milestones: [
              { name: 'Sample Approved', status: 'completed', payout: '10%', authority: 'Importer' },
              { name: 'Production Started', status: 'completed', payout: '20%', authority: 'Exporter' },
              { name: 'Quality Check', status: 'pending', payout: '30%', authority: 'Importer' },
              { name: 'Shipment', status: 'locked', payout: '25%', authority: 'Importer' },
              { name: 'Delivery', status: 'locked', payout: '15%', authority: 'Importer' },
            ]},
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-secondary/30 rounded">
              <p className="font-semibold mb-3">{item.order} - {item.product}</p>
              <div className="space-y-2">
                {item.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      milestone.status === 'completed' ? 'bg-green-100' :
                      milestone.status === 'pending' ? 'bg-yellow-100' :
                      'bg-secondary'
                    }`}>
                      {milestone.status === 'completed' && <CheckCircle size={16} className="text-green-600" />}
                      {milestone.status === 'pending' && <Clock size={16} className="text-yellow-600" />}
                      {milestone.status === 'locked' && <Lock size={16} className="text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{milestone.name}</p>
                      <p className="text-xs text-muted-foreground">Authority: {milestone.authority}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{milestone.payout}</p>
                      <p className="text-xs text-muted-foreground">payout</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. EXPORTER REPUTATION DASHBOARD */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award size={18} className="text-purple-600" />
          Your Trade Reputation
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">96.2%</p>
            <p className="text-xs text-muted-foreground">On-Time Delivery</p>
          </div>
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">98.5%</p>
            <p className="text-xs text-muted-foreground">Quality Approval</p>
          </div>
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">0.7%</p>
            <p className="text-xs text-muted-foreground">Dispute Rate</p>
          </div>
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">94.1%</p>
            <p className="text-xs text-muted-foreground">Micro-Mfg Success</p>
          </div>
        </div>
        <div className="p-4 bg-purple-50 rounded">
          <p className="font-semibold text-center mb-2">Overall Reputation Score</p>
          <p className="text-3xl font-bold text-center text-purple-700">4.8 / 5.0</p>
          <p className="text-xs text-center text-muted-foreground mt-2">Reputation is portable and on-chain</p>
        </div>
      </div>

      {/* 6. SUPPLY RISK & TRADE SIGNALS */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-2">Trade Signals</h2>
        <p className="text-xs text-yellow-600 mb-4">(AI-assisted signals - demo)</p>
        <div className="space-y-2">
          {[
            { icon: AlertTriangle, message: 'Weather risk for mango suppliers in Konkan region', color: 'text-red-600' },
            { icon: TrendingUp, message: 'Demand spike for cotton fabric in European markets', color: 'text-green-600' },
            { icon: AlertCircle, message: 'Port congestion alert at Mumbai - expect 2-3 day delays', color: 'text-orange-600' },
          ].map((signal, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded">
              <signal.icon size={16} className={signal.color} />
              <p className="text-sm flex-1">{signal.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ImporterDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Importer Dashboard</h1>
        <p className="text-muted-foreground">
          You control the escrow and milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Orders"
          value="24"
          change={15}
          icon={<ShoppingCart size={20} />}
        />
        <StatCard
          title="Pending Samples"
          value="8"
          icon={<Package size={20} />}
          subtitle="Awaiting delivery"
        />
        <StatCard
          title="Escrow Locked"
          value="$125,000"
          icon={<DollarSign size={20} />}
        />
        <StatCard
          title="Verified Suppliers"
          value="45"
          change={5}
          icon={<Users size={20} />}
        />
      </div>

      {/* WHY I AM SAFE INFO STRIP */}
      <div className="bg-green-50 border border-green-200 p-4 rounded">
        <div className="flex items-start gap-3">
          <Shield size={20} className="text-green-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-green-800 text-sm mb-1">Why You're Protected on TradeChain</p>
            <div className="flex flex-wrap gap-4 text-xs text-green-700">
              <span className="flex items-center gap-1"><Lock size={12} />Funds locked on-chain</span>
              <span className="flex items-center gap-1"><CheckCircle size={12} />Released only after your approval</span>
              <span className="flex items-center gap-1"><FileCheck size={12} />Every action is auditable</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. MILESTONE CONTROL PANEL - MOST IMPORTANT */}
      <div className="bg-card border-2 border-blue-600 p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Control & Milestones</h2>
        <div className="space-y-4">
          {[
            {
              id: 'ORD-021',
              product: 'Organic Mangoes',
              supplier: 'ABC Exports',
              milestones: [
                { name: 'Sample Approved', status: 'completed', payout: 10, amount: 1200 },
                { name: 'Production Completed', status: 'pending', payout: 40, amount: 4800 },
                { name: 'Quality Check Passed', status: 'locked', payout: 30, amount: 3600 },
                { name: 'Shipment Delivered', status: 'locked', payout: 20, amount: 2400 },
              ]
            },
            {
              id: 'ORD-029',
              product: 'Cotton Fabric',
              supplier: 'Global Trade Co',
              milestones: [
                { name: 'Sample Approved', status: 'completed', payout: 10, amount: 1800 },
                { name: 'Production Started', status: 'completed', payout: 20, amount: 3600 },
                { name: 'Quality Inspection', status: 'pending', payout: 35, amount: 6300 },
                { name: 'Final Delivery', status: 'locked', payout: 35, amount: 6300 },
              ]
            },
          ].map((order) => (
            <div key={order.id} className="p-4 bg-secondary/30 rounded border border-border">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.product} • {order.supplier}</p>
                </div>
              </div>
              <div className="space-y-2">
                {order.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-background rounded">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      milestone.status === 'completed' ? 'bg-green-100' :
                      milestone.status === 'pending' ? 'bg-yellow-100' :
                      'bg-secondary'
                    }`}>
                      {milestone.status === 'completed' && <CheckCircle size={16} className="text-green-600" />}
                      {milestone.status === 'pending' && <Clock size={16} className="text-yellow-600" />}
                      {milestone.status === 'locked' && <Lock size={16} className="text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{milestone.name}</p>
                      <p className="text-xs text-muted-foreground">{milestone.payout}% payout • ${milestone.amount.toLocaleString()}</p>
                    </div>
                    {milestone.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="default" className="h-8">
                          <CheckCircle size={14} className="mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="h-8">
                          Hold
                        </Button>
                      </div>
                    )}
                    {milestone.status === 'completed' && (
                      <span className="text-xs text-green-600 font-medium">Released</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. MICRO-MANUFACTURER TRANSPARENCY PANEL */}
        <div className="bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">How Your Order Is Being Fulfilled</h2>
          <div className="space-y-3">
            {[
              { order: 'ORD-021', role: 'Exporter', name: 'ABC Exports', qty: 500, quality: '98.5%', reputation: 4.8 },
              { order: 'ORD-021', role: 'Manufacturer', name: 'Nashik Agro Co-op', qty: 300, quality: '97.2%', reputation: 4.7 },
              { order: 'ORD-021', role: 'Micro-Mfg', name: 'Local Farmer Group', qty: 200, quality: '96.8%', reputation: 4.6 },
            ].map((supplier, index) => (
              <div key={index} className="p-3 bg-secondary/30 rounded">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{supplier.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className={`px-2 py-0.5 rounded ${
                        supplier.role === 'Exporter' ? 'bg-blue-100 text-blue-700' :
                        supplier.role === 'Manufacturer' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {supplier.role}
                      </span>
                      <span>• {supplier.order}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-medium">{supplier.reputation}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Assigned Qty</p>
                    <p className="font-medium">{supplier.qty} units</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Quality Score</p>
                    <p className="font-medium text-green-600">{supplier.quality}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic">
            This is not black-box sourcing. This is open-state coordination.
          </p>
        </div>

        {/* 3. QUALITY CHECKPOINTS & DISPUTE */}
        <div className="bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Quality Checkpoints</h2>
          <div className="space-y-3">
            {[
              { order: 'ORD-021', checkpoint: 'Sample Approval', status: 'Approved', date: '2 days ago', notes: 'Color and size perfect' },
              { order: 'ORD-029', checkpoint: 'Production Sample', status: 'Pending', date: 'Today', notes: 'Awaiting your review' },
              { order: 'ORD-018', checkpoint: 'Quality Inspection', status: 'Disputed', date: '1 day ago', notes: 'Size mismatch reported' },
            ].map((checkpoint, index) => (
              <div key={index} className="p-3 bg-secondary/30 rounded">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{checkpoint.checkpoint}</p>
                    <p className="text-xs text-muted-foreground">{checkpoint.order} • {checkpoint.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    checkpoint.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    checkpoint.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {checkpoint.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{checkpoint.notes}</p>
                {checkpoint.status === 'Pending' && (
                  <Button size="sm" variant="outline" className="w-full h-7">
                    Review Now
                  </Button>
                )}
                {checkpoint.status === 'Disputed' && (
                  <Button size="sm" variant="outline" className="w-full h-7 text-red-600">
                    Raise Quality Concern
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. SUPPLIER TRUST & REPUTATION VIEW */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">Supplier Trust Profiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'ABC Exports', reputation: 4.8, orders: 23, qualityPass: '98.5%', disputes: 0 },
            { name: 'Global Trade Co', reputation: 4.6, orders: 15, qualityPass: '96.2%', disputes: 1 },
            { name: 'XYZ Industries', reputation: 4.9, orders: 31, qualityPass: '99.1%', disputes: 0 },
          ].map((supplier, index) => (
            <div key={index} className="p-4 bg-secondary/30 rounded border border-border">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-sm">{supplier.name}</p>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                  <Star size={14} className="fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-bold">{supplier.reputation}</span>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Orders Completed</span>
                  <span className="font-medium">{supplier.orders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quality Pass Rate</span>
                  <span className="font-medium text-green-600">{supplier.qualityPass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dispute History</span>
                  <span className={`font-medium ${supplier.disputes > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {supplier.disputes}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 italic">
                Reputation earned through real trade, not ads
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. YOUR BUYER REPUTATION */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">Your Buyer Reputation</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">94</p>
            <p className="text-xs text-muted-foreground">Orders Placed</p>
          </div>
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">97.8%</p>
            <p className="text-xs text-muted-foreground">Timely Escrow Funding</p>
          </div>
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">98.2%</p>
            <p className="text-xs text-muted-foreground">Fair Approvals</p>
          </div>
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">0.3%</p>
            <p className="text-xs text-muted-foreground">Unfair Disputes</p>
          </div>
        </div>
        <div className="p-4 bg-blue-50 rounded">
          <p className="font-semibold text-center mb-2">Overall Buyer Reputation</p>
          <p className="text-3xl font-bold text-center text-blue-700">4.7 / 5.0</p>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Exporters trust good buyers too. This makes TradeChain two-sided trust.
          </p>
        </div>
      </div>

      {/* 6. TRADE RISK & INTELLIGENCE */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-2">Trade Signals</h2>
        <p className="text-xs text-yellow-600 mb-4">(AI-assisted insights - demo)</p>
        <div className="space-y-2">
          {[
            { icon: AlertTriangle, type: 'Shipping Delay', message: 'Mumbai Port congestion - expect 3-5 day delays for ORD-021', color: 'text-orange-600' },
            { icon: TrendingUp, type: 'Price Change', message: 'Cotton prices increased 8% - consider locking rates now', color: 'text-blue-600' },
            { icon: Globe, type: 'Geopolitical', message: 'New trade agreement favorable for textile imports', color: 'text-green-600' },
          ].map((signal, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded">
              <signal.icon size={16} className={signal.color} />
              <div className="flex-1">
                <p className="font-medium text-sm">{signal.type}</p>
                <p className="text-xs text-muted-foreground">{signal.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MicroManufacturerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Micro-Manufacturer Dashboard</h1>
        <p className="text-muted-foreground">
          Your gateway to work without middlemen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Jobs"
          value="5"
          icon={<Factory size={20} />}
        />
        <StatCard
          title="Pending Samples"
          value="3"
          icon={<FileCheck size={20} />}
          subtitle="Awaiting approval"
        />
        <StatCard
          title="Earnings (Month)"
          value="$8,500"
          change={22}
          icon={<DollarSign size={20} />}
        />
        <StatCard
          title="Reputation Score"
          value="4.8"
          icon={<Star size={20} />}
          subtitle="Out of 5.0"
        />
      </div>

      {/* 1. AVAILABLE WORK - PRIMARY SECTION */}
      <div className="bg-card border-2 border-blue-600 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Package size={20} className="text-blue-600" />
          Available Work Near You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { exporter: 'ABC Exports', verified: true, product: 'Organic Mangoes', qty: 500, quality: 'Grade A', deadline: '15 days', payout: '$2,500' },
            { exporter: 'Global Trade Co', verified: true, product: 'Cotton Fabric', qty: 1000, quality: 'Premium', deadline: '20 days', payout: '$4,200' },
            { exporter: 'XYZ Industries', verified: true, product: 'Handicraft Items', qty: 200, quality: 'Standard', deadline: '12 days', payout: '$1,800' },
            { exporter: 'Modern Exporters', verified: false, product: 'Spice Mix', qty: 300, quality: 'Grade B', deadline: '18 days', payout: '$1,200' },
          ].map((work, index) => (
            <div key={index} className="p-4 bg-secondary/30 rounded border border-border hover:border-blue-600 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold">{work.product}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-muted-foreground">{work.exporter}</p>
                    {work.verified && (
                      <CheckCircle size={14} className="text-green-600" />
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{work.payout}</p>
                  <p className="text-xs text-muted-foreground">Est. payout</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                <div>
                  <p className="text-muted-foreground">Quantity</p>
                  <p className="font-medium">{work.qty} units</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Quality</p>
                  <p className="font-medium">{work.quality}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Deadline</p>
                  <p className="font-medium">{work.deadline}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <CheckCircle size={14} className="mr-1" />
                  I Can Fulfill
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Send Sample
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. SAMPLE REQUEST & QUALITY SIMPLICITY */}
        <div className="bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Sample Requests</h2>
          <div className="space-y-3">
            {[
              { exporter: 'ABC Exports', product: 'Organic Mangoes', deadline: '3 days', instructions: ['Size: 150-200g', 'Color: Yellow-orange', 'No bruises'] },
              { exporter: 'Global Trade Co', product: 'Cotton Fabric', deadline: '5 days', instructions: ['Thread count: 300', 'Width: 60 inches', 'Color: White'] },
            ].map((sample, index) => (
              <div key={index} className="p-4 bg-secondary/30 rounded">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{sample.product}</p>
                    <p className="text-xs text-muted-foreground">From {sample.exporter}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                    Due in {sample.deadline}
                  </span>
                </div>
                <div className="my-3">
                  <p className="text-xs font-medium mb-1">Requirements:</p>
                  <ul className="space-y-1">
                    {sample.instructions.map((inst, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                        <CheckCircle size={12} className="text-green-600" />
                        {inst}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Upload Photos
                  </Button>
                  <Button size="sm" className="flex-1">
                    Mark Sent
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. PAYMENT & ESCROW - SIMPLE WORDS */}
        <div className="bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Your Payments</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded">
              <p className="text-xs text-muted-foreground mb-1">Total Earnings (This Month)</p>
              <p className="text-3xl font-bold text-green-700">$8,500</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 rounded">
                <p className="text-xs text-muted-foreground mb-1">Pending Payments</p>
                <p className="text-xl font-semibold text-blue-700">$2,300</p>
              </div>
              <div className="p-3 bg-purple-50 rounded">
                <p className="text-xs text-muted-foreground mb-1">Next Payment</p>
                <p className="text-xl font-semibold text-purple-700">3 days</p>
              </div>
            </div>
            <div className="p-3 bg-secondary/30 rounded border border-border">
              <p className="text-xs font-medium mb-2 flex items-center gap-2">
                <Lock size={14} className="text-green-600" />
                Secured Payments
              </p>
              <p className="text-xs text-muted-foreground">
                Payments are locked and released automatically after approval. You're protected.
              </p>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Payment History
            </Button>
          </div>
        </div>
      </div>

      {/* 4. REPUTATION - SIMPLE & MOTIVATIONAL */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Star size={20} className="text-yellow-500 fill-yellow-500" />
          Your Trust Score
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">4.8</p>
            <p className="text-xs text-muted-foreground">Reputation Score</p>
          </div>
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">67</p>
            <p className="text-xs text-muted-foreground">Orders Completed</p>
          </div>
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">94.3%</p>
            <p className="text-xs text-muted-foreground">Samples Approved</p>
          </div>
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">96.1%</p>
            <p className="text-xs text-muted-foreground">On-Time Delivery</p>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-green-50 rounded border border-yellow-200">
          <p className="text-center font-semibold text-green-700 mb-1">Higher trust = more work & better pay</p>
          <p className="text-xs text-center text-muted-foreground">Keep up the great work to unlock premium opportunities!</p>
        </div>
      </div>

      {/* 5. CONNECTION TO EXPORTERS */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">My Exporter Connections</h2>
        <div className="space-y-3">
          {[
            { name: 'ABC Exports', worked: 23, active: 2, pending: 0, rating: 4.9 },
            { name: 'Global Trade Co', worked: 15, active: 1, pending: 1, rating: 4.7 },
            { name: 'XYZ Industries', worked: 8, active: 0, pending: 0, rating: 4.8 },
          ].map((exporter, index) => (
            <div key={index} className="p-4 bg-secondary/30 rounded flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">{exporter.name}</p>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-yellow-500 text-yellow-500" />
                    <span className="text-xs">{exporter.rating}</span>
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>{exporter.worked} jobs completed</span>
                  <span>{exporter.active} active</span>
                  {exporter.pending > 0 && <span className="text-yellow-600">{exporter.pending} pending invite</span>}
                </div>
              </div>
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-3" size="sm">
          <Users size={14} className="mr-2" />
          View All Connections
        </Button>
      </div>

      {/* 6. CURRENT ASSIGNMENTS - CLEAR & SIMPLE */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">Current Assignments</h2>
        <div className="space-y-3">
          {[
            { product: 'Organic Mangoes', qty: 250, status: 'In Production', payout: '$1,250', progress: 65 },
            { product: 'Cotton Fabric', qty: 500, status: 'Sample Pending', payout: '$2,100', progress: 15 },
            { product: 'Handicraft Items', qty: 100, status: 'Completed', payout: '$900', progress: 100 },
          ].map((assignment, index) => (
            <div key={index} className="p-4 bg-secondary/30 rounded">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{assignment.product}</p>
                <span className={`text-xs px-2 py-1 rounded ${
                  assignment.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  assignment.status === 'In Production' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {assignment.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">{assignment.qty} units assigned</span>
                <span className="font-semibold text-green-600">{assignment.payout}</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    assignment.progress === 100 ? 'bg-green-600' : 'bg-blue-600'
                  }`}
                  style={{ width: `${assignment.progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{assignment.progress}% complete</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. NOTIFICATIONS */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <div className="space-y-3">
          {[
            { type: 'work', message: 'New work available from ABC Exports', time: '5 min ago', icon: Package },
            { type: 'approved', message: 'Your sample was approved by Global Trade Co', time: '1 hour ago', icon: CheckCircle },
            { type: 'payment', message: 'Payment of $900 has been released', time: '2 hours ago', icon: DollarSign },
            { type: 'message', message: 'Message from XYZ Industries exporter', time: '3 hours ago', icon: AlertCircle },
          ].map((notification, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-secondary/30 rounded">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                notification.type === 'work' ? 'bg-blue-100' :
                notification.type === 'approved' ? 'bg-green-100' :
                notification.type === 'payment' ? 'bg-purple-100' :
                'bg-yellow-100'
              }`}>
                <notification.icon size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ManufacturerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Manufacturer Dashboard</h1>
          <p className="text-muted-foreground">
            Managing a decentralized production network.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Switch Role:</span>
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/role-activation')}>
            <Users size={14} className="mr-2" />
            Change Role
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Production Capacity"
          value="85%"
          icon={<Factory size={20} />}
          subtitle="Utilization rate"
        />
        <StatCard
          title="Active Orders"
          value="32"
          change={18}
          icon={<ShoppingCart size={20} />}
        />
        <StatCard
          title="Sub-Suppliers"
          value="15"
          icon={<Users size={20} />}
        />
        <StatCard
          title="Monthly Revenue"
          value="$250,000"
          change={12}
          icon={<DollarSign size={20} />}
        />
      </div>

      {/* 1. ORDER ALLOCATION & SPLITTING PANEL */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">Order Allocation Control</h2>
        <div className="space-y-4">
          {[
            { id: 'ORD-019', product: 'Textile Products', total: 10000, inhouse: 6000, delegated: 4000, suppliers: 3, remaining: 0 },
            { id: 'ORD-024', product: 'Electronic Components', total: 5000, inhouse: 3000, delegated: 1500, suppliers: 2, remaining: 500 },
            { id: 'ORD-031', product: 'Agricultural Products', total: 8000, inhouse: 5000, delegated: 2500, suppliers: 4, remaining: 500 },
          ].map((order) => (
            <div key={order.id} className="p-4 bg-secondary/30 rounded border border-border">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Total: {order.total.toLocaleString()} units</p>
                  {order.remaining > 0 && (
                    <p className="text-xs text-yellow-600">{order.remaining} units unassigned</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 bg-blue-50 rounded text-center">
                  <p className="text-xs text-muted-foreground mb-1">In-House</p>
                  <p className="text-lg font-bold text-blue-700">{order.inhouse.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded text-center">
                  <p className="text-xs text-muted-foreground mb-1">Delegated</p>
                  <p className="text-lg font-bold text-purple-700">{order.delegated.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-50 rounded text-center">
                  <p className="text-xs text-muted-foreground mb-1">Suppliers</p>
                  <p className="text-lg font-bold text-green-700">{order.suppliers}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded text-center">
                  <p className="text-xs text-muted-foreground mb-1">Remaining</p>
                  <p className="text-lg font-bold text-yellow-700">{order.remaining}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Adjust Allocation
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. MICRO-MANUFACTURER MANAGEMENT */}
        <div className="bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Sub-Supplier Network</h2>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {[
              { name: 'Nashik Agro Co-op', location: 'Maharashtra', capacity: '1000 kg/day', reputation: 4.8, current: 'ORD-019', quality: '98.2%' },
              { name: 'Coimbatore Textiles', location: 'Tamil Nadu', capacity: '2000 m/day', reputation: 4.6, current: 'ORD-024', quality: '96.5%' },
              { name: 'Jaipur Crafts', location: 'Rajasthan', capacity: '500 units/day', reputation: 4.9, current: 'ORD-019', quality: '99.1%' },
              { name: 'Ludhiana Parts', location: 'Punjab', capacity: '1500 units/day', reputation: 4.7, current: 'ORD-031', quality: '97.3%' },
              { name: 'Surat Gems', location: 'Gujarat', capacity: '400 units/day', reputation: 4.5, current: 'None', quality: '95.8%' },
            ].map((supplier, index) => (
              <div key={index} className="p-3 bg-secondary/30 rounded border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{supplier.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin size={12} />
                      <span>{supplier.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-medium">{supplier.reputation}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div>
                    <p className="text-muted-foreground">Capacity</p>
                    <p className="font-medium">{supplier.capacity}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Quality History</p>
                    <p className="font-medium text-green-600">{supplier.quality}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Current: {supplier.current}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-6 px-2">Assign</Button>
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-red-600">Remove</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-3" size="sm">
            <Users size={14} className="mr-2" />
            Invite Sub-Supplier
          </Button>
        </div>

        {/* 3. ESCROW FLOW VISIBILITY */}
        <div className="bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lock size={18} className="text-green-600" />
            Escrow Flow Summary
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded">
              <p className="text-xs text-muted-foreground mb-1">Total Escrow Locked</p>
              <p className="text-2xl font-bold text-green-700">$425,000</p>
              <p className="text-xs text-green-600 mt-1">For your active orders • On-chain</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 rounded">
                <p className="text-xs text-muted-foreground mb-1">Released to You</p>
                <p className="text-lg font-semibold text-blue-700">$125,000</p>
              </div>
              <div className="p-3 bg-purple-50 rounded">
                <p className="text-xs text-muted-foreground mb-1">Pending</p>
                <p className="text-lg font-semibold text-purple-700">$85,000</p>
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded">
              <p className="text-xs text-muted-foreground mb-1">Distributed to Sub-Suppliers</p>
              <p className="text-lg font-semibold text-yellow-700">$95,000</p>
              <p className="text-xs text-muted-foreground mt-1">Milestone-based releases</p>
            </div>
            <div className="p-3 bg-secondary/30 rounded border border-border">
              <p className="text-xs font-medium mb-1">Smart Contract Flow</p>
              <p className="text-xs text-muted-foreground">Importer → Escrow → You → Sub-Suppliers</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. QUALITY DELEGATION & AUDIT TRAIL */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">Quality Control Chain</h2>
        <div className="space-y-3">
          {[
            { batch: 'B-023', product: 'Textile Batch A', supplier: 'Nashik Co-op', inspection: 'Passed', samples: 3, issues: 0 },
            { batch: 'B-024', product: 'Electronic Parts', supplier: 'Coimbatore Tech', inspection: 'Passed', samples: 5, issues: 0 },
            { batch: 'B-025', product: 'Craft Items', supplier: 'Jaipur Crafts', inspection: 'Pending', samples: 2, issues: 0 },
            { batch: 'B-026', product: 'Agricultural Batch', supplier: 'Ludhiana Agro', inspection: 'Failed', samples: 4, issues: 2 },
          ].map((batch, index) => (
            <div key={index} className="p-4 bg-secondary/30 rounded border-l-4 border-l-blue-600">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-sm">{batch.batch} - {batch.product}</p>
                  <p className="text-xs text-muted-foreground">Supplier: {batch.supplier}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  batch.inspection === 'Passed' ? 'bg-green-100 text-green-700' :
                  batch.inspection === 'Failed' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {batch.inspection}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Samples Checked</p>
                  <p className="font-medium">{batch.samples}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Issues Found</p>
                  <p className={`font-medium ${batch.issues > 0 ? 'text-red-600' : 'text-green-600'}`}>{batch.issues}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Action</p>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">View</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. NETWORK TRUST SCORE */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award size={18} className="text-purple-600" />
          Your Network Trust Score
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">143</p>
            <p className="text-xs text-muted-foreground">Orders Completed</p>
          </div>
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">96.8%</p>
            <p className="text-xs text-muted-foreground">Sub-Supplier Quality</p>
          </div>
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">97.5%</p>
            <p className="text-xs text-muted-foreground">On-Time Delivery</p>
          </div>
          <div className="p-3 bg-secondary/30 rounded text-center">
            <p className="text-2xl font-bold">0.4%</p>
            <p className="text-xs text-muted-foreground">Dispute Rate</p>
          </div>
        </div>
        <div className="p-4 bg-purple-50 rounded">
          <p className="font-semibold text-center mb-2">Overall Network Trust Score</p>
          <p className="text-3xl font-bold text-center text-purple-700">4.9 / 5.0</p>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Your reputation improves when your entire network performs well
          </p>
        </div>
      </div>

      {/* 6. SUPPLY ALERTS */}
      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-semibold mb-2">Supply Alerts</h2>
        <p className="text-xs text-yellow-600 mb-4">(Predictive signals - demo)</p>
        <div className="space-y-2">
          {[
            { icon: AlertTriangle, type: 'Capacity Drop', message: 'Nashik Co-op capacity reduced to 70% due to equipment maintenance', color: 'text-orange-600' },
            { icon: AlertCircle, type: 'Quality Risk', message: 'Batch B-026 failed inspection - contact supplier immediately', color: 'text-red-600' },
            { icon: Clock, type: 'Deadline Risk', message: 'ORD-024 at risk of missing deadline - reallocate 500 units', color: 'text-yellow-600' },
          ].map((alert, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded">
              <alert.icon size={16} className={alert.color} />
              <div className="flex-1">
                <p className="font-medium text-sm">{alert.type}</p>
                <p className="text-xs text-muted-foreground">{alert.message}</p>
              </div>
              <Button size="sm" variant="ghost">
                Act
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function DashboardHome() {
  const { address, isConnected } = useWallet();

  // For MVP, use wallet address as identity and localStorage for role
  // Later: on-chain role registry contract
  const userRole = localStorage.getItem('userRole') || 'user';

  const renderDashboard = () => {
    switch (userRole) {
      case 'exporter':
        return <ExporterDashboard />;
      case 'importer':
        return <ImporterDashboard />;
      case 'micro-manufacturer':
        return <MicroManufacturerDashboard />;
      case 'manufacturer':
        return <ManufacturerDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>;
}
