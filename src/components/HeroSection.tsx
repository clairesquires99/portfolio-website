const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const GRADIENT_BLUE =
  "radial-gradient(circle at 36% 30%, #D8EEFF 0%, #90C4F4 20%, #4E90DC 44%, #1E54A8 68%, #0A2E7A 88%, #061860 100%)";
const GRADIENT_PINK =
  "radial-gradient(ellipse at 48% 38%, #FFCECE 0%, #F09090 28%, #D85858 54%, #B83030 78%, #8C1820 96%)";
const GRADIENT_ORANGE =
  "radial-gradient(circle at 42% 28%, #FFE8A8 0%, #F5BC48 16%, #E89428 36%, #D46C14 56%, #B04A08 74%, #803004 90%, #5C1E00 100%)";

function Label({
  position,
  dotClass,
  children,
}: {
  position: string;
  dotClass: string;
  children: string;
}) {
  return (
    <span
      className={`absolute flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-hero-bg text-[11px] font-medium tracking-[0.1em] uppercase text-label whitespace-nowrap select-none ${position}`}
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotClass}`} />
      {children}
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="min-h-svh flex bg-hero-bg overflow-hidden">
      {/* ── Left: text ─────────────────────────────────────────────────────── */}
      <div className="flex-[0_0_50%] flex flex-col justify-center py-20 pl-30 pr-8">
        <h1 className="mb-7 font-h1 font-light italic leading-[0.88] text-[clamp(68px,7vw,100px)] text-hero-name tracking-[-0.01em] antialiased">
          Claire Squires
        </h1>
        <p className="text-[clamp(20px,1.5vw,30px)] leading-[1.65] text-muted tracking-[0.01em] font-h2 font-extralight">
          Building at the intersection of engineering, design and people.
        </p>
      </div>

      {/* ── Right: visual ──────────────────────────────────────────────────── */}
    </section>
  );
}
