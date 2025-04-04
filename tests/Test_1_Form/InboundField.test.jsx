import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import InboundField from "../../src/components/form1/InboundField";

const formValues = {
  INBOUND: [
    {
      IRS_Receive_Days: "",
      IRS_Amount: "",
      ID: "",
      AchPaymentReceived: { Amount: "" },
      Disbursement: [
        {
          ALLOCATION_NAME: "",
          ALLOCATION_TYPE: "",
          TRANSFER_METHOD: "",
          "web.hook": "",
        },
      ],
    },
  ],
};

const renderWithForm = (index = 0) => {
  const Wrapper = () => {
    const methods = useForm({ formValues, mode: "onSubmit" });

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>
          <InboundField
            control={methods.control}
            register={methods.register}
            errors={methods.formState.errors}
            index={index}
          />
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    );
  };

  return render(<Wrapper />);
};

describe('InboundField', () => {
    test('render all inbound input Fields' ,() => {
        renderWithForm();

        expect(screen.getByLabelText(/IRS Receive Days/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/IRS AMOUNT/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^ID$/i)).toBeInTheDocument();

        expect(
            screen.getByLabelText(/^AchPaymentReceived - Amount$/i)
        ).toBeInTheDocument();
    });

    test("allows typing into inbound fields", async () => {
        renderWithForm();

        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/IRS Receive Days/i),"15");
        await user.type(screen.getByLabelText(/IRS AMOUNT/i),"1200");
        await user.type(screen.getByLabelText(/^ID$/i),"ABC123");
      
        await user.type(
            screen.getByLabelText(/^AchPaymentReceived - Amount$/i),"350"
        );
        
        expect(screen.getByLabelText(/IRS Receive Days/i)).toHaveValue("15");
        expect(screen.getByLabelText(/IRS AMOUNT/i)).toHaveValue("1200");
        expect(screen.getByLabelText(/^ID$/i)).toHaveValue("ABC123");
        expect(
            screen.getByLabelText(/^AchPaymentReceived - Amount$/i)
        ).toHaveValue("350");
    });

    test("shows validation errors on empty submit", async () => {
        renderWithForm();
        const user = userEvent.setup();
    
        await user.click(screen.getByRole("button", { name: /submit/i }));
    
        await waitFor(() => {
          const errors = screen.getAllByText("Required");
          expect(errors.length).toBe(7);
        });
      });
})
