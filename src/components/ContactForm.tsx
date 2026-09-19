"use client";

import { useState, useMemo } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { appEventBus } from "@/lib/appEventBus";

/* ---------------- VALIDATION ---------------- */
const schema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  brand: z.string().min(2, "نام برند یا رسانه الزامی است"),
  phone: z.string().min(8, "شماره تماس معتبر وارد کنید"),
  email: z.string().email("ایمیل معتبر نیست").optional().or(z.literal("")),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type SelectedItem = {
  title: string;
  subtitle?: string;
};

type Props = {
  selectedProductId?: string | null;
  onClearSelection?: () => void;
  selectedItem?: SelectedItem | null;
};

/* ---------------- INPUT ---------------- */
function Input({
  value,
  onChange,
  placeholder,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
}) {
  return (
    <div className="w-full">
      <div
        className={`
          relative border-b transition-all
          ${error ? "border-destructive" : "border-border"}
          focus-within:border-primary
        `}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent pt-7 pb-2 px-0 text-foreground outline-none"
        />

        <label
          className={`
            absolute right-0 top-2 text-xs tracking-widest transition
            pointer-events-none font-medium
            ${value ? "text-primary -translate-y-1" : "text-muted-foreground"}
          `}
        >
          {placeholder}
        </label>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-destructive mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- MAIN ---------------- */
export default function ContactForm({
  selectedProductId,
  onClearSelection,
}: Props) {
  const [form, setForm] = useState<FormData>({
    name: "",
    brand: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  /* ---------------- MOCK SELECTED ITEM ---------------- */
  const selectedItem: SelectedItem | null = selectedProductId
    ? {
        title: "خدمت انتخاب‌شده",
        subtitle: `شناسه: ${selectedProductId}`,
      }
    : null;

  /* ---------------- PROGRESS ---------------- */
  const progress = useMemo(() => {
    const fields = [
      form.name,
      form.brand,
      form.phone,
      form.email,
      form.message,
    ];
    return (fields.filter(Boolean).length / fields.length) * 100;
  }, [form]);

  const setField = (key: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const res = schema.safeParse(form);

    if (!res.success) {
      const flat = res.error.flatten().fieldErrors;
      const err: Record<string, string> = {};
      Object.entries(flat).forEach(([k, v]) => {
        err[k] = v?.[0] || "";
      });
      setErrors(err);
      return false;
    }

    setErrors({});
    return true;
  }

  /* ---------------- SUBMIT ---------------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          selectedProductId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setDone(true);
        setForm({ name: "", brand: "", phone: "", email: "", message: "" });

        onClearSelection?.();

        appEventBus.emit("ارسال موفق ✨", "success");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto font-sans">
      <motion.div className="bg-card border border-border shadow-sm p-10 space-y-10">
        {/* HEADER */}
        <div className="text-center border-b border-border pb-6 space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            فرم ارسال درخواست
          </h2>
          <p className="text-sm text-muted-foreground">
            پاسخ توسط تحریریه در کمتر از ۲۴ ساعت
          </p>
        </div>

        {/* SELECTED ITEM (MODERN CARD TAG) */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="
                border border-border
                bg-secondary/30
                rounded-xl
                p-4 flex items-center justify-between
              "
            >
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">
                  انتخاب شده
                </div>
                <div className="font-bold text-foreground mt-1">
                  {selectedItem.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {selectedItem.subtitle}
                </div>
              </div>

              <button
                type="button"
                onClick={onClearSelection}
                className="text-xs text-destructive hover:underline"
              >
                حذف
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PROGRESS */}
        <div className="relative h-[1px] bg-border overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 h-[1px] bg-primary"
            animate={{ width: `${progress}%` }}
          />
        </div>

        {/* FORM */}
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              value={form.name}
              onChange={(v) => setField("name", v)}
              placeholder="نام و نام خانوادگی"
              error={errors.name}
            />
            <Input
              value={form.brand}
              onChange={(v) => setField("brand", v)}
              placeholder="نام برند"
              error={errors.brand}
            />
            <Input
              value={form.phone}
              onChange={(v) => setField("phone", v)}
              placeholder="شماره تماس"
              error={errors.phone}
            />
            <Input
              value={form.email ?? ""}
              onChange={(v) => setField("email", v)}
              placeholder="ایمیل"
              error={errors.email}
            />
          </div>

          <textarea
            value={form.message}
            onChange={(e) => setField("message", e.target.value)}
            rows={6}
            className="w-full border border-border p-4 bg-secondary/20 text-foreground outline-none resize-none"
            placeholder="توضیحات..."
          />

          <div className="flex justify-between items-center border-t border-border pt-6">
            <p className="text-xs text-muted-foreground">
              سیستم تحریریه دیجیتال
            </p>

            <button
              disabled={loading}
              className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition"
            >
              {loading ? "در حال ارسال..." : "ارسال"}
            </button>
          </div>
        </form>

        {/* SUCCESS */}
        <AnimatePresence>
          {done && (
            <motion.div className="text-center text-success text-sm border-t border-border pt-5">
              ✓ درخواست با موفقیت ثبت شد
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
