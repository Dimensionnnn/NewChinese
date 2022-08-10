import React, { useState, useContext } from "react";
// import {
//   Flex,
//   Box,
//   Heading,
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
// } from "@chakra-ui/react";
import ErrorMessage from "../component/login/ErrorMessage";
import axios from "axios";
// import useToken from "../component/utils/useToken";
// import { UserContext } from "../component/utils/userContext";
import { Navigate } from "react-router-dom";

const options = {
  method: "POST",
  url: "http://106.75.250.96:8888/api/open/login",
  headers: { "content-type": "application/json", Accept: "application/json" },
};

function setToken(userToken) {
  localStorage.setItem("loggedIn", JSON.stringify(userToken));
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const { token, setToken } = useToken();
  const [loggedIn, setLoggedIn] = useState(false);
  // const { user, setUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    let info = { password: password, username: username };
    options.data = info;
    axios
      .request(options)
      .then((res) => {
        const statusCode = res.data.code;
        switch (statusCode) {
          case 200:
            const token = res.data.data.token;
            const user = res.data.data.name;
            alert("用户" + user + "登陆成功！");
            setToken(token);
            // setUser(user);
            setLoggedIn(true);
          default:
            event.target.reset();
            setError("Invalid username or password");
            setUsername("");
            setPassword("");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    // <Flex width="full" align="center" justifyContent="center">
      {/* <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error} />}
            <FormControl isRequired>
              <FormLabel>用户名</FormLabel>
              <Input
                placeholder="root"
                size="lg"
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>密码</FormLabel>
              <Input
                type="password"
                placeholder="********"
                size="lg"
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </FormControl>
            <Button
              width="full"
              mt={4}
              type="submit"
              colorScheme="blue"
              variant="outline"
            >
              登陆
            </Button>
          </form>
        </Box>
      </Box> */}
    // </Flex>
  );
}

const Login = () => {
  return <LoginForm />;
};

export default Login;
