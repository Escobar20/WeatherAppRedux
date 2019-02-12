import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./card.css";

class Card extends Component {
  render() {
    const ruta = this.props.data;
    return (
      <div className="col-md-4 col-xl-3 align-items-stretch">
        <div className="cardstyle mb-3 shadow-sm" styles="width: 18rem;">
          <span className="center">
            <img src={require(`../img/${ruta.weather[0].main}.png`)} />
          </span>

          <div className="card-body white">
            <h5 className="card-title">
              {" "}
              {ruta.name}, {ruta.sys.country}{" "}
            </h5>

            {this.props.banFahren ? (
              <p className="card-text"> Current temp(F) : {ruta.main.temp} </p>
            ) : null}

            {this.props.banCelsius ? (
              <p className="card-text">
                {" "}
                Current temp(C) : {(ruta.main.temp - 275.15).toFixed(2)}{" "}
              </p>
            ) : null}

            <p className="card-text"> Main: {ruta.weather[0].main} </p>
            <p className="card-text">
              {" "}
              Description: {ruta.weather[0].description}{" "}
            </p>
            <p>
              <Link
                to={`/details/${ruta.name},${ruta.sys.country}`}
                className="btn btn-primary"
                // onClick={this.props.details}
              >
                Details
              </Link>
              &nbsp;
              <a className="btn btn-dark" onClick={this.props.delete}>
                Delete
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
