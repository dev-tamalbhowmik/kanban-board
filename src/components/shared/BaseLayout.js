import React, { Fragment } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Footer from "./Footer";
import Header from "./Header";

function BaseLayout({ children }) {
  return (
    <Fragment>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 65px)",
        }}
      >
        <Box
          p={2}
          sx={{
            flex: 1,
          }}
        >
          <Container maxWidth="lg">{children}</Container>
        </Box>
        <Footer />
      </Box>
    </Fragment>
  );
}

export default BaseLayout;
