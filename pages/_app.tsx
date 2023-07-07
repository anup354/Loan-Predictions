import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import Head from "next/head";

import { useRouter } from "next/router";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requiredAuth?: boolean;
};
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="max-md:pt-0 max-lg:pt-0 max-sm:pt-0 max-w-screen-3xl mx-auto">
    <Navbar/>
      <Component {...pageProps} />
      <Footer/>
    </div>
  );
}
