import { Star, Heart, ShoppingCart, Minus, Plus, Check, Leaf, Award, Clock } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/contexts/CartContext';
import { products } from '@/data/products';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
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
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Generate multiple images for carousel (in real app, these would come from product data)
  const productImages = [
    selectedProduct?.image,
    selectedProduct?.image,
    selectedProduct?.image,
    selectedProduct?.image,
  ];

  // Get related products
  const relatedProducts = products
    .filter(p => p.category === selectedProduct?.category && p.id !== selectedProduct?.id)
    .slice(0, 4);

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
    <div className="min-h-screen bg-background">
      {/* Hero Section with Breadcrumb */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <button onClick={() => setPage('home')} className="hover:text-primary transition-colors">
              Home
            </button>
            <span>/</span>
            <button onClick={() => {
              setPage('category');
            }} className="hover:text-primary transition-colors capitalize">
              {selectedProduct.category}
            </button>
            <span>/</span>
            <span className="text-foreground">{selectedProduct.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Image Carousel */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-secondary/20 rounded-2xl overflow-hidden border border-border group">
              <img
                src={productImages[selectedImage]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Badge className="bg-primary text-primary-foreground shadow-lg">
                  Fresh
                </Badge>
                <Badge variant="secondary" className="shadow-lg">
                  Organic
                </Badge>
              </div>
            </div>
            
            {/* Thumbnail Carousel */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx 
                      ? 'border-primary shadow-md scale-105' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3">
                <Leaf className="w-3 h-3 mr-1" />
                {selectedProduct.category}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {selectedProduct.name}
              </h1>
              
              {/* Rating */}
              {selectedProduct.rating && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(selectedProduct.rating!)
                            ? 'fill-primary text-primary'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                  </span>
                </div>
              )}
            </div>

            <Separator />

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-bold text-primary">
                ${selectedProduct.price.toFixed(2)}
              </span>
              <span className="text-xl text-muted-foreground line-through">
                ${(selectedProduct.price * 1.25).toFixed(2)}
              </span>
              <Badge variant="destructive">20% OFF</Badge>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground">100% Organic</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground">Farm Fresh</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground">Same Day Delivery</span>
              </div>
            </div>

            <Separator />

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decrementQuantity}
                  className="rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-16 text-center font-semibold border-x border-border py-2">
                  {quantity}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={incrementQuantity}
                  className="rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                size="lg" 
                onClick={handleAddToCart}
                className="flex-1 h-14 text-base font-semibold"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart - ${(selectedProduct.price * quantity).toFixed(2)}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleAddToWishlist}
                className="h-14 px-6"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Additional Info */}
            <Card className="bg-muted/50 border-none p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU:</span>
                  <span className="font-medium">{selectedProduct.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability:</span>
                  <span className="font-medium text-primary">In Stock</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium capitalize">{selectedProduct.category}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">You May Also Like</h2>
              <p className="text-muted-foreground">Discover more products from our organic collection</p>
            </div>

            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent className="-ml-4">
                {relatedProducts.map((product) => (
                  <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card 
                      className="group cursor-pointer overflow-hidden border-2 hover:border-primary transition-all hover:shadow-xl"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="aspect-square bg-muted relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-5 space-y-3">
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="text-sm font-medium">{product.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
