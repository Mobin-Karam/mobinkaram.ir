"use client";

import {
  createContext,
  useContext,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  useReducedMotion,
  useScroll,
  useSpring,
  type MotionValue,
} from "framer-motion";

import { useMobileStory } from "../hooks/use-mobile-story";

type ScrollSceneContextValue = {
  progress: MotionValue<number>;
  reducedMotion: boolean;
};

const ScrollSceneContext =
  createContext<ScrollSceneContextValue | null>(null);

export function useSceneProgress() {
  const context = useContext(ScrollSceneContext);

  if (!context) {
    throw new Error(
      "useSceneProgress must be used inside ScrollScene",
    );
  }

  return context;
}

type ScrollSceneProps = {
  id?: string;
  children: ReactNode;
  height?: number;
  className?: string;
  panelClassName?: string;
};

export function ScrollScene({
  id,
  children,
  height = 280,
  className = "",
  panelClassName = "",
}: ScrollSceneProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMobileStory();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /*
   * One spring for the whole scene makes every child follow the
   * same smoothed progress value. This feels much better on a
   * mouse wheel, high-resolution trackpad and mobile browser.
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 28,
    mass: 0.22,
    restDelta: 0.001,
  });

  const motionDisabled = Boolean(shouldReduceMotion) || isMobile;

  const style = motionDisabled
    ? undefined
    : ({
        "--scene-height": `${height}svh`,
      } as CSSProperties);

  return (
    <ScrollSceneContext.Provider
      value={{
        progress: smoothProgress,
        reducedMotion: motionDisabled,
      }}
    >
      <section
        ref={ref}
        id={id}
        data-story-section={id}
        className={[
          "scroll-story-scene relative",
          className,
        ].join(" ")}
        style={style}
      >
        <div
          className={[
            "scroll-story-panel relative w-full",
            panelClassName,
          ].join(" ")}
        >
          {children}
        </div>
      </section>
    </ScrollSceneContext.Provider>
  );
}
