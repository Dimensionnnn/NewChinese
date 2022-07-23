import React from "react";
import { Box, Link, Stack, Text } from "@chakra-ui/react";

const MenuItem = ({ children, isLogout, to = "/", ...rest }) => {
  if (isLogout) {
    localStorage.clear();
  }
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const TextItem = ({ children }) => {
  return (
    <Text display="block">
      {children}
    </Text>
  )
}

const MenuLinks = (props) => {
  return (
    <Box
      display={{ base: "block", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        {props.user && <MenuItem isLogout={true} to="/">登出</MenuItem>}
        {props.user && <TextItem>用户{props.user}已登陆</TextItem>}
        {!props.user && <MenuItem to="/Login">登陆</MenuItem>}
      </Stack>
    </Box>
  );
};

export default MenuLinks;
