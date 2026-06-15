import * as THREE from "three";
import { RIBBON_MAX_WIDTH, RIBBON_SAMPLES } from "../../data/ribbonProfile";

/**
 * Builds a 1D (Nx1) profile texture encoding, for each position along the
 * ribbon's length, its color (RGB) and width (A, normalized 0-1 against
 * RIBBON_MAX_WIDTH). Sampled with RepeatWrapping so the pattern can scroll
 * and loop seamlessly.
 */
export function createRibbonProfileTexture(
  resolution = 1024,
): THREE.DataTexture {
  const data = new Uint8Array(resolution * 4);
  const n = RIBBON_SAMPLES.length;

  for (let j = 0; j < resolution; j++) {
    const u = j / resolution;
    const pos = u * (n - 1);
    const i0 = Math.floor(pos);
    const i1 = Math.min(i0 + 1, n - 1);
    const t = pos - i0;

    const a = RIBBON_SAMPLES[i0];
    const b = RIBBON_SAMPLES[i1];

    const r = a.color[0] + (b.color[0] - a.color[0]) * t;
    const g = a.color[1] + (b.color[1] - a.color[1]) * t;
    const bl = a.color[2] + (b.color[2] - a.color[2]) * t;
    const width = a.width + (b.width - a.width) * t;

    const o = j * 4;
    data[o + 0] = Math.round(r);
    data[o + 1] = Math.round(g);
    data[o + 2] = Math.round(bl);
    data[o + 3] = Math.round((width / RIBBON_MAX_WIDTH) * 255);
  }

  const texture = new THREE.DataTexture(data, resolution, 1, THREE.RGBAFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
