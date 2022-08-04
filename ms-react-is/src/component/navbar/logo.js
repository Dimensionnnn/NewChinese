import React from "react";
import { Box, Link, Image } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Link to="/">
        <Image src='/logo.png' alt='logo'></Image>
      </Link>
    </Box>
  );
}
