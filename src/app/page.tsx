import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { MiddleHero } from "@/components/sections/MiddleHero";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProjects />
      <Services />
      <Process />
      <MiddleHero />
      <Team />
      <Testimonials />
      <FAQ />
    </>
  );
}
