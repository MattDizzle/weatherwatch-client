import React, { createContext, Component } from "react";

export const CurrentContext = createContext();
export default class CurrentContextProvider extends Component {
  state = {
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
    zipcode: { value: 0, touched: false },
    loading: true,
  };

  toggleLoading = () => {
    this.setState({ loading: false });
  };

  setContext = (obj) => {
    this.setState(obj);
  };

  updateZipcode = (zipcode) => {
    this.setState({ zipcode: { value: zipcode, touched: true } });
  };

  updateCity = (city) => {
    this.setState({ city: { value: city, touched: true } });
  };

  updateProvince = (province) => {
    this.setState({ province: { value: province, touched: true } });
  };

  getDataByCityAndState = (ev) => {
    ev.preventDefault();
    this.setState({loading: !this.state.loading})
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
    this.setState({loading: !this.state.loading})
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

  render() {
    return (
      <CurrentContext.Provider
        value={{
          ...this.state,
          setContext: this.setContext,
          updateZipcode: this.updateZipcode,
          updateCity: this.updateCity,
          updateProvince: this.updateProvince,
          getDataByZip: this.getDataByZip,
          getDataByCityAndState: this.getDataByCityAndState,
          toggleLoading: this.toggleLoading
        }}
      >
        {this.props.children}
      </CurrentContext.Provider>
    );
  }
}
