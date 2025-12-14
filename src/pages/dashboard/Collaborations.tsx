import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/dashboard/StatCard';
import {
  Users,
  Search,
  Star,
  MapPin,
  Factory,
  CheckCircle,
  Clock,
  MessageSquare,
  Eye,
} from 'lucide-react';

const manufacturers = [
  {
    id: '1',
    name: 'Sunrise Agro Industries',
    location: 'Maharashtra, India',
    category: 'Agriculture',
    capacity: '5000 kg/month',
    rating: 4.8,
    completedOrders: 45,
    status: 'Available',
    verified: true,
    specialties: ['Fresh Fruits', 'Vegetables', 'Spices'],
  },
  {
    id: '2',
    name: 'Green Valley Farms',
    location: 'Gujarat, India',
    category: 'Agriculture',
    capacity: '3000 kg/month',
    rating: 4.6,
    completedOrders: 32,
    status: 'Available',
    verified: true,
    specialties: ['Organic Produce', 'Grains'],
  },
  {
    id: '3',
    name: 'Premium Textiles Co',
    location: 'Tamil Nadu, India',
    category: 'Textiles',
    capacity: '10000 m/month',
    rating: 4.9,
    completedOrders: 78,
    status: 'Busy',
    verified: true,
    specialties: ['Cotton', 'Silk', 'Blended Fabrics'],
  },
  {
    id: '4',
    name: 'Tech Parts Manufacturing',
    location: 'Shenzhen, China',
    category: 'Electronics',
    capacity: '50000 units/month',
    rating: 4.7,
    completedOrders: 120,
    status: 'Available',
    verified: true,
    specialties: ['PCB', 'Components', 'Assemblies'],
  },
];

const activeCollaborations = [
  {
    id: '1',
    manufacturer: 'Sunrise Agro Industries',
    product: 'Organic Alphonso Mangoes',
    orderId: 'ORD-2024-001',
    allocatedQty: '200 kg',
    progress: 65,
    status: 'In Production',
    sampleStatus: 'Approved',
  },
  {
    id: '2',
    manufacturer: 'Green Valley Farms',
    product: 'Organic Alphonso Mangoes',
    orderId: 'ORD-2024-001',
    allocatedQty: '300 kg',
    progress: 40,
    status: 'Sample Review',
    sampleStatus: 'Pending',
  },
];

export default function Collaborations() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredManufacturers = manufacturers.filter((mfr) =>
    mfr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mfr.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Micro-Manufacturer Collaborations</h1>
          <p className="text-muted-foreground">
            Connect with verified manufacturers to fulfil large orders efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Collaborations"
            value="12"
            icon={<Users size={20} />}
          />
          <StatCard
            title="Available Manufacturers"
            value="156"
            icon={<Factory size={20} />}
          />
          <StatCard
            title="Avg. Quality Score"
            value="4.7"
            icon={<Star size={20} />}
            subtitle="Out of 5.0"
          />
          <StatCard
            title="Orders Fulfilled"
            value="89"
            change={18}
            icon={<CheckCircle size={20} />}
          />
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Collaborations</TabsTrigger>
            <TabsTrigger value="find">Find Manufacturers</TabsTrigger>
            <TabsTrigger value="invitations">Sent Invitations</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6 space-y-4">
            {activeCollaborations.map((collab) => (
              <div key={collab.id} className="bg-card border border-border p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                      <Factory size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium">{collab.manufacturer}</h3>
                      <p className="text-sm text-muted-foreground">
                        {collab.product} • {collab.orderId}
                      </p>
                      <p className="text-sm">Allocated: {collab.allocatedQty}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className={`text-xs px-2 py-0.5 ${
                        collab.status === 'In Production'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {collab.status}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MessageSquare size={18} />
                    </Button>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Sample: {' '}
                      <span className={collab.sampleStatus === 'Approved' ? 'text-green-600' : 'text-yellow-600'}>
                        {collab.sampleStatus}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{collab.progress}%</span>
                    <div className="w-32 h-2 bg-secondary">
                      <div
                        className="h-full bg-foreground transition-all"
                        style={{ width: `${collab.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="find" className="mt-6">
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search by name, category, or location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredManufacturers.map((mfr) => (
                <div key={mfr.id} className="bg-card border border-border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                        <Factory size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{mfr.name}</h3>
                          {mfr.verified && (
                            <CheckCircle size={14} className="text-foreground" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin size={14} />
                          <span>{mfr.location}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 ${
                      mfr.status === 'Available'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {mfr.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {mfr.specialties.map((spec) => (
                      <span key={spec} className="text-xs px-2 py-1 bg-secondary">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center mb-4 py-4 bg-secondary/30">
                    <div>
                      <p className="font-medium">{mfr.capacity}</p>
                      <p className="text-xs text-muted-foreground">Capacity</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <Star size={14} className="fill-current" />
                        <span className="font-medium">{mfr.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                    <div>
                      <p className="font-medium">{mfr.completedOrders}</p>
                      <p className="text-xs text-muted-foreground">Orders</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-1" size="sm">
                      <Eye size={14} />
                      View Profile
                    </Button>
                    <Button className="flex-1" size="sm">
                      Send Invitation
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invitations" className="mt-6">
            <div className="bg-card border border-border p-12 text-center">
              <Clock size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">No Pending Invitations</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You haven't sent any collaboration invitations yet.
              </p>
              <Button>Find Manufacturers</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
