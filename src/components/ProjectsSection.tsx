import { ArrowRight, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import { toSlug } from "../utils/slugify";

export function ProjectsSection() {
  return (
    <section className="min-h-svh bg-hero-bg px-5 pt-8 pb-12 sm:px-14 sm:pt-10 sm:pb-16 flex flex-col justify-center">
      <ul className="w-full">
        {PROJECTS.map((item) => (
          <li
            key={item.name}
            className="group relative first:border-t border-b border-black/10 overflow-hidden px-3"
          >
            {/* Background image */}
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-[opacity,transform] duration-500 ease-out"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Link
              to={`/projects/${toSlug(item.name)}`}
              className="relative flex items-center justify-between py-3.5 sm:py-5"
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-h2 font-light text-[20px] sm:text-[28px] text-hero-name group-hover:text-white tracking-[-0.02em] leading-none transition-colors duration-300">
                  {item.name}
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5">
                  <span className="font-h2 font-light text-[13px] text-muted group-hover:text-white/70 tracking-[0.01em] transition-colors duration-300">
                    {item.dateRange}
                  </span>
                  <span className="hidden sm:block w-1 h-1 rounded-full bg-black/20 group-hover:bg-white/30 shrink-0 transition-colors duration-300" />
                  <span className="font-h2 font-light text-[13px] text-muted group-hover:text-white/70 tracking-[0.01em] uppercase transition-colors duration-300">
                    {item.category}
                  </span>
                  {item.award && (
                    <>
                      <span className="hidden sm:block w-1 h-1 rounded-full bg-black/20 group-hover:bg-white/30 shrink-0 transition-colors duration-300" />
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-h2 font-medium tracking-[0.05em] uppercase text-zinc-600 bg-[linear-gradient(160deg,#fafafc_0%,#b8b8c0_42%,#ececf0_100%)] border border-zinc-300/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.08)] self-start">
                        <Trophy size={10} strokeWidth={1.75} />
                        Award winning
                      </span>
                    </>
                  )}
                </div>
              </div>
              <ArrowRight
                className="text-hero-name/40 group-hover:text-white shrink-0 transition-all duration-300 group-hover:translate-x-0.5"
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
