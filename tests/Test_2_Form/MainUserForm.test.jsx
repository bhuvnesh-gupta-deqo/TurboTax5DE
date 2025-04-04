import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import MainUserForm from "../../src/components/form2/mainUserForm";
import userEvent from "@testing-library/user-event";
// import userEvent from '@testing-library/user-event';

describe("MainUserForm", () => {
  test("should render UserForm and UserList headings", () => {
    render(<MainUserForm />);
    expect(
      screen.getByRole("heading", { name: /add user/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /user list/i })
    ).toBeInTheDocument();
  });
});

test("should add a user and displays it in the list", async () => {
  render(<MainUserForm />);
  const user = userEvent.setup();

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const Button = screen.getByRole("button", { name: /add user/i });

  await user.type(nameInput, "Mahesh");
  await user.type(emailInput, "maheshBhai@example.com");

  await user.click(Button);

  expect(await screen.findByText("Mahesh")).toBeInTheDocument();
  expect(await screen.findByText("maheshBhai@example.com")).toBeInTheDocument();
});
