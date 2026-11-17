"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { MathUtils, type Group } from "three";
import type { MotionValue } from "motion/react";
import { useThemeColors } from "@/hooks/useThemeColors";
import type { ThemeTokens } from "@/lib/theme";
import { boxToWorld } from "@/utils/scene";

export interface HeroSceneProps {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  scroll: MotionValue<number>;
  /** Pauses the render loop when false (e.g. hero scrolled out of view). */
  active: boolean;
  reducedMotion: boolean;
  /** Full detail on large screens; trimmed geometry and DPR otherwise. */
  detailed: boolean;
}

const SCENE_TOKENS = [
  "sceneAccent",
  "sceneMetal",
  "sceneGem",
  "heroGlow",
  "heroSunHighlight",
] as const satisfies readonly (keyof ThemeTokens)[];

const DAMPING = 4;

const BEADS = [
  { left: -3, top: 14, z: 0.5, radius: 0.12, tone: "gem", speed: 1.8 },
  { left: 66, top: 6, z: 0.4, radius: 0.08, tone: "metal", speed: 2.2 },
  { left: 99, top: 68, z: 0.8, radius: 0.07, tone: "accent", speed: 2.4, detail: true },
] as const;

function ParallaxRig({
  children,
  pointerX,
  pointerY,
  scroll,
}: {
  children: ReactNode;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  scroll: MotionValue<number>;
}) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const progress = scroll.get();
    g.rotation.y = MathUtils.damp(g.rotation.y, pointerX.get() * 0.14, DAMPING, delta);
    g.rotation.x = MathUtils.damp(g.rotation.x, pointerY.get() * 0.1 - progress * 0.25, DAMPING, delta);
    g.position.x = MathUtils.damp(g.position.x, pointerX.get() * 0.15, DAMPING, delta);
    g.position.y = MathUtils.damp(g.position.y, progress * 1.6, DAMPING, delta);
  });

  return <group ref={group}>{children}</group>;
}

/** Keep the Canvas frameloop prop stable; toggling it on first paint stalls the page. */
function FramePause({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const setFrameloop = useThree((state) => state.setFrameloop);
  const readyToPause = useRef(false);

  useEffect(() => {
    if (!readyToPause.current) {
      readyToPause.current = true;
      if (active) return;
    }
    setFrameloop(!active ? "never" : reducedMotion ? "demand" : "always");
  }, [active, reducedMotion, setFrameloop]);

  return null;
}

function Beads({
  palette,
  detailed,
  animate,
}: {
  palette: { accent: string; metal: string; gem: string };
  detailed: boolean;
  animate: boolean;
}) {
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      {BEADS.filter((bead) => detailed || !("detail" in bead)).map((bead) => {
        const [x, y] = boxToWorld(bead.left, bead.top, viewport);
        return (
          <Float
            key={`${bead.left}-${bead.top}`}
            speed={animate ? bead.speed : 0}
            rotationIntensity={0}
            floatIntensity={animate ? 0.8 : 0}
            floatingRange={[-0.08, 0.08]}
          >
            <mesh position={[x, y, bead.z]} scale={bead.radius}>
              <sphereGeometry args={[1, 24, 24]} />
              <meshStandardMaterial
                color={palette[bead.tone]}
                roughness={0.22}
                metalness={bead.tone === "metal" ? 0.9 : 0.2}
              />
            </mesh>
          </Float>
        );
      })}
    </>
  );
}

export default function HeroScene({ pointerX, pointerY, scroll, active, reducedMotion, detailed }: HeroSceneProps) {
  const colors = useThemeColors(SCENE_TOKENS);
  const wrap = useRef<HTMLDivElement>(null);
  const frameloop = reducedMotion ? "demand" : "always";
  const dpr = Math.min(1.5, window.devicePixelRatio || 1);

  return (
    <div
      ref={wrap}
      className="absolute inset-0 transition-opacity duration-1000 ease-out"
      style={{ opacity: 0 }}
    >
      <Canvas
        frameloop={frameloop}
        dpr={dpr}
        camera={{ position: [0, 0, 12], fov: 30 }}
        gl={{ antialias: true, alpha: true, stencil: false, powerPreference: "default" }}
        onCreated={({ gl, scene, camera }) => {
          gl.compile(scene, camera);
          requestAnimationFrame(() => {
            if (wrap.current) wrap.current.style.opacity = "1";
          });
        }}
      >
        <FramePause active={active} reducedMotion={reducedMotion} />
        <ambientLight intensity={0.7} />
        <hemisphereLight args={[colors.heroGlow, "#24102F", 0.7]} />
        <directionalLight position={[-4, 6, 8]} intensity={2.4} color="#FFE6CC" />
        <pointLight position={[-0.8, 0.6, 2.5]} intensity={18} distance={9} decay={2} color={colors.sceneAccent} />
        <directionalLight position={[6, 2, -4]} intensity={1.2} color={colors.heroGlow} />
        <ParallaxRig pointerX={pointerX} pointerY={pointerY} scroll={scroll}>
          <Beads
            detailed={detailed}
            animate={!reducedMotion}
            palette={{ accent: colors.sceneAccent, metal: colors.sceneMetal, gem: colors.sceneGem }}
          />
          <Sparkles
            count={detailed ? 28 : 12}
            scale={[7.5, 5.5, 2]}
            size={detailed ? 2.6 : 2}
            speed={reducedMotion ? 0 : 0.35}
            opacity={0.6}
            color={colors.heroSunHighlight}
          />
        </ParallaxRig>
      </Canvas>
    </div>
  );
}
