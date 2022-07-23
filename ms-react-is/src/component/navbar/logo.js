import React from "react";
import { Box, Link, Text } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Link to="/">
        <Text fontSize="xl" fontWeight="bold" color="tomato">
          新中文分级检索系统
        </Text>
      </Link>
    </Box>
  );
}
