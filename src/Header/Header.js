import React, { Component } from "react";
import {CurrentContext} from "../CurrentContext";
import logo from "../images/weather-watch-logo.png";
import "./Header.css";

export default class Header extends Component {
  static contextType = CurrentContext;
  render() {
    return (
      <header className='animate__animated animate__slideInDown'>
     <a href='https://weatherwatch.club/'><img src={logo} alt="Logo" className="logo" /></a> 
      </header>
    );
  }
}
