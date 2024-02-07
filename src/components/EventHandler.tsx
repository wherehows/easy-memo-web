"use client";

import { getURLWithoutDomain, postMessage } from "@/utils/helpers";
import { LOCALES } from "@/utils/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const EventHandler = () => {
  const t = useTranslations();
  const router = useRouter();

  useEffect(() => {
    const handleMessage = (event: Event) => {
      try {
        const { type, data } = JSON.parse((event as MessageEvent).data);

        switch (type) {
          case "BACK_PRESS": {
            if (LOCALES.some((lang) => `/${lang}` === getURLWithoutDomain())) {
              postMessage("EXIT_APP");
              break;
            }

            router.back();
            break;
          }

          case "SHARE_SUCCESS": {
            toast(t("toast.share-success"), {
              duration: 3000,
              ariaProps: {
                role: "status",
                "aria-live": "polite",
              },
            });
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
  }, [router, t]);

  return null;
};

export default EventHandler;
