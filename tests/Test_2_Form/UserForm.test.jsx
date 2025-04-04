import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserForm from '../../src/components/form2/UserForm'
import React from 'react';
import { describe, expect, test, vi } from 'vitest'


describe('UserForm', () => {
  test('should have two input boxes and a button', () => {
 
    render(<UserForm/>);
    const inputs = screen.getAllByRole('textbox')
    const button = screen.getByRole('button')

    expect(inputs).toHaveLength(2)
    expect(button).toBeInTheDocument()
  })

  test('calls onUserAdd when the form is submitted', async () => {
    const mockOnUserAdd = vi.fn()
    render(<UserForm onUserAdd={mockOnUserAdd} />)

    const user = userEvent.setup()
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)

    await user.type(nameInput, 'mahesh')
    await user.type(emailInput, 'maheshBhai@example.com')

    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockOnUserAdd).toHaveBeenCalledTimes(1)
    expect(mockOnUserAdd).toHaveBeenCalledWith({
      name: 'mahesh',
      email: 'maheshBhai@example.com',
    })
  })
})
