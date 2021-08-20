import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const options = {
  position: positions.MIDDLE,
  timeout: 3000,
  offset: '25px',
  transition: transitions.FADE
}
ReactDOM.render(
  <React.StrictMode>
     <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

