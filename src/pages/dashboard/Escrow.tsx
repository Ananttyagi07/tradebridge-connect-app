import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/StatCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Wallet,
  Lock,
  CheckCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';

const escrowTransactions = [
  {
    id: 'ESC-001',
    orderId: 'ORD-2024-001',
    product: 'Organic Alphonso Mangoes',
    counterparty: 'ABC Corporation',
    totalAmount: '$12,500',
    lockedAmount: '$12,500',
    releasedAmount: '$4,166',
    status: 'Active',
    milestones: [
      { name: 'Sample Approved', amount: '$0', status: 'completed' },
      { name: 'Production Started', amount: '$4,166', status: 'completed' },
      { name: 'Quality Verified', amount: '$4,167', status: 'pending' },
      { name: 'Delivered', amount: '$4,167', status: 'pending' },
    ],
  },
  {
    id: 'ESC-002',
    orderId: 'ORD-2024-002',
    product: 'Premium Cotton Fabric',
    counterparty: 'XYZ Ltd',
    totalAmount: '$8,200',
    lockedAmount: '$8,200',
    releasedAmount: '$6,150',
    status: 'Active',
    milestones: [
      { name: 'Sample Approved', amount: '$0', status: 'completed' },
      { name: 'Production Complete', amount: '$4,100', status: 'completed' },
      { name: 'Shipped', amount: '$2,050', status: 'completed' },
      { name: 'Delivered', amount: '$2,050', status: 'pending' },
    ],
  },
  {
    id: 'ESC-003',
    orderId: 'ORD-2024-004',
    product: 'Organic Spice Mix',
    counterparty: 'Global Foods Co',
    totalAmount: '$5,800',
    lockedAmount: '$0',
    releasedAmount: '$5,800',
    status: 'Completed',
    milestones: [
      { name: 'Sample Approved', amount: '$0', status: 'completed' },
      { name: 'Production Complete', amount: '$2,900', status: 'completed' },
      { name: 'Delivered', amount: '$2,900', status: 'completed' },
    ],
  },
];

export default function Escrow() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Smart Escrow</h1>
          <p className="text-muted-foreground">
            Secure milestone-based payments protected by smart contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Locked"
            value="$20,700"
            icon={<Lock size={20} />}
            subtitle="Across 2 active escrows"
          />
          <StatCard
            title="Total Released"
            value="$16,116"
            icon={<CheckCircle size={20} />}
            change={15}
          />
          <StatCard
            title="Pending Release"
            value="$10,384"
            icon={<Clock size={20} />}
            subtitle="Awaiting milestone approval"
          />
          <StatCard
            title="Active Escrows"
            value="2"
            icon={<Wallet size={20} />}
          />
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Escrows</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6 space-y-6">
            {escrowTransactions
              .filter(tx => tx.status === 'Active')
              .map((escrow) => (
                <div key={escrow.id} className="bg-card border border-border">
                  <div className="p-6 border-b border-border">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{escrow.id}</h3>
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700">
                            {escrow.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {escrow.product} • {escrow.orderId}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          With: {escrow.counterparty}
                        </p>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Locked</p>
                          <p className="font-semibold">{escrow.lockedAmount}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Released</p>
                          <p className="font-semibold text-green-600">{escrow.releasedAmount}</p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1">
                          View Contract
                          <ExternalLink size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-sm font-medium mb-4">Milestone Progress</h4>
                    <div className="space-y-4">
                      {escrow.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 ${
                            milestone.status === 'completed' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-secondary text-muted-foreground'
                          }`}>
                            {milestone.status === 'completed' ? (
                              <CheckCircle size={16} />
                            ) : (
                              <Clock size={16} />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{milestone.name}</p>
                              <p className="text-sm font-medium">{milestone.amount}</p>
                            </div>
                          </div>
                          {milestone.status === 'pending' && index === escrow.milestones.findIndex(m => m.status === 'pending') && (
                            <Button size="sm">Approve</Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="completed" className="mt-6 space-y-4">
            {escrowTransactions
              .filter(tx => tx.status === 'Completed')
              .map((escrow) => (
                <div key={escrow.id} className="bg-card border border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{escrow.id}</h3>
                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700">
                          {escrow.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{escrow.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{escrow.releasedAmount}</p>
                      <p className="text-xs text-muted-foreground">Fully released</p>
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="all" className="mt-6 space-y-4">
            {escrowTransactions.map((escrow) => (
              <div key={escrow.id} className="bg-card border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{escrow.id}</h3>
                      <span className={`text-xs px-2 py-0.5 ${
                        escrow.status === 'Completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {escrow.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{escrow.product}</p>
                    <p className="text-sm text-muted-foreground">{escrow.counterparty}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-medium">{escrow.totalAmount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Released</p>
                      <p className="font-medium text-green-600">{escrow.releasedAmount}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowRight size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <div className="bg-secondary/30 border border-border p-6">
          <div className="flex items-start gap-4">
            <AlertCircle size={24} className="text-muted-foreground flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-1">How Smart Escrow Works</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Funds are locked in a smart contract when an order is placed. 
                Payments are automatically released to suppliers when milestones are approved by both parties.
              </p>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
