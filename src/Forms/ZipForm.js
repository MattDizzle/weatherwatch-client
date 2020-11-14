import React, { Component } from 'react';
import { CurrentContext } from '../CurrentContext';
import ValidationError from '../ValidationError';

export default class ZipForm extends Component {
    static contextType = CurrentContext;

    validateZipcode() {
      const zipcode = this.context.zipcode.value.trim();
      if (zipcode.length === 0) {
        return "Zip code Invalid";
      } else if (zipcode.length < 5) {
        return "Zip code must be at least 5 characters long";
      }
    }
    render() {
        const { getDataByZip, updateZipcode } = this.context;
        const { zipcode } = this.context
        const zipError = this.validateZipcode();
        return (
          <form onSubmit={getDataByZip}>
            <label htmlFor="zip">or Zip Code </label>
            <input
              id="zip"
              name="zip"
              type="text"
              required
              onChange={(e) => updateZipcode(e.target.value)}
            />
            {zipcode.touched && (
                <ValidationError message={zipError} />
              )}
            
            <button
              type="submit"
              className="btn"
            >
              <span>Submit</span>
            </button>
          </form>
        )
    }
}
