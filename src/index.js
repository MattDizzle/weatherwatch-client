import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import CurrentContextProvider from "./CurrentContext";


ReactDOM.render(
  <CurrentContextProvider>
    <App />
  </CurrentContextProvider>,
  document.getElementById('root')
);


