import { NotepadText } from "lucide-react";
import { useEffect } from "react";

const REPS = 6;

const CODE_TOKENS = [
  { text: "def ", color: "#f92672" },
  { text: "build", color: "#a6e22e" },
  { text: "(self):  ", color: "#f8f8f2" },
  { text: "·  ", color: "#75715e" },
  { text: "return ", color: "#f92672" },
  { text: "self.output  ", color: "#f8f8f2" },
  { text: "·  ", color: "#75715e" },
  { text: "if ", color: "#f92672" },
  { text: "__name__ ", color: "#f8f8f2" },
  { text: "== ", color: "#f92672" },
  { text: '"__main__"', color: "#e6db74" },
  { text: ":  ", color: "#f8f8f2" },
  { text: "·  ", color: "#75715e" },
  { text: "import ", color: "#f92672" },
  { text: "asyncio  ", color: "#f8f8f2" },
  { text: "·  ", color: "#75715e" },
  { text: "class ", color: "#f92672" },
  { text: "Pipeline", color: "#a6e22e" },
  { text: ":  ", color: "#f8f8f2" },
  { text: "·  ", color: "#75715e" },
  { text: "await ", color: "#f92672" },
  { text: "ship", color: "#a6e22e" },
  { text: "(feature)  ", color: "#f8f8f2" },
  { text: "·  ", color: "#75715e" },
] as const;

const NAME_TOKENS = [
  { text: "Amara", font: "Caveat", size: 16 },
  { text: "  ·  ", font: "Caveat", size: 12 },
  { text: "Yuki", font: "Dancing Script", size: 15 },
  { text: "  ·  ", font: "Dancing Script", size: 12 },
  { text: "Sofia", font: "Kalam", size: 13 },
  { text: "  ·  ", font: "Kalam", size: 12 },
  { text: "Priya", font: "Permanent Marker", size: 10 },
  { text: "  ·  ", font: "Permanent Marker", size: 10 },
  { text: "Fatima", font: "Indie Flower", size: 13 },
  { text: "  ·  ", font: "Indie Flower", size: 12 },
  { text: "Lars", font: "Shadows Into Light", size: 15 },
  { text: "  ·  ", font: "Shadows Into Light", size: 13 },
  { text: "Mei", font: "Patrick Hand", size: 13 },
  { text: "  ·  ", font: "Patrick Hand", size: 12 },
  { text: "Kofi", font: "Sacramento", size: 19 },
  { text: "  ·  ", font: "Sacramento", size: 14 },
  { text: "Isabel", font: "Caveat", size: 15 },
  { text: "  ·  ", font: "Caveat", size: 12 },
  { text: "Nadia", font: "Dancing Script", size: 15 },
  { text: "  ·  ", font: "Dancing Script", size: 12 },
  { text: "Kenji", font: "Kalam", size: 13 },
  { text: "  ·  ", font: "Kalam", size: 12 },
  { text: "Ingrid", font: "Permanent Marker", size: 10 },
  { text: "  ·  ", font: "Permanent Marker", size: 10 },
  { text: "Ravi", font: "Indie Flower", size: 13 },
  { text: "  ·  ", font: "Indie Flower", size: 12 },
  { text: "Aisha", font: "Shadows Into Light", size: 15 },
  { text: "  ·  ", font: "Shadows Into Light", size: 13 },
  { text: "Marcus", font: "Patrick Hand", size: 13 },
  { text: "  ·  ", font: "Patrick Hand", size: 12 },
  { text: "Zara", font: "Sacramento", size: 19 },
  { text: "  ·  ", font: "Sacramento", size: 14 },
] as const;

const RIBBONS = [
  { id: "ribbon-top", dur: 6000 },
  { id: "ribbon-mid", dur: 15000 },
  { id: "ribbon-bot", dur: 20000 },
];

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
      RIBBONS.forEach(({ id, dur }) => {
        const tp = document.querySelector(
          `textPath[href="#${id}"]`,
        ) as SVGTextPathElement | null;
        if (!tp) return;

        const totalLen = tp.getComputedTextLength();
        if (totalLen === 0) return;
        const cycleLen = totalLen / REPS;

        let cancelled = false;
        const t0 = performance.now();

        const tick = (now: number) => {
          if (cancelled) return;
          const offset = cycleLen * (((now - t0) % dur) / dur - 1);
          tp.setAttribute("startOffset", String(offset));
          requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        cancelFns.push(() => {
          cancelled = true;
        });
      });
    };

    document.fonts.ready.then(start);
    return () => cancelFns.forEach((fn) => fn());
  }, []);

  return (
    <section className="relative min-h-svh flex bg-hero-bg overflow-hidden">
      {/* ── Social links ───────────────────────────────────────────────────── */}
      <div className="absolute top-8 right-10 flex items-center gap-5">
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
          href="#"
          title="View resume"
          aria-label="View resume"
          className="text-hero-name opacity-70 hover:opacity-100 transition-opacity"
        >
          <NotepadText size={22} strokeWidth={1.75} />
        </a>
      </div>

      {/* ── Left: text ─────────────────────────────────────────────────────── */}
      <div className="flex-[0_0_50%] flex flex-col justify-center py-20 pl-30 pr-8">
        <p className="mb-4 font-jost text-lg text-hero-name tracking-[0.1em] uppercase">
          Product Engineer
        </p>
        <h1 className="mb-7 font-h1 font-light italic leading-[0.88] text-[clamp(68px,7vw,100px)] text-hero-name tracking-[-0.01em] antialiased">
          Claire Squires
        </h1>
        <p className="text-[clamp(20px,1.5vw,30px)] leading-[1.65] text-muted tracking-[0.01em] font-h2 font-extralight">
          Building at the intersection of{" "}
          <span className="font-light text-hero-name">engineering</span>,{" "}
          <span className="font-light text-hero-name">design</span> and{" "}
          <span className="font-light text-hero-name">people</span>.
        </p>
      </div>

      {/* ── Decorative line overlay — top line ────────────────────────────── */}
      <svg
        viewBox="0 0 1459 819"
        preserveAspectRatio="xMidYMin slice"
        aria-hidden="true"
        className="absolute left-[-8%] right-[-8%] top-[-8%] bottom-[-8%] pointer-events-none"
      >
        <defs>
          <path
            id="ribbon-top"
            d="M611.049 2.89355C611.049 2.89355 666.549 196.894 818.049 196.894C861.929 196.894 894.049 168.394 889.049 123.894C884.639 84.6483 850.549 59.8936 818.049 66.3936C765.049 76.9936 743.549 164.894 836.549 242.894C929.549 320.894 1001.55 323.894 1082.05 323.894C1219.05 323.894 1355.05 508.894 1450.55 508.894"
          />
        </defs>
        <use
          href="#ribbon-top"
          stroke="#1c1820"
          strokeWidth="21"
          fill="none"
          opacity="0.09"
        />
        <text
          fill="#1c1820"
          fontSize="13"
          letterSpacing="2"
          opacity="0.35"
          dominantBaseline="middle"
        >
          <textPath href="#ribbon-top">
            {
              "design  ·  engineering  ·  product  ·  craft  ·  build  ·  design  ·  engineering  ·  product  ·  craft  ·  build  ·  design  ·  engineering  ·  product  ·  craft  ·  build  ·  design  ·  engineering  ·  product  ·  craft  ·  build  ·  design  ·  engineering  ·  product  ·  craft  ·  build  ·  design  ·  engineering  ·  product  ·  craft  ·  build  ·  "
            }
          </textPath>
        </text>
      </svg>

      {/* ── Decorative line overlay — middle line ────────────────────────────── */}
      <svg
        viewBox="0 0 1459 819"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute left-[-8%] right-[-8%] pointer-events-none"
      >
        <defs>
          <path
            id="ribbon-mid"
            d="M25.0488 48.8936C130.438 119.179 62.5452 203.473 184.155 229.987C304.955 256.324 324.517 179.879 448.15 175.459C613.101 169.561 654.416 315.043 881.385 395.072C1030.36 447.599 1193.52 546.974 1339.96 491.622C1469.21 442.767 1446.05 442.894 1446.05 442.894"
          />
        </defs>
        <use
          href="#ribbon-mid"
          stroke="#e9e3d7a4"
          strokeWidth="21"
          fill="none"
          opacity="0.9"
        />
        <text fill="#2d1f0d" opacity="0.78" dominantBaseline="middle">
          <textPath href="#ribbon-mid">
            {Array.from({ length: REPS }, (_, i) =>
              NAME_TOKENS.map((token, j) => (
                <tspan
                  key={`${i}-${j}`}
                  fontFamily={`'${token.font}', cursive`}
                  fontSize={token.size}
                >
                  {token.text}
                </tspan>
              )),
            )}
          </textPath>
        </text>
      </svg>

      {/* ── Decorative line overlay — bottom line (engineering / code) ──────── */}
      <svg
        viewBox="0 0 1459 819"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        className="absolute left-[-8%] right-[-8%] bottom-[-8%] pointer-events-none"
      >
        <defs>
          <path
            id="ribbon-bot"
            d="M8.54883 812.394C141.549 625.894 256.549 577.893 371.549 619.393C486.549 660.894 618.773 751.726 832.049 707.894C1052.62 662.562 1261.55 366.86 1442.55 411.894"
          />
        </defs>
        <use
          href="#ribbon-bot"
          stroke="#1e1e1e"
          strokeWidth="21"
          fill="none"
          opacity="0.88"
        />
        <text
          fontSize="11"
          letterSpacing="1.5"
          fontWeight="600"
          dominantBaseline="middle"
          fontFamily="'SF Mono', 'Fira Code', Consolas, 'Courier New', monospace"
        >
          <textPath href="#ribbon-bot">
            {Array.from({ length: REPS }, (_, i) =>
              CODE_TOKENS.map((token, j) => (
                <tspan key={`${i}-${j}`} fill={token.color}>
                  {token.text}
                </tspan>
              )),
            )}
          </textPath>
        </text>
      </svg>

      {/* ── Right: visual ──────────────────────────────────────────────────── */}
    </section>
  );
}
