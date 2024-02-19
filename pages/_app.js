import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-phone-number-input/style.css";
import "react-quill/dist/quill.snow.css";
import localFont from "@next/font/local";
import Script from "next/script";

config.autoAddCss = false;
const fontt = localFont({
  src: [
    {
      path: "../assets/font/EuclidCircularA-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/font/EuclidCircularA-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--euclid-font",
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  <main>
    <Component {...pageProps} />
  </main>;

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" />

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        crossorigin="anonymous"
      ></Script>

      <main className={fontt.variable}>
        <Component {...pageProps} />
        <div id="modal-root"></div>
      </main>
    </>
  );
}

export default MyApp;
