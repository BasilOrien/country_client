import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import CountryDetails from "./components/CountryDetails/CountryDetails";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCountries, mainUrl } from "./redux/actions";
import { E404 } from "./components/E404/E404";
import CreateActivity from "./components/Create/CreateActivity";
import axios from "axios";
import loadingSpinner from "./misc/img/Blackdove Spinner.gif";
import Activities from "./components/Activities/Activities";
function App() {
  const [online, setOnline] = useState(true);
  const [conError, setConError] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(function () {
    axios
      .get(mainUrl)
      .then((serverResponse) => {
        if (serverResponse.data) {
          console.log(serverResponse);
          dispatch(getAllCountries());
          setOnline(true);
          setLoading(false);
          setConError("");
        }
      })
      .catch((error) => {
        setOnline(false);
        setConError("La aplicacion no pudo conectarse al servidor 2");
      });
  });

  window.addEventListener("online", () => {
    setOnline(true);
    setConError("");
  });

  window.addEventListener("offline", () => {
    setOnline(false);
    setConError("La aplicacion no pudo conectarse al servidor 2");
  });

  return !online ? (
    <div className="App">
      <h1 style={{ color: "white" }}>{conError}</h1>
      <button
        onClick={() => () => {
          window.location.reload(true);
          dispatch(getAllCountries());
        }}
      >
        Reintentar?
      </button>
    </div>
  ) : loading ? (
    <div className="App">
      {" "}
      <img className="App" src={loadingSpinner} alt="loading" />
    </div>
  ) : (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id" element={<CountryDetails />} />
          <Route path="/create" element={<CreateActivity />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="*" element={<E404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
