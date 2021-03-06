import React from "react";
import ReactDOM from "react-dom";
import { ColorModeScript } from '@chakra-ui/react'
// import "./index.css";
import App from "./App";
import theme from "./theme";
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);


