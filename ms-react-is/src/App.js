import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import Login from "./component/login/login";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import Result from "./pages/Result";

function App() {
  // const [isLogin, setIsLogin] = useState(false);
  // if (!isLogin) {
  //   return (
  //     <ChakraProvider>
  //       <Login />
  //     </ChakraProvider>
  //   );
  // }
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
