import { ArrowRight } from "lucide-react";

const ITEMS = [
  "Hearth",
  "FruitGAN",
  "SaferSpaces",
  "The Photography Foundation",
  "Recommenda",
  "Covid and the Classroom",
];

export function ProjectsSection() {
  return (
    <section className="bg-hero-bg px-14 pt-10 pb-16">
      <ul className="w-full">
        {ITEMS.map((item) => (
          <li
            key={item}
            className="flex items-center justify-between py-5 border-b border-black/10 first:border-t"
          >
            <span className="font-h2 font-light text-[28px] text-[#1c1820] tracking-[-0.02em]">
              {item}
            </span>
            <ArrowRight
              className="text-[#1c1820] shrink-0"
              size={22}
              strokeWidth={1.25}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
