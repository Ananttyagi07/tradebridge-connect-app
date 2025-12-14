import { 
  Package, 
  Users, 
  FileCheck, 
  Wallet, 
  BarChart3, 
  Shield,
  Factory,
  Globe,
  Star
} from 'lucide-react';

const features = [
  {
    icon: Package,
    title: 'Product Catalog',
    description: 'Create comprehensive listings with pricing, specs, certifications, and trade terms.',
  },
  {
    icon: Users,
    title: 'Micro-Manufacturer Network',
    description: 'Collaborate with verified small producers to fulfil large orders efficiently.',
  },
  {
    icon: FileCheck,
    title: 'Sample Verification',
    description: 'Request and approve samples before committing to large production orders.',
  },
  {
    icon: Wallet,
    title: 'Smart Escrow',
    description: 'Funds locked in smart contracts, released automatically on milestone completion.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track sales, orders, quality scores, and supply chain performance in real-time.',
  },
  {
    icon: Shield,
    title: 'On-Chain Reputation',
    description: 'Build verifiable reputation based on delivery, quality, and buyer feedback.',
  },
  {
    icon: Factory,
    title: 'Production Management',
    description: 'Manage batches, QC stages, and delivery timelines from a single dashboard.',
  },
  {
    icon: Globe,
    title: 'Global Compliance',
    description: 'Support for international trade terms, certifications, and shipping standards.',
  },
  {
    icon: Star,
    title: 'Quality Assurance',
    description: 'Multi-stage quality validation with documentation and approval workflows.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Everything you need to trade globally
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete platform for exporters, importers, and manufacturers to connect, 
            transact, and build trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card p-6 border border-border hover:border-foreground/20 transition-colors"
            >
              <div className="w-10 h-10 bg-secondary flex items-center justify-center mb-4">
                <feature.icon size={20} />
              </div>
              <h3 className="font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
