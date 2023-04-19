"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllCountries = getAllCountries;
exports.orderAz = orderAz;
exports.orderPop = orderPop;
exports.continentFilter = continentFilter;
exports.setRQueryResults = setRQueryResults;
exports.setActivities = setActivities;
exports.mainUrl = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _actionTypes = require("./action-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mainUrl = "http://localhost:3001";
exports.mainUrl = mainUrl;

function getAllCountries() {
  return function _callee(dispatch) {
    var axiosResponse, data;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_axios["default"].get("".concat(mainUrl, "/countries")));

          case 2:
            axiosResponse = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(axiosResponse.data);

          case 5:
            data = _context.sent;
            dispatch({
              type: _actionTypes.GET_ALL_COUNTRIES,
              payload: data
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  };
}

function orderAz(payload) {
  return {
    type: _actionTypes.AZ_ORDER,
    payload: payload
  };
}

function orderPop(payload) {
  return {
    type: _actionTypes.POP_ORDER,
    payload: payload
  };
}

function continentFilter(payload, asynchronous) {
  return {
    type: _actionTypes.CONTINENT_FILTER,
    payload: payload
  };
}

function setRQueryResults(payload) {
  return {
    type: _actionTypes.QUERY_RESULTS,
    payload: payload
  };
}

function setActivities() {
  return function _callee2(dispatch) {
    var dbResponse, data;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(_axios["default"].get("".concat(mainUrl, "/activities")));

          case 2:
            dbResponse = _context2.sent;
            _context2.next = 5;
            return regeneratorRuntime.awrap(dbResponse.data);

          case 5:
            data = _context2.sent;
            dispatch({
              type: _actionTypes.GET_ACTIVITIES,
              payload: data
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
}