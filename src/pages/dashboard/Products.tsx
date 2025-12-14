import { useState } from 'react';
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
import { Search, Filter, Grid, List, Star, MapPin, Shield } from 'lucide-react';

const products = [
  {
    id: '1',
    name: 'Organic Alphonso Mangoes',
    category: 'Agriculture',
    price: '$2.50/kg',
    moq: '500 kg',
    supplier: 'ABC Exports Ltd',
    location: 'India',
    rating: 4.8,
    verified: true,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    name: 'Premium Cotton Fabric',
    category: 'Textiles',
    price: '$8.00/m',
    moq: '1000 m',
    supplier: 'Global Textiles Co',
    location: 'Bangladesh',
    rating: 4.6,
    verified: true,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    name: 'Electronic Components Set',
    category: 'Electronics',
    price: '$0.50/unit',
    moq: '10000 units',
    supplier: 'Tech Parts Inc',
    location: 'China',
    rating: 4.9,
    verified: true,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '4',
    name: 'Organic Spice Mix',
    category: 'Food',
    price: '$15.00/kg',
    moq: '100 kg',
    supplier: 'Spice World Exports',
    location: 'India',
    rating: 4.7,
    verified: false,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '5',
    name: 'Industrial Machinery Parts',
    category: 'Manufacturing',
    price: '$250/unit',
    moq: '50 units',
    supplier: 'Heavy Industries Co',
    location: 'Germany',
    rating: 4.5,
    verified: true,
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '6',
    name: 'Fresh Vegetables Pack',
    category: 'Agriculture',
    price: '$1.20/kg',
    moq: '200 kg',
    supplier: 'Farm Fresh Exports',
    location: 'Mexico',
    rating: 4.4,
    verified: true,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=60',
  },
];

export default function Products() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || product.category.toLowerCase() === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Browse Products</h1>
          <p className="text-muted-foreground">
            Discover verified products from exporters worldwide.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search products or suppliers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
              <SelectItem value="textiles">Textiles</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            More Filters
          </Button>
          <div className="flex gap-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-card border border-border hover:border-foreground/20 transition-colors ${
                viewMode === 'list' ? 'flex gap-4' : ''
              }`}
            >
              <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-[4/3]'}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs text-muted-foreground">{product.category}</span>
                    <h3 className="font-medium">{product.name}</h3>
                  </div>
                  {product.verified && (
                    <div className="flex-shrink-0">
                      <Shield size={16} className="text-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin size={14} />
                  <span>{product.location}</span>
                  <span>•</span>
                  <Star size={14} className="fill-current" />
                  <span>{product.rating}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{product.supplier}</p>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-semibold">{product.price}</p>
                    <p className="text-xs text-muted-foreground">MOQ: {product.moq}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Request Sample</Button>
                    <Button size="sm">Contact</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
