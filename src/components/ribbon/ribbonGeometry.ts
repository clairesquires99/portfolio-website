import * as THREE from "three";
import { RIBBON_SAMPLES } from "../../data/ribbonProfile";

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

  const indices: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const topA = i * 2;
    const botA = i * 2 + 1;
    const topB = (i + 1) * 2;
    const botB = (i + 1) * 2 + 1;
    indices.push(topA, botA, topB);
    indices.push(botA, botB, topB);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aNormal", new THREE.BufferAttribute(normals, 2));
  geometry.setAttribute("aSide", new THREE.BufferAttribute(sides, 1));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);

  return geometry;
}
