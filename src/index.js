import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { TokenProvider } from "./components/Server/TokenContext";
import store from "./components/ReduxStateManagement/store";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TokenProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TokenProvider>
    </Provider>
  </React.StrictMode>
);
