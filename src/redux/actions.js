import axios from "axios";
import {
  AZ_ORDER,
  CONTINENT_FILTER,
  GET_ACTIVITIES,
  GET_ALL_COUNTRIES,
  POP_ORDER,
  QUERY_RESULTS,
} from "./action-types";

export const mainUrl = "https://basil-orien-country-api.vercel.app/";

export function getAllCountries() {
  return async function (dispatch) {
    const axiosResponse = await axios.get(`${mainUrl}/countries`);
    const data = await axiosResponse.data;
    dispatch({
      type: GET_ALL_COUNTRIES,
      payload: data,
    });
  };
}

export function orderAz(payload) {
  return {
    type: AZ_ORDER,
    payload: payload,
  };
}

export function orderPop(payload) {
  return {
    type: POP_ORDER,
    payload: payload,
  };
}

export function continentFilter(payload, asynchronous) {
  return {
    type: CONTINENT_FILTER,
    payload,
  };
}

export function setRQueryResults(payload) {
  return {
    type: QUERY_RESULTS,
    payload: payload,
  };
}

export function setActivities() {
  return async (dispatch) => {
    const dbResponse = await axios.get(`${mainUrl}/activities`);
    const data = await dbResponse.data;
    dispatch({
      type: GET_ACTIVITIES,
      payload: data,
    });
  };
}
