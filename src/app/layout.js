import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Inner Tide Studios | Reformer Pilates, Finnieston Glasgow",
  description:
    "Inner Tide Studios — reformer pilates studio in Finnieston, Glasgow's West End. Book your session.",
  icons: {
    icon: "/favicon.jpg",
  },
  openGraph: {
    title: "Inner Tide Studios | Reformer Pilates, Finnieston Glasgow",
    description:
      "Reformer pilates studio in Finnieston, Glasgow's West End.",
    images: "/favicon.jpg",
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
        {children}
      </body>
    </html>
  );
}
