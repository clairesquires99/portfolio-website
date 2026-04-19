import { ArrowLeft, ArrowUpRight, Trophy } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import { toSlug } from "../utils/slugify";

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => toSlug(p.name) === slug);

  if (!project) {
    return (
      <div className="min-h-svh bg-hero-bg flex items-center justify-center">
        <p className="font-h2 text-muted">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-hero-bg flex">
      {/* Content */}
      <div className="flex-1 px-14 py-12 max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 font-h2 font-light text-[13px] text-muted hover:text-hero-name transition-colors mb-10 cursor-pointer"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          All projects
        </button>

        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="font-h2 font-light text-[13px] text-muted tracking-[0.01em]">
            {project.dateRange}
          </span>
          <span className="w-1 h-1 rounded-full bg-black/20 shrink-0" />
          <span className="font-h2 font-light text-[13px] text-muted tracking-[0.01em] uppercase">
            {project.category}
          </span>
          {project.award && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-h2 font-medium tracking-[0.05em] uppercase text-amber-700/80 bg-amber-100/60 border border-amber-200/70">
              <Trophy size={10} strokeWidth={1.75} />
              Award winning
            </span>
          )}
        </div>

        <div className="flex items-baseline justify-between gap-6 mb-8">
          <h1 className="font-h1 font-light italic text-[clamp(40px,5vw,64px)] text-hero-name tracking-[-0.01em] leading-none">
            {project.name}
          </h1>
          {project.links && project.links.length > 0 && (
            <div className="flex items-center gap-4 shrink-0">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link inline-flex items-center gap-1 font-h2 font-light text-[14px] text-muted hover:text-hero-name transition-colors"
                >
                  {link.label}
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.5}
                    className="opacity-40 group-hover/link:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          )}
        </div>

        <section className="mb-8">
          <p className="font-h2 font-medium text-[11px] uppercase tracking-[0.08em] text-muted mb-3">
            My why
          </p>
          <p className="font-h2 font-light text-[17px] leading-[1.7] text-hero-name/70">
            {project.why}
          </p>
        </section>

        <section className="mb-8">
          <p className="font-h2 font-medium text-[11px] uppercase tracking-[0.08em] text-muted mb-3">
            About
          </p>
          <p className="font-h2 font-light text-[17px] leading-[1.75] text-hero-name/70">
            {project.description}
          </p>
        </section>

        <div className="flex flex-col gap-6 border-t border-black/10 pt-8">
          {project.award && (
            <div>
              <p className="font-h2 font-medium text-[11px] uppercase tracking-[0.08em] text-muted mb-1">
                Award
              </p>
              <p className="font-h2 font-light text-[14px] text-hero-name">
                {project.award}
              </p>
            </div>
          )}

          <div>
            <p className="font-h2 font-medium text-[11px] uppercase tracking-[0.08em] text-muted mb-1">
              Stack
            </p>
            <p className="font-h2 font-light text-[14px] text-hero-name">
              {project.stack.join(", ")}
            </p>
          </div>

          {project.collaborators.length > 0 && (
            <div>
              <p className="font-h2 font-medium text-[11px] uppercase tracking-[0.08em] text-muted mb-1">
                {project.collaborators.length === 1
                  ? "Collaborator"
                  : "Collaborators"}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {project.collaborators.map((c) => (
                  <a
                    key={c.url}
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-1 font-h2 font-light text-[14px] text-hero-name hover:text-muted transition-colors"
                  >
                    {c.name}
                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.5}
                      className="opacity-40 group-hover/link:opacity-100 transition-opacity"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image panel */}
      <div className="flex-1 sticky top-0 h-svh">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
