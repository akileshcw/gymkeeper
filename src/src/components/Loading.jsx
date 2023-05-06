import { Box } from "@mui/material";
import React from "react";
import ReactLoading from "react-loading";
const Loading = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactLoading
          type="bars"
          color={"black"}
          height={"20%"}
          width={"20%"}
        />
      </Box>
    </>
  );
};

export default Loading;
