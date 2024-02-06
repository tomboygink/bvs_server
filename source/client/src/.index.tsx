import React from "react";
import ReactDOM from "react-dom/client";
//import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";

import { Provider } from "react-redux";
import { setupStore } from "./storage/store.ts";

import "../scss/main.scss";

// стартовый файл
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const store = setupStore();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
