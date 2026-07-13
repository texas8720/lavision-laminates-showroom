export interface CaseStudy {
  slug: string;
  title: string;
  location: string;
  year: string;
  materialsUsed: string[];
  materialsCodes: string[];
  challenge: string;
  concept: string;
  outcome: string;
  category: 'Residential' | 'Commercial' | 'Hospitality' | 'Retail';
  backgroundPattern: string; // CSS styling representing project colors
}

export const PROJECTS: CaseStudy[] = [
  {
    slug: 'ahmedabad-residence',
    title: 'Ahmedabad Luxury Residence',
    location: 'Bodakdev, Ahmedabad',
    year: '2024',
    materialsUsed: ['True Wood Hazel Walnut Veneer', 'Sugar Creame High Gloss'],
    materialsCodes: ['TW-3641', 'QT-3608'],
    challenge: 'The homeowner wanted a warm, wood-forward sanctuary that integrated seamlessly with stark white modern cabinetry without causing a cluttered look in the open-floor plan.',
    concept: 'Contrast natural, pore-textured walnut paneling on the vertical columns with high-gloss mirror-finish acrylic sheets on the cabinet modules, creating visual depth and light bouncing.',
    outcome: 'A stunning residential interior that reflects Ahmedabad\'s warm sunlight through the gloss panels while grounding the spaces via sync-textured hazel veneers.',
    category: 'Residential',
    backgroundPattern: 'linear-gradient(to right, #8E6743, #FAF7F2)',
  },
  {
    slug: 'commercial-office-sg-highway',
    title: 'SG Highway Commercial Office',
    location: 'SG Highway, Gota, Ahmedabad',
    year: '2024',
    materialsUsed: ['Emporio Grey Slate Laminate', 'Oak Wood Austin'],
    materialsCodes: ['EM-3615', 'OW-3636'],
    challenge: 'A B2B SaaS fintech office required heavy-duty conference surfaces and partition paneling that could withstand corporate usage while looking highly professional and custom-built.',
    concept: 'Use concrete-textured Emporio Grey slate laminates on the table tops to provide impact and scratch resistance, combined with warm Oak Wood Austin panels on vertical dividers.',
    outcome: 'An authoritative office workspace that combines Scandinavian cold precision with biophilic wood accents, boosting team morale and looking highly executive to clients.',
    category: 'Commercial',
    backgroundPattern: 'linear-gradient(to right, #7F8C8D, #A07850)',
  },
  {
    slug: 'hotel-lobby-gandhinagar',
    title: 'Luxury Hotel Lobby',
    location: 'Sector-11, Gandhinagar',
    year: '2023',
    materialsUsed: ['Oak Wood Coral', 'Akasa Sand Polymer'],
    materialsCodes: ['OW-3637', 'EV-3645'],
    challenge: 'A high-end hotel lobby required custom wrap finishes around curved reception pillars and partition screens that are easily cleaned and have an inviting tactile texture.',
    concept: 'Combine distressed Oak Wood Coral sand-grain sheets on screens with wrap-around Akasa Sand polymer membranes vacuum-formed directly on the reception desk columns.',
    outcome: 'A seamless, organic curved entryway that welcomes guests with warm earth tones, soft-touch materials, and absolute alignment with sustainable architecture principles.',
    category: 'Hospitality',
    backgroundPattern: 'linear-gradient(to right, #D4CFC4, #FAF7F2)',
  },
];
