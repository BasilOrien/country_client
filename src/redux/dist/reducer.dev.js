"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mainReducer;

var _actionTypes = require("./action-types");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  countries: [],
  filterByContinent: [],
  searchResults: [],
  activities: []
};

function mainReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      payload = _ref.payload;

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
    case _actionTypes.GET_ALL_COUNTRIES:
      return _objectSpread({}, state, {
        countries: sortFunction(payload, "name")
      });

    case _actionTypes.AZ_ORDER:
      if (payload === "az") {
        return _objectSpread({}, state, {
          countries: sortFunction(state.countries, "name"),
          filterByContinent: sortFunction(state.filterByContinent, "name")
        });
      } else {
        return _objectSpread({}, state, {
          countries: state.countries.reverse(),
          filterByContinent: state.filterByContinent.reverse()
        });
      }

    case _actionTypes.CONTINENT_FILTER:
      if (payload === "Americas") {
        return _objectSpread({}, state, {
          filterByContinent: _toConsumableArray(state.countries).filter(function (element) {
            return element.continent.includes("America");
          })
        });
      } else return _objectSpread({}, state, {
        filterByContinent: _toConsumableArray(state.countries).filter(function (element) {
          return element.continent === payload;
        })
      });

    case _actionTypes.POP_ORDER:
      if (payload === "pa") {
        return _objectSpread({}, state, {
          countries: sortFunction(state.countries, "population"),
          filterByContinent: sortFunction(state.filterByContinent, "population")
        });
      } else {
        return _objectSpread({}, state, {
          countries: invertSortFunction(state.countries, "population"),
          filterByContinent: invertSortFunction(state.filterByContinent, "population")
        });
      }

    case _actionTypes.QUERY_RESULTS:
      {
        return _objectSpread({}, state, {
          searchResults: payload
        });
      }

    case _actionTypes.GET_ACTIVITIES:
      return _objectSpread({}, state, {
        activities: payload
      });

    default:
      return state;
  }
}