import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const LOCALES = ["en", "ko", "ja", "zh-cn"] as const;
export const DEFAULT_LOCALE = "en";
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: LOCALES });
