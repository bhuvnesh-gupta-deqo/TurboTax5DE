import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import DisbursementField from "./DisbursementField";

const InboundField = ({ control, register, errors, index, fieldId }) => {
  return (
    <Box
      key={fieldId}
      sx={{
        border: "1px solid #ddd",
        boxShadow: 2,
        borderRadius: 1,
        p: 2,
        mb: 3,
        backgroundColor: "#fafafa",
      }}>
      <Typography variant="h6" gutterBottom>
        INBOUND
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="IRS Receive Days"
            fullWidth
            error={!!errors?.INBOUND?.[index]?.IRS_Receive_Days}
            helperText={errors?.INBOUND?.[index]?.IRS_Receive_Days?.message}
            {...register(`INBOUND.${index}.IRS_Receive_Days`, {
              required: "Required",
            })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="IRS Amount"
            fullWidth
            error={!!errors?.INBOUND?.[index]?.IRS_Amount}
            helperText={errors?.INBOUND?.[index]?.IRS_Amount?.message}
            {...register(`INBOUND.${index}.IRS_Amount`, {
              required: "Required",
            })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="ID"
            fullWidth
            error={!!errors?.INBOUND?.[index]?.ID}
            helperText={errors?.INBOUND?.[index]?.ID?.message}
            {...register(`INBOUND.${index}.ID`, {
              required: "Required",
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="AchPaymentReceived - Amount"
            fullWidth
            error={!!errors?.INBOUND?.[index]?.AchPaymentReceived?.Amount}
            helperText={
              errors?.INBOUND?.[index]?.AchPaymentReceived?.Amount?.message
            }
            {...register(`INBOUND.${index}.AchPaymentReceived.Amount`, {
              required: "Required",
            })}
          />
        </Grid>
      </Grid>

      <DisbursementField
        control={control}
        register={register}
        errors={errors}
        nestIndex={index}
      />
    </Box>
  );
};

export default InboundField;
