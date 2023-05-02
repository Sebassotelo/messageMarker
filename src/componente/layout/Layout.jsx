import React, { useEffect, useState } from "react";
import Head from "next/head";
import style from "./Layout.module.scss";
import Navbar from "../navbar/Navbar";
import { Toaster } from "sonner";

import { useRouter } from "next/router";

function Layout({ children, title }) {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <div style={{ display: "grid" }}>
      <Head>
        <title>Message Marker | Home </title>
        <meta
          name="description"
          content="Marca los mensajes de un canal de Twitch como Favoritos, y luego muestralos en tu Stream mediante un enlace."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kanit:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      {!router.query.hasOwnProperty("mensaje") && <Navbar />}

      <div className={style.body}>{children}</div>
      <Toaster />

      {!router.query.hasOwnProperty("mensaje") && (
        <footer className={style.footer}>
          <p>
            Desarrollado por{" "}
            <a href="https://www.sebassotelo.com.ar/" target={"_blank"}>
              Sebas Sotelo
            </a>{" "}
          </p>
        </footer>
      )}
    </div>
  );
}

export default Layout;
