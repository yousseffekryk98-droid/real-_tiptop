/* ══════════════════════════════════════════════════════════════════
   CONSTANTS — Sectors, Categories, Seed Data
══════════════════════════════════════════════════════════════════ */

export const SECTOR_KEYS = {
  "Home Office":"sec.homeOffice",
  "Living Room":"sec.living",
  "New Arrivals":"sec.new",
  "Bedroom":"sec.bedroom",
  "Dining Space":"sec.dining",
  "Sale":"sec.sale",
  "Featured":"sec.featured",
  "Outdoor":"sec.outdoor"
};

export const CAT_KEYS = {
  "Home Furniture":"cat2.home",
  "Office Furniture":"cat2.office",
  "Artificial Plants":"cat2.plants",
  "Decor":"cat2.decor",
  "Accessories":"cat2.acc"
};

export const ALL_SECTORS = Object.keys(SECTOR_KEYS);
export const CATEGORIES = Object.keys(CAT_KEYS);

let _uid = 100;
export const uid = () => ++_uid;

/* ─── SEED DATA ─── */
export const INITIAL_PRODUCTS = [
  // ─── LIVING ROOM ───
  {
    id:1,
    name:"Sloopy Sectional Sofa",
    emoji:"🛋️",
    cat:"Home Furniture",
    price:1896300,
    variants:[{id:uid(),l:"L",dim:"320×210 cm",q:3},{id:uid(),l:"XL",dim:"380×240 cm",q:2}],
    colors:["#F5F5DC","#2C2C2C","#9A9490"],
    sectors:["Living Room","Premium","New Arrivals"],
    sku:"TT-SO-SLOP",
    slug:"sloopy-sectional-sofa",
    desc:"A sprawling, deep-seated sectional wrapped in premium Italian linen. Perfect for minimalist open-plan living.",
    isLimited:true,
    limitedUntil:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    limitedQty:50,
    limitedRemaining:12
  },
  {
    id:2,
    name:"Marlowe Coffee Table",
    emoji:"☕",
    cat:"Home Furniture",
    price:582300,
    variants:[{id:uid(),l:"Standard",dim:"110×110 cm",q:5}],
    colors:["#4B3621","#FFFFFF"],
    sectors:["Living Room","Art Deco","Featured"],
    sku:"TT-CT-MARL",
    slug:"marlowe-coffee-table",
    desc:"Hand-carved from solid Calacatta Viola marble with dramatic purple veining. A centerpiece of pure elegance."
  },
  {
    id:3,
    name:"Lumina Modern Accent Chair",
    emoji:"🪑",
    cat:"Home Furniture",
    price:742500,
    variants:[{id:uid(),l:"Standard",dim:"85×95 cm",q:4}],
    colors:["#E8B4B8","#2C2C2C","#C8A96E"],
    sectors:["Living Room","New Arrivals"],
    sku:"TT-AC-LUMI",
    slug:"lumina-modern-accent-chair",
    desc:"Sculptural frame in powdered metal with a sumptuous velvet upholstery. Statement piece for modern interiors.",
    isLimited:true,
    limitedUntil:new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    limitedQty:30,
    limitedRemaining:8
  },
  {
    id:4,
    name:"Walnut Entertainment Center",
    emoji:"📺",
    cat:"Home Furniture",
    price:1450000,
    variants:[{id:uid(),l:"6ft",dim:"180×60×45 cm",q:2},{id:uid(),l:"8ft",dim:"240×60×45 cm",q:3}],
    colors:["#6B4C2A","#2C2C2C"],
    sectors:["Living Room","Home Office"],
    sku:"TT-EC-WALNUT",
    slug:"walnut-entertainment-center",
    desc:"Solid walnut construction with seamless cable management and soft-close doors. Built for longevity."
  },

  // ─── BEDROOM ───
  {
    id:5,
    name:"Carolina King Bed",
    emoji:"🛏️",
    cat:"Home Furniture",
    price:450000,
    variants:[{id:uid(),l:"King",dim:"203×203 cm",q:8},{id:uid(),l:"Queen",dim:"160×200 cm",q:12}],
    colors:["#C8A96E","#FDFAF5"],
    sectors:["Bedroom","Master Suite","Hospitality"],
    sku:"TT-BD-CARO",
    slug:"carolina-king-bed",
    desc:"Upholstered in velvet with a hand-finished gold-leaf frame. Includes an ergonomic headrest for ultimate comfort."
  },
  {
    id:6,
    name:"Tathra Nightstand",
    emoji:"📂",
    cat:"Home Furniture",
    price:419500,
    variants:[{id:uid(),l:"Single",dim:"55×45×50 cm",q:10}],
    colors:["#3D2B1F","#E8E2D9"],
    sectors:["Bedroom","Storage"],
    sku:"TT-NS-TATH",
    slug:"tathra-nightstand",
    desc:"A mix of espresso oak and solid travertine top. Features soft-close drawers and integrated cable management."
  },
  {
    id:7,
    name:"Dreamer Storage Bed",
    emoji:"🛏️",
    cat:"Home Furniture",
    price:895000,
    variants:[{id:uid(),l:"Queen",dim:"160×200 cm",q:4},{id:uid(),l:"King",dim:"180×200 cm",q:2}],
    colors:["#4B3621","#F5F5F5"],
    sectors:["Bedroom","Storage","Premium"],
    sku:"TT-SB-DREAM",
    slug:"dreamer-storage-bed",
    desc:"Built-in storage drawers beneath mattress platform. Reclaimed oak with leather accents and brushed brass hardware."
  },
  {
    id:8,
    name:"Zen Minimalist Dresser",
    emoji:"🗄️",
    cat:"Home Furniture",
    price:635000,
    variants:[{id:uid(),l:"4-Drawer",dim:"120×45×55 cm",q:3}],
    colors:["#FDFAF5","#1A1816"],
    sectors:["Bedroom","Minimalist"],
    sku:"TT-DR-ZEN",
    slug:"zen-minimalist-dresser",
    desc:"Sleek 4-drawer design with recessed handles and a warm beige finish. Paired with subtle matte-black metal legs."
  },

  // ─── DINING ───
  {
    id:9,
    name:"Orion Counter Chair",
    emoji:"🪑",
    cat:"Decor",
    price:103500,
    variants:[{id:uid(),l:"Counter",dim:"45×45×65 cm",q:24}],
    colors:["#F5F5F5","#1A1816"],
    sectors:["Dining","Kitchen","Bar"],
    sku:"TT-CH-ORION",
    slug:"orion-counter-chair",
    desc:"Minimalist silhouette featuring powder-coated steel legs and a soft-touch bouclé seat. Set of 2 or 4."
  },
  {
    id:10,
    name:"Gatsby Dining Table",
    emoji:"🍽️",
    cat:"Home Furniture",
    price:1250000,
    variants:[{id:uid(),l:"6-Seat",dim:"180×90 cm",q:2},{id:uid(),l:"8-Seat",dim:"240×90 cm",q:3}],
    colors:["#3D2B1F","#2C2C2C"],
    sectors:["Dining Space","Art Deco","Featured"],
    sku:"TT-DT-GATS",
    slug:"gatsby-dining-table",
    desc:"Solid black walnut slab with beveled edges and tapered legs. Seats up to 8 with timeless elegance."
  },
  {
    id:11,
    name:"Upholstered Dining Chair",
    emoji:"🪑",
    cat:"Home Furniture",
    price:325000,
    variants:[{id:uid(),l:"Single",dim:"48×58 cm",q:10}],
    colors:["#C8A96E","#4B3621","#2C2C2C"],
    sectors:["Dining Space","Living Room"],
    sku:"TT-DC-UPH",
    slug:"upholstered-dining-chair",
    desc:"Linen-wrapped frame with a hand-stitched back. Glides smoothly over hardwood floors with felt-tipped wheels."
  },

  // ─── LIGHTING ───
  {
    id:12,
    name:"Cloudia Brass Chandelier",
    emoji:"💡",
    cat:"Decor",
    price:385000,
    variants:[{id:uid(),l:"5-Light",dim:"80 cm Ø",q:4}],
    colors:["#C8A96E","#FFFFFF"],
    sectors:["Decorative","Lighting"],
    sku:"TT-LT-CLOU",
    slug:"cloudia-brass-chandelier",
    desc:"A stunning 5-light large white frosted brass chandelier that casts a soft, ethereal glow over any space."
  },
  {
    id:13,
    name:"Aurora Floor Lamp",
    emoji:"🔦",
    cat:"Decor",
    price:268500,
    variants:[{id:uid(),l:"Arc",dim:"150-180 cm",q:5}],
    colors:["#2C2C2C","#C8A96E"],
    sectors:["Living Room","Lighting","New Arrivals"],
    sku:"TT-LF-AURO",
    slug:"aurora-floor-lamp",
    desc:"Arched minimalist design in matte black with dimmer control. Linen shade diffuses warm light beautifully."
  },
  {
    id:14,
    name:"Stellar Pendant Lights",
    emoji:"💡",
    cat:"Decor",
    price:195000,
    variants:[{id:uid(),l:"Set of 3",dim:"25 cm Ø",q:8}],
    colors:["#9A9490","#F5F5F5"],
    sectors:["Lighting","Kitchen","Minimalist"],
    sku:"TT-LT-STEL",
    slug:"stellar-pendant-lights",
    desc:"Blown glass spheres suspended from thin brass rods. Creates layered ambient lighting with a sculptural edge."
  },
  {
    id:15,
    name:"Aurora Table Lamp",
    emoji:"🪔",
    cat:"Decor",
    price:156000,
    variants:[{id:uid(),l:"Standard",dim:"45 cm H",q:6}],
    colors:["#C8A96E","#2C2C2C"],
    sectors:["Bedroom","Decorative"],
    sku:"TT-LT-AURT",
    slug:"aurora-table-lamp",
    desc:"Ceramic base with a cream linen shade. Perfect for bedside tables and reading nooks."
  },

  // ─── OFFICE ───
  {
    id:16,
    name:"Executive Walnut Desk",
    emoji:"💻",
    cat:"Home Furniture",
    price:1150000,
    variants:[{id:uid(),l:"Linear",dim:"160×80 cm",q:2},{id:uid(),l:"L-Shape",dim:"160×80+80×80 cm",q:3}],
    colors:["#6B4C2A","#2C2C2C"],
    sectors:["Home Office","Premium"],
    sku:"TT-DK-EXEC",
    slug:"executive-walnut-desk",
    desc:"Solid walnut with felt-lined drawers and integrated cable management. Designed for serious work and serious presence."
  },
  {
    id:17,
    name:"Nordic Task Chair",
    emoji:"🪑",
    cat:"Home Furniture",
    price:310000,
    variants:[{id:uid(),l:"Standard",dim:"Universal",q:12}],
    colors:["#2C2C2C","#1E3A4A"],
    sectors:["Home Office","New Arrivals"],
    sku:"TT-CH-NORD",
    slug:"nordic-task-chair",
    desc:"Breathable mesh back with 5-way lumbar adjustment. Ergonomic design meets Scandinavian minimalism."
  },
  {
    id:18,
    name:"Marble File Cabinet",
    emoji:"🗄️",
    cat:"Home Furniture",
    price:475000,
    variants:[{id:uid(),l:"2-Drawer",dim:"45×45×65 cm",q:6},{id:uid(),l:"4-Drawer",dim:"45×45×120 cm",q:3}],
    colors:["#FFFFFF","#2C2C2C"],
    sectors:["Home Office","Decorative"],
    sku:"TT-FC-MARB",
    slug:"marble-file-cabinet",
    desc:"Carrara marble top with matte black steel frame. Combines storage with sculptural elegance."
  },

  // ─── ACCESSORIES & DECOR ───
  {
    id:19,
    name:"Monstera XL Silk Plant",
    emoji:"🌿",
    cat:"Accessories",
    price:85000,
    variants:[{id:uid(),l:"Small",dim:"60 cm H",q:6},{id:uid(),l:"Large",dim:"120 cm H",q:0}],
    colors:["#4A7A3A"],
    sectors:["Living Room","Bedroom","New Arrivals"],
    sku:"TT-PL-MONS",
    slug:"monstera-xl-plant",
    desc:"UV-resistant silk leaves with realistic texture. Zero maintenance, maximum impact."
  },
  {
    id:20,
    name:"Minimalist Wall Shelving",
    emoji:"📦",
    cat:"Home Furniture",
    price:245000,
    variants:[{id:uid(),l:"Single",dim:"80×25 cm",q:8},{id:uid(),l:"Pair",dim:"2× 80×25 cm",q:5}],
    colors:["#F5F5F5","#2C2C2C"],
    sectors:["Home Office","Bedroom","Minimalist"],
    sku:"TT-SH-MIN",
    slug:"minimalist-wall-shelving",
    desc:"Floating shelves with concealed brass hardware. A clean way to display and store essentials."
  },
  {
    id:21,
    name:"Travertine Block Side Table",
    emoji:"🪨",
    cat:"Home Furniture",
    price:325000,
    variants:[{id:uid(),l:"Square",dim:"40×40×45 cm",q:4}],
    colors:["#E8E2D9"],
    sectors:["Living Room","Art Deco"],
    sku:"TT-ST-TRAV",
    slug:"travertine-block-side-table",
    desc:"Solid travertine in warm cream tones. A minimalist sculptural form that doubles as functional art."
  },
  {
    id:22,
    name:"Geometric Mirror Wall",
    emoji:"🪟",
    cat:"Decor",
    price:198000,
    variants:[{id:uid(),l:"Set",dim:"Various sizes",q:3}],
    colors:["#C8A96E","#2C2C2C"],
    sectors:["Decorative","Living Room"],
    sku:"TT-MR-GEO",
    slug:"geometric-mirror-wall",
    desc:"A curated set of brass-framed mirrors in geometric shapes. Creates depth and light in any space."
  },
  {
    id:23,
    name:"Premium Area Rug",
    emoji:"🧵",
    cat:"Accessories",
    price:1350000,
    variants:[{id:uid(),l:"5×7",dim:"150×210 cm",q:2},{id:uid(),l:"7×9",dim:"210×270 cm",q:1}],
    colors:["#9A9490","#F5F5DC"],
    sectors:["Living Room","Premium"],
    sku:"TT-RG-PREM",
    slug:"premium-area-rug",
    desc:"Hand-tufted wool and silk blend. Muted earth tones with subtle geometric pattern for timeless sophistication."
  },
  {
    id:24,
    name:"Curved Brass Console Table",
    emoji:"☕",
    cat:"Home Furniture",
    price:725000,
    variants:[{id:uid(),l:"Standard",dim:"120×35×85 cm",q:3}],
    colors:["#C8A96E","#F5F5DC"],
    sectors:["Living Room","Decorative"],
    sku:"TT-CT-CURV",
    slug:"curved-brass-console-table",
    desc:"An elegant curved form in brushed brass with a marble top. Perfect for entryways and behind sofas."
  }
];
