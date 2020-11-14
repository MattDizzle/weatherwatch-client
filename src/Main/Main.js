import React, { Component } from "react";
import { CurrentContext } from "../CurrentContext";
import hero from "../images/weather-watch-logo.png";

export default class Main extends Component {
    static contextType = CurrentContext;

  render() {
    const {
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
      } = this.context.data.main;
      const { lon, lat } = this.context.data.coord;
      const { description, icon } = this.context.data.weather[0];
      const { speed } = this.context.data.wind;
      const { country } = this.context.data.sys;
      const iconString = `http://openweathermap.org/img/wn/${icon}.png`;
    return (
        <section className="half">
          <h1>{this.context.data.name}</h1>

          {temp ? (
            <p>
              Longitude:<span>{lon}</span> Latitude:<span>{lat}</span>
            </p>
          ) : (
            ""
          )}

          {temp ? (
            <section className="temp-box">
              <div className="temp-box-top">
                <div className="icon-box">
                  <img src={iconString} className="weather-pic" alt='weather-watch-logo' />
                  <span>{description}</span>
                </div>
                <div>
                  <h3>
                    {Math.round(temp)}
                    <span>°F</span>
                    {"  "}
                    {Math.round((5 / 9) * (temp - 32))}
                    <span>℃</span>
                  </h3>
                </div>
                <h4>Current Temperature</h4>
              </div>

              <div className="sub-temps">
                Humidity: {humidity} <span>%</span> Wind: {speed}
                <span>mph</span>
              </div>

              <div className="sub-temps">
                Min Temp: {Math.round(temp_min)}
                <span>°F</span> Max Temp: {Math.round(temp_max)}
                <span>°F</span>
              </div>

              <div className="sub-temps">
                Feels like: {Math.round(feels_like)}
                <span>°F</span> Country:<span>{country}</span>
              </div>
            </section>
          ) : (
            <div>
              <img src={hero} className="hero-pic" alt='weather-watch-logo-hero-pic' />
            </div>
          )}
        </section>
    );
  }
}
