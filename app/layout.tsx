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
  openGraph: {
    title: "Next design summit",
    description: "Next design summit",
    url: "https://www.nextdesignsummit.pl",
    siteName: "Next design summit",
    images: [
      {
        url: "/p1.png",
        width: 552,
        height: 419,
        alt: "Next design summit",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next design summit",
    description: "Next design summit",
    images: ["/p1.png"],
  },
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
      <body className={`${inter.variable} ${brockmann.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
