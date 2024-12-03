// src/components/Header.tsx
import React from 'react';
import Link from 'next/link'; // Import Link dari Next.js untuk navigasi

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-gray-300">
            Event Platform
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/events" className="hover:text-gray-300">
            Events
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </nav>

        {/* Auth Links */}
        <div className="space-x-4">
          <Link
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
