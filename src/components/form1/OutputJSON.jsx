import React from "react";
import { Box, Typography } from "@mui/material";

const OutputJSON = ({ title = "Output", data }) => {
  if (!data) return null;

  return (
    <Box
      mt={3}
      p={2}
      bgcolor="#f5f5f5"
      border="1px solid #ddd"
      borderRadius={2}
      whiteSpace="pre-wrap"
      fontFamily="monospace"
      sx={{ overflowX: "auto" }}>
      <Typography variant="subtitle1" mb={1}>
        {title}:
      </Typography>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  );
};

export default OutputJSON;
