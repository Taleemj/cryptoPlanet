import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";

import { DataContextProvider } from "./components/contexts/DataContextProvider";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <DataContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
