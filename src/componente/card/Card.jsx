import React from "react";
import style from "./Card.module.scss";

function Card({ orden, titulo, desc }) {
  return (
    <div className={style.container}>
      <div className={style.numero}>
        <p className={style.numero__p}>{orden}</p>
      </div>

      <h3 className={style.h3}>{titulo}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default Card;
