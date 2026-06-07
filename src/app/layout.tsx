import type { Metadata } from "next";
import { Oxanium, Poppins } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site/site-chrome";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Phillips Car Rental",
  description: "Phillips Car Rental booking website patterned after the Mobis Car Rental layout.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${oxanium.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-slate-950">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
