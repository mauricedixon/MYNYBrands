import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { CartSidebar } from "@/components/CartSidebar";
import { CursorProvider } from "@/context/CursorContext";
import { CartProvider } from "@/context/CartContext";
import { AudioPlayer } from "@/components/AudioPlayer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My New York Brands | Culture First",
  description: "A culture-first streetwear platform.",
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
            <CartSidebar />
            <AudioPlayer />
            {children}
          </CartProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
