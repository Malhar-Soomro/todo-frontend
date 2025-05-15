import Link from "next/link";
// import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

const Header = () => {
  // const {isLoggedIn, logout} = useAuth();
   const {logout, auth} = useContext(AuthContext); 

 return (
    <div className="flex justify-between items-center sm:p-3 px-0 bg-gray-700 shadow-md">

      <div className="pl-2 md:pl-4">
        <Link href={auth.isLoggedIn? "/todos":"/"}>
          <h1 className="font-bold text-md sm:text-3xl mx-1 text-white">
            MY TODOS
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-4 py-2 pr-4">
        {auth.isLoggedIn ? (
          <>
          <button className="md:text-sm text-xs cursor-pointer bg-red-500 hover:bg-red-600 px-2 py-1 sm:py-2 sm:px-6 text-white font-semibold rounded-lg transition duration-300 font-poppins" onClick={()=> logout()}>
              LOGOUT
            </button>
          </>
          
        ) : (
          <>
            <Link className="md:text-sm text-xs cursor-pointer bg-indigo-600 hover:bg-indigo-700 px-2 py-1 sm:px-6 sm:py-2 text-white font-semibold rounded-lg transition duration-300 font-poppins" href="/register">
              REGISTER
            </Link>
            <Link className="md:text-sm text-xs cursor-pointer bg-pink-500 hover:bg-pink-600 px-2 py-1 sm:py-2 sm:px-6 text-white font-semibold rounded-lg transition duration-300 font-poppins" href="/login">
              SIGN IN
            </Link>
          </>
        )}

      </div>
    </div>
  );
};

export default Header;
