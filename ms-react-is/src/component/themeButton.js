import { Button, useColorMode } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from 'react';

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        style={{ display: "inline-block" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeButton;
