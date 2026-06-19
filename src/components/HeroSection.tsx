import { motion } from "framer-motion";
import { NotepadText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAnimationPhase } from "../context/AnimationPhaseContext";
import {
  HoveredRibbonProvider,
  useHoveredRibbon,
} from "../context/HoveredRibbonContext";
import { RibbonCanvas } from "./ribbon/RibbonCanvas";
import { RibbonMid } from "./ribbon/RibbonMid";
import { RibbonTop } from "./ribbon/RibbonTop";

// Chunks reveal together; the chunk index also drives the animation phase:
// chunk 1 ("engineering,") -> phase 1, chunk 2 ("design,") -> phase 2,
// chunk 3 ("and people.") -> phase 3.
const CHUNKS = [
  "Building at the intersection of",
  "engineering,",
  "design,",
  "and people.",
];

// Explicit per-chunk delays (ms) before each chunk starts revealing.
const CHUNK_TIMES = [300, 1500, 3000, 5000];

const LETTER_STAGGER = 0.03;

// Staggers every letter motion.span across the whole chunk (propagates
// through the plain <span> word wrappers below) for a continuous
// left-to-right reveal, rather than staggering per-word in parallel.
const chunkVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: LETTER_STAGGER },
  },
};

const letterVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};

function AnimatedSubtitle() {
  const { setPhase } = useAnimationPhase();
  const { hoveredRibbon } = useHoveredRibbon();
  const [visibleChunks, setVisibleChunks] = useState(0);

  useEffect(() => {
    const timers = CHUNKS.map((_, chunkIndex) =>
      setTimeout(() => {
        setVisibleChunks((c) => Math.max(c, chunkIndex + 1));

        if (chunkIndex === 1) setPhase(1);
        else if (chunkIndex === 2) setPhase(2);
        else if (chunkIndex === 3) setPhase(3);
      }, CHUNK_TIMES[chunkIndex]),
    );

    return () => timers.forEach(clearTimeout);
  }, [setPhase]);

  return (
    <>
      {CHUNKS.map((chunk, chunkIndex) => {
        const words = chunk.split(" ");
        const isVisible = chunkIndex < visibleChunks;
        const isLastChunk = chunkIndex === CHUNKS.length - 1;

        return (
          <motion.span
            key={chunkIndex}
            style={{ display: "inline" }}
            variants={chunkVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {words.map((word, wordIndex) => {
              const keyword = word.startsWith("engineering")
                ? "engineering"
                : word.startsWith("design")
                  ? "design"
                  : word.startsWith("people")
                    ? "people"
                    : null;
              const isLastWord = isLastChunk && wordIndex === words.length - 1;

              return (
                <React.Fragment key={wordIndex}>
                  <motion.span
                    className={keyword ? "text-hero-name" : undefined}
                    style={{ display: "inline-block" }}
                    animate={
                      keyword
                        ? { fontWeight: hoveredRibbon === keyword ? 800 : 300 }
                        : undefined
                    }
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {word.split("").map((char, j) => (
                      <motion.span
                        key={j}
                        style={{ display: "inline-block" }}
                        variants={letterVariants}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                  {isLastWord ? "" : " "}
                </React.Fragment>
              );
            })}
          </motion.span>
        );
      })}
    </>
  );
}

function GitHubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function HeroSection() {
  useEffect(() => {
    const cancelFns: (() => void)[] = [];

    const start = () => {
      // Animate the rainbow gradient by translating it continuously
      const grad = document.getElementById(
        "rainbow-grad",
      ) as SVGLinearGradientElement | null;
      if (grad) {
        const GRAD_PERIOD = 300; // SVG units — matches the gradient's x span
        const GRAD_DUR = 2000; // ms per full cycle
        let gradCancelled = false;
        const gradT0 = performance.now();

        const tickGrad = (now: number) => {
          if (gradCancelled) return;
          const offset = (((now - gradT0) % GRAD_DUR) / GRAD_DUR) * GRAD_PERIOD;
          grad.setAttribute("gradientTransform", `translate(${offset} 0)`);
          requestAnimationFrame(tickGrad);
        };
        requestAnimationFrame(tickGrad);
        cancelFns.push(() => {
          gradCancelled = true;
        });
      }
    };

    document.fonts.ready.then(start);
    return () => cancelFns.forEach((fn) => fn());
  }, []);

  return (
    <HoveredRibbonProvider>
      <section className="relative min-h-svh flex bg-hero-bg overflow-hidden">
        {/* ── Social links ───────────────────────────────────────────────────── */}
        <div className="absolute top-8 right-10 flex items-center gap-5 z-10">
          <a
            href="https://github.com/clairesquires99"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-hero-name opacity-70 hover:opacity-100 transition-opacity"
          >
            <GitHubIcon size={22} />
          </a>
          <a
            href="https://linkedin.com/in/clairesquires"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-hero-name opacity-70 hover:opacity-100 transition-opacity"
          >
            <LinkedInIcon size={22} />
          </a>
          <a
            href="/Claire_Squires_Resume_June2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View resume"
            className="text-hero-name opacity-70 hover:opacity-100 transition-opacity"
          >
            <NotepadText size={22} strokeWidth={1.75} />
          </a>
        </div>

        {/* ── Right: text ────────────────────────────────────────────────────── */}
        <div className="flex-[0_0_50%] ml-auto flex flex-col justify-center py-20 pl-8 pr-20">
          <p className="mb-4 font-sans text-lg text-hero-name tracking-[0.1em] uppercase">
            Product Engineer
          </p>
          <h1 className="mb-7 font-h1 font-light italic leading-[0.88] text-[clamp(68px,7vw,100px)] text-hero-name tracking-[-0.01em] antialiased">
            Claire Squires
          </h1>
          <p className="text-[clamp(20px,1.5vw,30px)] leading-[1.65] text-muted tracking-[0.01em] font-h2 font-extralight">
            <AnimatedSubtitle />
          </p>
        </div>

        {/* ── Decorative line overlay — bottom line (color ribbon) ─────────────── */}
        {/* Rendered first so the SVG ribbons above sit on top of it in the DOM
            stacking order, letting their hover overlays take pointer priority. */}
        <RibbonCanvas />

        {/* ── Decorative line overlay — top line (people icons) ──────────────── */}
        <RibbonTop />

        {/* ── Decorative line overlay — middle line (engineering / code) ──────── */}
        <RibbonMid />

        {/* ── Right: visual ──────────────────────────────────────────────────── */}
      </section>
    </HoveredRibbonProvider>
  );
}
