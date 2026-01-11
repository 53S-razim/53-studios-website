export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  project?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Homeowner",
    content: "53 Studios transformed our house into a dream home. Their attention to detail and understanding of our needs was exceptional. The team delivered beyond our expectations.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    project: "Luxury Interiors at Pallavaram",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    role: "Business Owner",
    content: "Working with 53 Studios on our office space was a pleasure. They created a professional yet welcoming environment that our clients and employees love.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    project: "Neo Classical Office at Saidapet",
  },
  {
    id: "3",
    name: "Meera Venkatesh",
    role: "Homeowner",
    content: "The 3D visualizations helped us see exactly what our space would look like. The final result was even better than the renders. Highly recommend their services!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    project: "Luxury Interiors at Besant Nagar",
  },
];
