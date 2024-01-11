import createMiddleware from "next-intl/middleware";
import { DEFAULT_LOCALE, LOCALES } from "./utils/navigation";

export default createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});

export const config = {
  matcher: ["/", "/(en|ko|ja|zh-cn)/:path*"],
};
