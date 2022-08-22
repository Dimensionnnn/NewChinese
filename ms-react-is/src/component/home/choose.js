import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { word, article, edit } from "../store/display/homeSet";
import { useTheme } from "@mui/material/styles";


const Choose = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Stack direction="row" spacing={2}>
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.8 }}
            >
              <Button
                variant="contained"
                sx={{ height: 200, width: 200, fontSize: 30, backgroundColor: `${theme.palette.primary.light}` }}
                onClick={() => dispatch(word())}
              >
                词语检索
              </Button>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.8 }}
            >
              <Button
                variant="contained"
                sx={{ height: 200, width: 200, fontSize: 30, bgcolor: `${theme.palette.primary.main}` }}
                onClick={() => dispatch(article())}
              >
                文章检索
              </Button>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.8 }}
            >
              <Button
                variant="contained"
                sx={{ height: 200, width: 200, fontSize: 30, bgcolor: `${theme.palette.primary.dark}` }}
                onClick={() => dispatch(edit())}
              >
                分析文章
              </Button>
            </motion.div>
          </Stack>
        </motion.div>
      </Box>
    </>
  );
};

export default Choose;
