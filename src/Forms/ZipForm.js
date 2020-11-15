import React, { Component } from 'react';
import { CurrentContext } from '../CurrentContext';
import ValidationError from '../ValidationError';

export default class ZipForm extends Component {
    static contextType = CurrentContext;

    validateZipcode() {
      const zipcode = parseInt(this.context.zipcode.value);
      if (zipcode.toString().length < 5) {
        return "Zip code must be at least 5 numbers long";
      } 
    }

    render() {
        const { getDataByZip, updateZipcode} = this.context;
        const { zipcode } = this.context
        const zipError = this.validateZipcode();
        return (
          <form onSubmit={getDataByZip}>
            <label htmlFor="zip">Enter a Zip Code </label>
            <input
              id="zip"
              name="zip"
              type="text"
              pattern="[0-9]*"
              required
              onChange={(e) => updateZipcode(e.target.value)}
            />
            {zipcode.touched && (
                <ValidationError message={zipError} />
              )}
            
            <button
              type="submit"
              className="btn"
              disabled={this.validateZipcode()}
            >
              <span>Submit</span>
            </button>
          </form>
        )
    }
}
