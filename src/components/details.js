import React, { Component } from "react";
import DetailsCard from "./detailscard";

class Details extends Component {
  state = {
    City: undefined,
    Datas: undefined
  };

  componentDidMount() {
    this.props.fetchData(this.props.params.city);

    this.setState({ City: this.props.params.city }, function() {
      console.log("URL HANDLE ", this.state.City);
    });
  }

  componentDidUpdate(prevProps) {
    // Fetch when repeat a city in the input
    if (this.props.cityData !== prevProps.cityData) {
      console.log("We have new Datas!");
      console.log("ñeeeeeeem -> ", this.props.cityData);
      this.setState({ Datas: this.props.cityData }, function() {
        console.log("Datas -> ", this.state.Datas);
      });
    }
  }

  render() {
    var components = this.props.cityData.map((data, i) => {
      console.log("data ", data);
      return (
        <DetailsCard
          key={i}
          dia={data.Dia}
          data={data.Horas}
          banCelsius={this.props.banCelsius}
          banFahren={this.props.banFahren}
        />
      );
    });

    return (
      <div>
        <h1>Details of {this.state.City}</h1>
        {components}
      </div>
    );
  }
}

export default Details;
