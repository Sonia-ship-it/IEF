import React from "react";
import type { Metadata } from "next";
import { Urbanist, JetBrains_Mono } from "next/font/google";
import { AppProvider } from "../context/AppContext";
import "./globals.css";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "IE & F Company Ltd - Fashion & Tech",
  description: "The premier destination combining fashion, electronics, and engineering services in Kigali, Rwanda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${urbanist.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-white font-sans antialiased text-zinc-800">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
