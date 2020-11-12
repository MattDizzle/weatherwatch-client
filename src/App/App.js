import React, { Component } from "react";
import "./App.css";
import Header from "../Header/Header";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  city = "rialto";
  province = "california";
  zipcode = "92376";

  getData() {
    console.log(this.city, this.province);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.province}&appid=d1af8402c8f946b3ad0e892bbf7749b4`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({ data: res });
        // this.setState({ todaysWeather: res.weather[0] });
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    console.log(this.state.data.main);
    return (
      <div className="App">
        <Header />
        {/* <h1>{this.state.data.name}</h1> */}
        <form onSubmit={this.getData}>
          <label>Enter a city, state </label>
          <input type="text"></input>

          <label>or zipcode </label>
          <input id="zip" name="zip" type="text" inputmode="numeric" pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
