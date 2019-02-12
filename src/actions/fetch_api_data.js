// To call an API
import axios from "axios";

const API_KEY = "f98b056adf1887f3305f51daa042cef0"; //52014a5500cde66578177e9913b53a89 |  f98b056adf1887f3305f51daa042cef0

export function fetchAPIResponseByIDs(cities) {
  return function(dispatch) {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/group?id=" +
          cities +
          "&units=metric&appid=" +
          API_KEY
      )
      .then(response => {
        let datas = [];
        for (var key in response.data.list) {
          datas.push(response.data.list[key]);
        }
        dispatch({ type: "FETCH_WEATHER", payload: datas });
        console.log("WeatherByIDs -> ", response);
      })
      .catch(err => {
        console.log("Error in API call", err);
      });
  };
}

export function fetchAPIResponseByName(city) {
  return function(dispatch) {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=" +
          API_KEY
      )
      .then(response => {
        let datas = [],
          interM = [];
        for (var key in response) {
          datas.push(response[key]);
        }
        interM[0] = datas[0];
        dispatch({ type: "FETCH_WEATHER_CITY", payload: interM });
        console.log("WeatherByName -> ", interM);
        dispatch({ type: "FETCH_WEATHER", payload: datas });
        // PUSH TO WEATHER DATA
      })
      .catch(err => {
        dispatch({ type: "ERROR" });
        console.log("Error in API call", err);
      });
  };
}

export function fetchAPIResponseForecast(city) {
  return function(dispatch) {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&appid=" +
          API_KEY
      )
      .then(response => {
        let datas = [];

        datas = response.data.list.map(Lista => {
          const fields = Lista.dt_txt.split(" ");
          return {
            dia: fields[0],
            hora: fields[1],
            fecha: Lista.dt_txt,
            temp: Lista.main.temp,
            temp_min: Lista.main.temp_min,
            temp_max: Lista.main.temp_max,
            main: Lista.weather[0].main
          };
        });
        let days = datas.map(arreglo => {
          return arreglo.dia;
        });
        days = new Set(days);

        let ArregloFinal = [];

        days.forEach(day => {
          const arreglo = { Dia: day, Horas: [] };
          datas.map(DiaActual => {
            if (day === DiaActual.dia) {
              arreglo.Horas.push({
                hora: DiaActual.hora,
                temp: DiaActual.temp,
                fecha: DiaActual.fecha,
                temp_min: DiaActual.temp_min,
                temp_max: DiaActual.temp_max,
                main: DiaActual.main
              });
            }
          });
          ArregloFinal.push(arreglo);
        });

        datas = ArregloFinal;

        //---------------------------------------------------------------

        dispatch({ type: "FETCH_FORECAST", payload: datas });
        console.log("Forecast -> ", response);
      })
      .catch(err => {
        console.log("Error in API call", err);
      });
  };
}

export function fetchResponseDeleteCity(city) {
  return function(dispatch) {
    dispatch({ type: "DELETE_CITY", payload: city });
  };
}
