// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Header from '@/components/Header';  // Komponen Header
import Footer from '@/components/Footer'; // Komponen Footer

// Menggunakan font Inter
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Event Management App',
  description: 'An event management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Metadata dan elemen lainnya */}
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* Header */}
        <Header />

        {/* Konten utama */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
