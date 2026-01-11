export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  description: string;
}

export const stats: Stat[] = [
  {
    id: "years",
    value: 2021,
    label: "Year of Establishment",
    description: "Crafting spaces since",
  },
  {
    id: "projects",
    value: 50,
    suffix: "+",
    label: "Projects Completed",
    description: "Successfully delivered",
  },
  {
    id: "clients",
    value: 45,
    suffix: "+",
    label: "Happy Clients",
    description: "Satisfied customers",
  },
  {
    id: "ongoing",
    value: 5,
    label: "Projects in Progress",
    description: "Currently working on",
  },
];
