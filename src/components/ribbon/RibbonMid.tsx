import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAnimationPhase } from "../../context/AnimationPhaseContext";
import { useHoveredRibbon } from "../../context/HoveredRibbonContext";

const REPS = 6;

const TERMINAL_TEXT =
  "$ cd /life  ·  " +
  '$ fly --from="Free State, ZA" --to="Edinburgh, SCO" --major="cognitive science"  ·  ' +
  '$ fly --from="Edinburgh, SCO" --to="London, UK"     --role="software engineer"  ·  ' +
  '$ fly --from="London, UK"     --to="New York, USA"  --major="computer science"  ·  ' +
  "$ whoami  ·  > builder. designer. listener. ·  ";

const PATH_D =
  "M0 400 C187.456 460.658 380.896 193.606 583.485 146.973 C812.377 94.2849 954.283 203.467 1077.7 253.351 C1187.66 297.794 1297.62 256.846 1421.23 0";

// Same curve as PATH_D, traced in the opposite direction (right to left) so the
// mask reveal animates from the right edge of the ribbon toward the left.
const PATH_D_REVERSED =
  "M1421.23 0 C1297.62 256.846 1187.66 297.794 1077.7 253.351 C954.283 203.467 812.377 94.2849 583.485 146.973 C380.896 193.606 187.456 460.658 0 400";

const RIBBON_DUR = 20000;
const RIBBON_REPEATS = REPS;

export function RibbonMid() {
  const { phase } = useAnimationPhase();
  const { setHoveredRibbon } = useHoveredRibbon();
  const pathRef = useRef<SVGPathElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Drive the looping textPath scroll along ribbon-mid.
  useEffect(() => {
    let cancelled = false;

    const start = () => {
      const tp = textPathRef.current;
      if (!tp) return;

      const totalLen = tp.getComputedTextLength();
      if (totalLen === 0) return;
      const cycleLen = totalLen / RIBBON_REPEATS;
      const t0 = performance.now();

      const tick = (now: number) => {
        if (cancelled) return;
        const offset = -cycleLen * (((now - t0) % RIBBON_DUR) / RIBBON_DUR);
        tp.setAttribute("startOffset", String(offset));
        requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    document.fonts.ready.then(start);
    return () => {
      cancelled = true;
    };
  }, []);

  const revealed = phase >= 1;

  return (
    <svg
      viewBox="0 0 1430 802"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute left-[-8%] right-[-8%] pointer-events-none"
    >
      <defs>
        <path ref={pathRef} id="ribbon-mid" d={PATH_D} />
        <mask id="ribbon-mid-mask">
          {pathLength > 0 && (
            <motion.path
              d={PATH_D_REVERSED}
              stroke="white"
              fill="none"
              strokeWidth={50}
              strokeDasharray={pathLength}
              initial={{ strokeDashoffset: pathLength }}
              animate={{ strokeDashoffset: revealed ? 0 : pathLength }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </mask>
      </defs>
      <g mask="url(#ribbon-mid-mask)">
        <text
          fill="#1c1820"
          fontSize="11"
          letterSpacing="1.5"
          opacity="0.7"
          dominantBaseline="middle"
          fontFamily="'Geist Mono', monospace"
        >
          <textPath ref={textPathRef} href="#ribbon-mid">
            {TERMINAL_TEXT.repeat(REPS)}
          </textPath>
        </text>
      </g>
      <path
        d={PATH_D}
        fill="none"
        stroke="transparent"
        strokeWidth={32}
        pointerEvents="stroke"
        className="cursor-pointer"
        onMouseEnter={() => setHoveredRibbon("engineering")}
        onMouseLeave={() => setHoveredRibbon(null)}
      />
    </svg>
  );
}
