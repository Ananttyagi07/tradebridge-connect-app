import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Clock, Upload } from 'lucide-react';

const mockJobs = [
  {
    id: '1',
    product: 'Organic Alphonso Mangoes',
    exporter: 'FreshFarms Export',
    quantity: '1000 units',
    deadline: '10 days',
    status: 'in_production',
    progress: 60,
  },
  {
    id: '2',
    product: 'Hand-woven Cotton Textiles',
    exporter: 'Heritage Textiles',
    quantity: '500 units',
    deadline: '15 days',
    status: 'sample_approved',
    progress: 30,
  },
];

export default function ActiveJobs() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Active Jobs</h1>
          <p className="text-muted-foreground">
            Track your ongoing production orders
          </p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 px-4 py-3 rounded-lg mb-6">
          <p className="text-sm text-yellow-700">
            <strong>Demo Mode:</strong> Showing sample jobs. Deploy Collaboration contract for real tracking.
          </p>
        </div>

        <div className="space-y-4">
          {mockJobs.map((job) => (
            <div
              key={job.id}
              className="bg-card border border-border p-6 rounded-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <Package size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{job.product}</h3>
                    <p className="text-sm text-muted-foreground">For: {job.exporter}</p>
                  </div>
                </div>
                <Badge className={job.status === 'in_production' ? 'bg-blue-500/10 text-blue-600' : 'bg-green-500/10 text-green-600'}>
                  {job.status === 'in_production' ? 'In Production' : 'Sample Approved'}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-medium">{job.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="font-medium flex items-center gap-2">
                    <Clock size={14} />
                    {job.deadline}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="font-medium">{job.progress}%</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Production Progress</span>
                  <span className="font-medium">{job.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${job.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <Upload size={16} />
                  Upload Progress Update
                </Button>
                <Button className="gap-2">
                  Mark as Complete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {mockJobs.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
            <Package size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No Active Jobs</h3>
            <p className="text-muted-foreground">
              Accept collaboration invitations to start production
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
