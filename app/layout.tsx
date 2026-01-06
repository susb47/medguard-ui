import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; // Import the Navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedGuard AI",
  description: "Bangla Medical Response Verification System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950`}>
        <Navbar /> {/* Add Navbar here */}
        <div className="pt-20"> {/* Add padding top to prevent content overlap with fixed navbar */}
          {children}
        </div>
      </body>
    </html>
  );
}