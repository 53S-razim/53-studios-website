import { Metadata } from "next";
import { ProjectsGrid } from "./ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore our portfolio of architecture and interior design projects. From residential homes to commercial spaces.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-main">
        {/* Header */}
        <div className="mb-16">
          <p className="text-overline text-[var(--foreground-muted)] mb-4">
            Our Portfolio
          </p>
          <h1 className="text-display text-[var(--foreground)]">
            Projects
          </h1>
          <p className="text-body-lg text-[var(--foreground-secondary)] mt-6 max-w-2xl">
            A showcase of our finest work across residential, commercial, and
            hospitality spaces.
          </p>
        </div>

        {/* Projects Grid */}
        <ProjectsGrid />
      </div>
    </div>
  );
}
