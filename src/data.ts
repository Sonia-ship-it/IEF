/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Service, Testimonial } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- ELECTRONICS ---
  {
    id: 'elec-1',
    name: 'Hikvision Smart PTZ Wifi Security Camera',
    price: 89990,
    description: 'High-definition 360-degree coverage CCTV camera with smart motion tracking, night vision, and active defense features. Connects seamlessly to your mobile phone for live streaming.',
    category: 'Electronics',
    subcategory: 'CCTV Cameras',
    images: [
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 15,
    rating: 4.8,
    reviewsCount: 34,
    isBestSeller: true,
    isFeatured: true,
    specifications: {
      'Resolution': '1080p Full HD',
      'Field of View': '360° Horizontal, 90° Vertical',
      'Connectivity': '2.4GHz Wi-Fi / Ethernet',
      'Storage': 'MicroSD Slot (up to 256GB) & Cloud',
      'Weatherproof': 'IP66 Rated'
    }
  },
  {
    id: 'elec-2',
    name: 'Dahua Dome Pro CCTV Camera',
    price: 59990,
    description: 'Professional indoor/outdoor vandal-resistant dome security camera. Offers stellar night vision up to 30 meters and smart IR technology to prevent overexposure.',
    category: 'Electronics',
    subcategory: 'CCTV Cameras',
    images: [
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 25,
    rating: 4.6,
    reviewsCount: 19,
    isFeatured: true,
    specifications: {
      'Sensor': '1/3" Progressive Scan CMOS',
      'Lens': '2.8mm Fixed Lens',
      'Resolution': '4 Megapixels',
      'Power Source': 'Power over Ethernet (PoE)',
      'Night Vision': 'Up to 30m IR range'
    }
  },
  {
    id: 'elec-3',
    name: 'Audio-Technica Pro Studio Wireless Headphones',
    price: 149990,
    description: 'Audiophile-grade studio headphones engineered for pure, high-fidelity sound. Features active noise cancellation, extra soft leather earcups, and up to 50 hours of battery life.',
    category: 'Electronics',
    subcategory: 'Headphones',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 12,
    rating: 4.9,
    reviewsCount: 48,
    isBestSeller: true,
    specifications: {
      'Driver Diameter': '45 mm',
      'Frequency Response': '15 - 28,000 Hz',
      'Bluetooth Version': '5.2',
      'Battery Life': 'Up to 50 Hours',
      'Charging': 'USB-C Fast Charging'
    }
  },
  {
    id: 'elec-4',
    name: 'Vintage Portable FM/AM Radio',
    price: 34990,
    description: 'A charming retro-style mini radio combining classic aesthetics with modern reception stability. Features a gorgeous mahogany wood accent, rechargeable battery, and auxiliary input.',
    category: 'Electronics',
    subcategory: 'Mini Radios',
    images: [
      'https://images.unsplash.com/photo-1593078144438-ac3a3c11a28a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1610940882244-19c67f332597?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 8,
    rating: 4.5,
    reviewsCount: 22,
    specifications: {
      'Frequency Range': 'FM 87-108 MHz / AM 520-1710 KHz',
      'Battery Capacity': '1200mAh (rechargeable)',
      'Playtime': 'Up to 10 hours',
      'Body Material': 'Wood and ABS Polymer',
      'Dimensions': '130 x 70 x 90 mm'
    }
  },
  {
    id: 'elec-5',
    name: 'Minimalist Quartz Black Mesh Watch',
    price: 119990,
    description: 'An elegant, ultra-thin luxury timepiece with a clean matte-black finish and breathable stainless steel mesh strap. The epitome of modern minimalist style.',
    category: 'Electronics',
    subcategory: 'Watches',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 18,
    rating: 4.7,
    reviewsCount: 41,
    isBestSeller: true,
    specifications: {
      'Movement': 'Japanese Quartz Movement',
      'Case Diameter': '40 mm',
      'Case Thickness': '6.5 mm',
      'Water Resistance': '3 ATM (Splashproof)',
      'Strap Material': 'Stainless Steel Mesh'
    }
  },

  // --- CLOTHING & FASHION ---
  {
    id: 'clot-1',
    name: 'Organic Cotton Oversized Tee',
    price: 24990,
    description: 'Crafted from ultra-soft 100% organic heavy cotton. Features a relaxed drop-shoulder silhouette, durable double-needle stitching, and a premium natural drape.',
    category: 'Clothing & Fashion',
    subcategory: 'T-Shirts',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 45,
    rating: 4.6,
    reviewsCount: 56,
    isBestSeller: true,
    specifications: {
      'Material': '100% Organic Heavyweight Cotton',
      'Weight': '240 GSM',
      'Fit': 'Oversized / Drop Shoulder',
      'Care Instructions': 'Machine wash cold, tumble dry low'
    }
  },
  {
    id: 'clot-2',
    name: 'Classic Linen Button-Down Shirt',
    price: 39990,
    description: 'Woven from airy, lightweight French linen, perfect for warm weather or elegant layering. Designed with a structured button-down collar and a classic curved hem.',
    category: 'Clothing & Fashion',
    subcategory: "Men's Shirts",
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1621072156002-e2fcc10d9714?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 22,
    rating: 4.4,
    reviewsCount: 15,
    isFeatured: true,
    specifications: {
      'Material': '100% Premium Flax Linen',
      'Fit': 'Regular Fit',
      'Style': 'Long sleeve, button-down collar'
    }
  },
  {
    id: 'clot-3',
    name: 'Slim Fit Stretch Chino Trousers',
    price: 49990,
    description: 'The ultimate versatile trousers. Tailored from a comfortable cotton-twill blend with integrated spandex for 4-way flexibility. Transition effortlessly from office to evening.',
    category: 'Clothing & Fashion',
    subcategory: 'Trousers',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 30,
    rating: 4.5,
    reviewsCount: 29,
    specifications: {
      'Material': '97% Cotton, 3% Spandex Twill',
      'Fit': 'Slim Fit',
      'Closure': 'YKK Zip fly with button closure'
    }
  },
  {
    id: 'clot-4',
    name: 'Tech Fleece Urban Tracksuit',
    price: 79990,
    description: 'A cozy and sleek two-piece matching tracksuit set. The soft double-sided brushed fleece provides superior warmth without adding bulk. Sleek zippered pockets keep items secure.',
    category: 'Clothing & Fashion',
    subcategory: 'Jogging / Tracksuits',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 14,
    rating: 4.8,
    reviewsCount: 18,
    isFeatured: true,
    specifications: {
      'Material': '68% Cotton, 32% Polyester Tech Fleece',
      'Includes': 'Hooded Jacket & Slim Joggers',
      'Features': 'Bonded zip pockets, ribbed cuffs'
    }
  },
  {
    id: 'clot-5',
    name: 'Ribbed Knit Casual Tank Top',
    price: 19990,
    description: 'A fitted, ribbed-knit sleeveless top designed with a clean high neckline and ultra-stretch cotton fibers. Perfect for daily standalone wear or sleek jacket layering.',
    category: 'Clothing & Fashion',
    subcategory: 'Tops',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 32,
    rating: 4.3,
    reviewsCount: 12,
    specifications: {
      'Material': '92% Cotton, 8% Elastane Ribbed Knit',
      'Length': 'Semi-cropped',
      'Fit': 'Snug/Body-hugging'
    }
  },
  {
    id: 'clot-6',
    name: 'Sleek Coordinated Weekend Set',
    price: 99990,
    description: 'A premium, custom-styled complete outfit featuring a relaxed utility linen jacket combined with matching relaxed-fit tailored trousers in soft sand-beige.',
    category: 'Clothing & Fashion',
    subcategory: 'Complete Outfits',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 6,
    rating: 4.9,
    reviewsCount: 8,
    isBestSeller: true,
    specifications: {
      'Includes': '1x Linen Chore Jacket, 1x Tailored Trousers',
      'Material': 'Linen-cotton blend',
      'Occasion': 'Premium smart-casual'
    }
  },
  {
    id: 'clot-7',
    name: 'Retro Football Fan Jersey',
    price: 45000,
    description: 'Breathable, elite-engineered fan jersey commemorating classic athletic histories. Beautiful woven brand details, high-wicking fabrics, and vibrant permanent sublimated colors.',
    category: 'Clothing & Fashion',
    subcategory: 'Jerseys',
    images: [
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 16,
    rating: 4.7,
    reviewsCount: 20,
    specifications: {
      'Material': '100% Recycled Polyester Mesh',
      'Wicking': 'Dry-Fit Technology',
      'Stitching': 'Flatlock reinforced seams'
    }
  },

  // --- JEWELRY ---
  {
    id: 'jewel-1',
    name: '18K Gold Plated Minimalist Chain',
    price: 64989,
    description: 'An exquisitely simple necklace forged from anti-tarnish 316L stainless steel, generously bathed in double-layered 18k real gold. Offers an adjustable clasp for perfect layering height.',
    category: 'Jewelry',
    subcategory: 'Necklaces',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1611085583191-a3b1a3a355db?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 12,
    rating: 4.8,
    reviewsCount: 26,
    isFeatured: true,
    specifications: {
      'Base Metal': '316L Surgical Stainless Steel',
      'Plating': '18K Real Gold PVD',
      'Length': '45cm + 5cm extension',
      'Hypoallergenic': 'Yes (Nickel & Lead-free)'
    }
  },

  // --- FOOTWEAR ---
  {
    id: 'foot-1',
    name: "Handcrafted Leather Chelsea Boots",
    price: 139990,
    description: "Constructed with premium full-grain Italian calfskin leather. Features standard elastic side gussets, full interior leather lining, and a highly durable Goodyear-welted rubber sole.",
    category: 'Footwear',
    subcategory: "Men’s Shoes",
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f6893b4?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 7,
    rating: 4.9,
    reviewsCount: 14,
    isBestSeller: true,
    specifications: {
      'Upper': 'Full-Grain Italian Calfskin Leather',
      'Outsole': 'Reinforced Anti-Slip Rubber Sole',
      'Construction': 'Durable Goodyear Welted'
    }
  },
  {
    id: 'foot-2',
    name: 'Active Cushion Running Shoes',
    price: 89990,
    description: 'Engineered for lightweight bounce and optimal support during high-mileage runs or long active days. Features a highly breathable knitted upper and shock-absorbing foam midsoles.',
    category: 'Footwear',
    subcategory: "Women’s Shoes",
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 19,
    rating: 4.7,
    reviewsCount: 38,
    specifications: {
      'Weight': '210 grams',
      'Midsole': 'Proprietary Responsive Foam Cushion',
      'Upper': 'Seamless engineered mesh knit'
    }
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'CCTV Camera Installation',
    description: 'Comprehensive design and implementation of commercial and residential high-definition camera monitoring networks.',
    details: [
      'Initial properties safety consultation and blind-spot mapping',
      'Premium Hikvision & Dahua camera wiring and physical mounting',
      'Network-Attached Storage (NAS) or Cloud storage setup',
      'Seamless mobile and desktop live-viewer application setup',
      'Full 1-year hardware warranty and post-installation support'
    ],
    priceInfo: 'From RWF 150000 (depends on camera count)',
    icon: 'Camera',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'srv-2',
    title: 'Fire Fighting System Installation',
    description: 'Expert planning, installation, and inspection of commercial-grade smoke detectors, fire alarms, and extinguisher networks.',
    details: [
      'Strict local safety fire code compliance evaluation',
      'Installation of automated smart smoke and thermal detectors',
      'Acoustic sirens and central monitoring dashboard installation',
      'Regular routine pressure testing and annual certification services'
    ],
    priceInfo: 'Custom quotation based on floorplan',
    icon: 'ShieldAlert',
    image: 'https://images.unsplash.com/photo-1516216621174-bfa2196cfcf0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'srv-3',
    title: 'Networking Solutions',
    description: 'High-speed local networking, fiber-optic distribution, unified Wi-Fi routers, and network cabinet organization.',
    details: [
      'Office Cat6/Cat7 ethernet structured cabling and clean conduits',
      'Multi-point Mesh router integration to eliminate cellular dead zones',
      'Local server racks and switch configurations',
      'Guest portals, firewall rules, and VPN setup for secure remote work'
    ],
    priceInfo: 'From RWF 200000 (consultation included)',
    icon: 'Globe',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'srv-4',
    title: 'Electrical Installation',
    description: 'Professional commercial and residential electrical installations, wiring upgrades, lighting, and power panels.',
    details: [
      'Safety inspections, wiring testing, and troubleshooting',
      'Modern LED aesthetic recessed downlighting installations',
      'Power panel boards routing and protective breakers mapping',
      'Emergency solar backups and generator transfer switches integration'
    ],
    priceInfo: 'Hourly or flat-rate per project',
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'srv-5',
    title: 'Software & Web Development',
    description: 'Bespoke corporate websites, high-converting e-commerce web applications, and internal automation software solutions.',
    details: [
      'Modern, mobile-responsive layouts tailored to your unique brand',
      'Fast, secure payment integration (Stripe, Paypal, Mobile Money)',
      'Easy-to-use content management systems (CMS)',
      'Ongoing cloud hosting maintenance and SEO optimizations'
    ],
    priceInfo: 'From RWF 500000 (flexible installments)',
    icon: 'Code',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Alexander Mwiza',
    rating: 5,
    comment: 'The Dahua camera installation by IE & F Shop was flawless! Their technical team mapped the blind spots beautifully. I can watch my backyard from my phone in full crisp HD.',
    role: 'Homeowner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-2',
    name: 'Clarisse Umutoni',
    rating: 5,
    comment: 'Stunning minimalist design on the watches and the oversized T-shirts are incredibly heavy and high quality. Shipping was lightning-fast. Highly recommended!',
    role: 'Fasion Consultant',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-3',
    name: 'David Karemera',
    rating: 5,
    comment: 'We contracted their networking team to wire our new multi-story office building. Absolute professionals. They organized the cabinet beautifully with clearly labeled lines.',
    role: 'IT Director at SolvGroup',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
];

export const SHOPPING_STEPS = [
  {
    step: '01',
    title: 'Browse and Select',
    description: 'Explore our curated categories of luxury fashion, premium footwear, sleek jewelry, or high-performance electronics.'
  },
  {
    step: '02',
    title: 'Review Specifications',
    description: 'Inspect precise sizing, detailed technical specifications, stock statuses, and verified client testimonials on product details.'
  },
  {
    step: '03',
    title: 'Add to Cart',
    description: 'Accumulate items in your shopping bag, adjusting quantities or maintaining a personal saved wishlist for future choices.'
  },
  {
    step: '04',
    title: 'Secure Checkout',
    description: 'Enter your standard delivery details and choose from safe Mobile Money, credit cards, or cash on delivery options.'
  }
];
