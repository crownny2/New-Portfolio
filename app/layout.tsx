import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Alex_Brush } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/shared/Cursor";
import PageLoader from "@/components/shared/PageLoader";
import SmoothScroll from "@/components/shared/SmoothScroll";
import StructuredData from "@/components/StructuredData";
import { profile } from "@/data/profile";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const script = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
  display: "swap",
});

const siteTitle =
  "Crown James C. Cedeño — Full Stack Developer & IT Graduate, HCDC";
const siteDescription =
  "Crown James C. Cedeño is an Information Technology graduate of Holy Cross of Davao College and a full stack developer in Davao City. Co-author of a Scopus-indexed SPIE paper on CNN-based rice grain purity analysis presented at ICMIP 2026 in Sapporo, Japan.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL("https://crownjames.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: profile.socials.portfolio,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${jakarta.variable} ${script.variable} font-sans antialiased`}>
        <StructuredData />
        <PageLoader />
        <Cursor />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
