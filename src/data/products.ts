import { Product } from '@/contexts/CartContext';
import tomatoesImg from '@/assets/product-tomatoes.jpg';
import spinachImg from '@/assets/product-spinach.jpg';
import carrotsImg from '@/assets/product-carrots.jpg';
import peppersImg from '@/assets/product-peppers.jpg';
import applesImg from '@/assets/product-apples.jpg';
import strawberriesImg from '@/assets/product-strawberries.jpg';
import bananasImg from '@/assets/product-bananas.jpg';
import berriesImg from '@/assets/product-berries.jpg';
import milkImg from '@/assets/product-milk.jpg';
import yogurtImg from '@/assets/product-yogurt.jpg';
import cheeseImg from '@/assets/product-cheese.jpg';
import butterImg from '@/assets/product-butter.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    price: 4.99,
    image: tomatoesImg,
    category: 'vegetables',
    description: 'Fresh, vine-ripened organic tomatoes. Perfect for salads and cooking.',
    inStock: true,
    rating: 4.5,
    reviews: 28,
  },
  {
    id: '2',
    name: 'Fresh Spinach',
    price: 3.49,
    image: spinachImg,
    category: 'vegetables',
    description: 'Nutrient-rich organic spinach leaves, freshly harvested.',
    inStock: true,
    rating: 4.8,
    reviews: 35,
  },
  {
    id: '3',
    name: 'Organic Carrots',
    price: 2.99,
    image: carrotsImg,
    category: 'vegetables',
    description: 'Sweet and crunchy organic carrots, grown without pesticides.',
    inStock: true,
    rating: 4.6,
    reviews: 42,
  },
  {
    id: '4',
    name: 'Bell Peppers Mix',
    price: 5.99,
    image: peppersImg,
    category: 'vegetables',
    description: 'Colorful mix of organic bell peppers - red, yellow, and green.',
    inStock: true,
    rating: 4.7,
    reviews: 31,
  },
  {
    id: '5',
    name: 'Organic Apples',
    price: 6.99,
    image: applesImg,
    category: 'fruits',
    description: 'Crisp and sweet organic apples. Great for snacking.',
    inStock: true,
    rating: 4.9,
    reviews: 56,
  },
  {
    id: '6',
    name: 'Fresh Strawberries',
    price: 7.99,
    image: strawberriesImg,
    category: 'fruits',
    description: 'Juicy organic strawberries, picked at peak ripeness.',
    inStock: true,
    rating: 4.8,
    reviews: 48,
  },
  {
    id: '7',
    name: 'Organic Bananas',
    price: 3.99,
    image: bananasImg,
    category: 'fruits',
    description: 'Naturally sweet organic bananas, perfect for smoothies.',
    inStock: true,
    rating: 4.6,
    reviews: 67,
  },
  {
    id: '8',
    name: 'Mixed Berries',
    price: 8.99,
    image: berriesImg,
    category: 'fruits',
    description: 'Organic blueberries, raspberries, and blackberries.',
    inStock: true,
    rating: 4.9,
    reviews: 52,
  },
  {
    id: '9',
    name: 'Organic Milk',
    price: 5.49,
    image: milkImg,
    category: 'dairy',
    description: 'Fresh organic whole milk from grass-fed cows.',
    inStock: true,
    rating: 4.7,
    reviews: 89,
  },
  {
    id: '10',
    name: 'Greek Yogurt',
    price: 4.99,
    image: yogurtImg,
    category: 'dairy',
    description: 'Creamy organic Greek yogurt, high in protein.',
    inStock: true,
    rating: 4.8,
    reviews: 73,
  },
  {
    id: '11',
    name: 'Artisan Cheese',
    price: 9.99,
    image: cheeseImg,
    category: 'dairy',
    description: 'Handcrafted organic cheese, aged to perfection.',
    inStock: true,
    rating: 4.9,
    reviews: 45,
  },
  {
    id: '12',
    name: 'Organic Butter',
    price: 6.49,
    image: butterImg,
    category: 'dairy',
    description: 'Rich and creamy organic butter from grass-fed cows.',
    inStock: true,
    rating: 4.7,
    reviews: 61,
  },
];

export const categories = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    description: 'Fresh organic vegetables',
  },
  {
    id: 'fruits',
    name: 'Fruits',
    description: 'Seasonal organic fruits',
  },
  {
    id: 'dairy',
    name: 'Dairy',
    description: 'Organic dairy products',
  },
  {
    id: 'grains',
    name: 'Grains',
    description: 'Whole grains and cereals',
  },
];
