import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Nipa Tech's Assignment",
  description: "Nipa Technology Ticket Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${prompt.className} antialiased bg-[#e6e1f9]`}
      >
        {children}
      </body>
    </html>
  );
}
