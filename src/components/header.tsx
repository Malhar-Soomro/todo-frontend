// components/Header.tsx
"use client"
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left - Logo */}
        <Link href="/" className="hover:text-gray-400 font-medium">Home</Link>

        {/* Right - Login / Register */}
        <div className="w-1/3 text-right space-x-4">
          <Link href="/login" className="hover:text-gray-400">Login</Link>
          <Link href="/register" className="hover:text-gray-400">Register</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
