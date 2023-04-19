import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Style from "./dist/CountryCard.module.css";
import spinner from "../../../misc/img/Blackdove Spinner.gif";

const CountryCard = ({ countryData }) => {
  const [loaded, setLoaded] = useState(false);
  setTimeout(() => {
    setLoaded(true);
  }, [1300, 1000, 1500][Math.floor(Math.random() * 3)]);
  return (
    <div className={Style.card}>
      {!loaded ? (
        <img className={Style.img} src={spinner} alt="loading" />
      ) : (
        <img className={Style.img} src={countryData.image} alt="" />
      )}
      <div className={Style.infoContainer}>
        <h3>
          <Link className={Style.name} to={`/home/${countryData.id}`}>
            {countryData.name}
          </Link>
        </h3>
        <h3 className={Style.continent}>{countryData.continent}</h3>
      </div>
    </div>
  );
};

export default CountryCard;
