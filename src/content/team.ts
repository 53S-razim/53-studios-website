export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  email?: string;
}

export const team: TeamMember[] = [
  {
    id: "1",
    name: "Syed",
    role: "Principal Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    email: "syed@53studios.in",
  },
  {
    id: "2",
    name: "Sanjay",
    role: "Design Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    email: "sanjay@53studios.in",
  },
  {
    id: "3",
    name: "Nancy",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    email: "nancy@53studios.in",
  },
];
