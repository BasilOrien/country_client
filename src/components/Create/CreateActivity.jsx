import React, { useState } from "react";
import Styles from "./dist/CreateActivity.module.css";
import Alert from "../Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllCountries, mainUrl } from "../../redux/actions";

const CreateActivity = () => {
  const dispatch = useDispatch()
  const store = useSelector((s) => s);
  const { countries } = store;
  const [alertActivator, setAlert] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    difficulty: 1,
    duration: 1,
    season: "",
    country: [],
  });

  const [alertErrors, setAlertErrors] = useState([]);

  function onChangeHandler(e) {
    e.preventDefault();
    if (e.target.name === "difficulty" || e.target.name === "duration") {
      setFormState({
        ...formState,
        [e.target.name]: parseInt(e.target.value),
      });
      return;
    }
    setFormState({
      ...formState,

      [e.target.name]:
        e.target.name === "country"
          ? formState.country.includes(e.target.value)
            ? formState.country
            : [...formState.country, e.target.value]
          : e.target.value,
    });
  }
  async function onSubmitHandler(e) {
    e.preventDefault();
    if (alertErrors.length) {
      return;
    }
    //--
    if (formState.name.length < 3 || typeof formState.name !== "string") {
      setAlertErrors([
        ...alertErrors,
        {
          errorIn: "name",
          description: "El nombre debe tener 3 caracteres o mas",
        },
      ]);
      return;
    }
    //--
    if (
      formState.difficulty <= 0 ||
      formState.difficulty > 5 ||
      typeof formState.difficulty !== "number"
    ) {
      setAlertErrors([
        ...alertErrors,
        {
          errorIn: "difficulty",
          description: "Ingrese un valor entre 1 y 5",
        },
      ]);
      return;
    }
    //--
    if (
      formState.duration <= 0 ||
      formState.duration > 24 ||
      typeof formState.duration !== "number"
    ) {
      setAlertErrors([
        ...alertErrors,
        {
          errorIn: "duration",
          description: "Ingrese un valor entre 1 y 24",
        },
      ]);
      return;
    }
    //--
    if (typeof formState.season !== "string" || formState.season.length !== 6) {
      setAlertErrors([
        ...alertErrors,
        {
          errorIn: "season",
          description: "Ingrese una estacion valida",
        },
      ]);
      return;
    }
    if (!formState.country.length) {
      setAlertErrors([
        ...alertErrors,
        {
          errorIn: "country",
          description: "Seleccione al menos un pais para agregar la actividad",
        },
      ]);
      return;
    }

    const postData = await axios.post(`${mainUrl}/activities`, {
      ...formState,
    });
    const data = await postData.data;
    if (data.id) {
      setAlertErrors([
        {
          type: "done",
          title: "Operacion completada:",
          description: `Se ha agregado correctamente la actividad ${
            data.name
          } a un total de ${formState.country.length} ${
            formState.country.length > 1 ? "paises" : "pais"
          }`,
        },
      ]);
      dispatch(getAllCountries())
    }
  }

  return (
    <div className={Styles.container}>
      <Alert
        active={alertActivator}
        errors={alertErrors}
        setAlertErrors={setAlertErrors}
        setAlert={setAlert}
      />
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <label htmlFor="name">Actividad:</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          type="text"
          name="name"
          placeholder="Nombre de la actividad"
          value={formState.name}
        />
        <label htmlFor="difficulty">
          Dificultad:{` (${formState.difficulty})`}:
        </label>
        <input
          onChange={(e) => onChangeHandler(e)}
          type="range"
          step={1}
          max={5}
          min={1}
          name="difficulty"
          value={formState.difficulty}
        />
        <label htmlFor="duration">Duracion: {`(${formState.duration})`}</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          type="range"
          step={1}
          min={1}
          max={24}
          name="duration"
          value={formState.duration}
        />
        <label htmlFor="season">Estacion:</label>

        <select onChange={(e) => onChangeHandler(e)} name="season">
          <option value="">Selecciona una estacion</option>
          <option value="Winter">Invierno</option>
          <option value="Autumn">Otoño</option>
          <option value="Spring">Primavera</option>
          <option value="Summer">Verano</option>
        </select>

        <label htmlFor="country">Seleciona uno o varios paises: </label>
        <select onChange={(e) => onChangeHandler(e)} name="country">
          <option value="">Seleccionar</option>
          {countries &&
            countries?.map((c, k) => {
              return (
                <option key={k} value={c.id}>
                  {c.name}
                </option>
              );
            })}
        </select>

        <input
          type="button"
          value="Limpiar formulario"
          onClick={() => {
            window.location.reload(true);
          }}
        />
        <button type="submit">Agregar Actividad</button>
      </form>
      <div className={Styles.selectedCountries}>
        <h3>Paises seleccionados</h3>
        {formState.country
          .filter((x) => x !== "")
          .map(function (c, k) {
            const countryObject = countries.find((xx) => xx.id === c);

            return (
              <div key={k} className={Styles.selectedCountryRow}>
                <span>{countryObject.name}</span>
                <input
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      country: formState.country.filter(
                        (x) => x !== e.target.id
                      ),
                    })
                  }
                  type="checkbox"
                  id={countryObject.id}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CreateActivity;
