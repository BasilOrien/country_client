import React, { useState } from "react";
import Styles from "./dist/Alert.module.css";
import { Navigate } from "react-router-dom";
const Alert = ({ errors, setAlertErrors, setAlert }) => {
  const [title, setTitle] = useState("Se ha encontrado un error");
  const [done, setDone] = useState(false);
  return done ? (
    <Navigate to={"/activities"} />
  ) : (
    <div
      style={{ display: errors.length > 0 ? "flex" : "none" }}
      className={Styles.container}
    >
      <h2>{title}</h2>
      {errors &&
        errors?.map((error, index) => {
          if (error.type && title === "Se ha encontrado un error") {
            setTitle("Operacion completada");
          }
          return (
            <div className={Styles.errorRow} key={index}>
              <h3>{`${error.description}`}</h3>
            </div>
          );
        })}
      <button
        onClick={(e) => {
          if (title === "Se ha encontrado un error") {
            setAlertErrors([]);
            setAlert(false);
          } else {
            setDone(true);
          }
        }}
      >
        Aceptar
      </button>
    </div>
  );
};

export default Alert;
