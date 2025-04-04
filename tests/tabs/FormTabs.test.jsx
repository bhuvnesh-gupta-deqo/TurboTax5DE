import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect} from "vitest";
import FormTabs from "../../src/components/Tabs/FormTabs";



describe("FormTabs", () => {
  test("renders both tab labels", () => {
    render(<FormTabs />);
    expect(screen.getByRole("tab", { name: /item one/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /item two/i })).toBeInTheDocument();
  });


  test("switches to MainUserForm when 'Item Two' tab is clicked", async () => {
    const user = userEvent.setup();
    render(<FormTabs />);

    const TabTwo = screen.getByRole("tab", { name: /item two/i });
    await user.click(TabTwo);
  });
});
