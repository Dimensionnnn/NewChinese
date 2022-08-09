import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Analysis from "./pages/Analysis";
import Result from "./pages/Result";

const theme = createTheme({
  palette: {
    primary: {
      light: "#85C1E9",
      main: "#5DADE2",
      dark: "#3498DB",
      contrastText: "#fff",
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
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
