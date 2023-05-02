import React, { useContext, useEffect } from "react";
import style from "../../styles/Cuenta.module.scss";
import { updateDoc, doc } from "firebase/firestore";
import ContextGeneral from "@/services/ContextGeneral";
import Loader from "@/componente/loader/Loader";
import { MdOutlineDeleteForever } from "react-icons/md";

import { toast } from "sonner";

function Index() {
  const context = useContext(ContextGeneral);

  const {
    verificarLogin,
    buscarOCrearUsuario,
    setCanal,
    setDarkMode,
    setComando,
  } = useContext(ContextGeneral);

  const setearCanal = async (e) => {
    e.preventDefault(e);

    const nombreCanal = e.target.inputCanal.value;

    //traemos los datos de base de datos
    const docRef = doc(context.firestore, `users/${context.user.email}`);

    await updateDoc(docRef, { canal: nombreCanal });
    setCanal(nombreCanal);
    toast.success(`Canal Activo: ${nombreCanal}`);

    e.target.inputCanal.value = "";
  };
  const setearComando = async (e) => {
    e.preventDefault(e);

    const nombreComando = e.target.inputComando.value;

    //traemos los datos de base de datos
    const docRef = doc(context.firestore, `users/${context.user.email}`);

    await updateDoc(docRef, { comando: nombreComando });
    setComando(nombreComando);
    toast.success(`Palabra clave activa: ${nombreComando}`);

    e.target.inputComando.value = "";
  };

  const eliminarComando = async (e) => {
    e.preventDefault(e);

    //traemos los datos de base de datos
    const docRef = doc(context.firestore, `users/${context.user.email}`);

    await updateDoc(docRef, { comando: "" });
    setComando("");
    toast.success(`Palabra Clave eliminada`);
  };

  const setearDarkMode = async () => {
    //traemos los datos de base de datos
    const docRef = doc(context.firestore, `users/${context.user.email}`);

    await updateDoc(docRef, { darkMode: !context.darkMode });
    toast.success(
      !context.darkMode ? "Dark Mode Activado" : "Dark Mode Desactivado"
    );
    setDarkMode(!context.darkMode);
  };

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
        <div className={style.container}>
          <div className={style.head}>
            <div>
              <p>Ingrese el Canal:</p>
              <form action="" className={style.form} onSubmit={setearCanal}>
                <input
                  type="text"
                  id="inputCanal"
                  defaultValue={context.canal}
                  placeholder="Usuario"
                />
                <button type="submit">Guardar</button>
              </form>
            </div>
            <div className={style.canal}>
              <p>
                Canal Activo:{" "}
                <span>
                  {context.canal ? context.canal : "Ingrese un canal de Twitch"}
                </span>
              </p>
            </div>

            <div>
              <p>Palabra Clave:</p>
              <form action="" className={style.form} onSubmit={setearComando}>
                <input
                  type="text"
                  id="inputComando"
                  placeholder="Palabra Clave"
                />
                <button type="submit">Guardar</button>
              </form>
            </div>
            {context.comando && (
              <div className={style.canal}>
                <p>
                  Palabra Clave Activa:{" "}
                  <span>{context.comando && context.comando}</span>
                </p>
                <MdOutlineDeleteForever
                  onClick={eliminarComando}
                  className={style.icon}
                />
              </div>
            )}
            {context.canal && (
              <p className={style.link} onClick={copyLink}>
                <span>Link:</span> {context.link}
              </p>
            )}

            <div className={style.dark__mode}>
              <p>Dark Mode del Mensaje:</p>
              {context.darkMode ? (
                <p
                  onClick={setearDarkMode}
                  className={style.mode}
                  style={{ backgroundColor: "green" }}
                >
                  ON
                </p>
              ) : (
                <p
                  onClick={setearDarkMode}
                  className={style.mode}
                  style={{ backgroundColor: "red" }}
                >
                  OFF
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Index;
