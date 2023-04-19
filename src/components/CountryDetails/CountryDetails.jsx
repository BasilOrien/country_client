import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Styles from "./dist/CountryDetails.module.css";

const CountryDetails = () => {
  const { id } = useParams();
  const store = useSelector((s) => s);
  const { countries } = store;

  const [country, setCountry] = useState();

  useEffect(
    function () {
      const c = countries.find((country) => {
        if (country.id === id) {
          return country;
        } else return null;
      });
      if (c) {
        setCountry(c);
      }
    },
    [countries, id]
  );

  function parseArea(area) {
    const length = area.toString().length;
    if (length >= 7) {
      area = `${(area / 1000000).toFixed(1)}M`;
    } else if (length >= 4) {
      area = `${area / 1000}K`;
    }
    return area;
  }

  return !!country ? (
    <div className={Styles.container}>
      <Link className={Styles.backButton} to={"/home"}>Volver</Link>
      <div className={Styles.info}>
        <h2>{country.name}</h2>
        <img src={country.image} alt={`Bandera de ${country.name}`} />
        <article className={Styles.article}>
          <p>{`${country.name} es un pais, con su capital situada en la ciudad de  ${country.capital}`}</p>{" "}
          <br />
          <p>
            {` Cuenta con`}{" "}
            {country.area ? `${parseArea(country.area)} KM cuadrados.  ` : ""}
            {`Hubicada en ${country.subregion}, continente de ${country.continent}`}{" "}
          </p>{" "}
          <br />
          <p>
            {` Este pais 
           cuenta con ${country.population} personas`}
          </p>{" "}
          <br />
          <h4 style={{ display: country.activities.length ? "block" : "none" }}>
            En {country.name} se suelen realizar las siguientes actividades:{" "}
          </h4>
          <div>
            <ul className={Styles.activitiesUl}>
              {country.activities?.map(function (element) {
                return (
                  <li>
                    <Link
                      className={Styles.link}
                      key={element.id}
                      to={`/activities/${element.id}`}
                    >
                      {element.name + " "}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </article>
      </div>
    </div>
  ) : (
    <div>Cargando</div>
  );
};

export default CountryDetails;
