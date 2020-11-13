import React, { Component } from "react";
import "./App.css";
import Header from "../Header/Header";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        "coord": {
            "lon": null,
            "lat": null
        },
        "weather": [
            {
                "id": null,
                "main": "",
                "description": "",
                "icon": ""
            }
        ],
        "base": "",
        "main": {
            "temp": null,
            "feels_like": null,
            "temp_min": null,
            "temp_max": null,
            "pressure": null,
            "humidity": null
        },
        "visibility": null,
        "wind": {
            "speed": null,
            "deg": null,
            "gust": null
        },
        "clouds": {
            "all": null
        },
        "dt": null,
        "sys": {
            "type": null,
            "id": null,
            "country": "",
            "sunrise": null,
            "sunset": null
        },
        "timezone": null,
        "id": null,
        "name": "",
        "cod": null
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
    // let main = this.state.data["main"];
    const { main } = this.state.data;
    const { temp } = this.state.data.main
    // console.log(main.temp);
    return (
      <div className="App">
        <Header />
        <h2>{this.state.data.name}</h2>
        {(temp) ? <h2>{Math.round(temp)}<span>°F</span>/{Math.round((5/9) * (temp - 32))}<span>℃</span> </h2> : ""}
        
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
