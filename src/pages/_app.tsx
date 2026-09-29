import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
       <FavoritesProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
      </FavoritesProvider>
    </SessionProvider>
  );
}