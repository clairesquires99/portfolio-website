import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  PiBabyCarriageLight,
  PiPersonSimpleLight,
  PiPersonSimpleRunLight,
  PiPersonSimpleTaiChiLight,
  PiPersonSimpleThrowLight,
  PiStudentLight,
  PiUsersLight,
  PiUserSoundLight,
  PiWheelchairMotionLight,
} from "react-icons/pi";
import { useAnimationPhase } from "../../context/AnimationPhaseContext";

const PATH_D =
  "M901.783 0 C797.99 87.2002 820.265 249.317 683.783 277.861C541.195 307.683 481.715 189.866 335.783 184.861C196.465 180.083 117.959 352.791 0 459.361";

const PERSON_ICONS = [
  PiPersonSimpleLight,
  PiPersonSimpleRunLight,
  PiPersonSimpleTaiChiLight,
  PiPersonSimpleTaiChiLight,
  PiPersonSimpleThrowLight,
  PiStudentLight,
  PiUsersLight,
  PiUserSoundLight,
  PiWheelchairMotionLight,
  PiBabyCarriageLight,
];

const ICON_DUR = 18;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SHUFFLED = shuffleArray(PERSON_ICONS);
const ICON_SEQUENCE = [...SHUFFLED, ...SHUFFLED, ...SHUFFLED];

export function RibbonTop() {
  const { phase } = useAnimationPhase();
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const revealed = phase >= 3;

  return (
    <svg
      viewBox="0 0 1430 802"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
      className="absolute left-[-8%] right-[-8%] top-[-8%] bottom-[-8%] pointer-events-none"
    >
      <defs>
        <path ref={pathRef} id="ribbon-top" d={PATH_D} />
        <mask id="ribbon-top-mask">
          {pathLength > 0 && (
            <motion.path
              d={PATH_D}
              stroke="white"
              fill="none"
              strokeWidth={40}
              strokeDasharray={pathLength}
              initial={{ strokeDashoffset: pathLength }}
              animate={{ strokeDashoffset: revealed ? 0 : pathLength }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
            />
          )}
        </mask>
      </defs>
      <g mask="url(#ribbon-top-mask)">
        {ICON_SEQUENCE.map((Icon, i) => (
          <g key={i} fill="#1c1820" opacity="0.72">
            <animateMotion
              dur={`${ICON_DUR}s`}
              begin={`${-((i * ICON_DUR) / ICON_SEQUENCE.length).toFixed(3)}s`}
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#ribbon-top" />
            </animateMotion>
            <g transform="translate(-12, -12) rotate(180 8 8) scale(-1, 1) translate(-16, 0)">
              <Icon size={16} />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
