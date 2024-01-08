import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./utils/navigation";

export default createMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  matcher: ["/", "/(en|ko)/:path*"],
};
