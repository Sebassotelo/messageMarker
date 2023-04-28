import style from "@/styles/Home.module.scss";
import { useContext, useEffect, useState } from "react";
import ContextGeneral from "@/services/ContextGeneral";
import { FcGoogle } from "react-icons/fc";

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
          {!context.user && (
            <div
              className={style.button__google}
              onClick={() => signInWithPopup(context.auth, googleProvider)}
            >
              <FcGoogle className={style.google} />
              <p>Ingresar con Google</p>
            </div>
          )}
        </header>
      </main>
    </>
  );
}
