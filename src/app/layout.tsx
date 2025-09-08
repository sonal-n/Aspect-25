import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter ({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aspect'25",
  icons: {
    icon: [
      {url: "/icon-512.png", sizes: "32x32", type: "image/svg"}
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased scroll-smooth`} 
      >
        {children}
      </body>
    </html>
  );
}
