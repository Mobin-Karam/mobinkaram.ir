import {getRequestConfig} from "next-intl/server";
import {defaultLocale, locales, type Locale} from "./config";

export default getRequestConfig(async ({ locale }) => {
  const current = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  return {
    locale: current,
    messages: (await import(`../messages/${current}.json`)).default,
  };
});
