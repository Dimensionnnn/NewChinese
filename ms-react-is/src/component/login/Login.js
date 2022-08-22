import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { motion } from "framer-motion";
import axios from "axios";

import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/user/loginState";
import { userLoggedIn } from "../store/user/userInfo";
import { reset } from "../store/display/homeSet";


const options = {
  method: "POST",
  url: "http://106.75.250.96:8888/api/open/login",
  headers: { "content-type": "application/json", Accept: "application/json" },
};

export default function Login() {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.loginState.value);
  const handleLogin = (event) => {
    event.preventDefault();
    let info = { password: password, username: username };
    options.data = info;
    axios
      .request(options)
      .then((res) => {
        const statusCode = res.data.code;
        switch (statusCode) {
          case 200:
            console.log(res.data.data);
            const token = res.data.data.token;
            const user = res.data.data.name;
            const payload = {
              user: user,
              token: token
            }
            alert("用户" + user + "登陆成功！");
            dispatch(login());
            dispatch(userLoggedIn(payload));
            break;
          default:
            event.target.reset();
            setUsername("");
            setPassword("");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  if (loggedIn) {
    dispatch(reset());
    return <Navigate to="/" />;
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            bgcolor: `${theme.palette.primary.light}`,
          }}
          minHeight="100vh"
        >
          <form onSubmit={handleLogin}>
            <h2>登录</h2>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="用户名"
              name="username"
              autoFocus
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
            <TextField
              rvariant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type="password"
              id="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            <Button fullWidth type="submit" variant="contained">
              用户登录
            </Button>
          </form>
        </Box>
      </motion.div>
    </>
  );
}
