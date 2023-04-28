import style from "@/styles/Chat.module.scss";
import tmi from "tmi.js";
import { useContext, useEffect, useState } from "react";

import MensajeItem from "../../componente/mensajeItem/MensajeItem";
import FavoritoItem from "../../componente/favoritoItem/FavoritoItem";
import ContextGeneral from "@/services/ContextGeneral";
import Loader from "@/componente/loader/Loader";

import { toast } from "sonner";

export default function Home() {
  const context = useContext(ContextGeneral);
  const {
    setMensajePublico,
    setFavoritos,
    llamadaDB,
    buscarOCrearUsuario,
    verificarLogin,
    setCanal,
  } = useContext(ContextGeneral);

  const client = new tmi.Client({
    channels: [`${context.canal}`],
  });

  client.connect();

  client.on("message", (channel, tags, message, self) => {
    // "Alca: Hello, World!"
    //   console.log(`${tags["display-name"]}: ${message}`);

    if (context.comando) {
      if (message.toLowerCase().includes(context.comando)) {
        let hoy = new Date();
        let minutos = hoy.getMinutes();
        if (minutos < 10) {
          minutos = "0" + minutos;
        }
        const msj = {
          mensaje: message,
          usuario: tags["display-name"],
          id: new Date().getTime(),
          suscriptor: tags.subscriber,
          mod: tags.mod,
          prime: tags.turbo,
          vip: tags.vip,
          colorTitle: tags.color,
          hora: hoy.getHours() + ":" + minutos,
        };

        setMensajePublico((items) => {
          // Verificar si ya existe el mensaje en la lista
          const encontrado = items.some((item) => {
            return item.mensaje === msj.mensaje && item.usuario === msj.usuario;
          });

          // Si el mensaje no está en la lista, agregarlo al principio
          if (!encontrado) {
            return [msj, ...items];
          }

          // Si el mensaje ya está en la lista, devolver la lista sin cambios
          return items;
        });
      }
    } else {
      let hoy = new Date();
      let minutos = hoy.getMinutes();
      if (minutos < 10) {
        minutos = "0" + minutos;
      }
      const msj = {
        mensaje: message,
        usuario: tags["display-name"],
        id: new Date().getTime(),
        suscriptor: tags.subscriber,
        mod: tags.mod,
        prime: tags.turbo,
        vip: tags.vip,
        colorTitle: tags.color,
        hora: hoy.getHours() + ":" + minutos,
      };

      setMensajePublico((items) => {
        // Verificar si ya existe el mensaje en la lista
        const encontrado = items.some((item) => {
          return item.mensaje === msj.mensaje && item.usuario === msj.usuario;
        });

        // Si el mensaje no está en la lista, agregarlo al principio
        if (!encontrado) {
          return [msj, ...items];
        }

        // Si el mensaje ya está en la lista, devolver la lista sin cambios
        return items;
      });
    }
  });

  const copyLink = () => {
    navigator.clipboard.writeText(context.link);
    toast.success("Link Copiado");
  };

  useEffect(() => {
    verificarLogin();

    if (context.user && !context.mensajesPublicos) {
      buscarOCrearUsuario();
    }
  }, [context.user]);
  return (
    <>
      {context.loader ? (
        <div className={style.container__main}>
          <h3 className={style.link} onClick={copyLink}>
            Link: {context.link}
          </h3>
          <div className={style.main}>
            <div className={style.container}>
              <h3 className={style.h3}>Mensajes:</h3>

              <div className={style.mensajes__container}>
                {context.mensajesPublico &&
                  context.mensajesPublico.map((item) => {
                    return (
                      <MensajeItem
                        key={item.id}
                        usuario={item.usuario}
                        mensaje={item.mensaje}
                        id={item.id}
                        suscriptor={item.suscriptor}
                        mod={item.mod}
                        prime={item.prime}
                        vip={item.vip}
                        colorTitle={item.colorTitle}
                        hora={item.hora}
                      />
                    );
                  })}
              </div>
            </div>
            <div className={style.container}>
              <h3 className={style.h3}>Favoritos:</h3>

              <div className={style.mensajes__container}>
                {context.favoritos &&
                  context.favoritos.map((item) => {
                    return (
                      <FavoritoItem
                        key={item.id}
                        usuario={item.usuario}
                        mensaje={item.mensaje}
                        id={item.id}
                        suscriptor={item.suscriptor}
                        mod={item.mod}
                        prime={item.prime}
                        vip={item.vip}
                        colorTitle={item.colorTitle}
                        hora={item.hora}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
