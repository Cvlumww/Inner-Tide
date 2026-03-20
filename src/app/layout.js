import { Geist, Geist_Mono } from "next/font/google";
import BsportScriptLoader from "./components/BsportScriptLoader";
import "./main.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://inner-tide.studio"),
  title: "Inner Tide Studios | Reformer Pilates, Finnieston Glasgow",
  description:
    "Inner Tide Studios | Glasgow's newest Reformer Pilates studio. Located in the West End of Glasgow. Book your session now.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Inner Tide Studios | Reformer Pilates, Finnieston Glasgow",
    description:
      "Inner Tide Studios | Glasgow's newest Reformer Pilates studio. Located in the West End of Glasgow. Book your session now.",
    images: [{ url: "/favicon.ico" }],
    url: "https://inner-tide.studio",
    siteName: "Inner Tide Studios",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <BsportScriptLoader />
        {children}
      </body>
    </html>
  );
}
