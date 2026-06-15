import { useFrame } from "@react-three/fiber";
import { animate, motionValue } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useAnimationPhase } from "../../context/AnimationPhaseContext";
import { useHoveredRibbon } from "../../context/HoveredRibbonContext";
import { RIBBON_MAX_WIDTH } from "../../data/ribbonProfile";
import { createRibbonGeometry, createRibbonHitGeometry } from "./ribbonGeometry";
import { createRibbonProfileTexture } from "./ribbonProfileTexture";

// How far ahead of the leading edge (in t-space) the taper-to-zero ramp
// extends. At t=0 it gives the drawn tip; at uProgress=1 the leading edge
// sits 1.04 ahead of vT=1, so the whole ribbon ends up past the ramp and
// renders at full width again.
const TAPER_WIDTH = 0.04;

const vertexShader = /* glsl */ `
  attribute vec2 aNormal;
  attribute float aSide;

  uniform sampler2D uProfile;
  uniform float uTimeOffset;
  uniform float uMaxWidth;
  uniform float uProgress;

  varying vec3 vColor;
  varying float vT;

  void main() {
    vT = uv.x;

    float u = fract(uv.x + uTimeOffset);
    vec4 profile = texture2D(uProfile, vec2(u, 0.5));

    float width = profile.a * uMaxWidth;

    // Reveal travels from t=0 (right side of screen) toward t=1 (left side).
    float leadingEdgeT = uProgress * (1.0 + ${TAPER_WIDTH});
    float taper = smoothstep(leadingEdgeT, leadingEdgeT - ${TAPER_WIDTH}, vT);
    width *= taper;

    vec3 displaced = position + vec3(aNormal * aSide * width, 0.0);

    vColor = profile.rgb;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uProgress;

  varying vec3 vColor;
  varying float vT;

  void main() {
    float leadingEdgeT = uProgress * (1.0 + ${TAPER_WIDTH});
    if (vT > leadingEdgeT) discard;

    gl_FragColor = vec4(vColor, 1.0);
  }
`;

interface RibbonRiverProps {
  /** Loops per second the width/color pattern travels along the path. */
  speed?: number;
  /** Flip to -1 if the flow direction looks reversed. */
  direction?: 1 | -1;
  /** Number of samples in the scrolling profile texture. */
  resolution?: number;
}

export function RibbonRiver({
  speed = 0.05,
  direction = 1,
  resolution = 1024,
}: RibbonRiverProps) {
  const geometry = useMemo(() => createRibbonGeometry(), []);
  const hitGeometry = useMemo(() => createRibbonHitGeometry(), []);
  const texture = useMemo(() => createRibbonProfileTexture(resolution), [resolution]);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const timeOffsetRef = useRef(0);
  const hasRevealedRef = useRef(false);
  const { phase } = useAnimationPhase();
  const { setHoveredRibbon } = useHoveredRibbon();

  const uniforms = useMemo(
    () => ({
      uProfile: { value: texture },
      uTimeOffset: { value: 0 },
      uMaxWidth: { value: RIBBON_MAX_WIDTH },
      uProgress: { value: 0 },
    }),
    [texture],
  );

  useFrame((_, delta) => {
    const next = timeOffsetRef.current + delta * speed * direction;
    timeOffsetRef.current = ((next % 1) + 1) % 1;
    if (materialRef.current) {
      materialRef.current.uniforms.uTimeOffset.value = timeOffsetRef.current;
    }
  });

  useEffect(() => {
    if (phase < 2 || hasRevealedRef.current) return;
    hasRevealedRef.current = true;

    const progress = motionValue(0);
    const unsubscribe = progress.on("change", (value) => {
      if (materialRef.current) {
        materialRef.current.uniforms.uProgress.value = value;
      }
    });
    const controls = animate(progress, 1, { duration: 1.4, ease: "easeOut" });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [phase]);

  return (
    <>
      <mesh geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Invisible, generously-sized strip used purely for hover detection —
          the visual ribbon's geometry is collapsed to a zero-width centerline
          since its width is displaced on the GPU, so it can't be raycast. */}
      <mesh
        geometry={hitGeometry}
        onPointerOver={() => {
          setHoveredRibbon("design");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoveredRibbon(null);
          document.body.style.cursor = "default";
        }}
      >
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  );
}
