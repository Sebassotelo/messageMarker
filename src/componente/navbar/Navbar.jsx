import React, { useContext, useEffect } from "react";
import style from "./Navbar.module.scss";
import Link from "next/link";
import { push } from "next/router";

import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import ContextGeneral from "@/services/ContextGeneral";

function Navbar() {
  const context = useContext(ContextGeneral);
  const { inspectorSesion, verificarLogin } = useContext(ContextGeneral);

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    inspectorSesion();
    verificarLogin();
  }, []);

  return (
    <div className={style.container}>
      <Link href="/" className={style.link}>
        Home
      </Link>
      {context.user && (
        <Link href="/chat" className={style.link}>
          Chat
        </Link>
      )}
      {context.user && (
        <Link href="/cuenta" className={style.link}>
          Cuenta
        </Link>
      )}
      {!context.user && (
        <p
          onClick={() => signInWithPopup(context.auth, googleProvider)}
          className={style.link}
        >
          Ingresar con Google
        </p>
      )}

      {context.user && (
        <p
          onClick={() => {
            signOut(context.auth);
            push("/");
          }}
          className={style.link}
        >
          Cerrar Sesion
        </p>
      )}
    </div>
  );
}

export default Navbar;
