import style from "@/styles/Home.module.scss";
import { useContext, useEffect, useState } from "react";
import ContextGeneral from "@/services/ContextGeneral";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { BsChatRightHeart } from "react-icons/bs";

import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
export default function Home() {
  const context = useContext(ContextGeneral);
  const { inspectorSesion, verificarLogin } = useContext(ContextGeneral);

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    inspectorSesion();
    verificarLogin();
  }, []);
  return (
    <>
      <main className={style.main}>
        <header className={style.header}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={style.logo}>
              <BsChatRightHeart className={style.icon} />
              <h1>MessageMarker</h1>
            </div>
            <p className={style.p}>
              <span>MessageMarker</span> es una herramienta para seleccionar y
              marcar mensajes de un canal de{" "}
              <span style={{ color: "rgb(123, 1, 160)" }}>TWITCH</span> como
              favoritos y luego mostrar esos mensajes favoritos en OBS a través
              de un <span>ENLACE.</span>
            </p>

            {!context.user && (
              <div
                className={style.button__google}
                onClick={() => signInWithPopup(context.auth, googleProvider)}
              >
                <FcGoogle className={style.google} />
                <p>Ingresar con Google</p>
              </div>
            )}
          </motion.div>

          <div className={style.img}>
            <img src="https://i.imgur.com/Z8L2xdT.png" alt="" />
          </div>
        </header>
      </main>
    </>
  );
}
