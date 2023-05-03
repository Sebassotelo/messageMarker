import style from "@/styles/Home.module.scss";
import { useContext, useEffect, useState } from "react";
import ContextGeneral from "@/services/ContextGeneral";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { BsChatRightHeart } from "react-icons/bs";

import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import Card from "@/componente/card/Card";
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
            className={style.title}
          >
            <div className={style.logo}>
              <BsChatRightHeart className={style.icon} />
              <h1>MessageMarker</h1>
            </div>
            <h3 className={style.pregunta}>
              ¿Quieres que tu chat te haga{" "}
              <span style={{ color: "rgb(123, 1, 160)" }}>preguntas</span> y
              mostrarlas en{" "}
              <span style={{ color: "rgb(123, 1, 160)" }}>stream</span>?
            </h3>
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
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/GLjYvH5PF2s?rel=0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className=""
              allowfullscreen
            />
          </div>
        </header>

        <section className={style.cards}>
          <Card
            orden={"1"}
            titulo={"Crea la Cuenta"}
            desc={"Ingresa con Google"}
          />
          <Card
            orden={"2"}
            titulo={"Configurala"}
            desc={
              "Elige el canal que quieras. Esto te dara un enlace. Agrega ese enlace al OBS mediante una fuente de NAVEGADOR"
            }
          />
          <Card
            orden={"3"}
            titulo={"Chat en Vivo"}
            desc={
              "Ve tu chat en vivo, selecciona los mensajes favoritos y muestralos uno por uno en el enlace."
            }
          />
        </section>
      </main>
    </>
  );
}
