import {
  Noto_Sans_Arabic as FontDari,
  Noto_Naskh_Arabic as FontFarsi,
  JetBrains_Mono as FontMono,
  Inter as FontSans,
} from "next/font/google"
import localFont from "next/font/local"

export const farsi = localFont({ src: "./fonts/farsi.woff2" })

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontFarsi = FontFarsi({
  subsets: ["arabic"],
  variable: "--font-sans",
})
export const fontDari = FontDari({
  subsets: ["arabic"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
