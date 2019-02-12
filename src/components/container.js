import React, { Component } from "react";
import Navbar from "../components/navbar";
import Dashboard from "../components/dashboard";

// Important : in order to connect the component to the state in Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//--------------------------------------------------------------------------
import { Switch, Route } from "react-router";
import { withRouter } from "react-router";
//--------------------------------------------------------------------------

//Import the action
import {
  fetchAPIResponseByIDs,
  fetchAPIResponseByName,
  fetchAPIResponseForecast,
  fetchResponseDeleteCity
} from "../actions/fetch_api_data";

import Details from "./details";
import "./card.css";

class Container extends Component {
  constructor() {
    super();
    this.state = {
      cities: "3995465,4005539,4024597,3996063,5128638,3925227,3609673,7871777",
      banCelsius: true,
      banFahren: false
    };
  }

  //call the action
  componentDidMount = () => {
    const cachedHits = localStorage.getItem("IDsCities");
    if (cachedHits != null) {
      this.props.FetchAPIResponseByIDs(cachedHits);
      //console.log("IDS!! ... ", cachedHits);
    } else {
      this.props.FetchAPIResponseByIDs(this.props.apiResponseFetchIDs);
    }
  };

  componentDidUpdate(prevProps) {
    // Fetch when repeat a city in the input
    if (this.props.apiResponseIfExist !== prevProps.apiResponseIfExist) {
      console.log("Repeated value ? -> ", this.props.apiResponseIfExist);
    }
    if (this.props.apiResponseFetchIDs !== prevProps.apiResponseFetchIDs) {
      console.log("CitiesIDs changed! -> ", this.props.apiResponseFetchIDs);
    }
  }

  addCity(city) {
    this.props.FetchAPIResponseByName(city);
  }

  deleteCity(city) {
    console.log("Click on delete", city);
    this.props.FetchResponseDeleteCity(city);
  }

  showDetails(city) {
    console.log("Click on details", city);
    this.props.FetchAPIResponseForecast(city);
    console.log("showDetails", this.props.apiResponseForecast);
  }

  clearStorage() {
    localStorage.clear();
  }

  changeMetricButton(metric) {
    console.log("Selected metric -> ", metric);

    switch (metric) {
      case "Celsius": {
        this.setState({ banCelsius: true, banFahren: false });
        break;
      }
      case "Fahrenheit": {
        this.setState({ banCelsius: false, banFahren: true });
        break;
      }
      case "Both": {
        this.setState({ banCelsius: true, banFahren: true });
        break;
      }
    }
  }

  render() {
    return (
      <div>
        <Navbar
          addCity={city => this.addCity(city)}
          changeMetric={this.changeMetricButton.bind(this)}
          clearStorage={this.clearStorage}
        />
        {this.props.apiResponseIfExist ? (
          <div className="alert alert-warning" role="alert">
            This city already exist. Check it!..
          </div>
        ) : null}

        {this.props.apiResponseFetchError ? (
          <div className="alert alert-danger" role="alert">
            Don't have results - Check it out!
          </div>
        ) : null}

        <h1 align="center" className="select-font">
          Weather App
        </h1>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Dashboard
                      cityDatas={this.props.apiResponseWeather}
                      delete={this.deleteCity.bind(this)}
                      // details={this.showDetails.bind(this)}
                      banCelsius={this.state.banCelsius}
                      banFahren={this.state.banFahren}
                    />
                  )}
                />
                <Route
                  path="/details/:city"
                  location={this.props.location}
                  key={this.props.location.key}
                  render={({ location, match }) => (
                    <Details
                      key={location.key}
                      params={match.params}
                      fetchData={this.props.FetchAPIResponseForecast}
                      cityData={this.props.apiResponseForecast}
                      banCelsius={this.state.banCelsius}
                      banFahren={this.state.banFahren}
                    />
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //allows us to get the data from the store using props -> state.ReducerName.reducerProperty
  return {
    apiResponseWeather: state.FetchWeatherReducer.weatherData,
    apiResponseForecast: state.FetchForecastReducer.forecastData,
    apiResponseWeatherCity: state.FetchWeatherCityReducer.weatherDataCity,
    apiResponseIfExist: state.FetchWeatherReducer.isExist,
    apiResponseFetchError: state.FetchWeatherReducer.errorFetch,
    apiResponseFetchIDs: state.FetchWeatherReducer.cityIDs
  };
}

//remember that to call this property using "props.FetchAPIResponse"
function matchDispatchToProps(dispatch) {
  //bind the action to be executed
  return bindActionCreators(
    {
      FetchAPIResponseByIDs: fetchAPIResponseByIDs,
      FetchAPIResponseByName: fetchAPIResponseByName,
      FetchAPIResponseForecast: fetchAPIResponseForecast,
      FetchResponseDeleteCity: fetchResponseDeleteCity
    },
    dispatch
  );
}

//we export the component using the connect from Redux and pass the functions that connect the props and the actions
export default withRouter(
  connect(
    mapStateToProps,
    matchDispatchToProps
  )(Container)
);
