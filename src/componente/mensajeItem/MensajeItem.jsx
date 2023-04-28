import React, { useContext } from "react";
import style from "./MensajeItem.module.scss";
import ContextGeneral from "@/services/ContextGeneral";
import { MdFavoriteBorder } from "react-icons/md";

import mod2 from "../../media/mod.png";
import prime2 from "../../media/prime.png";
import sub2 from "../../media/sub.png";

function Msj({
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
  const { setFavoritos, setearLocalStorage } = useContext(ContextGeneral);

  const agregarFav = () => {
    const sms = {
      usuario: usuario,
      mensaje: mensaje,
      id: id,
      suscriptor: suscriptor,
      mod: mod,
      prime: prime,
      vip: vip,
      colorTitle: colorTitle,
      hora: hora,
    };

    setFavoritos((items) => {
      // Verificar si ya existe el mensaje en la lista
      const encontrado = items.some((item) => {
        return item.mensaje === sms.mensaje && item.usuario === sms.usuario;
      });

      // Si el mensaje no está en la lista, agregarlo al principio
      if (!encontrado) {
        setearLocalStorage([sms, ...items]);
        return [sms, ...items];
      }

      // Si el mensaje ya está en la lista, devolver la lista sin cambios
      return items;
    });
  };

  return (
    <div className={style.container}>
      <div className={style.mensaje}>
        <h3>
          <span className={style.hora}>{hora}</span>
          {mod && <img className={style.img} src={mod2.src} alt="" />}
          {prime && <img className={style.img} src={prime2.src} alt="" />}
          {suscriptor && (
            <img className={style.img} src={sub2.src} alt="" />
          )}{" "}
          <span style={{ color: colorTitle ? colorTitle : "" }}>{usuario}</span>
        </h3>
        <p>{mensaje}</p>
      </div>
      <MdFavoriteBorder onClick={agregarFav} className={style.icon} />
    </div>
  );
}

export default Msj;
