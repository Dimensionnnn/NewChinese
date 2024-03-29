import React from "react";
import ResponsiveAppBar from "../component/navbar/NavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.userInfo.user);
  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          // whileHover={{
          //   scale: 1.01,
          //   transition: { duration: 0.3 },
          // }}
          whileTap={{ scale: 0.95 }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={4}>
              <Paper
                elevation={3}
                sx={{
                  height: "95vh",
                  borderRadius: 3,
                  backgroundColor: "white",
                }}
              >
                <Box sx={{ height: "42vh" }}>user: {user}</Box>
                <Divider />
                <Box></Box>
              </Paper>
            </Grid>

            <Grid item xs={8}>
              <Paper
                elevation={3}
                sx={{
                  height: "95vh",
                  borderRadius: 3,
                  backgroundColor: "white",
                }}
              ></Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Box>
    </>
  );
}

export default Dashboard;
