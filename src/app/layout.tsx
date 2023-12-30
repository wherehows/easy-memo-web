import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

import localFont from "next/font/local";

export const appleGothic = localFont({
  src: [
    {
      path: "../../public/fonts/100_AppleSDGothicNeo-Thin.woff2",
      weight: "100",
    },
    {
      path: "../../public/fonts/200_AppleSDGothicNeo-UltraLight.woff2",
      weight: "200",
    },
    {
      path: "../../public/fonts/300_AppleSDGothicNeo-Light.woff2",
      weight: "300",
    },
    {
      path: "../../public/fonts/400_AppleSDGothicNeo-Medium.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/500_AppleSDGothicNeo-Regular.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/600_AppleSDGothicNeo-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../../public/fonts/700_AppleSDGothicNeo-Bold.woff2",
      weight: "700",
    },
    {
      path: "../../public/fonts/800_AppleSDGothicNeo-ExtraBold.woff2",
      weight: "800",
    },
    {
      path: "../../public/fonts/900_AppleSDGothicNeo-Heavy.woff2",
      weight: "900",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script src="https://kit.fontawesome.com/48e58babbf.js" />
      <body className={appleGothic.className}>{children}</body>
    </html>
  );
}
