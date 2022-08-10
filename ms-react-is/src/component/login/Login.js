import React from "react";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { motion } from "framer-motion";


export default function Login() {
  const theme = useTheme();
  const handleLogin = () => {};
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
          <form>
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
            />
            <Button fullWidth variant="contained" onClick={handleLogin}>
              用户登录
            </Button>
          </form>
        </Box>
      </motion.div>
    </>
  );
}
