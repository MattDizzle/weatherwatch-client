import React, { Component } from 'react';
import logo from '../images/weather-watch-logo.png';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <header>
                <img src={logo} alt="Logo" className='logo' />
            </header>
        )
    }
}
