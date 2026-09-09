import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Cinzel, Great_Vibes } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://serenepuri.com"),
  title: "HOTEL SERENE | Puri — Coastal Neoclassical Luxury",
  description:
    "A sanctuary of classical grandeur and coastal stillness in Puri, Odisha. Featuring an iconic rooftop pool, bespoke luxury suites, and panoramic views of the sacred Bay of Bengal. Architecture and interiors by Reflections by Ankita.",
  keywords: [
    "Hotel Serene Puri",
    "Luxury Hotel Puri",
    "Boutique Hotel Puri Odisha",
    "Neoclassical Hotel",
    "Puri Beach Resort",
    "Hotel with Rooftop Pool Puri",
    "Reflections by Ankita",
  ],
  openGraph: {
    title: "HOTEL SERENE | Puri — Coastal Neoclassical Luxury",
    description:
      "A sanctuary of classical grandeur and coastal stillness in Puri, Odisha. Featuring an iconic rooftop pool, bespoke luxury suites, and fine dining.",
    images: [
      {
        url: "/images/hotel/exterior-hero.jpg",
        width: 1200,
        height: 800,
        alt: "Hotel Serene Puri Neoclassical Facade",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} ${cinzel.variable} ${greatVibes.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#ede7de] text-[#111317] flex flex-col font-sans overflow-x-hidden selection:bg-[#111317] selection:text-[#ede7de]">
        <div className="grain-bg" />
        {children}
      </body>
    </html>
  );
}
