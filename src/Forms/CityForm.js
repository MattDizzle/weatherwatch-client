import React, { Component } from 'react';
import { CurrentContext } from '../CurrentContext';
import ValidationError from '../ValidationError';


export default class CityForm extends Component {
    static contextType = CurrentContext;

    validateCity() {
        const city = this.context.city.value.trim();
        if (city.length === 0) {
          return "City is required";
        } else if (city.length < 3) {
          return "City must be at least 3 characters long";
        }
      }
    
      validateProvince() {
        const province = this.context.province.value.trim();
        if (province.length === 0) {
          return "State/Province Invalid";
        } else if (province.length < 3) {
          return "State/Province must be at least 3 characters long";
        }
      }

    render() {
        const { getDataByCityAndState, updateCity, updateProvince, city, province, toggleLoadingTrue } = this.context;
        const cityError = this.validateCity();
        const provinceError = this.validateProvince();
        return (
            <form onSubmit={toggleLoadingTrue, getDataByCityAndState}>
              <label htmlFor="city">Enter a City </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                onChange={(e) => updateCity(e.target.value)}
              />
              {city.touched && (
                <ValidationError message={cityError} />
              )}
              <label htmlFor="prov">and State/Province</label>
              <input
                id="prov"
                name="prov"
                type="text"
                onChange={(e) => updateProvince(e.target.value)}
              />
              {province.touched && (
                <ValidationError message={provinceError} />
              )}
              <button
                type="submit"
                className="btn"
                disabled={this.validateCity()}
              >
                <span>Submit</span>
              </button>
            </form>
        )
    }
}
