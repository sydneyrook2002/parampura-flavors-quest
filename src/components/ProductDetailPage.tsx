import { Star, Heart, ShoppingCart, Minus, Plus, Package, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { selectedProduct, addToCart, addToWishlist, setPage } = useCart();
  const [quantity, setQuantity] = useState(1);

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
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(selectedProduct);
    toast.success('Added to wishlist!');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => setPage('home')} 
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Section */}
          <div className="animate-fade-in">
            <div className="sticky top-8">
              <div className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-2xl overflow-hidden shadow-2xl border border-border/50 group">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="animate-slide-up space-y-6">
            {/* Category Badge */}
            <div>
              <Badge variant="secondary" className="uppercase tracking-wider">
                {selectedProduct.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold text-foreground leading-tight">
              {selectedProduct.name}
            </h1>

            {/* Rating */}
            {selectedProduct.rating && (
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 transition-colors ${
                        i < Math.floor(selectedProduct.rating!)
                          ? 'fill-primary text-primary'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  {selectedProduct.rating.toFixed(1)} ({selectedProduct.reviews} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold text-primary">
                ${selectedProduct.price.toFixed(2)}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                ${(selectedProduct.price * 1.2).toFixed(2)}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 py-4">
              <span className="text-sm font-semibold text-foreground">Quantity:</span>
              <div className="flex items-center gap-3 border border-border rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decrementQuantity}
                  className="h-8 w-8 p-0 hover:bg-secondary"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={incrementQuantity}
                  className="h-8 w-8 p-0 hover:bg-secondary"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              <Button 
                size="lg" 
                onClick={handleAddToCart} 
                className="flex-1 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleAddToWishlist}
                className="h-14 px-6 border-2 hover:bg-secondary hover:border-primary transition-all"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-4 text-center">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold text-foreground">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">On orders $50+</p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-4 text-center">
                  <Package className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold text-foreground">Fresh Product</p>
                  <p className="text-xs text-muted-foreground">100% Organic</p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-4 text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold text-foreground">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">SSL Encrypted</p>
                </CardContent>
              </Card>
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="pt-6">
              <TabsList className="grid w-full grid-cols-3 bg-secondary">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4 pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProduct.description}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our {selectedProduct.name.toLowerCase()} are carefully selected from certified organic farms. 
                  Each product is handpicked at peak freshness to ensure you receive the highest quality produce.
                </p>
              </TabsContent>
              <TabsContent value="details" className="space-y-3 pt-6">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="font-semibold text-foreground">Category</span>
                  <span className="text-muted-foreground capitalize">{selectedProduct.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="font-semibold text-foreground">Availability</span>
                  <Badge variant="default">In Stock</Badge>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="font-semibold text-foreground">SKU</span>
                  <span className="text-muted-foreground">{selectedProduct.id}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-semibold text-foreground">Origin</span>
                  <span className="text-muted-foreground">Organic Farms, USA</span>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-4 pt-6">
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <span className="font-semibold text-sm">Amazing quality!</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Best organic produce I've ordered. Fresh and delivered on time.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">- Sarah M.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                          <Star className="h-4 w-4 text-muted" />
                        </div>
                        <span className="font-semibold text-sm">Great value</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Very satisfied with the quality and freshness. Will order again!
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">- John D.</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
