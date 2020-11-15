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
    const { toggleZip,toggleLoading, loading, searchByZip } = this.context;
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
                <button className='btn toggler' onClick={toggleZip}><span>{searchByZip ? "Search by City, State" : "Search by Zipcode" }</span></button>
                  {searchByZip ? <ZipForm /> : <></>}
                  {!searchByZip ? <CityForm /> : <></>}
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
