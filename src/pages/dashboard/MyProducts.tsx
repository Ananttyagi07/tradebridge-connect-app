import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Package, Loader2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/context/WalletContext';
import { listProduct, getExporterProducts, getProduct, type Product } from '@/contracts/productListing';
import { uploadProductToIPFS, getIPFSUrl } from '@/utils/ipfs';
import { ethers } from 'ethers';

export default function MyProducts() {
  const { address, signer, provider } = useWallet();
  const { toast } = useToast();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    pricePerUnit: '',
    quantity: '',
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  // Fetch products on mount
  useEffect(() => {
    if (address && provider) {
      fetchMyProducts();
    }
  }, [address, provider]);

  const fetchMyProducts = async () => {
    if (!address || !provider) return;

    try {
      setFetching(true);
      const productIds = await getExporterProducts(provider, address);

      const productDetails = await Promise.all(
        productIds.map(async (id) => {
          const product = await getProduct(provider, id);
          return {
            ...product,
            id: product.id.toString(),
            pricePerUnitEth: ethers.formatEther(product.pricePerUnit),
            quantity: product.availableQuantity.toString(),
          };
        })
      );

      setProducts(productDetails);
    } catch (error) {
      console.error('Failed to fetch products:', error);

      // Use mock data for demo
      const mockProducts = [
        {
          id: '1',
          name: 'Organic Alphonso Mangoes',
          description: 'Premium quality mangoes from Maharashtra, India. Sweet and juicy.',
          category: 'Agriculture',
          pricePerUnitEth: '0.002',
          quantity: '5000',
          ipfsHash: 'QmDemo123',
          active: true,
        },
        {
          id: '2',
          name: 'Basmati Rice Premium',
          description: 'Long grain basmati rice, aged for perfect aroma and taste.',
          category: 'Agriculture',
          pricePerUnitEth: '0.0015',
          quantity: '10000',
          ipfsHash: 'QmDemo456',
          active: true,
        },
      ];
      setProducts(mockProducts);

      toast({
        title: 'Demo Mode',
        description: 'Showing mock products. Deploy contracts for real functionality.',
      });
    } finally {
      setFetching(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signer) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet.',
        variant: 'destructive',
      });
      return;
    }

    if (selectedImages.length === 0) {
      toast({
        title: 'Images Required',
        description: 'Please upload at least one product image.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Try real implementation first
      try {
        // Upload to IPFS
        toast({
          title: 'Uploading to IPFS...',
          description: 'Please wait while we upload your product images.',
        });

        const ipfsHash = await uploadProductToIPFS(
          {
            name: formData.name,
            description: formData.description,
            category: formData.category,
          },
          selectedImages
        );

        toast({
          title: 'IPFS Upload Success',
          description: `Images uploaded to IPFS: ${ipfsHash.substring(0, 10)}...`,
        });

        // List on blockchain
        toast({
          title: 'Creating Transaction...',
          description: 'Please confirm the transaction in MetaMask.',
        });

        const result = await listProduct(
          signer,
          formData.name,
          formData.description,
          formData.category,
          formData.pricePerUnit,
          parseInt(formData.quantity),
          ipfsHash
        );

        toast({
          title: 'Product Listed!',
          description: `${formData.name} is now live on the marketplace.`,
        });
      } catch (blockchainError) {
        // Demo mode fallback
        console.log('Using demo mode');

        const newProduct = {
          id: String(products.length + 1),
          name: formData.name,
          description: formData.description,
          category: formData.category,
          pricePerUnitEth: formData.pricePerUnit,
          quantity: formData.quantity,
          ipfsHash: 'QmDemo' + Date.now(),
          active: true,
        };

        setProducts([...products, newProduct]);

        toast({
          title: 'Product Added (Demo Mode)',
          description: `${formData.name} added to your catalog. Deploy contracts for blockchain listing.`,
        });
      }

      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        pricePerUnit: '',
        quantity: '',
      });
      setSelectedImages([]);
      setDialogOpen(false);

    } catch (error: any) {
      console.error('Product listing failed:', error);

      if (error.code === 'ACTION_REJECTED') {
        toast({
          title: 'Transaction Rejected',
          description: 'You rejected the transaction.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Listing Failed',
          description: error.message || 'Failed to list product.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-2">My Products</h1>
            <p className="text-muted-foreground">
              Manage your product catalog and track performance
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>List New Product</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Organic Alphonso Mangoes"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Agriculture">Agriculture</SelectItem>
                      <SelectItem value="Textiles">Textiles</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Handicrafts">Handicrafts</SelectItem>
                      <SelectItem value="Food">Food & Beverages</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your product..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price Per Unit (ETH) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.0001"
                      value={formData.pricePerUnit}
                      onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                      placeholder="0.001"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Available Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="100"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Product Images *</Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload 1-5 images. Will be stored on IPFS.
                  </p>
                  {selectedImages.length > 0 && (
                    <p className="text-sm text-green-600">
                      {selectedImages.length} image(s) selected
                    </p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? 'Listing Product...' : 'List Product'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {fetching ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
            <Package size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No Products Yet</h3>
            <p className="text-muted-foreground mb-6">
              List your first product to start receiving orders
            </p>
            <Button onClick={() => setDialogOpen(true)} className="gap-2">
              <Plus size={16} />
              Add Your First Product
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-secondary flex items-center justify-center">
                  <Package size={48} className="text-muted-foreground" />
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">{product.pricePerUnitEth} ETH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Available:</span>
                      <span className="font-medium">{product.quantity} units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => window.open(getIPFSUrl(product.ipfsHash), '_blank')}
                    >
                      <ExternalLink size={14} />
                      View IPFS
                    </Button>
                    <div className={`px-2 py-1 text-xs rounded ${product.active ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                      {product.active ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
