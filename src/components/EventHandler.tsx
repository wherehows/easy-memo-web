"use client";

import { useEffect } from "react";

const EventHandler = () => {
  useEffect(() => {
    const handleMessage = (event: Event) => {
      try {
        const data = (event as MessageEvent).data;
        alert(data);
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
  }, []);

  return null;
};

export default EventHandler;
