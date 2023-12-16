import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { TokenProvider } from "./components/Server/TokenContext";
import store from "./components/ReduxStateManagement/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TokenProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TokenProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
