// Landing Page Configuration - Admin-controlled content
export const LANDING_PAGE_CONFIG = {
  // Navigation links
  navLinks: [
    { id: "cat", label: "Furniture & Decor", href: "#categories" },
    { id: "col", label: "Collection", href: "#bestsellers" },
    { id: "craft", label: "Craftsmanship", href: "#showcase" },
    { id: "about", label: "About", href: "#about" },
    { id: "contact", label: "Contact", href: "#contact" }
  ],

  // Hero slides
  heroSlides: [
    {
      id: "slide-0",
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000",
      alt: "Home Furniture",
      eyebrow: "Furniture & Decor — 2026",
      headline: "Home\nFurniture",
      subheading: "Elegant solutions for every room. Redefining comfort for the modern home with timeless craftsmanship.",
      cta: "Explore Collection",
      ctaHref: "#categories"
    },
    {
      id: "slide-1",
      img: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&q=80&w=2000",
      alt: "Office Furniture",
      eyebrow: "Workspace Essentials — Cairo & Beyond",
      headline: "Office\nFurniture",
      subheading: "Productivity meets sophisticated design. Premium ergonomic seating engineered for your best work.",
      cta: "Shop Office",
      ctaHref: "#categories"
    },
    {
      id: "slide-2",
      img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=2000",
      alt: "Artificial Plants",
      eyebrow: "Botanical Accents — Always Evergreen",
      headline: "Artificial\nPlants",
      subheading: "Evergreen beauty without the maintenance. The perfect botanical accent for any decor style.",
      cta: "Shop Decor",
      ctaHref: "#categories"
    }
  ],

  // Marquee items
  marqueeItems: [
    "Premium Craftsmanship",
    "Home Furniture",
    "Office Seating",
    "Artificial Plants",
    "Nordic Design",
    "Ergonomic Comfort",
    "Est. 1980 · Cairo"
  ],

  // Category cards
  categoryCards: [
    {
      id: "cat-0",
      number: "01",
      title: "Home\nFurniture",
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000",
      alt: "Home Furniture",
      link: "#home-furniture"
    },
    {
      id: "cat-1",
      number: "02",
      title: "Office\nFurniture",
      img: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&q=80&w=2000",
      alt: "Office Furniture",
      link: "#office-furniture"
    },
    {
      id: "cat-2",
      number: "03",
      title: "Artificial\nPlants",
      img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=2000",
      alt: "Artificial Plants",
      link: "#artificial-plants"
    }
  ],

  // Features strip
  features: [
    {
      id: "feat-0",
      title: "Quality Assured",
      description: "ISO-certified manufacturing standards on every piece.",
      icon: "shield"
    },
    {
      id: "feat-1",
      title: "White-Glove Delivery",
      description: "48-hour delivery with full installation service.",
      icon: "truck"
    },
    {
      id: "feat-2",
      title: "Showroom Experience",
      description: "Visit our Cairo flagship to feel every detail.",
      icon: "home"
    },
    {
      id: "feat-3",
      title: "25-Year Warranty",
      description: "Our commitment to lasting quality and your peace of mind.",
      icon: "heart"
    }
  ],

  // About section
  about: {
    eyebrow: "Our Story — Since 1980",
    title: "A Legacy of\nRefined Living",
    body: "Our story began in a small Cairo workshop over four decades ago. What started as a family craft has grown into a trusted name across Egypt and beyond — delivering furniture that blends timeless aesthetics with modern ergonomics. Every piece we create carries the weight of that history.",
    stats: [
      { label: "Pieces Delivered", value: "12,000+" },
      { label: "Customer Satisfaction", value: "98%" },
      { label: "Years of Craft", value: "45+" },
      { label: "Showroom Locations", value: "3" }
    ],
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200",
    cta: "Visit a Showroom",
    ctaHref: "#contact"
  },

  // Showcase/craftsmanship section
  showcase: {
    eyebrow: "Craftsmanship",
    title: "The Anatomy\nof Comfort",
    body: "Every TipTop piece is engineered from the inside out. We combine traditional Egyptian upholstery craft with modern ergonomic science to create seating that lasts a lifetime. Hover the points to explore.",
    img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1200",
    hotspots: [
      {
        id: 0,
        title: "Adaptive Headrest",
        description: "4-inch memory foam with cooling gel. Tilt, height, and width independently adjustable.",
        top: "10%",
        left: "54%"
      },
      {
        id: 1,
        title: "Lumbar Support System",
        description: "Dual-zone air bladder lumbar. Dial-controlled inflation for your custom firmness level.",
        top: "43%",
        left: "70%"
      },
      {
        id: 2,
        title: "Power Footrest",
        description: "Silent motor extends in 1.2 seconds. Infinite positions up to 190°. Battery backup included.",
        top: "78%",
        left: "18%"
      },
      {
        id: 3,
        title: "Padded Armrests",
        description: "4-way adjustable aluminum-core armrests with 2-inch memory foam and anti-slip suede top.",
        top: "58%",
        left: "78%"
      }
    ]
  },

  // Lookbook section
  lookbook: {
    eyebrow: "Shop The Look",
    title: "In Real\nHomes",
    cta: "Follow @TipTop",
    items: [
      {
        id: 0,
        img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=900",
        alt: "Living Room",
        label: "The Executive Recliner — Cognac"
      },
      {
        id: 1,
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
        alt: "Accent Chair",
        label: "Classic Wingback"
      },
      {
        id: 2,
        img: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&q=80&w=800",
        alt: "Office",
        label: "Modern Task Chair"
      },
      {
        id: 3,
        img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800",
        alt: "Nordic Chair",
        label: "Nordic Accent Chair"
      },
      {
        id: 4,
        img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800",
        alt: "Plants",
        label: "Botanical Accent Collection"
      }
    ]
  },

  // Footer content
  footer: {
    tagline: "Crafting premium furniture that redefines the meaning of home comfort. Quality you can feel, design you can see. Est. 1980, Cairo.",
    socials: [
      { label: "IG", href: "#", title: "Instagram" },
      { label: "FB", href: "#", title: "Facebook" },
      { label: "WA", href: "#", title: "WhatsApp" }
    ],
    shopLinks: [
      { label: "Home Furniture", href: "#" },
      { label: "Office Furniture", href: "#" },
      { label: "Artificial Plants", href: "#" },
      { label: "New Arrivals", href: "#" },
      { label: "Sale", href: "#" }
    ],
    companyLinks: [
      { label: "About Us", href: "#about" },
      { label: "Sustainability", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Projects", href: "#" }
    ],
    newsletter: "Join our list for exclusive previews, design tips, and early access to sales.",
    copyright: "© 2026 TipTop Furniture. All rights reserved. Cairo · Alexandria · Giza",
    legalLinks: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Shipping Policy", href: "#" }
    ]
  }
};
