import React from "react";
import Styles from "./dist/Nav.module.css";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation().pathname;

  return location === "/" || location === "/index" ? null : (
    <nav className={Styles.nav}>
      <ul className={Styles.ul}>
        <li>
          <Link className={Styles.navLink} to={"/"}>
            Landing
          </Link>
        </li>
        <li>
          <Link className={Styles.navLink} to={"/home"}>
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to={"/activities"}
            className={`${Styles.navLink} ${Styles.smallerButtonFont}`}
          >
            Actividades
          </Link>
        </li>
        <li>
          <Link
            to={"/create"}
            className={`${Styles.navLink} ${Styles.smallerButtonFont}`}
          >
            Crear Actividad
          </Link>
        </li>
        <li>
          <Link className={`${Styles.navLink} ${Styles.smallerButtonFont}`}>
            Sobre esta App
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
