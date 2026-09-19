"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function PortfolioIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("portfolio-intro");

    if (alreadySeen) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("portfolio-intro", "true");
      setVisible(false);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.7 }}
          className="
            fixed inset-0 z-[9999]
            flex flex-col items-center justify-center
            bg-white
          "
        >
          {/* AI Orbit */}
          <div className="relative">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute inset-[-30px]
                rounded-full
                border
                border-blue-400/30
                border-t-blue-600
              "
            />

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="
                absolute inset-0
                rounded-full
                bg-blue-500/20
                blur-3xl
              "
            />

            <Image
              src="/favicon.png"
              alt="Mobin Karam"
              width={110}
              height={110}
              priority
              className="
                relative
                rounded-3xl
                shadow-2xl
              "
            />
          </div>

          {/* Name */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="
              mt-10
              text-3xl
              font-bold
              tracking-tight
              text-slate-900
            "
          >
            Mobin Karam
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.8,
            }}
            className="
              mt-3
              text-sm
              text-slate-500
              tracking-wide
              text-center
            "
          >
            AI-Driven Engineer
            <br />
            Full-Stack Developer · Future Builder
          </motion.p>

          {/* Loading line */}
          <div
            className="
              mt-10
              h-[2px]
              w-48
              overflow-hidden
              bg-slate-200
              rounded-full
            "
          >
            <motion.div
              initial={{
                x: "-100%",
              }}
              animate={{
                x: "100%",
              }}
              transition={{
                duration: 1.8,
                ease: "easeInOut",
              }}
              className="
                h-full
                w-full
                bg-slate-900
              "
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
