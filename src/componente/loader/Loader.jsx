import React from "react";
import style from "./Loader.module.scss";

function Loader() {
  return (
    <div className={style.container}>
      <div class={style.ldsDualRing}></div>
    </div>
  );
}

export default Loader;
