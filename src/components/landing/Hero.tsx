import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Globe, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-sm mb-8">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-muted-foreground">Blockchain-powered trade platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 text-balance">
            Global Trade,
            <br />
            <span className="text-muted-foreground">Simplified.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
            Connect exporters, importers, and manufacturers on a single platform with smart escrow, 
            transparent supply chains, and on-chain reputation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="gap-2 px-8">
                Start Trading
                <ArrowRight size={18} />
              </Button>
            </Link>
            <a href="#demo">
              <Button variant="outline" size="lg" className="px-8">
                Watch Demo
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: Shield, label: 'Smart Escrow', desc: 'Funds secured on-chain' },
              { icon: Globe, label: 'Global Network', desc: '50+ countries connected' },
              { icon: Zap, label: 'Instant Payments', desc: 'Milestone-based releases' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                  <item.icon size={24} className="text-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
