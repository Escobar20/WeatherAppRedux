const fetchWeatherCity = (
  state = {
    weatherDataCity: []
  },
  action
) => {
  if (action.type === "FETCH_WEATHER_CITY") {
    state = { ...state, weatherDataCity: action.payload };
  }

  return state;
};
export default fetchWeatherCity;
