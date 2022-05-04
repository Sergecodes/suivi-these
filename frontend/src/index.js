import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
