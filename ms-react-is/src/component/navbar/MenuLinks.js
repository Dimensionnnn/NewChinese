import React, { useContext } from "react";
import { Box, Link, Stack, Text } from "@chakra-ui/react";
import { UserContext } from "../utils/userContext";

const MenuItem = ({ children, to, ...rest }) => {
  return (
    <Box p={5} {...rest}>
      <Link href={to}>
        <Text display="block" {...rest}>
          {children}
        </Text>
      </Link>
    </Box>
  );
};

const LogoutMemuItem = ({ children, to, ...rest }) => {
  const { user, setUser } = useContext(UserContext);
  const removeUser = () => {
    setUser("");
    localStorage.clear();
  }
  return (
    <Box p={5} {...rest}>
      <Link href={to}>
        <Text display="block" {...rest} onClick={removeUser}>
          {children}
        </Text>
      </Link>
    </Box>
  );
};

const TextItem = ({ children }) => {
  return (
    <Box p={5} borderRadius="5">
      <Text display="block">{children}</Text>
    </Box>
  );
};

const MenuLinks = (props) => {
  console.log(props.user);
  return (
    <Box
      display={{ base: "block", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack spacing={2} direction="row" align="left">
        {props.user && <LogoutMemuItem to="/">登出</LogoutMemuItem>}
        {props.user && <TextItem>用户{props.user}已登陆</TextItem>}
        {!props.user && <MenuItem to="/Login">登陆</MenuItem>}
      </Stack>
    </Box>
  );
};

export default MenuLinks;
