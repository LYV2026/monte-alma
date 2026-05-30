'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Classic 2D Perlin noise + fBm for mountain shaping
const NOISE_GLSL = /* glsl */ `
  vec4 permute4(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 taylorInvSqrt4(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  vec2 fade2(vec2 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

  float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0);
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i  = permute4(permute4(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x, gy.x);
    vec2 g10 = vec2(gx.y, gy.y);
    vec2 g01 = vec2(gx.z, gy.z);
    vec2 g11 = vec2(gx.w, gy.w);
    vec4 norm = taylorInvSqrt4(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
    g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 f   = fade2(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), f.x);
    return 2.3 * mix(n_x.x, n_x.y, f.y);
  }

  // 5-octave fractional Brownian motion
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    float f = 1.0;
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; i++) {
      v += a * cnoise(p * f);
      p  = rot * p;
      f *= 2.1;
      a *= 0.48;
    }
    return v;
  }
`

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uScale;

  ${NOISE_GLSL}

  varying float vElevation;
  varying vec3  vWorldPos;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);

    // slow drift animates the landscape
    vec2 coord = vec2(worldPos.x, worldPos.z) * uScale + vec2(uTime * 0.018, uTime * 0.012);
    float elev  = fbm(coord) * uAmplitude;

    // Ridge sharpening — pushes soft noise into mountain silhouettes
    elev = pow(max(elev, 0.0), 1.35) - 0.1;

    worldPos.y   += elev;
    vElevation    = elev;
    vWorldPos     = worldPos.xyz;

    vec4 mvPos = viewMatrix * worldPos;
    gl_Position  = projectionMatrix * mvPos;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3  uColorValley;
  uniform vec3  uColorMid;
  uniform vec3  uColorPeak;
  uniform vec3  uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uAmplitude;

  varying float vElevation;
  varying vec3  vWorldPos;

  void main() {
    // Derivative-based surface normal for per-pixel lighting
    vec3 dx     = dFdx(vWorldPos);
    vec3 dy     = dFdy(vWorldPos);
    vec3 normal = normalize(cross(dx, dy));

    // Warm directional light from upper-left
    vec3  lightDir = normalize(vec3(-0.6, 1.4, 0.5));
    float diffuse  = max(dot(normal, lightDir), 0.0);
    float ambient  = 0.28;
    float light    = ambient + (1.0 - ambient) * diffuse;

    // Height-to-color mapping
    float t   = clamp(vElevation / (uAmplitude * 0.85), 0.0, 1.0);
    vec3 col  = t < 0.5
      ? mix(uColorValley, uColorMid,  t * 2.0)
      : mix(uColorMid,    uColorPeak, (t - 0.5) * 2.0);
    col *= light;

    // Subtle specular highlight on high peaks
    vec3  viewDir  = normalize(vec3(0.0, 1.8, 6.0) - vWorldPos);
    vec3  halfVec  = normalize(lightDir + viewDir);
    float spec     = pow(max(dot(normal, halfVec), 0.0), 32.0) * 0.12;
    col += vec3(spec) * step(0.7, t);

    // Exponential distance fog
    float dist      = length(vWorldPos - vec3(0.0, 2.0, 7.0));
    float fogFactor = 1.0 - exp(-max(dist - uFogNear, 0.0) / (uFogFar - uFogNear) * 2.5);
    col = mix(col, uFogColor, clamp(fogFactor, 0.0, 1.0));

    gl_FragColor = vec4(col, 1.0);
  }
`

function buildTerrain(
  uniforms: Record<string, THREE.IUniform>,
  width: number,
  depth: number,
  segsW: number,
  segsD: number,
) {
  const geo = new THREE.PlaneGeometry(width, depth, segsW, segsD)
  geo.rotateX(-Math.PI / 2)
  const mat = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
  return { mesh: new THREE.Mesh(geo, mat), mat }
}

export function MountainScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // ── Scene ──────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#091510')

    // ── Camera ─────────────────────────────────────────────────
    const W = container.clientWidth
    const H = container.clientHeight
    const camera = new THREE.PerspectiveCamera(62, W / H, 0.1, 120)
    camera.position.set(0, 3.2, 7.5)
    camera.lookAt(0, 0.6, -4)

    // ── Renderer ───────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // ── Shared colors ──────────────────────────────────────────
    const colorValley = new THREE.Color('#0e2416')  // deep shadow
    const colorMid    = new THREE.Color('#1e4028')  // mid slope
    const colorPeak   = new THREE.Color('#2F5D3A')  // brand green peak
    const fogColor    = new THREE.Color('#091510')  // match bg

    const makeUniforms = (amplitude: number, scale: number, fogNear: number, fogFar: number) => ({
      uTime:        { value: 0 },
      uAmplitude:   { value: amplitude },
      uScale:       { value: scale },
      uColorValley: { value: colorValley },
      uColorMid:    { value: colorMid },
      uColorPeak:   { value: colorPeak },
      uFogColor:    { value: fogColor },
      uFogNear:     { value: fogNear },
      uFogFar:      { value: fogFar },
    })

    // Far range — wider, lower detail, deeper in scene
    const far = buildTerrain(makeUniforms(2.4, 0.22, 10, 36), 36, 30, 180, 120)
    far.mesh.position.set(0, -2.2, -8)
    scene.add(far.mesh)

    // Near range — narrower but higher resolution, slightly closer
    const near = buildTerrain(makeUniforms(1.8, 0.30, 8, 28), 28, 22, 140, 90)
    near.mesh.position.set(0, -1.6, -1)
    scene.add(near.mesh)

    // ── Animation loop ─────────────────────────────────────────
    const clock = new THREE.Clock()
    let raf: number
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()
      far.mat.uniforms.uTime.value  = t
      near.mat.uniforms.uTime.value = t * 0.75    // slightly different speed for parallax feel
      renderer.render(scene, camera)
    }
    tick()

    // ── Resize ─────────────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      far.mat.dispose()
      near.mat.dispose()
      far.mesh.geometry.dispose()
      near.mesh.geometry.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
    />
  )
}
