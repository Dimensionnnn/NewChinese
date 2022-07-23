import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Analysis from "./pages/Analysis";
import Result from "./pages/Result";
import { UserContext } from "./component/utils/userContext";

function App() {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <UserContext.Provider value={providerValue}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default App;
