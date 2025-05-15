import "@/styles/globals.css";
import type {AppProps} from "next/app";
import Header from "../components/header";
import AuthProvider from "@/context/authContext";

export default function App({Component, pageProps}: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
