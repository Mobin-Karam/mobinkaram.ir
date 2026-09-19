"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductClient({
  product,
  suggestion,
  status,
}: {
  product: any;
  suggestion?: any;
  status?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [scratched, setScratched] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  /* ---------------- COPY ---------------- */
  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  /* ---------------- SCRATCH CORE ---------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      // scratch layer
      ctx.fillStyle = "#c7c7c7";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "destination-out";
    };

    resize();
    window.addEventListener("resize", resize);

    let isDrawing = false;

    const draw = (x: number, y: number) => {
      if (!ctx) return;

      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fill();

      calculateProgress();
    };

    const calculateProgress = () => {
      if (!ctx || !canvas) return;

      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let cleared = 0;

      for (let i = 0; i < pixels.data.length; i += 4) {
        if (pixels.data[i + 3] === 0) cleared++;
      }

      const total = pixels.data.length / 4;
      const percent = cleared / total;

      setProgress(percent);

      if (percent > 0.6) {
        setScratched(true);
      }
    };

    const getPos = (e: any) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const start = (e: any) => {
      isDrawing = true;
      const pos = getPos(e);
      draw(pos.x, pos.y);
    };

    const move = (e: any) => {
      if (!isDrawing) return;
      const pos = getPos(e);
      draw(pos.x, pos.y);
    };

    const end = () => {
      isDrawing = false;
    };

    // mouse
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);

    // touch
    canvas.addEventListener("touchstart", (e: any) => start(e.touches[0]));
    canvas.addEventListener("touchmove", (e: any) => move(e.touches[0]));
    window.addEventListener("touchend", end);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto px-5 py-12"
    >
      {/* BACK */}
      <Link
        href="/products"
        className="text-xs text-muted-foreground hover:text-foreground transition"
      >
        ← بازگشت به خدمات
      </Link>

      {/* HEADER */}
      <div className="mt-6">
        <p className="text-xs text-muted-foreground tracking-widest">
          {product?.code}
        </p>

        <h1 className="text-2xl font-bold mt-2">{product?.title}</h1>

        <p className="text-muted-foreground mt-2">{product?.tagline}</p>
      </div>

      {/* SCRATCH AREA */}
      <div className="mt-8 relative rounded-2xl overflow-hidden border bg-card">
        {/* hidden content */}
        <div className="p-6">
          <p className="text-sm leading-7 text-muted-foreground">
            {product?.description}
          </p>

          <ul className="mt-5 space-y-2">
            {product?.features?.map((f: string) => (
              <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>

          {!scratched && (
            <div className="mt-4 text-xs text-muted-foreground">
              ✨ کارت رو اسکرچ کن تا محتوا دیده بشه
            </div>
          )}
        </div>

        {/* SCRATCH LAYER */}
        {!scratched && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-pointer"
          />
        )}
      </div>

      {/* INFO */}
      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">زمان تحویل</p>
          <p className="font-medium mt-1">{product?.deliveryTime}</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">شروع قیمت</p>
          <p className="font-medium mt-1">{product?.startingPrice}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex gap-3">
        <Link
          href="/#contact"
          className={`flex-1 text-center py-3 rounded-xl font-medium transition ${
            scratched
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {scratched ? "انتخاب این خدمت" : "اول اسکرچ کن 👆"}
        </Link>

        <button
          onClick={copyLink}
          className="px-5 py-3 rounded-xl border hover:bg-muted transition text-xs"
        >
          {copied ? "کپی شد ✓" : "اشتراک لینک"}
        </button>
      </div>

      {/* PROGRESS HINT */}
      {!scratched && (
        <div className="mt-3 text-xs text-muted-foreground">
          میزان کشف: {Math.round(progress * 100)}%
        </div>
      )}
    </motion.div>
  );
}
