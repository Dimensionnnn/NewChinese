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
import { word, article, edit, login, reset } from "../store/display/homeSet";
import { loggedin, loggedout } from "../store/user/loginState";
import { userLoggedout } from "../store/user/userInfo";
import { useNavigate } from "react-router-dom";
import { clearArticle } from "../store/article/articleSet";

const calculateColor = (value) => {
  let bgColor;
  switch (value) {
    case 1:
      bgColor = "#4DA4EA";
      break;
    case 2:
      bgColor = "#bc2439";
      break;
    case 3:
      bgColor = "#26A080";
      break;
  }
  return bgColor;
};

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo.user);
  const userLoggedIn = useSelector((state) => state.loginState.value);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const backToHome = () => {
    dispatch(reset());
    navigate("/");
  };
  const handleWordSearch = () => {
    dispatch(word());
    navigate("/");
  };
  const handleArticleSearch = () => {
    dispatch(article());
    navigate("/");
  };
  const handleArticleAnalysis = () => {
    if (userLoggedIn) {
      navigate("/");
      dispatch(edit());
    } else {
      navigate("/");
      dispatch(login());
    }
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const userDashboard = () => {
    setAnchorElUser(null);
    navigate("/dashboard");
  };
  const userLogout = () => {
    setAnchorElUser(null);
    dispatch(reset());
    dispatch(loggedout());
    const user = "";
    const token = "";
    const userid = "";
    const payload = {
      user: user,
      token: token,
      userid: userid,
    };
    const articlePayload = {
      value: "",
      hit: "",
      selectedIndex: "",
      userid: "",
    };
    dispatch(clearArticle(articlePayload));
    dispatch(userLoggedout(payload));
    navigate("/");
  };
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.loginState.value);
  const homeSetValue = useSelector((state) => state.homeSet.value);
  const backgroundColor = calculateColor(homeSetValue);
  return (
    <AppBar position="static" sx={{ bgcolor: backgroundColor }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={backToHome}
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
              onClick={handleWordSearch}
              onContextMenu={handleWordSearch}
            >
              词语检索
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handleArticleSearch}
              onContextMenu={handleArticleSearch}
            >
              文章检索
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handleArticleAnalysis}
              onContextMenu={handleArticleAnalysis}
            >
              分析文章
            </Button>
          </Box>
          {loggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="用户设置">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: "#0A7DA5" }}>
                    {user.charAt(0).toUpperCase()}
                  </Avatar>
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
                onClick={() => {
                  dispatch(login());
                  navigate("/");
                }}
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
