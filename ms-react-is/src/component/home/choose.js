import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { word, article, edit, login, reset } from "../store/display/homeSet";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Choose = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.loginState.value);
  const handleArticleAnalysis = () => {
    if (userLoggedIn) {
      navigate("/");
      dispatch(edit());
    } else {
      dispatch(login());
    }
  };
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
                textShadow: "0px 0px 4px gray",
              }}
              whileTap={{ scale: 0.8 }}
            >
              <Button
                variant="contained"
                sx={{
                  height: 200,
                  width: 200,
                  fontSize: 30,
                  backgroundColor: "#4DA4EA",
                }}
                onClick={() => dispatch(word())}
              >
                词语检索
              </Button>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 },
                textShadow: "0px 0px 4px gray",
              }}
              whileTap={{ scale: 0.8 }}
            >
              <Button
                variant="contained"
                sx={{
                  height: 200,
                  width: 200,
                  fontSize: 30,
                  bgcolor: "#bc2439",
                }}
                onClick={() => dispatch(article())}
              >
                文章检索
              </Button>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 },
                textShadow: "0px 0px 4px gray",
              }}
              whileTap={{ scale: 0.8 }}
            >
              <Button
                variant="contained"
                sx={{
                  height: 200,
                  width: 200,
                  fontSize: 30,
                  bgcolor: "#26A080",
                }}
                onClick={handleArticleAnalysis}
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
