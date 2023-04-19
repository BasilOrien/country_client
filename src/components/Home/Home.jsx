import React, { useEffect, useState } from "react";
import Styles from "./dist/Home.module.css";
import { useSelector } from "react-redux";
import ShowCards from "./ShowCards/ShowCards";
import loadingSpinner from "../../misc/img/Blackdove Spinner.gif";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const store = useSelector((s) => s);
  useEffect(function () {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return loading ? (
    <img src={loadingSpinner} alt="loading" />
  ) : (
    <div className={Styles.cardContainer}>
      <ShowCards store={store} />
    </div>
  );
};

export default Home;

// 📍 HOME PAGE | la página principal de tu SPA debe contener:

// SearchBar: un input de búsqueda para encontrar países por nombre.
// Sector en el que se vea un listado de cards con los países. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /countries y deberá mostrar su:
// Imagen de la bandera.
// Nombre.
// Continente.
// Cuando se le hace click a una Card deberá redirigir al detalle de ese país específico.
// Botones/Opciones para filtrar por continente y por tipo de actividad turística.
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países por orden alfabético y por cantidad de población.
// Paginado: el listado de países se hará por partes. Tu SPA debe contar con un paginado que muestre un total de 10 países por página.
