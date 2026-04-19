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
