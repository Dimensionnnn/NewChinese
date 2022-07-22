import React from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

const Login = (props) => {
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const login = () => {
    props.loggedIn(true);
  }
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
        <Input
          placeholder="admin"
          type="email"
          variant="filled"
          mb={3}
        />
        <Input
          placeholder="123456"
          type="password"
          variant="filled"
          mb={6}
        />
        <Button colorScheme="teal" mb={8} onClick={login}>
          Log In
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
