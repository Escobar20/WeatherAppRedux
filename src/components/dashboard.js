import React, { Component } from "react";
import Card from "./card";

class Dashboard extends Component {
  render() {
    if (this.props.cityDatas[2] === "OK") {
      components = (
        <Card
          data={this.props.cityDatas[0]}
          delete={this.props.delete.bind(this, this.props.cityDatas[0].name)}
          // details={this.props.details.bind(this, this.props.cityDatas[0].name)}
          banCelsius={this.props.banCelsius}
          banFahren={this.props.banFahren}
        />
      );
    } else if (this.props.cityDatas.length >= 1) {
      var components = this.props.cityDatas.map((data, i) => {
        return (
          <Card
            key={i}
            data={data}
            delete={this.props.delete.bind(this, data.name)}
            // details={this.props.details.bind(this, data.name)}
            banCelsius={this.props.banCelsius}
            banFahren={this.props.banFahren}
          />
        );
      });
    } else {
      components = <h3>The list is empty. Search and add something ...</h3>;
    }

    return components;
  }
}

export default Dashboard;
