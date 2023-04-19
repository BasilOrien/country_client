import React from "react";
import Styles from "./dist/Filter.module.css";
import { continentFilter, orderAz, orderPop } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const Filter = ({ functions }) => {
  const dispatch = useDispatch();

  function alphOrd(e) {
    dispatch(orderAz(e.target.value));
  }

  function popOrd(e) {
    dispatch(orderPop(e.target.value));
  }

  function onFilterChange(e) {
    dispatch(continentFilter(e.target.value));
    functions.functionA(0);
    functions.functionB(0);
  }
  return (
    <div className={Styles.container}>
      <button className={Styles.menuButton}>
        <span>Filtros</span>
      </button>
      <div className={Styles.selectContainer}>
        <div className={Styles.filterContainer}>
          <div className={Styles.select}>
            <h3>Ordenar Alfabeticamente</h3>
            <select onChange={(e) => alphOrd(e)}>
              <option value="az">Ascendente</option>
              <option value="za">Descendente</option>
            </select>

            <h3>Ordenar Por Poblacion</h3>
            <select onChange={(e) => popOrd(e)}>
              <option value="pa">Ascendente</option>
              <option value="pd">Descendente</option>
            </select>

            <h3>Filtrar Por continente</h3>
            <select onChange={(e) => onFilterChange(e)}>
              <option value="all">Seleccione un continente</option>
              <option value="North America">America del Norte</option>
              <option value="South America">America del Sur</option>
              <option value="Americas">Las Americas</option>
              <option value="Africa">Africa</option>
              <option value="Antarctica">Antartida</option>
              <option value="Asia">Asia</option>
              <option value="Oceania">Oceania</option>
              <option value="Europe">Europa</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
