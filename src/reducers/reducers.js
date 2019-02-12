import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import FetchWeather from "./fetch_weather";
import FetchForecast from "./fetch_forecast";
import FetchWeatherCity from "./fetch_weather_city";

const reducers = combineReducers({
  routing: routerReducer,
  FetchWeatherReducer: FetchWeather,
  FetchForecastReducer: FetchForecast,
  FetchWeatherCityReducer: FetchWeatherCity
});

export default reducers;
