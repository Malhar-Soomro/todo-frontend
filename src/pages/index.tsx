import React from "react";
import useAuth from "../hooks/useAuth";


const Home = () => {
  const {isLoggedIn, logout} = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-white px-4">
      <div className="text-center max-w-md space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold font-poppins">Welcome to Todo App</h1>
        {!isLoggedIn && <p className="text-lg font-medium font-poppins">Login or sign up to get started</p>}

      </div>
    </div>
  );
};

export default Home;
