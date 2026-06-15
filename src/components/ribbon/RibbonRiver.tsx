import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { RIBBON_MAX_WIDTH } from "../../data/ribbonProfile";
import { createRibbonGeometry } from "./ribbonGeometry";
import { createRibbonProfileTexture } from "./ribbonProfileTexture";

const vertexShader = /* glsl */ `
  attribute vec2 aNormal;
  attribute float aSide;

  uniform sampler2D uProfile;
  uniform float uTimeOffset;
  uniform float uMaxWidth;

  varying vec3 vColor;

  void main() {
    float u = fract(uv.x + uTimeOffset);
    vec4 profile = texture2D(uProfile, vec2(u, 0.5));

    float width = profile.a * uMaxWidth;
    vec3 displaced = position + vec3(aNormal * aSide * width, 0.0);

    vColor = profile.rgb;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;

  void main() {
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
  const texture = useMemo(() => createRibbonProfileTexture(resolution), [resolution]);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const timeOffsetRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uProfile: { value: texture },
      uTimeOffset: { value: 0 },
      uMaxWidth: { value: RIBBON_MAX_WIDTH },
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

  return (
    <mesh geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
