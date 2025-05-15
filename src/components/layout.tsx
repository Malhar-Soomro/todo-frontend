import {PropsWithChildren, useContext, useEffect} from "react";
import {useRouter} from "next/router";
import { AuthContext } from "@/context/authContext";

export default function Layout({children}: PropsWithChildren) {
  const router = useRouter();

  const {auth} = useContext(AuthContext);

  console.log("layout")
  console.log(auth)

  useEffect(() => {
    console.log("auth.user: ", auth.user);
    console.log("auth.isLoading", auth.isLoading);
    if (!auth.user && !auth.isLoading) {
      console.log("router push")
      router.push("/")};

  }, [auth.user, auth.isLoading]);

  return auth.isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ) : (
    children
  );
}
