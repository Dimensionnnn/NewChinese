import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./pages/Home";

const theme = createTheme({
  palette: {
    primary: {
      light: '#85C1E9',
      main: '#5DADE2',
      dark: '#3498DB',
      contrastText: '#fff',
    },
    // secondary: {
    //   light: '#D1F2EB',
    //   main: '#A3E4D7',
    //   dark: '#76D7C4',
    //   contrastText: '#000',
    // },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
