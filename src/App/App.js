import React, { Component } from "react";
import "./App.css";
import logo from "../images/weather-watch-logo.png";
import hero from "../images/weather-watch-logo.png";
import moment from "moment";
moment().format();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        coord: {
          lon: null,
          lat: null,
        },
        weather: [
          {
            id: null,
            main: "",
            description: "",
            icon: "",
          },
        ],
        base: "",
        main: {
          temp: null,
          feels_like: null,
          temp_min: null,
          temp_max: null,
          pressure: null,
          humidity: null,
        },
        visibility: null,
        wind: {
          speed: null,
          deg: null,
          gust: null,
        },
        clouds: {
          all: null,
        },
        dt: null,
        sys: {
          type: null,
          id: null,
          country: "",
          sunrise: null,
          sunset: null,
        },
        timezone: null,
        id: null,
        name: "",
        cod: null,
      },
      city: { value: "", touched: false },
      province: { value: "", touched: false },
      zipcode: { value: "", touched: false },
    };
  }

  updateCity(user_email) {
    this.setState({ city: { value: user_email, touched: true } });
  }

  updateProvince(province) {
    this.setState({ province: { value: province, touched: true } });
  }

  updateZipcode(zipcode) {
    this.setState({ zipcode: { value: zipcode, touched: true } });
  }

  getDataByCityAndState = (ev) => {
    ev.preventDefault();
    const { city, prov } = ev.target;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value},${prov.value}&appid=d1af8402c8f946b3ad0e892bbf7749b4&units=imperial`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({ data: res });
      });
  };

  getDataByZip = (ev) => {
    ev.preventDefault();
    const { zip } = ev.target;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&appid=d1af8402c8f946b3ad0e892bbf7749b4&units=imperial`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({ data: res });
      });
  };

  render() {
    const {
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
    } = this.state.data.main;
    const { lon, lat } = this.state.data.coord;
    const { main, description, icon } = this.state.data.weather;
    const { speed, deg, gust } = this.state.data.wind;
    const { country, sunrise, sunset } = this.state.data.sys;
    // console.log(moment(sunrise).hours() + ":" + moment(sunrise).minutes());
    console.log(country);
    return (
      <div className="App ">
        <header>
          <img src={logo} alt="Logo" className="logo" />
        </header>

        <main>
          <div className="half">
            <h1>{this.state.data.name}</h1>
            {temp ? (
              <div className="temp-box ">
                <div className="temp-box-top">
                  <h3>{Math.round(temp)}</h3>
                  <span>°F</span>
                  <h3>/</h3>
                  <h3>{Math.round((5 / 9) * (temp - 32))}</h3>
                  <span>℃</span>
                </div>
                <div className="sub-temps">
                  Feels like: {Math.round(feels_like)}
                  <span>°F</span> | Min Temp: {Math.round(temp_min)}
                  <span>°F</span> | Max Temp: {Math.round(temp_max)}
                  <span>°F</span>
                </div>
                <div className="sub-temps">
                  Sunrise:{" "}
                  {moment(sunrise).hours() +
                    1 +
                    ":" +
                    moment(sunrise).minutes()}
                  am | Sunset:{" "}
                  {moment(sunset).hours() - 1 + ":" + moment(sunset).minutes()}
                  pm | Country:{country}
                </div>
              </div>
            ) : (
              <div>
                <img src={hero} alt="hero-pic" className="hero-pic" />
              </div>
            )}
          </div>

          <div className="half">
            <form onSubmit={this.getDataByCityAndState}>
              <label>Enter a city </label>
              <input
                id="city"
                name="city"
                type="text"
                onChange={(e) => this.updateCity(e.target.value)}
              />
              <label>and State/Province (optional)</label>
              <input
                id="prov"
                name="prov"
                type="text"
                onChange={(e) => this.updateProvince(e.target.value)}
              />
              <button type="submit">Submit </button>
            </form>

            <form onSubmit={this.getDataByZip}>
              <label>or zipcode </label>
              <input
                id="zip"
                name="zip"
                type="text"
                onChange={(e) => this.updateZipcode(e.target.value)}
              />
              <button type="submit">Submit </button>
            </form>
          </div>
        </main>
      </div>
    );
  }
}
