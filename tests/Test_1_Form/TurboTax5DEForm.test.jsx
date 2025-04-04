import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import TurboTax5DEForm from "../../src/components/form1/TurboTax5DEForm";

describe("TurboTax5DEForm", () => {
  test("renders form and Auth ID input", () => {
    render(<TurboTax5DEForm />);
    expect(screen.getByLabelText(/Auth ID/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /clear fields/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors when Auth ID is empty on submit", async () => {
    const user = userEvent.setup();
    render(<TurboTax5DEForm />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errors = screen.getAllByText("Required");
      expect(errors.length).toBeGreaterThanOrEqual(1);
    });
  });

  test("resets form when Clear Fields is clicked", async () => {
    const user = userEvent.setup();
    render(<TurboTax5DEForm />);

    const authInput = screen.getByLabelText(/Auth ID/i);
    await user.type(authInput, "9999");

    await user.click(screen.getByRole("button", { name: /clear fields/i }));
    expect(authInput).toHaveValue("");
  });

  test("updates OutputJSON when a service button is clicked", async () => {
    const user = userEvent.setup();
    render(<TurboTax5DEForm />);

    await user.click(screen.getByRole("button", { name: /Service A/i }));

    expect(
      screen.getByText(/Output for Selected Service:/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/"auth_id": "A-9411825657985428"/)
    ).toBeInTheDocument();
  });
});
