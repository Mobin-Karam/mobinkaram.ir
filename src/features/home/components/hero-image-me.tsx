import { useTranslations } from "next-intl";
import Image from "next/image";
import { iconifyUrl } from "../lib/helper";
import { SIZE, TECH_LOGOS } from "../constants/tech-logos";







const HeroImageMe = () => {
  const t = useTranslations("hero");

  return (
    <div className="relative order-1 h-97.5 sm:h-125 md:h-[600px] lg:order-2 lg:col-span-7 lg:h-full">
      <div className="absolute inset-x-2 bottom-0 top-8 rounded-4xl bg-gradient-to-b from-primary/5 via-primary/9 to-primary/16 lg:hidden" />

      <div className="absolute bottom-0 left-1/2 hidden h-[88%] w-[82%] -translate-x-1/2 rounded-t-full bg-gradient-to-t from-primary/22 via-primary/7 to-transparent blur-2xl lg:block" />

      <div className="absolute inset-0 flex items-end justify-center">
        <div className="relative h-[105%] w-[105%] lg:h-[110%] lg:w-[110%] xl:h-[115%] xl:w-[115%]">
          <Image
            src="/images/me-transparent.png"
            alt={t("portraitAlt")}
            fill
            priority
            sizes="(max-width:1024px)100vw,58vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
        {TECH_LOGOS.map((logo) => (
          <div
            key={logo.name}
            className={["pointer-events-auto absolute", logo.className].join(
              " ",
            )}
            title={logo.name}
          >
            <div
              className={[
                "grid place-items-center rounded-xl border border-border/60 bg-background/58 shadow-sm backdrop-blur-sm",
                SIZE[logo.size ?? "sm"],
              ].join(" ")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={iconifyUrl(logo.icon)}
                alt=""
                loading="lazy"
                draggable={false}
                className="size-[58%] object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroImageMe;
