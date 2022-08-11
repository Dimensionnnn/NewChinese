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
      light: "#85C1E9",
      main: "#5DADE2",
      dark: "#3498DB",
      contrastText: "#fff",
    },
    secondary: {
      main: '#D6EAF8',
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
