import { Star, Heart, ShoppingCart, Minus, Plus, Check, Leaf, Truck, Shield } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/contexts/CartContext';
import { products } from '@/data/products';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { selectedProduct, addToCart, addToWishlist, setPage, setSelectedProduct } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Generate multiple images for carousel
  const productImages = selectedProduct ? [
    selectedProduct.image,
    selectedProduct.image,
    selectedProduct.image,
  ] : [];

  // Get related products
  const relatedProducts = selectedProduct
    ? products
        .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
        .slice(0, 4)
    : [];

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Button onClick={() => setPage('home')}>
            Return to Home
          </Button>
        </div>
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

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => setPage('home')} className="text-muted-foreground hover:text-foreground">
              Home
            </button>
            <span className="text-muted-foreground">/</span>
            <button onClick={() => setPage('category')} className="text-muted-foreground hover:text-foreground capitalize">
              {selectedProduct.category}
            </button>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{selectedProduct.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted/30 rounded-xl overflow-hidden border border-border relative group">
              <img
                src={productImages[selectedImageIndex]}
                alt={selectedProduct.name}
                className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary shadow-lg">Fresh</Badge>
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx 
                      ? 'border-primary' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain p-2 bg-muted/30" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-5">
            <div>
              <Badge variant="secondary" className="mb-3">
                <Leaf className="w-3 h-3 mr-1" />
                {selectedProduct.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {selectedProduct.name}
              </h1>
              
              {/* Rating */}
              {selectedProduct.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(selectedProduct.rating!)
                            ? 'fill-primary text-primary'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-primary">
                ${selectedProduct.price.toFixed(2)}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                ${(selectedProduct.price * 1.25).toFixed(2)}
              </span>
              <Badge variant="destructive" className="text-xs">20% OFF</Badge>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 py-4">
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <Check className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-xs font-medium">100% Organic</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <Truck className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-xs font-medium">Free Delivery</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <Shield className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-xs font-medium">Secure Pay</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decrementQuantity}
                  className="h-9 px-3 rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-14 text-center font-medium border-x border-border h-9 flex items-center justify-center">
                  {quantity}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={incrementQuantity}
                  className="h-9 px-3 rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                size="lg" 
                onClick={handleAddToCart}
                className="flex-1"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add ${(selectedProduct.price * quantity).toFixed(2)}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleAddToWishlist}
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Product Details */}
            <Card className="bg-muted/30 border p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU</span>
                  <span className="font-medium">#{selectedProduct.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="default" className="h-5 text-xs">In Stock</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium capitalize">{selectedProduct.category}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">You May Also Like</h2>
              <p className="text-muted-foreground text-sm">Similar products from our collection</p>
            </div>

            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {relatedProducts.map((product) => (
                  <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                    <Card 
                      className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all border hover:border-primary"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="aspect-square bg-muted/20 relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <Badge variant="secondary" className="text-xs mb-1">
                          {product.category}
                        </Badge>
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-primary text-primary" />
                              <span className="text-xs font-medium">{product.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4" />
              <CarouselNext className="-right-4" />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
