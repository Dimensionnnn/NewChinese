import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import Result from "./pages/Result";

const theme = createTheme({
  palette: {
    primary: {
      light: "#4DA4EA",
      main: "#2193b0",
      dark: "#315399",
      contrastText: "#fff",
    },
    secondary: {
      main: '#45ACD5',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
