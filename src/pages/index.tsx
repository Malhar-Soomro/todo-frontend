import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-white px-4">
      <div className="text-center max-w-md space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold font-poppins">Welcome to Todo App</h1>
        <p className="text-lg font-medium font-poppins">Login or sign up to get started</p>
        <div className="flex justify-center gap-4">
          <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 text-white font-semibold rounded-lg transition duration-300 font-poppins">
            Login
          </Link>
          <Link href="/register" className="bg-pink-500 hover:bg-pink-600 px-6 py-2 text-white font-semibold rounded-lg transition duration-300 font-poppins">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
