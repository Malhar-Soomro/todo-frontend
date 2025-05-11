import "@/styles/globals.css";
import {PropsWithChildren, useEffect} from "react";
import {getUser} from "@/api/auth";
import useAuth from "@/hooks/useAuth";
import {useRouter} from "next/router";

export default function Layout({children}: PropsWithChildren) {
  const router = useRouter();

  const {user, isLoading} = useAuth();

  useEffect(() => {
    if (!user && !isLoading) router.push("/");
  }, [user, isLoading]);

  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ) : (
    children
  );
}
