import React, { useState } from "react";
import Styles from "./dist/searchBar.module.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setRQueryResults } from "../../../redux/actions";
const SearchBar = () => {
  const store = useSelector((store) => store);
  const [query, setQuery] = useState("");
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const { countries, filterByContinent } = store;

  function onChangeHandler(e) {
    if (e.target.value === "") {
      dispatch(setRQueryResults([]));
    }
    setQuery(e.target.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    if (!query) {
      dispatch(setRQueryResults([]));
      return;
    }
    const selectOrigin = filterByContinent.length
      ? filterByContinent
      : countries;
    const matchResults = selectOrigin.filter(function (element) {
      return (
        element.id.toLowerCase().includes(query.toLowerCase()) ||
        element.name.toLowerCase().includes(query.toLowerCase())
      );
    });

    dispatch(setRQueryResults(matchResults));
  }

  if (location !== "/home") return null;
  return (
    <form
      onSubmit={(e) => {
        onSubmitHandler(e);
      }}
      className={Styles.searchBarForm}
    >
      <input
        className={Styles.bar}
        type="search"
        placeholder="Ingresa tu busqueda"
        onChange={(e) => onChangeHandler(e)}
        value={query}
      />
      <input className={Styles.barBtn} type="submit" value="Buscar" />
    </form>
  );
};

export default SearchBar;
