"use client";

import { postMessage } from "@/utils/helpers";
import { LOCALES } from "@/utils/navigation";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const EventHandler = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleMessage = (event: Event) => {
      try {
        const { type, data } = JSON.parse((event as MessageEvent).data);

        switch (type) {
          case "BACK_PRESS": {
            if (LOCALES.some((lang) => `/${lang}` === pathname)) {
              postMessage("EXIT_APP");
              break;
            }

            router.back();
            break;
          }
          default:
            alert(`There is no handler related to type: ${type} data: ${data}`);
        }
      } catch (e) {
        alert(`data from rn parsing is failed.`);
        console.error(e);
      }
    };

    if (window.platform === "ios") {
      window.addEventListener("message", handleMessage);
    } else {
      document.addEventListener("message", handleMessage);
    }

    return () => {
      if (window.platform === "ios") {
        window.removeEventListener("message", handleMessage);
      } else {
        document.removeEventListener("message", handleMessage);
      }
    };
  }, [pathname, router]);

  return null;
};

export default EventHandler;
