export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "architecture",
    title: "Architectural Design",
    description: "Comprehensive architectural services from concept development through to construction documentation and administration.",
    icon: "Building2",
  },
  {
    id: "interior",
    title: "Interior Design",
    description: "Thoughtful interior design that creates cohesive, functional, and aesthetically pleasing spaces tailored to client needs.",
    icon: "Sofa",
  },
  {
    id: "urban",
    title: "Urban Planning",
    description: "Strategic planning services focusing on sustainable development and community-centered design approaches.",
    icon: "MapPin",
  },
  {
    id: "consultation",
    title: "Design Consultation",
    description: "Expert consultation on design direction, material selection, and spatial planning for both new builds and renovations.",
    icon: "MessageSquare",
  },
];

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "1",
    number: "01",
    title: "Initial Consultation",
    description: "We begin with understanding your vision, requirements, and budget to create a tailored approach.",
  },
  {
    id: "2",
    number: "02",
    title: "Concept Development",
    description: "Our team develops initial concepts and sketches that outline the style and layout of your space.",
  },
  {
    id: "3",
    number: "03",
    title: "Design Project",
    description: "Detailed design documents including color schemes, furniture placement, and technical layouts.",
  },
  {
    id: "4",
    number: "04",
    title: "3D Visualization",
    description: "Photorealistic 3D renders so you can see exactly what the final result will look like.",
  },
  {
    id: "5",
    number: "05",
    title: "Material Selection",
    description: "Careful selection of building materials, components, and furniture for your interior.",
  },
  {
    id: "6",
    number: "06",
    title: "Execution",
    description: "Professional implementation of the design with regular progress updates and quality control.",
  },
  {
    id: "7",
    number: "07",
    title: "Final Handover",
    description: "Complete project delivery with documentation and aftercare support.",
  },
];
