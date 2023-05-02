import React, { useContext, useEffect } from "react";
import style from "./Navbar.module.scss";
import Link from "next/link";
import { push } from "next/router";

import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import ContextGeneral from "@/services/ContextGeneral";

import { AiOutlineHome, AiOutlineGoogle } from "react-icons/ai";
import { MdOutlineLogout, MdOutlineManageAccounts } from "react-icons/md";
import { BsChatLeftText, BsChatRightHeart } from "react-icons/bs";

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
      <div className={style.logo}>
        <BsChatRightHeart className={style.icon} /> <p>MessageMarker</p>
      </div>

      <Link href="/" className={style.link}>
        <AiOutlineHome className={style.icon} />
      </Link>
      {context.user && (
        <Link href="/chat" className={style.link}>
          <BsChatLeftText className={style.icon} style={{ fontSize: "20px" }} />
        </Link>
      )}
      {context.user && (
        <Link href="/cuenta" className={style.link}>
          <MdOutlineManageAccounts className={style.icon} />
        </Link>
      )}
      {!context.user && (
        <p
          onClick={() => signInWithPopup(context.auth, googleProvider)}
          className={style.link}
        >
          <AiOutlineGoogle className={style.icon} />
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
          <MdOutlineLogout className={style.icon} />
        </p>
      )}
    </div>
  );
}

export default Navbar;
