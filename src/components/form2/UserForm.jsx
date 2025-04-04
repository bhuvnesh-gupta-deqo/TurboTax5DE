import { useState } from "react";
import React from 'react';

import { Box, TextField, Button, Typography } from "@mui/material";

function UserForm({ onUserAdd }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserAdd({ name, email });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 800,
        mx: 'auto',
        mt: 5,
        p: 2,
        boxShadow: 'none', 
        border: '1px solid #e0e0e0', 
      }}
    >
      <Typography variant="h6" component="h2" align="center">
        Add User
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />

      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
      />

      <Button variant="contained" type="submit" sx={{width:"20%"}}>
        Add User
      </Button>
    </Box>
  );
}

export default UserForm;
