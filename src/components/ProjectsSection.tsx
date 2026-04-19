import { ArrowRight, Trophy } from "lucide-react";
import { PROJECTS } from "../data/projects";

export function ProjectsSection() {
  return (
    <section className="bg-hero-bg px-14 pt-10 pb-16">
      <ul className="w-full">
        {PROJECTS.map((item) => (
          <li
            key={item.name}
            className="group flex items-center justify-between py-5 border-b border-black/10 first:border-t cursor-pointer"
          >
            <div className="flex flex-col gap-1.5">
              <span className="font-h2 font-light text-[28px] text-[#1c1820] tracking-[-0.02em] leading-none">
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
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-h2 font-medium tracking-[0.05em] uppercase text-amber-700/80 bg-amber-100/60 border border-amber-200/70">
                    <Trophy size={10} strokeWidth={1.75} />
                    Award winning
                  </span>
                )}
              </div>
            </div>
            <ArrowRight
              className="text-[#1c1820]/40 shrink-0 transition-all duration-200 group-hover:text-[#1c1820] group-hover:translate-x-0.5"
              size={22}
              strokeWidth={1.25}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
