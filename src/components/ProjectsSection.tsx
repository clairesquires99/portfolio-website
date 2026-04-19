import { ArrowRight, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import { toSlug } from "../utils/slugify";

export function ProjectsSection() {
  return (
    <section className="min-h-svh bg-hero-bg px-14 pt-10 pb-16 flex flex-col justify-center">
      <ul className="w-full">
        {PROJECTS.map((item) => (
          <li key={item.name} className="first:border-t border-b border-black/10">
            <Link
              to={`/projects/${toSlug(item.name)}`}
              className="group flex items-center justify-between py-5"
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-h2 font-light text-[28px] text-hero-name tracking-[-0.02em] leading-none">
                  {item.name}
                </span>
                <div className="flex items-center gap-2.5">
                  <span className="font-h2 font-light text-[13px] text-muted tracking-[0.01em]">
                    {item.dateRange}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-black/20 shrink-0" />
                  <span className="font-h2 font-light text-[13px] text-muted tracking-[0.01em] uppercase">
                    {item.category}
                  </span>
                  {item.award && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-h2 font-medium tracking-[0.05em] uppercase text-zinc-600 bg-[linear-gradient(160deg,#fafafc_0%,#b8b8c0_42%,#ececf0_100%)] border border-zinc-300/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.08)]">
                      <Trophy size={10} strokeWidth={1.75} />
                      Award winning
                    </span>
                  )}
                </div>
              </div>
              <ArrowRight
                className="text-hero-name/40 shrink-0 transition-all duration-200 group-hover:text-hero-name group-hover:translate-x-0.5"
                size={22}
                strokeWidth={1.25}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
