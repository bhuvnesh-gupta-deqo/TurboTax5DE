import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';

function UserList({ users }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        mt: 5,
        p: 2,
        boxShadow: 'none', 
        border: '1px solid #e0e0e0', 
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        User List
      </Typography>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: '#f5f5f5',
            }}
          >
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: 'transparent', 
                '&:hover': {
                  backgroundColor: '#fafafa', 
                },
              }}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserList;
