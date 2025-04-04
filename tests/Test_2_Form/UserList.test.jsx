import React from "react";
import { render, screen } from '@testing-library/react';
import UserList from "../../src/components/form2/UserList";
import { describe, test, expect } from 'vitest';

describe('UserList', () => {
    test('should have a table with two columns and row', () => {
        render(<UserList users={[]} />);

        const heading = screen.getByText(/user list/i);
        expect(heading).toBeInTheDocument();
    });
});

test('should render a row for each user', () => {
    const users = [
        {name:'Mahesh', email:'maheshBhai@example.com'},
        {name:'Ramesh', email:'rameshBhai@example.com'}
    ];

    render(<UserList users={users} />);
})

test('should display user names and emails correctly', () => {
    const users =[ {name:'Mahesh', email:"MaheshBhai@example.com"},];

    render(<UserList users={users}/>)

    expect(screen.getByText('Mahesh')).toBeInTheDocument();
    expect(screen.getByText('MaheshBhai@example.com')).toBeInTheDocument();
})

test('should render only header row when user list is empty', () => {
    render(<UserList users={[]} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1);
  });
