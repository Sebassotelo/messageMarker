import React, { useEffect, useState } from "react";
import ContextGeneral from "./ContextGeneral";
import firebaseApp from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { push } from "next/router";

function Context(props) {
  const [mensajeElegido, setMensajeElegido] = useState({});
  const [canal, setCanal] = useState("");
  const [idCuenta, setIdCuenta] = useState("");
  const [link, setLink] = useState("");
  const [darkMode, setDarkMode] = useState(null);
  const [comando, setComando] = useState("");

  const [mensajesPublico, setMensajePublico] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  const [loader, setLoader] = useState(false);
  const [estadoUsuario, setEstadoUsuario] = useState(0);
  const [user, setUser] = useState(null);

  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  const inspectorSesion = (usuarioFirebase) => {
    //en caso de que haya seison iniciada
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
      setEstadoUsuario(1);
    } else {
      //en caso de que haya seison iniciada
      setUser(null);
      setEstadoUsuario(0);
    }
  };

  const verificarLogin = () => {
    onAuthStateChanged(auth, inspectorSesion);
  };

  const llamadaDB = async () => {
    setLoader(false);
    const docRef = doc(firestore, `users/${user.email}`);
    const consulta = await getDoc(docRef);
    const infoDocu = consulta.data();

    setMensajeElegido(infoDocu.mensajeFijado);

    setLoader(true);
  };

  const buscarOCrearUsuario = async () => {
    setLoader(false);
    const docRef = doc(firestore, `users/${user.email}`);
    const consulta = await getDoc(docRef);
    if (consulta.exists()) {
      const infoDocu = consulta.data();
      setMensajeElegido(infoDocu.mensajeFijado);
      setCanal(infoDocu.canal);
      setIdCuenta(infoDocu.idCuenta);
      setLink(`http://localhost:3000/m/${infoDocu.idCuenta}`);
      setDarkMode(infoDocu.darkMode);
      setComando(infoDocu.comando);
      setLoader(true);
      return infoDocu;
    } else {
      await setDoc(docRef, {
        mensajeFijado: {},
        idCuenta: new Date().getTime().toString(),
        canal: "",
        email: user.email,
        darkMode: false,
      });
      const consulta = await getDoc(docRef);
      const infoDocu = consulta.data();
      setMensajeElegido(infoDocu.mensajeFijado);
      setCanal(infoDocu.canal);
      setIdCuenta(infoDocu.idCuenta);
      setComando(infoDocu.comando);
      setLink(`http://localhost:3000/m/${infoDocu.idCuenta}`);
      setDarkMode(infoDocu.darkMode);
      setLoader(true);

      return infoDocu;
    }
  };

  const setearLocalStorage = (array) => {
    localStorage.setItem("mensajesFavoritos", JSON.stringify(array));
  };

  const recuperarStorage = () => {
    // Obtener la cadena de texto guardada en el localStorage con la clave "carrito"
    const favoritosString = localStorage.getItem("mensajesFavoritos");

    // Si existe la cadena de texto, convertirla en un objeto del carrito
    if (favoritosString) {
      setFavoritos(JSON.parse(favoritosString));
    }
    // Si no hay valor en localStorage, devolver un objeto vacío
    return [];
  };

  useEffect(() => {
    recuperarStorage();
  }, []);

  return (
    <ContextGeneral.Provider
      value={{
        user: user,
        canal: canal,
        idCuenta: idCuenta,
        link: link,
        darkMode: darkMode,
        comando: comando,
        mensajeElegido: mensajeElegido,
        mensajesPublico: mensajesPublico,
        favoritos: favoritos,
        firestore: firestore,
        auth: auth,
        loader: loader,
        setMensajePublico,
        setFavoritos,
        setMensajeElegido,
        llamadaDB,
        verificarLogin,
        inspectorSesion,
        setCanal,
        setIdCuenta,
        buscarOCrearUsuario,
        setearLocalStorage,
        setDarkMode,
        setComando,
      }}
    >
      {props.children}
    </ContextGeneral.Provider>
  );
}

export default Context;
