import type { Metadata } from "next";
import { Montserrat, DM_Sans } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Metro Auto Detailing | Bakersfield, CA",
  description: "Mobile auto detailing in Bakersfield, CA. We come to you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AnnouncementBar />
        <Header />
        {/* AnnouncementBar h-9 (36px) + Header h-16 (64px) = 100px */}
        <div className="h-[100px]" aria-hidden="true" />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
