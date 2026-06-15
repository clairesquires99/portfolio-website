import { Canvas, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useMemo } from "react";
import { RibbonRiver } from "./RibbonRiver";

// Matches the sibling decorative <svg viewBox="0 0 1430 802" preserveAspectRatio="xMidYMid slice">.
// ribbonProfile.ts already bakes in the ribbon's <g transform="translate(0, -90)">
// and flips Y (SVG y grows down, Three.js world y grows up), so world y=0
// corresponds to viewBox y=0 and world y=-802 corresponds to viewBox y=802.
const VIEW_W = 1430;
const VIEW_H = 802;
const VIEW_TOP = 0;
const VIEW_BOTTOM = -VIEW_H;

/** Recomputes the camera frustum on resize to replicate "xMidYMid slice". */
function SlicedCamera() {
  const size = useThree((state) => state.size);

  const bounds = useMemo(() => {
    const scale = Math.max(size.width / VIEW_W, size.height / VIEW_H);
    const visW = size.width / scale;
    const visH = size.height / scale;
    const cx = VIEW_W / 2;
    const cy = (VIEW_TOP + VIEW_BOTTOM) / 2;

    return {
      left: cx - visW / 2,
      right: cx + visW / 2,
      top: cy + visH / 2,
      bottom: cy - visH / 2,
    };
  }, [size]);

  return (
    <OrthographicCamera
      makeDefault
      left={bounds.left}
      right={bounds.right}
      top={bounds.top}
      bottom={bounds.bottom}
      near={0.1}
      far={10}
      position={[0, 0, 1]}
    />
  );
}

export function RibbonCanvas() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      className="absolute left-[-8%] right-[-8%] pointer-events-none"
      style={{
        position: "absolute",
        width: "auto",
        height: "auto",
        aspectRatio: `${VIEW_W} / ${VIEW_H}`,
      }}
      aria-hidden="true"
    >
      <SlicedCamera />
      <RibbonRiver direction={-1} />
    </Canvas>
  );
}
