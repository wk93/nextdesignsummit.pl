import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next design summit",
  description: "Next design summit",
};

const brockmann = localFont({
  variable: "--font-brockmann",
  src: [
    {
      path: "../public/fonts/Brockmann-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Brockmann-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Brockmann-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Brockmann-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${inter.variable} ${brockmann.variable} antialiased bg-nds-red`}
      >
        {children}
      </body>
    </html>
  );
}
