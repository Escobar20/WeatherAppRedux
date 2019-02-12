const fetchForecast = (
  state = {
    forecastData: []
  },
  action
) => {
  if (action.type === "FETCH_FORECAST") {
    state = { ...state, forecastData: action.payload };
  }

  return state;
};
export default fetchForecast;
