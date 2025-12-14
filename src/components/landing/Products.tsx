import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const products = [
  {
    category: 'Agriculture',
    items: ['Fresh Fruits', 'Vegetables', 'Spices', 'Grains'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60',
  },
  {
    category: 'Textiles',
    items: ['Cotton Fabrics', 'Silk', 'Denim', 'Technical Textiles'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&auto=format&fit=crop&q=60',
  },
  {
    category: 'Electronics',
    items: ['Components', 'Consumer Electronics', 'Industrial Equipment'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60',
  },
  {
    category: 'Manufacturing',
    items: ['Auto Parts', 'Machinery', 'Tools', 'Raw Materials'],
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&auto=format&fit=crop&q=60',
  },
];

export function Products() {
  return (
    <section id="products" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Trade across industries
            </h2>
            <p className="text-muted-foreground max-w-xl">
              From agriculture to electronics, connect with verified suppliers 
              and manufacturers across major product categories.
            </p>
          </div>
          <Link to="/auth?mode=signup" className="mt-6 md:mt-0">
            <Button variant="outline" className="gap-2">
              Browse All Products
              <ArrowUpRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.category}
              className="group relative aspect-[4/5] overflow-hidden bg-secondary"
            >
              <img
                src={product.image}
                alt={product.category}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-medium text-lg mb-2">{product.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.items.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2 py-1 bg-background/80 text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
