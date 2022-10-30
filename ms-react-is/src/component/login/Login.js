import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { motion } from "framer-motion";
import axios from "axios";

import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loggedin } from "../store/user/loginState";
import { userLoggedIn } from "../store/user/userInfo";
import { article, reset } from "../store/display/homeSet";
import { articleSet } from "../store/article/articleSet";
import PubSub from "pubsub-js";

const options = {
  method: "POST",
  url: "http://106.75.250.96:8888/api/open/login",
  headers: { "content-type": "application/json", Accept: "application/json" },
};
const sendToken = (usertoken) => {
  PubSub.publish("sendtoken", usertoken);
};

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  // const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userid2, setUserid2] = useState("");
  const dispatch = useDispatch();
  // var _userid = "";
  const loggedIn = useSelector((state) => state.loginState.value);
  const { value, hit, selectedIndex, userid } = useSelector(
    (state) => state.articleSet
  );
  // const _userid = useSelector((state) => state.userInfo.userid);
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
            console.log("location", location);
            const token = res.data.data.token;
            sendToken(token);
            const userid = res.data.data.id;
            setUserid2(res.data.data.id);
            const user = res.data.data.name;
            const payload = {
              user: user,
              token: token,
              userid: userid,
            };
            alert("用户" + user + "登陆成功！");
            dispatch(loggedin());
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
    if (hit !== "") {
      dispatch(article());
      console.log("userid2", userid2);
      navigate("/result", {
        state: {
          value: value,
          hit: hit,
          selectedIndex: selectedIndex,
          userid: userid2,
        },
      });
    } else {
      dispatch(reset());
      return <Navigate to="/" />;
    }
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
            bgcolor: "white",
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
