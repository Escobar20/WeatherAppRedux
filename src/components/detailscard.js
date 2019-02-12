import React, { Component } from "react";
import moment from "moment"; //new Date(this.props.dia).toString() | moment(this.props.dia).fromNow()

import { FormattedDate, FormattedTime } from "react-intl";
import "./card.css";

var options = {
  hour: "numeric",
  minute: "numeric",
  hour12: true
};

class DetailsCard extends Component {
  render() {
    const data = this.props.data;
    return (
      <div>
        {/* class="left" */}
        <br /> <br />
        <div className="row">
          <h2>
            {" "}
            &nbsp;&nbsp; Day:{" "}
            {
              <FormattedDate
                value={new Date(this.props.dia)}
                day="numeric"
                month="long"
                year="numeric"
              />
            }{" "}
          </h2>

          {data.map((element, i) => (
            <div className="col-md-4 col-xl-3 align-items-stretch" key={i}>
              <br />
              <br />
              <div className="cardstyle mb-3 shadow-sm" styles="width: 18rem;">
                <span className="center">
                  <img src={require(`../img/${element.main}.png`)} />
                </span>

                <div className="card-body center">
                  <h5 className="card-title">
                    {" "}
                    Time : {
                      <FormattedTime value={new Date(element.fecha)} />
                    }{" "}
                  </h5>

                  {this.props.banFahren ? (
                    <p className="card-text">
                      {" "}
                      Current temp(F) : {element.temp}{" "}
                    </p>
                  ) : null}

                  {this.props.banCelsius ? (
                    <p className="card-text">
                      {" "}
                      Current temp(C) : {(element.temp - 275.15).toFixed(
                        2
                      )}{" "}
                    </p>
                  ) : null}

                  <p className="card-text"> Temp. Max.: {element.temp_max} </p>
                  <p className="card-text"> Temp. Max.: {element.temp_min} </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default DetailsCard;
