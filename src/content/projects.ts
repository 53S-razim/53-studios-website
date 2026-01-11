export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  date: string;
  image: string;
  images?: string[];
  description?: string;
  services?: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "luxury-interiors-pallavaram",
    title: "Luxury Interiors at Pallavaram",
    location: "Chennai",
    category: "Residential",
    date: "2024-12",
    image: "/images/dining1.jpg",
    images: ["/images/dining1.jpg", "/images/dining2.jpg"],
    description: "A contemporary residential interior featuring modern design elements with warm, inviting spaces.",
    services: ["Interior Design", "Space Planning", "Furniture Selection"],
    featured: true,
  },
  {
    id: "2",
    slug: "luxury-interiors-besant-nagar",
    title: "Luxury Interiors at Besant Nagar",
    location: "Chennai",
    category: "Interior Design",
    date: "2024-11",
    image: "/images/bed1.jpg",
    images: ["/images/bed1.jpg", "/images/bed2.jpg", "/images/bed3.jpg"],
    description: "Elegant bedroom and living spaces designed for comfort and sophistication.",
    services: ["Interior Design", "Lighting Design"],
    featured: true,
  },
  {
    id: "3",
    slug: "nail-art-studio-anna-nagar",
    title: "Nail Art Studio at Anna Nagar",
    location: "Chennai",
    category: "Commercial",
    date: "2024-10",
    image: "/images/View_5.png",
    images: ["/images/View_5.png"],
    description: "A chic commercial space designed for a nail art studio with modern aesthetics.",
    services: ["Commercial Design", "Space Planning"],
    featured: true,
  },
  {
    id: "4",
    slug: "residence-pallavaram",
    title: "Residence at Pallavaram",
    location: "Chennai",
    category: "Residential",
    date: "2024-09",
    image: "/images/ext1.jpg",
    images: ["/images/ext1.jpg"],
    description: "Contemporary residential architecture with modern facade design.",
    services: ["Architecture", "Exterior Design"],
    featured: true,
  },
  {
    id: "5",
    slug: "luxury-interiors-mylapore",
    title: "Luxury Interiors at Mylapore",
    location: "Chennai",
    category: "Residential",
    date: "2024-08",
    image: "/images/liv1.jpg",
    images: ["/images/liv1.jpg", "/images/liv2.jpg"],
    description: "Sophisticated living spaces with attention to detail and premium finishes.",
    services: ["Interior Design", "Custom Furniture"],
  },
  {
    id: "6",
    slug: "modern-luxury-nagarcoil",
    title: "Modern Luxury Interior at Nagarcoil",
    location: "Nagarcoil",
    category: "Residential",
    date: "2024-07",
    image: "/images/bed3.jpg",
    images: ["/images/bed3.jpg", "/images/bed4.jpg", "/images/bed5.jpg"],
    description: "Modern luxury bedroom designs with contemporary styling.",
    services: ["Interior Design", "Bedroom Design"],
  },
  {
    id: "7",
    slug: "neo-classical-office-saidapet",
    title: "Neo Classical Office at Saidapet",
    location: "Chennai",
    category: "Office",
    date: "2024-06",
    image: "/images/View_2.png",
    images: ["/images/View_2.png"],
    description: "Neo-classical office design blending traditional elegance with modern functionality.",
    services: ["Office Design", "Interior Design"],
  },
  {
    id: "8",
    slug: "residence-nagarcoil",
    title: "Residence at Nagarcoil",
    location: "Nagarcoil",
    category: "Residential",
    date: "2024-05",
    image: "/images/View_1.0004.png",
    images: ["/images/View_1.0004.png", "/images/View_3.0089.png"],
    description: "Modern residential architecture with clean lines and contemporary aesthetics.",
    services: ["Architecture", "Exterior Design"],
  },
  {
    id: "9",
    slug: "luxury-toilet-pallavaram",
    title: "Luxury Toilet at Pallavaram",
    location: "Chennai",
    category: "Residential",
    date: "2024-04",
    image: "/images/toiletView_2.png",
    images: ["/images/toiletView_2.png"],
    description: "Premium bathroom design with luxury finishes and modern fixtures.",
    services: ["Interior Design", "Bathroom Design"],
  },
  {
    id: "10",
    slug: "wedding-hall-trichy",
    title: "Wedding Hall at Trichy",
    location: "Trichy",
    category: "Commercial",
    date: "2024-03",
    image: "/images/Final_1.jpg",
    images: ["/images/Final_1.jpg"],
    description: "Grand wedding hall design with elegant interiors and spacious layout.",
    services: ["Commercial Design", "Event Space Design"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
