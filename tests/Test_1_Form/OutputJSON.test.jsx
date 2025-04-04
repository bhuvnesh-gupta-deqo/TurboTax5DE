import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import OutputJSON from "../../src/components/form1/OutputJSON";

describe("OutputJSON", () => {

  test("renders default title and JSON output when data is provided", () => {
    const mockData = { name: "Mahesh", age: 27 };
    render(<OutputJSON data={mockData} />);

    expect(screen.getByText("Output:")).toBeInTheDocument();
    expect(screen.getByText(/"name": "Mahesh"/)).toBeInTheDocument();
    expect(screen.getByText(/"age": 27/)).toBeInTheDocument();
  });

  test("renders custom title when provided", () => {
    const mockData = { success: true };
    render(<OutputJSON title="Result Data" data={mockData} />);

    expect(screen.getByText("Result Data:")).toBeInTheDocument();
    expect(screen.getByText(/"success": true/)).toBeInTheDocument();
  });

  test("formats JSON with indentation", () => {
    const data = { user: { name: "Piyush" } };
    render(<OutputJSON data={data} />);

    const preElement = screen.getByText((content, node) => {
      return node.tagName.toLowerCase() === "pre" && content.includes('"name": "Piyush"');
    });

    expect(preElement.textContent).toMatch(/\n {4}"name": "Piyush"/);

  });
});
