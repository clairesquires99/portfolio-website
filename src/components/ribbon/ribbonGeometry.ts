import * as THREE from "three";
import { RIBBON_MAX_WIDTH, RIBBON_SAMPLES } from "../../data/ribbonProfile";

/** Builds the triangle-strip index buffer shared by the ribbon strip geometries. */
function buildStripIndices(n: number): number[] {
  const indices: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const topA = i * 2;
    const botA = i * 2 + 1;
    const topB = (i + 1) * 2;
    const botB = (i + 1) * 2 + 1;
    indices.push(topA, botA, topB);
    indices.push(botA, botB, topB);
  }
  return indices;
}

/**
 * Builds a flat triangle-strip plane following the ribbon's centerline.
 * Each sample contributes two vertices (one on either side of the
 * centerline); the vertex shader displaces them along `aNormal` by the
 * width sampled from the scrolling profile texture, so the geometry itself
 * stays static and only encodes position, normal direction and UV.
 */
export function createRibbonGeometry(): THREE.BufferGeometry {
  const n = RIBBON_SAMPLES.length;
  const positions = new Float32Array(n * 2 * 3);
  const normals = new Float32Array(n * 2 * 2);
  const sides = new Float32Array(n * 2);
  const uvs = new Float32Array(n * 2 * 2);

  for (let i = 0; i < n; i++) {
    const s = RIBBON_SAMPLES[i];
    const u = i / (n - 1);

    for (let side = 0; side < 2; side++) {
      const idx = i * 2 + side;
      positions[idx * 3 + 0] = s.x;
      positions[idx * 3 + 1] = s.y;
      positions[idx * 3 + 2] = 0;

      normals[idx * 2 + 0] = s.nx;
      normals[idx * 2 + 1] = s.ny;

      // side 0 = +0.5 (one edge), side 1 = -0.5 (the other edge)
      sides[idx] = side === 0 ? 0.5 : -0.5;

      uvs[idx * 2 + 0] = u;
      uvs[idx * 2 + 1] = side === 0 ? 1 : 0;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aNormal", new THREE.BufferAttribute(normals, 2));
  geometry.setAttribute("aSide", new THREE.BufferAttribute(sides, 1));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(buildStripIndices(n));

  return geometry;
}

/**
 * Builds an invisible hit-test strip with real width (unlike the visual
 * ribbon geometry, whose width is displaced on the GPU and so is collapsed
 * to a zero-area centerline for raycasting purposes). Used to give the
 * color ribbon a generous, hoverable area.
 */
export function createRibbonHitGeometry(
  halfWidth: number = RIBBON_MAX_WIDTH / 2,
): THREE.BufferGeometry {
  const n = RIBBON_SAMPLES.length;
  const positions = new Float32Array(n * 2 * 3);

  for (let i = 0; i < n; i++) {
    const s = RIBBON_SAMPLES[i];

    for (let side = 0; side < 2; side++) {
      const idx = i * 2 + side;
      const sign = side === 0 ? 1 : -1;
      positions[idx * 3 + 0] = s.x + s.nx * halfWidth * sign;
      positions[idx * 3 + 1] = s.y + s.ny * halfWidth * sign;
      positions[idx * 3 + 2] = 0;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(buildStripIndices(n));

  return geometry;
}
