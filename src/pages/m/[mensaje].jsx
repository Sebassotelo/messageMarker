import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../../styles/MsjPublico.module.scss";
import ContextGeneral from "@/services/ContextGeneral";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import mod from "../../media/mod.png";
import sub from "../../media/sub.png";
import prime from "../../media/prime.png";

function Mensaje() {
  const router = useRouter();
  const [sms, setSms] = useState({});
  const [dark, setDark] = useState("");
  const [email, setEmail] = useState("");

  const context = useContext(ContextGeneral);

  const llamada = async () => {
    const id = router.query.mensaje;
    const docRef = collection(context.firestore, `users`);

    const q = query(docRef, where("idCuenta", "==", id));

    const comoQuieras = await getDocs(q);
    comoQuieras.forEach((doc) => {
      setSms(doc.data().mensajeFijado);
      setDark(doc.data().darkMode);
      setEmail(doc.data().email);
    });
  };

  useEffect(() => {
    if (router.query.mensaje) {
      llamada();
    }
    if (email) {
      const userDoc = doc(context.firestore, `users/${email}`);
      onSnapshot(userDoc, (docSnapshot) => {
        setSms(docSnapshot.data().mensajeFijado);
        setDark(docSnapshot.data().darkMode);
      });
    }
    console.log(context.mensajeElegido);
  }, [router.query.mensaje, email]);

  return (
    <div className={style.container}>
      {!dark ? (
        <div className={style.card}>
          {context.mensajeElegido && (
            <>
              <h3>
                {sms.mod && <img className={style.img} src={mod.src} alt="" />}
                {sms.prime && (
                  <img className={style.img} src={prime.src} alt="" />
                )}
                {sms.suscriptor && (
                  <img className={style.img} src={sub.src} alt="" />
                )}
                <span style={{ color: sms.colorTitle ? sms.colorTitle : "" }}>
                  {sms.usuario}
                </span>{" "}
              </h3>
              <p>{sms.mensaje}</p>
            </>
          )}
        </div>
      ) : (
        <div className={style.card__dark}>
          {context.mensajeElegido && (
            <>
              <h3>
                {sms.mod && <img className={style.img} src={mod.src} alt="" />}
                {sms.prime && (
                  <img className={style.img} src={prime.src} alt="" />
                )}
                {sms.suscriptor && (
                  <img className={style.img} src={sub.src} alt="" />
                )}
                <span style={{ color: sms.colorTitle ? sms.colorTitle : "" }}>
                  {sms.usuario}
                </span>{" "}
              </h3>
              <p>{sms.mensaje}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Mensaje;
