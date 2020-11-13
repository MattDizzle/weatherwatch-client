import React, { Component } from "react";
import "./App.css";
import logo from "../images/weather-watch-logo.png";
import moment from 'moment';
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
    console.log(this.state.zipcode);
    console.log("targets--", zip.value);
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
    // console.log(main.temp);
    return (
      <div className="App">
        <img src={logo} alt="Logo" className='logo' />
        <h2>{this.state.data.name}</h2>
        {temp ? (
          <div className='temp-box'>
            <div className='temp-box-top'>
            <h2 className="tempature">{Math.round(temp)}</h2>
            <span>°F</span>/
            <h2>{Math.round((5 / 9) * (temp - 32))}</h2>
            <span>℃</span>
            </div>
        <div>Feels like: {feels_like} | Min Temp: {temp_min} | Max Temp: {temp_max}</div>
          </div>
        ) : (
          ""
        )}
        

        <form onSubmit={this.getDataByCityAndState}>
          <label>Enter a city </label>
          <input
            id="city"
            name="city"
            type="text"
            onChange={(e) => this.updateCity(e.target.value)}
          />
          <label>and State/Province </label>
          <input
            id="prov"
            name="prov"
            type="text"
            onChange={(e) => this.updateProvince(e.target.value)}
          />
          <input type="submit" />
        </form>

        <form onSubmit={this.getDataByZip}>
          <label>or zipcode </label>
          <input
            id="zip"
            name="zip"
            type="text"
            onChange={(e) => this.updateZipcode(e.target.value)}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
