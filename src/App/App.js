import React, { Component } from "react";
import "./button.css";
import "./App.css";
import { CurrentContext } from "../CurrentContext";
import Header from "../Header/Header";
import ZipForm from "../Forms/ZipForm";
import CityForm from "../Forms/CityForm";
import Main from "../Main/Main";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";
export default class App extends Component {
  static contextType = CurrentContext;

  render() {
    const {toggleLoading, loading } = this.context;
    const timer = setTimeout(toggleLoading, 3000);
    if(loading === true){
      setTimeout(toggleLoading, 3000);
    }
    if(loading === false){
      clearTimeout(timer)
    }
    return (
      <>
        {loading === false ? (
            <div className="App">
              <Header />
              <main>
                <Main />
                <section className="half">
                  <ZipForm />
                  <CityForm />
                </section>
              </main>
           
            </div>
        ) : (
            <LoadingScreen />
        )
        }
        </>
    );
  }
}
