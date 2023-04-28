import React, { useContext, useEffect, useState } from "react";
import style from "./FavoritoItem.module.scss";
import ContextGeneral from "@/services/ContextGeneral";
import {
  updateDoc,
  doc,
  onSnapshot,
  collection,
  database,
} from "firebase/firestore";

import mod2 from "../../media/mod.png";
import prime2 from "../../media/prime.png";
import sub2 from "../../media/sub.png";

import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

function FavoritoItem({
  usuario,
  mensaje,
  id,
  suscriptor,
  mod,
  prime,
  vip,
  colorTitle,
  hora,
}) {
  const context = useContext(ContextGeneral);
  const { setMensajeElegido, setFavoritos, setearLocalStorage } =
    useContext(ContextGeneral);

  const [favElegido, setFavElegido] = useState(false);

  const eliminarFav = () => {
    const nuevoArray = context.favoritos.filter((item) => item.id != id);

    setFavoritos(nuevoArray);
    setearLocalStorage(nuevoArray);
  };

  const mostrarMensaje = async () => {
    let vipTrue = vip ? true : false;
    const sms = {
      usuario: usuario,
      mensaje: mensaje,
      id: id,
      suscriptor: suscriptor,
      mod: mod,
      prime: prime,
      vip: vipTrue,
      colorTitle: colorTitle,
      hora: hora,
    };

    const docRef = doc(context.firestore, `users/${context.user.email}`);
    updateDoc(docRef, { mensajeFijado: sms });
    toast.success(`Mensade de ${sms.usuario} elegido`);

    setMensajeElegido(sms);
  };

  const deleteMsj = async () => {
    const docRef = doc(context.firestore, `users/${context.user.email}`);
    updateDoc(docRef, { mensajeFijado: {} });
    setMensajeElegido({});
  };

  const fav = () => {
    const sms = {
      usuario: usuario,
      mensaje: mensaje,
      id: id,
      suscriptor: suscriptor,
      mod: mod,
      prime: prime,
    };
    if (
      sms.mensaje === context.mensajeElegido.mensaje &&
      sms.usuario === context.mensajeElegido.usuario
    ) {
      setFavElegido(true);
    } else {
      setFavElegido(false);
    }
  };

  useEffect(() => {
    fav();
  }, [context.mensajeElegido, context.favoritos.length]);

  return (
    <div
      className={style.container}
      style={{
        backgroundColor: favElegido ? "#f2ced1" : "rgb(238, 238, 238)",
      }}
    >
      <div className={style.mensaje}>
        <h3 className={style.h3}>
          <span className={style.hora}>{hora}</span>
          {mod && <img className={style.img} src={mod2.src} alt="" />}
          {prime && <img className={style.img} src={prime2.src} alt="" />}
          {suscriptor && <img className={style.img} src={sub2.src} alt="" />}
          <span style={{ color: colorTitle ? colorTitle : "" }}>{usuario}</span>
          :
        </h3>
        <p>{mensaje}</p>
      </div>
      <div className={style.container__icon}>
        <MdOutlineDeleteForever onClick={eliminarFav} className={style.icon} />

        {favElegido ? (
          <FaRegEye onClick={deleteMsj} className={style.icon} />
        ) : (
          <FaRegEyeSlash onClick={mostrarMensaje} className={style.icon} />
        )}
      </div>
    </div>
  );
}

export default FavoritoItem;
