"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/lib/products";

export default function ProductCard({
  product,
  selected,
  onSelect,
}: {
  product: Product;
  selected: boolean;
  onSelect: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  function toggleFlip() {
    setFlipped((p) => !p);
  }

  return (
    <div className="perspective-[1200px] w-full">
      <motion.div
        onClick={toggleFlip}
        whileHover={{ scale: 1.03 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="
        relative w-full min-h-[380px] cursor-pointer
        transform-gpu
      "
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* ================= FRONT ================= */}
        <div
          className="
          absolute inset-0 rounded-2xl
          border border-border/60
          bg-card/90 backdrop-blur-xl
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          p-6 flex flex-col justify-between
          transition-all duration-300
        "
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div>
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] tracking-wide text-muted-foreground uppercase">
                {product.code}
              </span>

              {selected && (
                <span
                  className="
                  text-[11px] px-2 py-1 rounded-full
                  bg-primary/10 text-primary
                  border border-primary/20
                  backdrop-blur-md
                "
                >
                  انتخاب‌شده
                </span>
              )}
            </div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold mt-4 text-foreground">
              {product.title}
            </h3>

            {/* TAGLINE */}
            <p className="text-sm text-muted-foreground mt-1">
              {product.tagline}
            </p>

            {/* DESCRIPTION */}
            <p className="text-sm leading-6 text-muted-foreground/90 mt-4">
              {product.description}
            </p>
          </div>

          <div className="text-xs text-muted-foreground mt-6 opacity-80">
            کلیک کن تا جزئیات رو ببینی
          </div>
        </div>

        {/* ================= BACK ================= */}
        <div
          className="
          absolute inset-0 rounded-2xl
          border border-border/60
          bg-card/95 backdrop-blur-xl
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          p-6 flex flex-col justify-between
        "
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <div>
            <h3 className="text-base font-semibold mb-4 text-foreground">
              ویژگی‌ها
            </h3>

            <ul className="space-y-3">
              {product.features.map((f) => (
                <li
                  key={f}
                  className="
                  flex gap-2 text-sm
                  text-muted-foreground
                  items-start
                "
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span className="leading-6">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-xs text-muted-foreground opacity-80">
            دوباره کلیک کن برای برگشت
          </div>
        </div>
      </motion.div>

      {/* ================= FOOTER ================= */}
      <div className="mt-4 flex items-center justify-between px-1">
        <div className="w-1/2 text-[11px] text-muted-foreground">
          <div className="opacity-80">{product.deliveryTime}</div>
          <div className="text-foreground font-medium mt-0.5">
            {product.startingPrice}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={` w-1/2
          px-4 py-2 rounded-xl text-xs font-medium
          transition-all duration-200
          border
          ${
            selected
              ? `
                bg-primary text-white
                border-primary
                shadow-md shadow-primary/20
              `
              : `
                bg-muted/40 text-muted-foreground
                border-border
                hover:bg-muted/70 hover:text-foreground
              `
          }
        `}
        >
          {selected ? "انتخاب شده ✓" : "انتخاب"}
        </button>
      </div>
    </div>
  );
}
