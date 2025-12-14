import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Eye, MessageSquare, FileText } from 'lucide-react';

const orders = [
  {
    id: 'ORD-2024-001',
    product: 'Organic Alphonso Mangoes',
    buyer: 'ABC Corporation',
    quantity: '500 kg',
    amount: '$12,500',
    status: 'Processing',
    date: '2024-01-15',
    escrowStatus: 'Funded',
    milestones: 3,
    completedMilestones: 1,
  },
  {
    id: 'ORD-2024-002',
    product: 'Premium Cotton Fabric',
    buyer: 'XYZ Ltd',
    quantity: '1000 m',
    amount: '$8,200',
    status: 'Shipped',
    date: '2024-01-12',
    escrowStatus: 'Partial Release',
    milestones: 4,
    completedMilestones: 3,
  },
  {
    id: 'ORD-2024-003',
    product: 'Electronic Components Set',
    buyer: 'Tech Industries Inc',
    quantity: '10000 units',
    amount: '$25,000',
    status: 'Pending',
    date: '2024-01-10',
    escrowStatus: 'Awaiting Deposit',
    milestones: 5,
    completedMilestones: 0,
  },
  {
    id: 'ORD-2024-004',
    product: 'Organic Spice Mix',
    buyer: 'Global Foods Co',
    quantity: '200 kg',
    amount: '$5,800',
    status: 'Delivered',
    date: '2024-01-05',
    escrowStatus: 'Released',
    milestones: 3,
    completedMilestones: 3,
  },
  {
    id: 'ORD-2024-005',
    product: 'Industrial Machinery Parts',
    buyer: 'Heavy Industries',
    quantity: '100 units',
    amount: '$45,000',
    status: 'In Production',
    date: '2024-01-08',
    escrowStatus: 'Funded',
    milestones: 6,
    completedMilestones: 2,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-700';
    case 'Shipped':
      return 'bg-blue-100 text-blue-700';
    case 'Processing':
    case 'In Production':
      return 'bg-yellow-100 text-yellow-700';
    case 'Pending':
      return 'bg-secondary text-muted-foreground';
    default:
      return 'bg-secondary text-muted-foreground';
  }
};

const getEscrowColor = (status: string) => {
  switch (status) {
    case 'Released':
      return 'text-green-600';
    case 'Funded':
    case 'Partial Release':
      return 'text-blue-600';
    case 'Awaiting Deposit':
      return 'text-yellow-600';
    default:
      return 'text-muted-foreground';
  }
};

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your orders with milestone-based payments.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by order ID, product, or buyer..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="in production">In Production</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            More Filters
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-card border border-border p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-secondary flex items-center justify-center flex-shrink-0">
                        <FileText size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{order.id}</h3>
                          <span className={`text-xs px-2 py-0.5 ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.product}</p>
                        <p className="text-sm text-muted-foreground">Buyer: {order.buyer}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-semibold">{order.amount}</p>
                        <p className="text-xs text-muted-foreground">Qty: {order.quantity}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <MessageSquare size={18} />
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye size={14} />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">Date:</span>{' '}
                        <span>{order.date}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Escrow:</span>{' '}
                        <span className={getEscrowColor(order.escrowStatus)}>{order.escrowStatus}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        Milestones: {order.completedMilestones}/{order.milestones}
                      </span>
                      <div className="w-32 h-2 bg-secondary">
                        <div
                          className="h-full bg-foreground transition-all"
                          style={{ width: `${(order.completedMilestones / order.milestones) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredOrders.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No orders found matching your criteria.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
