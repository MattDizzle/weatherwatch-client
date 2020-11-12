import React, { Component } from 'react'
import './App.css';
import Header from '../Header/Header';
export default class App extends Component {
  componentDidMount(req,res,next ){

  }
  render() {
    return (
      <div className='App'>
        <Header />
        
      </div>
    )
  }
}

