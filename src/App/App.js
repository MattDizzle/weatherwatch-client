import React, { Component } from "react";
import "./button.css";
import "./App.css";
import logo from "../images/weather-watch-logo.png";
import hero from "../images/weather-watch-logo.png";
import ValidationError from "../ValidationError";

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

  updateCity(city) {
    this.setState({ city: { value: city, touched: true } });
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
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then((res) => {
        this.setState({ data: res });
        window.scroll({
          top: 100,
          left: 100,
          behavior: "smooth",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDataByZip = (ev) => {
    ev.preventDefault();
    const { zip } = ev.target;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&appid=d1af8402c8f946b3ad0e892bbf7749b4&units=imperial`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then((res) => {
        this.setState({ data: res });
        window.scroll({
          top: 100,
          left: 100,
          behavior: "smooth",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  validateCity() {
    const city = this.state.city.value.trim();
    if (city.length === 0) {
      return "City is required";
    } else if (city.length < 3) {
      return "City must be at least 3 characters long";
    }
  }

  validateProvince() {
    const province = this.state.province.value.trim();
    if (province.length === 0) {
      return "State/Province Invalid";
    } else if (province.length < 3) {
      return "State/Province must be at least 3 characters long";
    }
  }

  validateZipcode() {
    const zipcode = this.state.zipcode.value.trim();
    if (zipcode.length === 0) {
      return "Zip code Invalid";
    } else if (zipcode.length < 3) {
      return "Zip code must be at least 3 characters long";
    }
  }

  render() {
    const {
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity,
    } = this.state.data.main;
    const { lon, lat } = this.state.data.coord;
    const { description, icon } = this.state.data.weather[0];
    const { speed } = this.state.data.wind;
    const { country } = this.state.data.sys;
    const iconString = `http://openweathermap.org/img/wn/${icon}.png`;
    const cityError = this.validateCity();
    const provinceError = this.validateProvince();
    const zipError = this.validateZipcode();

    return (
      <div className="App">
        <header>
          <img src={logo} alt="Logo" className="logo" />
        </header>

        <main>
          <section className="half">
            <h1>{this.state.data.name}</h1>

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
                    <img src={iconString} className="weather-pic" />
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
                  Humidity: {humidity} Wind: {speed}
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
                <img src={hero} alt="hero-pic" className="hero-pic" />
              </div>
            )}
          </section>

          <section className="half">
            <form onSubmit={this.getDataByCityAndState}>
              <label htmlFor="city">Enter a city </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                onChange={(e) => this.updateCity(e.target.value)}
              />
              {/* <ValidationError message={cityError} /> */}
              {this.state.city.touched && (
                <ValidationError message={cityError} />
              )}
              <label htmlFor="prov">and State/Province</label>
              <input
                id="prov"
                name="prov"
                type="text"
                onChange={(e) => this.updateProvince(e.target.value)}
              />
              {/* <ValidationError message={provinceError} /> */}
              {this.state.province.touched && (
                <ValidationError message={provinceError} />
              )}
              <button type="submit" className="btn">
                <span>Submit</span>
              </button>
            </form>

            <form onSubmit={this.getDataByZip}>
              <label htmlFor="zip">or zipcode </label>
              <input
                id="zip"
                name="zip"
                type="text"
                required
                onChange={(e) => this.updateZipcode(e.target.value)}
              />
              {this.state.zipcode.touched && (
                <ValidationError message={zipError} />
              )}

              <button
                type="submit"
                className="btn"
                disabled={
                  this.validateCity() ||
                  this.validateProvince() ||
                  this.validateZipcode()
                }
              >
                <span>Submit</span>
              </button>
            </form>
          </section>
        </main>
      </div>
    );
  }
}
