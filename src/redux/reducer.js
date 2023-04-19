import {
  AZ_ORDER,
  CONTINENT_FILTER,
  GET_ACTIVITIES,
  GET_ALL_COUNTRIES,
  POP_ORDER,
  QUERY_RESULTS,
} from "./action-types";

const initialState = {
  countries: [],
  filterByContinent: [],
  searchResults: [],
  activities: [],
};

export default function mainReducer(state = initialState, { type, payload }) {
  function sortFunction(object, property) {
    return object.sort(function (element, element2) {
      if (element[property] < element2[property]) {
        return -1;
      } else if (element[property] > element2[property]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  function invertSortFunction(object, property) {
    return object.sort(function (element, element2) {
      if (element[property] > element2[property]) {
        return -1;
      } else if (element[property] < element2[property]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  switch (type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: sortFunction(payload, "name"),
      };
    case AZ_ORDER:
      if (payload === "az") {
        return {
          ...state,
          countries: sortFunction(state.countries, "name"),
          filterByContinent: sortFunction(state.filterByContinent, "name"),
        };
      } else {
        return {
          ...state,
          countries: state.countries.reverse(),
          filterByContinent: state.filterByContinent.reverse(),
        };
      }
    case CONTINENT_FILTER:
      if (payload === "Americas") {
        return {
          ...state,
          filterByContinent: [...state.countries].filter(function (element) {
            return element.continent.includes("America");
          }),
        };
      } else
        return {
          ...state,
          filterByContinent: [...state.countries].filter(function (element) {
            return element.continent === payload;
          }),
        };
    case POP_ORDER:
      if (payload === "pa") {
        return {
          ...state,
          countries: sortFunction(state.countries, "population"),
          filterByContinent: sortFunction(
            state.filterByContinent,
            "population"
          ),
        };
      } else {
        return {
          ...state,
          countries: invertSortFunction(state.countries, "population"),
          filterByContinent: invertSortFunction(
            state.filterByContinent,
            "population"
          ),
        };
      }
    case QUERY_RESULTS: {
      return {
        ...state,
        searchResults: payload,
      };
    }

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: payload,
      };
    default:
      return state;
  }
}
