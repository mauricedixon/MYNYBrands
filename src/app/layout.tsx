import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { SlideOutCart } from "@/components/SlideOutCart";
import { CursorProvider } from "@/context/CursorContext";
import { CartProvider } from "@/context/CartContext";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "My New York Brands | Culture First",
    template: "%s | My New York Brands",
  },
  description:
    "Culture-first streetwear from New York City. Signature jackets, quarter zips, headwear and one-of-one wearable art.",
  openGraph: {
    type: "website",
    siteName: "My New York Brands",
    images: [{ url: "/jacket-clean.png", alt: "MYNY Signature Jacket" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased bg-white text-black`}
      >
        <CursorProvider>
          <CartProvider>
            <CustomCursor />
            <SlideOutCart />
            {children}
            <Footer />
          </CartProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
