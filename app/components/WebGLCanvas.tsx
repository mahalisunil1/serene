"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Renderer
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ocean Caustics & Liquid Shimmer GLSL Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec2 u_resolution;
      varying vec2 vUv;

      // Simplex-like noise helper
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        // Interactive mouse displacement ripple
        vec2 mouseNorm = u_mouse * vec2(u_resolution.x / u_resolution.y, 1.0);
        float mouseDist = distance(st, mouseNorm);
        float mouseWave = sin(mouseDist * 20.0 - u_time * 3.0) * exp(-mouseDist * 3.5) * 0.08;

        // Layered oceanic ripples
        float t = u_time * 0.18;
        vec2 pos = st * 2.2 + vec2(mouseWave);
        
        float n1 = snoise(pos + vec2(t * 0.5, t * 0.3));
        float n2 = snoise(pos * 2.0 - vec2(t * 0.4, -t * 0.6) + n1 * 0.4);
        float n3 = snoise(pos * 4.0 + vec2(-t * 0.2, t * 0.5) + n2 * 0.3);

        float caustic = pow(abs(n1 * 0.5 + n2 * 0.3 + n3 * 0.2), 2.2) * 1.8;

        // Authentic French Linen Architectural Caustics
        vec3 linenPaper = vec3(0.929, 0.906, 0.871);   // #ede7de
        vec3 warmTravertin = vec3(0.70, 0.65, 0.59);  // #b3a696
        vec3 coastalMist = vec3(0.40, 0.48, 0.41);    // #657b69

        vec3 color = mix(linenPaper, warmTravertin, smoothstep(0.1, 0.7, caustic) * 0.7);
        color = mix(color, coastalMist, smoothstep(0.65, 1.2, caustic) * 0.35);

        // Subtle translucent shimmer that preserves the warm French linen canvas
        float alpha = clamp(caustic * 0.08, 0.0, 0.25);
        gl_FragColor = vec4(color, alpha);
      }
    `;

    const uniforms = {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking for fluid shader
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currMouseX = 0.5;
    let currMouseY = 0.5;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = 1.0 - e.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Resize handling
    const onResize = () => {
      if (!renderer) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth mouse lerp
      currMouseX += (targetMouseX - currMouseX) * 0.05;
      currMouseY += (targetMouseY - currMouseY) * 0.05;
      uniforms.u_mouse.value.set(currMouseX, currMouseY);

      uniforms.u_time.value = clock.getElapsedTime();
      if (renderer) renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-65"
      aria-hidden="true"
    />
  );
}
