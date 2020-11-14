import React, { Component } from "react";
import "./button.css";
import "./App.css";
import CurrentContextProvider, { CurrentContext } from "../CurrentContext";
import Header from '../Header/Header'
import ZipForm from "../Forms/ZipForm";
import CityForm from "../Forms/CityForm";
import Main from "../Main/Main";
export default class App extends Component {
  static contextType = CurrentContext;
  render() {
    return (
      <div className="App">
        <CurrentContextProvider>
        <Header />
        <main>
          <Main />
          <section className='half'>
            <ZipForm />
            <CityForm />
          </section>
        </main>
        </CurrentContextProvider>
      </div>
    );
  }
}
