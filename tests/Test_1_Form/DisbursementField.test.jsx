import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import DisbursementField from "../../src/components/form1/DisbursementField";
import { useForm, FormProvider } from "react-hook-form";
import userEvent from "@testing-library/user-event";
// import userEvent from "@testing-library/user-event";

const renderWithForm = (nestIndex = 0, defaultValues = { INBOUND: [{ Disbursement: [] }] }) => {
    const Wrapper = () => {
      const methods = useForm({ defaultValues, mode: 'onSubmit' });
  
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(() => {})}>
            <DisbursementField
              control={methods.control}
              register={methods.register}
              errors={methods.formState.errors}
              nestIndex={nestIndex}
            />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };
  
    return render(<Wrapper />);
  };

  describe('DisbursementField', () => {
    test('render one disbursement field by default', () => {
        renderWithForm();

        expect(screen.getAllByLabelText(/ALLOCATION_NAME/i)).toHaveLength(1);
        expect(screen.getAllByLabelText(/ALLOCATION_TYPE/i)).toHaveLength(1);
        expect(screen.getAllByLabelText(/TRANSFER_METHOD/i)).toHaveLength(1);
        expect(screen.getAllByLabelText(/web\.hook/i)).toHaveLength(1);
    });
  });


  test('allows user to type into disbursement fields', async () => {
    renderWithForm();

    const user = userEvent.setup();

    const nameInput = screen.getByLabelText(/ALLOCATION_NAME/i);
    const typeInput = screen.getByLabelText(/ALLOCATION_TYPE/i);
    const methodInput = screen.getByLabelText(/TRANSFER_METHOD/i);
    const hookInput = screen.getByLabelText(/web\.hook/i);

    await user.type(nameInput, 'NET_TAX')
    await user.type(typeInput, 'DISBURSEMENT');
    await user.type(methodInput, 'ACH');
    await user.type(hookInput, 'webhook.sent');

    expect(nameInput).toHaveValue('NET_TAX');
    expect(typeInput).toHaveValue('DISBURSEMENT');
    expect(methodInput).toHaveValue('ACH');
    expect(hookInput).toHaveValue('webhook.sent');
  })

  test("shows required validation errors on submit when fields are empty", async () => {
    renderWithForm();

    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.click(submitButton);

   
   

    await waitFor(() => {
      const errors = screen.getAllByText("Required");
      expect(errors.length).toBe(3);
    });
  });


  



 