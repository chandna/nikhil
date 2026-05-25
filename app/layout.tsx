import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
