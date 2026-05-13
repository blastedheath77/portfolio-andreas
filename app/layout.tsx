import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Andreas Jonsson — Portfolio",
  description:
    "A collection of web applications for education and community, built with Claude Code by Andreas Jonsson.",
  openGraph: {
    title: "Andreas Jonsson — Portfolio",
    description:
      "A collection of web applications for education and community, built with Claude Code.",
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
      <body className={`${dmSerifDisplay.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
