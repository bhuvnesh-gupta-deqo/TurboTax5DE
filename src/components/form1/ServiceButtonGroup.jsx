import React from "react";
import { Box, Button } from "@mui/material";

const ServiceButtonGroup = ({ onSelect }) => {
  const services = ["A", "B", "C", "D"];

  return (
    <Box mt={4} display="flex" gap={2} justifyContent="center">
      {services.map((service) => (
        <Button
          key={service}
          variant="outlined"
          onClick={() => onSelect(service)}>
          Service {service}
        </Button>
      ))}
    </Box>
  );
};

export default ServiceButtonGroup;
