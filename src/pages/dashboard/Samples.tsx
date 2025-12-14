import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileCheck, Upload, Image as ImageIcon } from 'lucide-react';

export default function Samples() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Sample Submissions</h1>
          <p className="text-muted-foreground">
            Upload samples for exporter quality review
          </p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 px-4 py-3 rounded-lg mb-6">
          <p className="text-sm text-yellow-700">
            <strong>Coming Soon:</strong> Sample upload with IPFS storage. Deploy Collaboration contract to enable.
          </p>
        </div>

        <div className="bg-card border border-border p-8 rounded-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <FileCheck size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Upload Product Sample</h3>
            <p className="text-sm text-muted-foreground">
              Upload images and details of your sample for exporter review
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Sample Images</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-foreground/30 transition-colors cursor-pointer">
                <ImageIcon size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 10MB
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  disabled
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Sample Notes</Label>
              <textarea
                id="notes"
                className="w-full min-h-[100px] px-3 py-2 border border-border rounded-md bg-background"
                placeholder="Add notes about your sample (quality, specifications, etc.)"
                disabled
              />
            </div>

            <Button className="w-full gap-2" disabled>
              <Upload size={16} />
              Submit Sample (Coming Soon)
            </Button>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h4 className="font-medium mb-2">How It Works</h4>
          <ol className="text-sm text-muted-foreground space-y-2">
            <li>1. Accept a collaboration invitation from an exporter</li>
            <li>2. Upload sample images and specifications here</li>
            <li>3. Exporter reviews and approves/rejects quality</li>
            <li>4. If approved, you receive the full production order</li>
            <li>5. Payment released automatically upon delivery confirmation</li>
          </ol>
        </div>
      </div>
    </DashboardLayout>
  );
}
