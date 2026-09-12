"use client";

import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as THREE from "three";

export interface CultureWebGLCanvasHandle {
  setProgress: (val: number) => void;
  getProgress: () => number;
}

interface CultureWebGLCanvasProps {
  className?: string;
  initialProgress?: number;
  onClick?: () => void;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D u_tex1;
  uniform sampler2D u_tex2;
  uniform float u_progress;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_texRes1;
  uniform vec2 u_texRes2;

  varying vec2 vUv;

  // 2D Simplex Noise for organic dispersion
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Exact contain aspect-ratio UV mapping with dynamic zoom scale
  // zoomScale > 1.0 expands/zooms in; zoomScale < 1.0 scales down/zooms out
  vec2 getContainUV(vec2 uv, vec2 canvasRes, vec2 texRes, float zoomScale) {
    float canvasAspect = canvasRes.x / canvasRes.y;
    float texAspect = texRes.x / texRes.y;
    vec2 scale = vec2(1.0);
    if (canvasAspect > texAspect) {
      scale.x = canvasAspect / texAspect;
    } else {
      scale.y = texAspect / canvasAspect;
    }
    return (uv - 0.5) * (scale / zoomScale) + 0.5;
  }

  void main() {
    vec2 uv = vUv;
    float p = clamp(u_progress, 0.0, 1.0);

    // 1. Dynamic Scale Transformations:
    // First image expands outward during transition: scale 1.0 -> 1.28
    float scale1 = 1.0 + pow(p, 1.1) * 0.28;

    // Second image emerges from scaled down into normal resting size: scale 0.72 -> 1.0
    float easeP = smoothstep(0.0, 1.0, p);
    float scale2 = mix(0.72, 1.0, easeP);

    // Subtle living oceanic caustics & organic pigment bleed
    float noise1 = snoise(uv * 5.0 + vec2(u_time * 0.04, -u_time * 0.03)) * 0.5 + 0.5;
    float noise2 = snoise(uv * 12.0 - vec2(u_time * 0.06, u_time * 0.05)) * 0.5 + 0.5;
    float distFromCenter = length(uv - 0.5);
    // Subtle radial bias so second image emerges from center scaled down and blooms outward
    float combinedNoise = mix(noise1, noise2, 0.35) + distFromCenter * 0.22;

    // Fluid wave displacement during transition
    float transitionCurve = sin(p * 3.14159265);
    vec2 displacement = (vec2(noise1, noise2) - 0.5) * 0.035 * transitionCurve;

    // Calculate contained UVs with their respective scale factors
    vec2 uv1 = getContainUV(uv + displacement * (1.0 - p), u_resolution, u_texRes1, scale1);
    vec2 uv2 = getContainUV(uv - displacement * p, u_resolution, u_texRes2, scale2);

    // Sample textures with containment clipping
    vec4 col1 = vec4(0.0);
    if (uv1.x >= 0.0 && uv1.x <= 1.0 && uv1.y >= 0.0 && uv1.y <= 1.0) {
      col1 = texture2D(u_tex1, uv1);
    }

    vec4 col2 = vec4(0.0);
    if (uv2.x >= 0.0 && uv2.x <= 1.0 && uv2.y >= 0.0 && uv2.y <= 1.0) {
      col2 = texture2D(u_tex2, uv2);
    }

    // Soft dissolve mask through organic watercolor dispersion
    float edgeWidth = 0.16;
    float threshold = p * (1.0 + edgeWidth * 2.0) - edgeWidth;
    float dissolve = 1.0 - smoothstep(threshold - edgeWidth, threshold + edgeWidth, combinedNoise);

    // Pigment transition: blend textures
    vec4 finalColor = mix(col1, col2, dissolve);

    // Subtle warm golden pigment halo at the liquid threshold boundary
    float halo = exp(-pow((combinedNoise - threshold) / (edgeWidth * 0.75), 2.0)) * transitionCurve;
    vec3 goldenOchre = vec3(0.85, 0.73, 0.52);
    finalColor.rgb = mix(finalColor.rgb, goldenOchre, halo * 0.18 * finalColor.a);

    gl_FragColor = finalColor;
  }
`;

const CultureWebGLCanvas = forwardRef<
  CultureWebGLCanvasHandle,
  CultureWebGLCanvasProps
>(({ className, initialProgress = 0, onClick }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(initialProgress);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useImperativeHandle(ref, () => ({
    setProgress: (val: number) => {
      progressRef.current = val;
      if (materialRef.current) {
        materialRef.current.uniforms.u_progress.value = val;
      }
    },
    getProgress: () => progressRef.current,
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    // Load textures
    const tex1 = textureLoader.load("/images/culture/shree mandir.png", (t) => {
      if (materialRef.current) {
        materialRef.current.uniforms.u_texRes1.value.set(
          t.image.width || 1374,
          t.image.height || 1145
        );
      }
    });
    tex1.minFilter = THREE.LinearFilter;
    tex1.magFilter = THREE.LinearFilter;

    const tex2 = textureLoader.load("/images/culture/beach.png", (t) => {
      if (materialRef.current) {
        materialRef.current.uniforms.u_texRes2.value.set(
          t.image.width || 1672,
          t.image.height || 941
        );
      }
    });
    tex2.minFilter = THREE.LinearFilter;
    tex2.magFilter = THREE.LinearFilter;

    const uniforms = {
      u_tex1: { value: tex1 },
      u_tex2: { value: tex2 },
      u_progress: { value: progressRef.current },
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_texRes1: { value: new THREE.Vector2(1374, 1145) },
      u_texRes2: { value: new THREE.Vector2(1672, 941) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (materialRef.current) {
        materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
      }
      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        renderer.setSize(w, h);
        if (materialRef.current) {
          materialRef.current.uniforms.u_resolution.value.set(w, h);
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      tex1.dispose();
      tex2.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      style={{ mixBlendMode: "multiply" }}
      className={`relative w-full h-full overflow-hidden ${className || ""}`}
    />
  );
});

CultureWebGLCanvas.displayName = "CultureWebGLCanvas";

export default CultureWebGLCanvas;
