import React from "react";
import { screen, render } from "@testing-library/react";
import {describe, test, expect, vi} from "vitest";
import userEvent from "@testing-library/user-event";
import ServiceButtonGroup from "../../src/components/form1/ServiceButtonGroup";

describe('ServiceButtonGroup', () => {
    test('should render service buttons', () => {
        render(<ServiceButtonGroup />)

        expect(screen.getByText("Service A")).toBeInTheDocument();
        expect(screen.getByText("Service B")).toBeInTheDocument();
        expect(screen.getByText("Service C")).toBeInTheDocument();
        expect(screen.getByText("Service D")).toBeInTheDocument();
    });

    test("calls onSelect when a button is clicked", async() => {
        const onSelect = vi.fn();
        
        render(<ServiceButtonGroup onSelect={onSelect} />);
        const user = userEvent.setup();
    
        await user.click(screen.getByText("Service A"));
        expect(onSelect).toHaveBeenCalledWith("A");
    
        await user.click(screen.getByText("Service C"));
        expect(onSelect).toHaveBeenCalledWith("C");
    
        expect(onSelect).toHaveBeenCalledTimes(2);
    })
})