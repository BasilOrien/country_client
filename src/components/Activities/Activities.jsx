import React, { useEffect } from "react";
import Styles from "./dist/Activities.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "../../redux/actions";
import { Link } from "react-router-dom";
const Activities = () => {
  const dispatch = useDispatch();
  useEffect(
    function () {
      dispatch(setActivities());
    },
    [dispatch]
  );

  const store = useSelector((s) => s);
  const { activities } = store;
  return (
    <div className={Styles.container}>
      <table>
        <thead>
          <tr>
            <th>Actividad</th>
            <th>Duracion</th>
            <th>Dificultad</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {activities &&
            activities?.map(function (activity) {
              return (
                <tr>
                  <td>{activity.name}</td>
                  <td>{activity.duration}hs</td>
                  <td>
                    {activity.difficulty > 4
                      ? "Alta"
                      : activity.difficulty >= 3
                      ? "Media"
                      : "Baja"}
                  </td>
                  <td>
                    <Link
                      to={`/activities/${activity.id}`}
                      className={Styles.link}
                    >
                      Detalles de la actividad
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Activities;
