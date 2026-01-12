import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { Toaster } from "sonner";
import { Footer } from "./footer";

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lekka - Simple Expense Tracking",
  description: "Track your daily expenses with a clean, minimalist interface. Sign in with Google and start managing your spending.",
  openGraph: {
    title: "Lekka - Simple Expense Tracking",
    description: "Track your daily expenses with a clean, minimalist interface.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={courierPrime.className}>
      <body className="antialiased flex flex-col min-h-screen bg-white">
        <Providers>
          <main className="flex-1 flex flex-col bg-white">{children}</main>
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
