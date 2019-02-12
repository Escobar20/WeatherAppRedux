import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./card.css";

class Navbar extends Component {
  handleSubmit(event) {
    let input = this.refs.input;
    event.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    this.props.addCity(input.value);
    input.value = "";
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <Link to="/" className="navbar-brand">
            <img
              src={require("../img/icon.png")}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            Weather
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a
                  className="nav-link"
                  href="#"
                  onClick={this.props.clearStorage}
                >
                  {""}
                  Clear <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Select metric
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a
                    className="dropdown-item"
                    onClick={this.props.changeMetric.bind(this, "Celsius")}
                  >
                    Celsius
                  </a>
                  <a
                    className="dropdown-item"
                    onClick={this.props.changeMetric.bind(this, "Fahrenheit")}
                  >
                    Fahrenheit
                  </a>
                  <div className="dropdown-divider" />
                  <a
                    className="dropdown-item"
                    onClick={this.props.changeMetric.bind(this, "Both")}
                  >
                    Both
                  </a>
                </div>
              </li>
            </ul>
            <form
              className="form-inline my-2 my-lg-0"
              onSubmit={this.handleSubmit.bind(this)}
            >
              <input
                className="form-control mr-sm-2"
                type="text"
                name="city"
                placeholder="Search"
                aria-label="Search"
                ref="input"
              />
              <button
                className="btn btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
