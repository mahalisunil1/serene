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
  title: "HOTEL SERENE | Puri — Coastal Luxury Sanctuary",
  description:
    "A sanctuary of coastal grandeur and serene stillness in Puri, Odisha. Featuring an iconic rooftop pool, bespoke luxury suites, fine dining, and panoramic views of the sacred Bay of Bengal.",
  keywords: [
    "Hotel Serene Puri",
    "Luxury Hotel Puri",
    "Boutique Hotel Puri Odisha",
    "Puri Luxury Resort",
    "Puri Beach Resort",
    "Hotel with Rooftop Pool Puri",
    "Golden Beach Puri Hotel",
  ],
  openGraph: {
    title: "HOTEL SERENE | Puri — Coastal Luxury Sanctuary",
    description:
      "A sanctuary of coastal grandeur and serene stillness in Puri, Odisha. Featuring an iconic rooftop pool, bespoke luxury suites, and fine dining.",
    images: [
      {
        url: "/images/hotel/hero-facade-clean.jpg",
        width: 1200,
        height: 800,
        alt: "Hotel Serene Puri Coastal Sanctuary",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#ede7de] text-[#111317] flex flex-col font-sans overflow-x-hidden selection:bg-[#111317] selection:text-[#ede7de]">
        <div className="grain-bg" />
        {children}
      </body>
    </html>
  );
}
