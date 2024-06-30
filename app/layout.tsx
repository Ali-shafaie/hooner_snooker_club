import "./globals.css";
import type { Metadata } from "next";

import Provider from "./Provider";
import { farsi } from "lib/fonts";

export const metadata: Metadata = {
  title: "هنر سنوکر کلب",
  description: "هنر سنوکر کلب ",

  icons: {
    icon: "/assets/logopng.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="rtl">
      <body className={farsi.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
