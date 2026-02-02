import { Product, User, Order, Review } from './types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation.',
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'SoundPro',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
    ],
    variants: [
      { id: 'color', name: 'Color', options: ['Black', 'White', 'Blue'] },
    ],
    stock: 50,
    sku: 'WH-001',
    rating: 4.5,
    reviewCount: 128,
    tags: ['wireless', 'noise-cancelling', 'featured'],
    featured: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    category: 'Electronics',
    subcategory: 'Wearables',
    brand: 'FitTech',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80'
    ],
    variants: [
      { id: 'color', name: 'Color', options: ['Black', 'Silver', 'Rose Gold'] },
      { id: 'size', name: 'Band Size', options: ['Small', 'Medium', 'Large'] }
    ],
    stock: 75,
    sku: 'FW-002',
    rating: 4.7,
    reviewCount: 256,
    tags: ['smartwatch', 'fitness', 'featured'],
    featured: true
  },
  {
    id: '3',
    name: 'Professional Camera',
    description: 'Capture stunning photos with this professional-grade camera featuring a 24MP sensor and 4K video recording.',
    price: 1299.99,
    category: 'Electronics',
    subcategory: 'Cameras',
    brand: 'PhotoMaster',
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
      'https://images.unsplash.com/photo-1606980470166-78d3b4a34e15?w=800&q=80'
    ],
    variants: [
      { id: 'lens', name: 'Lens Kit', options: ['Body Only', 'With 18-55mm', 'With 18-135mm'] }
    ],
    stock: 25,
    sku: 'CAM-003',
    rating: 4.9,
    reviewCount: 89,
    tags: ['camera', 'professional', 'featured'],
    featured: true
  },
  {
    id: '4',
    name: 'Running Shoes',
    description: 'Lightweight and comfortable running shoes designed for maximum performance and durability.',
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    category: 'Fashion',
    subcategory: 'Footwear',
    brand: 'SportMax',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80'
    ],
    variants: [
      { id: 'size', name: 'Size', options: ['7', '8', '9', '10', '11', '12'] },
      { id: 'color', name: 'Color', options: ['Black', 'White', 'Blue', 'Red'] }
    ],
    stock: 100,
    sku: 'SHOE-004',
    rating: 4.6,
    reviewCount: 342,
    tags: ['shoes', 'running', 'sports'],
    featured: true
  },
  {
    id: '5',
    name: 'Laptop Backpack',
    description: 'Durable and stylish backpack with padded laptop compartment and multiple pockets for organization.',
    price: 49.99,
    category: 'Accessories',
    subcategory: 'Bags',
    brand: 'TravelGear',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80'
    ],
    variants: [
      { id: 'color', name: 'Color', options: ['Black', 'Gray', 'Navy'] }
    ],
    stock: 60,
    sku: 'BAG-005',
    rating: 4.4,
    reviewCount: 145,
    tags: ['backpack', 'travel', 'laptop', 'featured'],
    featured: true
  },
  {
    id: '6',
    name: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with customizable RGB lighting and programmable buttons.',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    category: 'Electronics',
    subcategory: 'Gaming',
    brand: 'GamePro',
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80'
    ],
    variants: [
      { id: 'color', name: 'Color', options: ['Black', 'White'] }
    ],
    stock: 80,
    sku: 'MOUSE-006',
    rating: 4.8,
    reviewCount: 276,
    tags: ['gaming', 'mouse', 'wireless', 'featured'],
    featured: true
  },
  {
    id: '7',
    name: 'Premium Sunglasses',
    description: 'Stylish sunglasses with UV protection and polarized lenses for ultimate eye protection.',
    price: 159.99,
    category: 'Fashion',
    subcategory: 'Eyewear',
    brand: 'StyleVision',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'
    ],
    variants: [
      { id: 'style', name: 'Style', options: ['Classic', 'Aviator', 'Wayfarer'] },
      { id: 'color', name: 'Frame Color', options: ['Black', 'Gold', 'Silver'] }
    ],
    stock: 45,
    sku: 'SUN-007',
    rating: 4.5,
    reviewCount: 98,
    tags: ['sunglasses', 'fashion', 'accessories', 'featured'],
    featured: true
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof Bluetooth speaker with 360° sound and 20-hour battery life.',
    price: 129.99,
    originalPrice: 179.99,
    discount: 28,
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'SoundWave',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&q=80'
    ],
    variants: [
      { id: 'color', name: 'Color', options: ['Black', 'Blue', 'Red', 'Green'] }
    ],
    stock: 55,
    sku: 'SPEAK-008',
    rating: 4.7,
    reviewCount: 187,
    tags: ['speaker', 'bluetooth', 'portable', 'featured'],
    featured: true
  },
  {
    id: '9',
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB mechanical keyboard with customizable keys and premium switches for ultimate gaming experience.',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    category: 'Electronics',
    subcategory: 'Gaming',
    brand: 'GamePro',
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80'
    ],
    variants: [
      { id: 'switch', name: 'Switch Type', options: ['Red', 'Blue', 'Brown'] },
      { id: 'color', name: 'Color', options: ['Black', 'White'] }
    ],
    stock: 65,
    sku: 'KB-009',
    rating: 4.8,
    reviewCount: 198,
    tags: ['keyboard', 'gaming', 'mechanical', 'featured'],
    featured: true
  },
  {
    id: '10',
    name: 'Premium Yoga Mat',
    description: 'Eco-friendly non-slip yoga mat with extra cushioning for comfort during your practice.',
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    category: 'Sports & Outdoors',
    subcategory: 'Fitness',
    brand: 'ZenFit',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&q=80'
    ],
    variants: [
      { id: 'color', name: 'Color', options: ['Purple', 'Blue', 'Pink', 'Green'] },
      { id: 'thickness', name: 'Thickness', options: ['4mm', '6mm', '8mm'] }
    ],
    stock: 90,
    sku: 'YOGA-010',
    rating: 4.6,
    reviewCount: 234,
    tags: ['yoga', 'fitness', 'mat', 'featured'],
    featured: true
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: 'user1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Absolutely amazing headphones! The noise cancellation is superb and the sound quality is incredible.',
    verified: true,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    productId: '1',
    userId: 'user2',
    userName: 'Sarah Smith',
    rating: 4,
    comment: 'Great product overall. Comfortable to wear for long periods. Battery life could be better.',
    verified: true,
    createdAt: '2024-01-20T14:20:00Z'
  },
  {
    id: '3',
    productId: '2',
    userId: 'user3',
    userName: 'Mike Johnson',
    rating: 5,
    comment: 'Perfect fitness companion! Tracks everything accurately and the battery lasts for days.',
    verified: true,
    createdAt: '2024-01-18T09:15:00Z'
  }
];

export const categories = [
  {
    id: '1',
    name: 'Electronics',
    subcategories: ['Audio', 'Wearables', 'Cameras', 'Gaming', 'Computers']
  },
  {
    id: '2',
    name: 'Fashion',
    subcategories: ['Clothing', 'Footwear', 'Eyewear', 'Accessories']
  },
  {
    id: '3',
    name: 'Home & Living',
    subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bedding']
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    subcategories: ['Fitness', 'Camping', 'Cycling', 'Swimming']
  },
  {
    id: '5',
    name: 'Books & Media',
    subcategories: ['Books', 'Movies', 'Music', 'Games']
  }
];

export const coupons = [
  { code: 'WELCOME10', discount: 10, type: 'percentage' as const },
  { code: 'SAVE20', discount: 20, type: 'percentage' as const, minPurchase: 100 },
  { code: 'FLAT50', discount: 50, type: 'fixed' as const, minPurchase: 200 }
];
