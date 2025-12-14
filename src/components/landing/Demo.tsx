import { Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  'Create your account and verify your business',
  'Activate your role as exporter, importer, or manufacturer',
  'List products or browse the marketplace',
  'Send sample requests and negotiate terms',
  'Secure transactions with smart escrow',
  'Track milestones and receive payments automatically',
];

export function Demo() {
  return (
    <section id="demo" className="py-24 px-6 bg-foreground text-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              See TradeChain in action
            </h2>
            <p className="text-background/70 mb-8">
              Watch how our platform streamlines international trade with blockchain-powered 
              security and transparency.
            </p>

            <div className="space-y-4 mb-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-background/50 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-background/80">{step}</span>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 bg-transparent border-background/20 text-background hover:bg-background/10"
            >
              <Play size={18} />
              Watch Demo Video
            </Button>
          </div>

          <div className="relative">
            <div className="aspect-video bg-background/10 border border-background/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-background/10 flex items-center justify-center cursor-pointer hover:bg-background/20 transition-colors">
                  <Play size={32} className="text-background ml-1" />
                </div>
                <p className="text-sm text-background/50">Click to play demo</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-background text-foreground p-4 max-w-xs hidden lg:block">
              <p className="text-sm font-medium mb-1">Quick Setup</p>
              <p className="text-xs text-muted-foreground">
                Get started in under 5 minutes with guided onboarding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
