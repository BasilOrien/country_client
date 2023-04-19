import React, { useEffect, useState } from "react";
import CountryCard from "../CountryCard/CountryCard";
import Styles from "./dist/ShowCards.module.css";
import Filter from "../Filter/Filter";
import SearchBar from "../searchBar/searchBar";
import { useDispatch } from "react-redux";
import { setRQueryResults } from "../../../redux/actions";

const ShowCards = ({ store }) => {
  const { countries, filterByContinent, searchResults } = store;
  const [firstIndex, setFirstIndex] = useState(0);
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  useEffect(
    function () {
      dispatch(setRQueryResults([]));
    },
    [dispatch]
  );

  function nextPage() {
    const totalElements =
      searchResults.length || filterByContinent.length || countries.length;
    let nextPage = currentPage + 1;
    if (nextPage * itemsPerPage < totalElements) {
      // setLoading(true);
      setCurrentPage(nextPage);
      setFirstIndex(nextPage * itemsPerPage);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 1000);
    } else {
      return;
    }
  }
  function previousPage() {
    const prevPage = currentPage - 1;
    if (prevPage >= 0) {
      // setLoading(true)
      setCurrentPage(prevPage);
      setFirstIndex(prevPage * itemsPerPage);
      // setTimeout(() => {
      //   setLoading(false)
      // }, 1000);
    } else {
      return;
    }
  }

  return (
    <div className={Styles.container}>
      <SearchBar />
      <div className={Styles.paginationBar}>
        <Filter
          functions={{
            functionA: () => setCurrentPage(0),
            functionB: () => setFirstIndex(0),
          }}
        />

        <button className={Styles.mainPagButton} onClick={() => previousPage()}>
          Anterior
        </button>
        <span className={Styles.currentPage}> {currentPage}</span>

        <button className={Styles.mainPagButton} onClick={(e) => nextPage()}>
          Siguiente
        </button>
        {/* <div className={Styles.pagOptionsContainer}>
          <span>Mostrar </span>
          <input
            onChange={(e) => onChangeHandler(e)}
            name="setItems"
            type="number"
            className={Styles.setPerPage}
            placeholder={itemsPerPage}
          />
          <span>paises por pagina</span>
        </div> */}
      </div>
      {searchResults.length
        ? [...searchResults]
            .splice(firstIndex, itemsPerPage)
            ?.map((country) => {
              return <CountryCard key={country.id} countryData={country} />;
            })
        : filterByContinent.length
        ? [...filterByContinent]
            .splice(firstIndex, itemsPerPage)
            ?.map((country) => {
              return <CountryCard key={country.id} countryData={country} />;
            })
        : [...countries].splice(firstIndex, itemsPerPage)?.map((country) => {
            return <CountryCard key={country.id} countryData={country} />;
          })}
    </div>
  );
};

export default ShowCards;
