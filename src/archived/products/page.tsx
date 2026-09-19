"use client";

import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import { products, type Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [selectedId, setSelectedId] = useState<Product["id"] | null>(null);

  function handleSelect(id: Product["id"]) {
    setSelectedId(id);

    requestAnimationFrame(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <>
      {/* HERO */}
      <section className="px-5 sm:px-8 pt-14 pb-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-muted-foreground mb-3">خدمات و محصولات</p>

          <h1 className="text-2xl sm:text-4xl font-bold mb-4">
            یه خدمت رو انتخاب کن،
            <span className="text-muted-foreground font-normal">
              {" "}
              بقیه‌ش با من
            </span>
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base mb-10">
            مسیرهای مختلف برای رشد کسب‌وکار
          </p>

          {/* PRODUCTS */}
          <div className="grid sm:grid-cols-2 gap-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selected={selectedId === product.id}
                onSelect={() => handleSelect(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-5 sm:px-8 py-16 border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">
            اطلاعاتت رو بفرست تا شروع کنیم
          </h2>

          <ContactForm
            selectedProductId={selectedId}
            onClearSelection={() => setSelectedId(null)}
          />
        </div>
      </section>
    </>
  );
}
