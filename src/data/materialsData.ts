export interface MaterialSpec {
  code: string;
  name: string;
  category: string;
  categorySlug: string;
  texture: string; // CSS representation (gradient/color)
  gloss: string; // Sheen style description
  color: string; // Hex representation for ThreeJS fallback
  description: string;
  thickness: string;
  dimensions: string;
  grade: string;
}

export interface CategoryInfo {
  slug: string;
  name: string;
  description: string;
  tagline: string;
  applications: string[];
  whyChoose: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'laminates',
    name: 'Laminates',
    tagline: 'Every décor. Every texture. One standard of finish.',
    description: 'Our laminate collection spans hundreds of finishes — from classic woodgrains to bold solid colors, matte to high-gloss, textured to silk-smooth. Whatever your palette, your grain, your sheen — it\'s in here.',
    applications: ['Modular kitchens', 'Wardrobes', 'Office furniture', 'Wall panelling', 'Commercial interiors', 'False ceilings'],
    whyChoose: 'Fifteen years of sourcing and quality-checking laminates means our catalogue isn\'t just large — it\'s dependable. Every sheet that reaches our showroom floor (and now, your screen) meets the same standard our customers have trusted since day one.'
  },
  {
    slug: 'louvers',
    name: 'Louvers',
    tagline: 'Light. Shadow. Rhythm.',
    description: 'Our louver range brings architectural texture to partitions, façades, and feature walls — engineered for both indoor sophistication and outdoor durability.',
    applications: ['Feature walls', 'TV backdrops', 'Exterior facades', 'Entrance pillars', 'Ceilings', 'Room dividers'],
    whyChoose: 'Crafted with high-density polymers and natural composite fibers, our louvers offer absolute geometric precision and shadow depth that does not warp or fade over time.'
  },
  {
    slug: 'acrylic-sheets',
    name: 'Acrylic Sheets',
    tagline: 'Gloss that speaks for itself.',
    description: 'High-shine, richly pigmented acrylic sheets built for modular furniture, wardrobes, and statement panelling that catches every bit of light in the room.',
    applications: ['Kitchen shutters', 'Luxury wardrobes', 'Bathroom vanities', 'Lobby wall cladding', 'Retail display cases'],
    whyChoose: 'With 92% light transmission and a scratch-resistant hard coat (6H hardness), our acrylic sheets provide the absolute mirror flatness of glass without the risk of shattering.'
  },
  {
    slug: 'polymer-sheets',
    name: 'Polymer Sheets',
    tagline: 'Built for real life.',
    description: 'Engineered for durability without compromising on design — ideal for high-traffic residential and commercial applications across Gujarat\'s toughest climates.',
    applications: ['Kitchen cabinetry', 'Hospital cabinets', 'Commercial desks', 'Wall protection panels', 'High-moisture ceilings'],
    whyChoose: '100% waterproof, termite-proof, and fire-retardant. lavision polymer sheets are formulated for long-term stability in tropical climates, keeping your spaces immaculate.'
  },
  {
    slug: 'leather-sheets',
    name: 'Leather Sheets',
    tagline: 'The warmth of leather. The practicality of a panel.',
    description: 'Wall and furniture cladding that brings tactile, upholstered richness to interiors — without the upkeep of real leather.',
    applications: ['Bed headboards', 'Home theater cladding', 'Executive desks', 'Wardrobe doors', 'Accent pillars'],
    whyChoose: 'Sourced from high-grade reconstituted leather fibers, these sheets feature authentic cowhide graining, high scratch resistance, and easy wipe-down maintenance.'
  },
  {
    slug: 'natural-stone-veneer',
    name: 'Natural Stone Veneer',
    tagline: 'Real stone. Reimagined.',
    description: 'Ultra-thin sheets of genuine natural stone — the authentic grain and mineral depth of marble, granite, and slate, in a lightweight, easy-to-install format.',
    applications: ['Fireplace facades', 'Exterior walls', 'Ceilings', 'Curved pillars', 'Feature walls', 'Backlit screens'],
    whyChoose: 'We peel ultra-thin layers from actual quartzite and slate quarries, backed with a flexible fiberglass resin. Get the soul, color, and texture of massive stone without the weight.'
  },
  {
    slug: 'decorative-panels',
    name: 'Decorative Panels & Fancy Surfaces',
    tagline: 'The details that finish the story.',
    description: 'From fluted 3D panels to metallic inlays and specialty textures — this is where interiors go from complete to unforgettable.',
    applications: ['Living room backdrops', 'Hotel receptions', 'Bar fronts', 'Bespoke doors', 'Ceiling focal points'],
    whyChoose: 'A constantly updating collection of specialty surfaces curated from designer exhibitions globally, helping your projects stay ahead of mainstream trends.'
  }
];

export const MATERIALS: MaterialSpec[] = [
  // 1. Laminates
  {
    code: 'TW-3641',
    name: 'True Wood Hazel',
    category: 'Laminates',
    categorySlug: 'laminates',
    texture: 'repeating-linear-gradient(90deg, #8E6743 0px, #8E6743 15px, #5C4033 16px, #8E6743 25px)',
    gloss: 'Zero Gloss (10% Sheen)',
    color: '#8E6743',
    description: 'Pure, raw hazel walnut woodgrain utilizing synchro-emboss pores that match the grain patterns perfectly for biophilic warmth.',
    thickness: '1.2mm',
    dimensions: '1220mm x 2440mm',
    grade: 'Premium post-formable core',
  },
  {
    code: 'EM-3615',
    name: 'Emporio Grey',
    category: 'Laminates',
    categorySlug: 'laminates',
    texture: 'linear-gradient(45deg, #7F8C8D, #95A5A6)',
    gloss: 'Matt Velvet',
    color: '#7F8C8D',
    description: 'Sophisticated dark concrete tone with slate particles, offering a premium texture and highly tactile scratch-resistant surface.',
    thickness: '1.0mm',
    dimensions: '1220mm x 2440mm',
    grade: 'High impact durability',
  },
  // 2. Louvers
  {
    code: 'LV-401',
    name: 'Charcoal Ribbed Louver',
    category: 'Louvers',
    categorySlug: 'louvers',
    texture: 'repeating-linear-gradient(90deg, #181410 0px, #181410 12px, #050403 13px, #050403 24px)',
    gloss: 'Matte Shadow Ribs',
    color: '#181410',
    description: 'Sleek, deep charcoal fluted profile that plays with light and shadow, perfect for dramatic TV backdrops and entryways.',
    thickness: '12mm Profile',
    dimensions: '120mm x 2900mm',
    grade: 'Waterproof Polymer Composite',
  },
  {
    code: 'LV-405',
    name: 'Natural Teak Slat',
    category: 'Louvers',
    categorySlug: 'louvers',
    texture: 'repeating-linear-gradient(90deg, #B8924A 0px, #B8924A 15px, #4A3215 16px, #4A3215 30px)',
    gloss: 'Satin Teak Finish',
    color: '#B8924A',
    description: 'Warm teak wood profiles with deep shadow recesses, providing architectural rhythm to interior dividers.',
    thickness: '18mm Profile',
    dimensions: '150mm x 2900mm',
    grade: 'Eco-Fiber Acoustic Grade',
  },
  // 3. Acrylic Sheets
  {
    code: 'AC-308',
    name: 'Sugar Creame Gloss',
    category: 'Acrylic Sheets',
    categorySlug: 'acrylic-sheets',
    texture: 'linear-gradient(135deg, #FAF7F2 0%, #EFECE6 100%)',
    gloss: 'Acrylic Mirror (98% Gloss)',
    color: '#FAF7F2',
    description: 'High-gloss acrylic white that behaves like a polished mirror, bringing modern spatial elegance to kitchen cabinetry.',
    thickness: '1.5mm',
    dimensions: '1220mm x 2440mm',
    grade: 'E0 Certified Flatness',
  },
  {
    code: 'AC-312',
    name: 'Obsidian Noir Mirror',
    category: 'Acrylic Sheets',
    categorySlug: 'acrylic-sheets',
    texture: 'linear-gradient(135deg, #1A1A1A 0%, #050403 100%)',
    gloss: 'Deep High-Gloss Obsidian',
    color: '#1A1A1A',
    description: 'Breathtaking pure black glass-effect acrylic sheets that reflect lighting patterns perfectly.',
    thickness: '1.5mm',
    dimensions: '1220mm x 2440mm',
    grade: 'Scratch Resistant (6H Coat)',
  },
  // 4. Polymer Sheets
  {
    code: 'PL-505',
    name: 'Suede Cream Polymer',
    category: 'Polymer Sheets',
    categorySlug: 'polymer-sheets',
    texture: 'linear-gradient(to bottom, #E8E2D5, #D1C9BC)',
    gloss: 'Ultra-Matte Velvet',
    color: '#E8E2D5',
    description: 'Fingerprint-proof, soft-touch cream polymer sheet engineered for wrapping curved cabinet shutters and high-use tables.',
    thickness: '0.8mm',
    dimensions: 'Flexible rolls',
    grade: 'Tropical Membrane wrapping',
  },
  // 5. Leather Sheets
  {
    code: 'LT-702',
    name: 'Tuscan Tan Leather',
    category: 'Leather Sheets',
    categorySlug: 'leather-sheets',
    texture: 'radial-gradient(circle, #8F5E36 0%, #6E401E 100%)',
    gloss: 'Supple Matte Grain',
    color: '#8F5E36',
    description: 'Warm tan leather-finish cladding sheet that yields structural warmth to bed panels, study desks, and accent walls.',
    thickness: '2.0mm',
    dimensions: '900mm x 1800mm',
    grade: 'Reconstituted Cowhide Fiber',
  },
  // 6. Natural Stone Veneer
  {
    code: 'ST-912',
    name: 'Slate Noir Slate',
    category: 'Natural Stone Veneer',
    categorySlug: 'natural-stone-veneer',
    texture: 'linear-gradient(45deg, #2D2F30 0%, #1A1B1C 100%)',
    gloss: 'Natural Rough Mineral',
    color: '#2D2F30',
    description: 'Authentic thin slate stone veneer with sparkling iron ore elements, creating structural accent fireplaces and facades.',
    thickness: '1.5mm - 2.0mm',
    dimensions: '1220mm x 2440mm',
    grade: 'Fiberglass-reinforced Slate',
  },
  // 7. Decorative Panels
  {
    code: 'DP-803',
    name: 'Fluted Brass Inlay',
    category: 'Decorative Panels',
    categorySlug: 'decorative-panels',
    texture: 'repeating-linear-gradient(90deg, #3A3225 0px, #3A3225 20px, #B8924A 21px, #B8924A 24px)',
    gloss: 'Hand-brushed & Gold Satin',
    color: '#3A3225',
    description: 'Intricately grooved wood-fiber panel features premium brass metal inlays, ideal for luxury hotel reception desks.',
    thickness: '18mm',
    dimensions: '1220mm x 2900mm',
    grade: 'Designer Accent Grade',
  }
];
