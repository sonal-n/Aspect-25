import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const sakana = localFont({
  src: [{ path: "./fonts/Sakana.ttf", style: "truetype" }],
  variable: "--font-sakana",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ASPECT'25",
    template: "%s • ASPECT'25",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${sakana.variable} ${inter.variable} antialiased min-h-screen bg-[#160e0e]`}
      >
        <Navbar />
        <div className="pt-[var(--nav-h)]">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
