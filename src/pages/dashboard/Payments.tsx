import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Wallet, Search, Download, CheckCircle2, Clock, XCircle } from 'lucide-react';

const mockPayments = [
  {
    id: '1',
    type: 'received',
    from: 'FreshFarms Export',
    amount: '2.0 ETH',
    date: '2025-12-10',
    status: 'completed',
    description: 'Payment for Organic Alphonso Mangoes - 1000 units',
    txHash: '0x1234...5678',
  },
  {
    id: '2',
    type: 'pending',
    from: 'Global Textiles Co',
    amount: '1.5 ETH',
    date: '2025-12-12',
    status: 'escrow',
    description: 'Escrow for Premium Cotton Fabric - 500m',
    txHash: '0xabcd...efgh',
  },
  {
    id: '3',
    type: 'received',
    from: 'Spice World Exports',
    amount: '0.8 ETH',
    date: '2025-12-08',
    status: 'completed',
    description: 'Payment for Organic Spice Mix - 50kg',
    txHash: '0x9876...5432',
  },
  {
    id: '4',
    type: 'pending',
    from: 'Tech Parts Inc',
    amount: '3.2 ETH',
    date: '2025-12-13',
    status: 'escrow',
    description: 'Escrow for Electronic Components - 5000 units',
    txHash: '0xfedc...ba98',
  },
];

export default function Payments() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={18} className="text-green-600" />;
      case 'escrow':
        return <Clock size={18} className="text-yellow-600" />;
      case 'failed':
        return <XCircle size={18} className="text-red-600" />;
      default:
        return <Clock size={18} className="text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'escrow':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'failed':
        return 'bg-red-500/10 text-red-700 border-red-500/20';
      default:
        return 'bg-secondary text-muted-foreground';
    }
  };

  const totalReceived = mockPayments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

  const totalEscrow = mockPayments
    .filter((p) => p.status === 'escrow')
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Payments & Escrow</h1>
          <p className="text-muted-foreground">
            Track your payment history and escrowed funds
          </p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 px-4 py-3 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>Coming Soon:</strong> Real-time escrow tracking with Order contract deployment.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle2 size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Received</p>
                <p className="text-2xl font-semibold">{totalReceived.toFixed(2)} ETH</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <Clock size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Escrow</p>
                <p className="text-2xl font-semibold">{totalEscrow.toFixed(2)} ETH</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Wallet size={20} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-semibold">{mockPayments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search transactions..."
              className="pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="escrow">In Escrow</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export
          </Button>
        </div>

        {/* Payments Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-secondary/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">From/To</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                    <td className="px-4 py-4 text-sm">{payment.date}</td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-medium">{payment.from}</p>
                        <p className="text-xs text-muted-foreground">{payment.txHash}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground max-w-xs">
                      {payment.description}
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold">{payment.amount}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(payment.status)}`}>
                          {payment.status === 'escrow' ? 'In Escrow' : payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h4 className="font-medium mb-2">How Escrow Works</h4>
          <ol className="text-sm text-muted-foreground space-y-2">
            <li>1. Importer places order - payment held in smart contract escrow</li>
            <li>2. Exporter confirms order and begins production</li>
            <li>3. Exporter ships products and updates status</li>
            <li>4. Importer confirms delivery - payment automatically released</li>
            <li>5. If disputed, multi-validator system resolves fairly</li>
          </ol>
        </div>
      </div>
    </DashboardLayout>
  );
}
