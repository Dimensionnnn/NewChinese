import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { useDispatch, useSelector } from "react-redux";
import { word, article, edit, login } from "../store/display/homeSet";
import { logout } from "../store/user/loginState";
import { useNavigate } from "react-router-dom";


const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const userDashboard = () => {
    setAnchorElUser(null);
    navigate('/dashboard');
  }
  const userLogout = () => {
    setAnchorElUser(null);
    dispatch(logout());
  };
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.loginState.value);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            新中文检索系统
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => dispatch(word())}
            >
              词语检索
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => dispatch(article())}
            >
              文章检索
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => dispatch(edit())}
            >
              分析文章
            </Button>
          </Box>
          {loggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="用户设置">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={userDashboard}>
                  <Typography textAlign="center">个人主页</Typography>
                </MenuItem>
                <MenuItem onClick={userLogout}>
                  <Typography textAlign="center">登出</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => dispatch(login())}
              >
                用户登录
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
