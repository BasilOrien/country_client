import React from "react";
import e404Img from "../../misc/img/error404.avif";
import { Link } from "react-router-dom";
import Styles from "./dist/E404.module.css";

export const E404 = () => {
  return (
    <div className={Styles.container}>
      <h2 className={Styles.title}>404 Not found</h2>
      <img src={e404Img} alt="404" />
      <h2>
        No pudimos encontrar la página, prueba volver al{" "}
        <Link className={Styles.home} to={"/home"}>
          Inicio
        </Link>
      </h2>
    </div>
  );
};
