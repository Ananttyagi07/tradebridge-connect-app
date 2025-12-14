import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react';

const mockInvitations = [
  {
    id: '1',
    from: 'FreshFarms Export',
    product: 'Organic Alphonso Mangoes',
    quantity: '1000 units',
    price: '0.002 ETH/unit',
    deadline: '5 days',
    status: 'pending',
  },
  {
    id: '2',
    from: 'India Grains Co.',
    product: 'Basmati Rice Premium',
    quantity: '2000 units',
    price: '0.0015 ETH/unit',
    deadline: '3 days',
    status: 'pending',
  },
];

export default function Invitations() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Collaboration Invitations</h1>
          <p className="text-muted-foreground">
            Production requests from exporters
          </p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 px-4 py-3 rounded-lg mb-6">
          <p className="text-sm text-yellow-700">
            <strong>Demo Mode:</strong> Showing sample invitations. Deploy Collaboration contract for real functionality.
          </p>
        </div>

        <div className="space-y-4">
          {mockInvitations.map((invitation) => (
            <div
              key={invitation.id}
              className="bg-card border border-border p-6 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{invitation.product}</h3>
                    <p className="text-sm text-muted-foreground">From: {invitation.from}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={16} />
                  <span>{invitation.deadline} remaining</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Quantity Requested</p>
                  <p className="font-medium">{invitation.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Offered Price</p>
                  <p className="font-medium">{invitation.price}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 gap-2">
                  <CheckCircle size={16} />
                  Accept & Send Sample
                </Button>
                <Button variant="outline" className="gap-2">
                  <XCircle size={16} />
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>

        {mockInvitations.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
            <Users size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No Pending Invitations</h3>
            <p className="text-muted-foreground">
              Collaboration requests from exporters will appear here
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
