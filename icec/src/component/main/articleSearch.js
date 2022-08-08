import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const articleSearch = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Box>
          <TextField label="Standard" variant="standard" />
        </Box>
      </Container>
    </>
  );
};

export default articleSearch;
