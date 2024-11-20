import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from '../components/header';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: 'swap',
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: 'swap',
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kwab. CDU",
  description: "Customer Details Upload v0.1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
    <body className="font-sans bg-background text-foreground">
        <div>
          <Header />
          <main>
            {children}
          </main>
        </div>
    </body>
  </html>
)
}