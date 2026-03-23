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
  {
    id:1,
    name:"Executive Lazy Boy",
    emoji:"🛋️",
    cat:"Home Furniture",
    price:4500,
    variants:[{id:uid(),l:"S",dim:"75×85 cm",q:3},{id:uid(),l:"M",dim:"85×95 cm",q:8},{id:uid(),l:"L",dim:"95×105 cm",q:0}],
    colors:["#8B4513","#2F2F2F","#C8C0B0"],
    sectors:["Home Office","Living Room","Featured"],
    sku:"TT-LB-001",
    slug:"executive-lazy-boy",
    desc:"Hand-crafted full-grain cognac leather. 190° motorized recline."
  },
  {
    id:2,
    name:"Cloud Comfort Sofa",
    emoji:"🛋️",
    cat:"Home Furniture",
    price:8999,
    variants:[{id:uid(),l:"2-Seat",dim:"160 cm",q:4},{id:uid(),l:"3-Seat",dim:"210 cm",q:1}],
    colors:["#C8C0B0","#5C4A3A"],
    sectors:["Living Room","New Arrivals"],
    sku:"TT-SF-002",
    slug:"cloud-comfort-sofa",
    desc:"Boucle fabric, solid walnut legs, removable covers."
  },
  {
    id:3,
    name:"Nordic Task Chair",
    emoji:"🪑",
    cat:"Office Furniture",
    price:3100,
    variants:[{id:uid(),l:"Std",dim:"Universal",q:12}],
    colors:["#2F2F2F","#1E3A4A"],
    sectors:["Home Office","New Arrivals"],
    sku:"TT-CH-003",
    slug:"nordic-task-chair",
    desc:"Breathable mesh back. 5-way lumbar adjustment."
  },
  {
    id:4,
    name:"Monstera XL Plant",
    emoji:"🌿",
    cat:"Artificial Plants",
    price:850,
    variants:[{id:uid(),l:"Small",dim:"60 cm",q:6},{id:uid(),l:"Large",dim:"120 cm",q:0}],
    colors:["#4A7A3A"],
    sectors:["Living Room","Bedroom"],
    sku:"TT-PL-004",
    slug:"monstera-xl-plant",
    desc:"UV-resistant silk leaves. Zero maintenance."
  },
  {
    id:5,
    name:"Wingback Classic",
    emoji:"🪑",
    cat:"Home Furniture",
    price:5200,
    variants:[{id:uid(),l:"Std",dim:"75×90 cm",q:0}],
    colors:["#8B4513","#C8C0B0"],
    sectors:["Living Room","Sale"],
    sku:"TT-WB-005",
    slug:"wingback-classic",
    desc:"Tufted velvet with hand-sewn piping detail."
  },
  {
    id:6,
    name:"Walnut Bookshelf",
    emoji:"📚",
    cat:"Decor",
    price:1800,
    variants:[{id:uid(),l:"Small",dim:"80×180 cm",q:7},{id:uid(),l:"Large",dim:"120×200 cm",q:4}],
    colors:["#6B4C2A"],
    sectors:["Bedroom","Home Office"],
    sku:"TT-BS-006",
    slug:"walnut-bookshelf",
    desc:"Solid walnut with brass-tipped feet."
  },
  {
    id:7,
    name:"Pendant Light Orb",
    emoji:"💡",
    cat:"Decor",
    price:650,
    variants:[{id:uid(),l:"Small",dim:"Ø20 cm",q:15},{id:uid(),l:"Large",dim:"Ø35 cm",q:8}],
    colors:["#C0A060","#2F2F2F"],
    sectors:["Featured","New Arrivals"],
    sku:"TT-LT-007",
    slug:"pendant-light-orb",
    desc:"Blown glass with matte black canopy."
  },
  {
    id:8,
    name:"Bamboo Floor Vase",
    emoji:"🪴",
    cat:"Artificial Plants",
    price:320,
    variants:[{id:uid(),l:"Std",dim:"Ø15×90 cm",q:0}],
    colors:["#9A8870"],
    sectors:["Bedroom","Outdoor"],
    sku:"TT-VZ-008",
    slug:"bamboo-floor-vase",
    desc:"Handwoven seagrass. Weighted base."
  },
];
