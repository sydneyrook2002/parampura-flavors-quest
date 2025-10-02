import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { selectedProduct, addToCart, addToWishlist, setPage } = useCart();

  if (!selectedProduct) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Product not found</p>
        <Button onClick={() => setPage('home')} className="mt-4">
          Go Home
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    toast.success('Added to cart!');
  };

  const handleAddToWishlist = () => {
    addToWishlist(selectedProduct);
    toast.success('Added to wishlist!');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div>
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <div className="mb-4">
            <span className="text-sm text-muted-foreground uppercase tracking-wide">
              {selectedProduct.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{selectedProduct.name}</h1>

          {selectedProduct.rating && (
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(selectedProduct.rating!)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({selectedProduct.reviews} reviews)
              </span>
            </div>
          )}

          <div className="text-3xl font-bold text-primary mb-6">
            ${selectedProduct.price.toFixed(2)}
          </div>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            {selectedProduct.description}
          </p>

          <div className="flex gap-4 mb-8">
            <Button size="lg" onClick={handleAddToCart} className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" onClick={handleAddToWishlist}>
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="font-semibold text-primary">In Stock</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-semibold capitalize">
                    {selectedProduct.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
