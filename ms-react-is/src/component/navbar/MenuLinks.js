import React from "react";
import { Box, Link, Stack, Text } from "@chakra-ui/react";

const MenuItem = ({ children, isLogout, to = "/", ...rest }) => {
  if (isLogout) {
    localStorage.clear();
  }
  return (
    <Box p={5} border="1px solid gray" borderRadius="5" {...rest}>
      <Link href={to}>
        <Text display="block" {...rest}>
          {children}
        </Text>
      </Link>
    </Box>
  );
};

const TextItem = ({ children }) => {
  return (
    <Box p={5} border="1px solid gray" borderRadius="5">
      <Text display="block">{children}</Text>
    </Box>
  );
};

const MenuLinks = (props) => {
  return (
    <Box
      display={{ base: "block", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack spacing={2} direction="row" align="left">
        {props.user && (
          <MenuItem isLogout={true} to="/">
            登出
          </MenuItem>
        )}
        {props.user && <TextItem>用户{props.user}已登陆</TextItem>}
        {!props.user && <MenuItem to="/Login">登陆</MenuItem>}
      </Stack>
    </Box>
  );
};

export default MenuLinks;
