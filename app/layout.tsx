import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nikhil Chandna — Product Designer",
  description:
    "Staff Product Designer at LinkedIn. Fifteen years shaping how hundreds of millions of people experience the web.",
  openGraph: {
    title: "Nikhil Chandna — Product Designer",
    description:
      "Staff Product Designer at LinkedIn. Fifteen years shaping how hundreds of millions of people experience the web.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
          {children}
          <SpeedInsights />
        </body>
    </html>
  );
}
