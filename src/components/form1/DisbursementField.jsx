import React, { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { Box, Grid, TextField, Typography } from "@mui/material";

const defaultDisbursement = {
  ALLOCATION_NAME: "",
  ALLOCATION_TYPE: "",
  TRANSFER_METHOD: "",
  "web.hook": "",
};

const DisbursementField = ({ control, register, errors, nestIndex }) => {
  const { fields, append } = useFieldArray({
    control,
    name: `INBOUND.${nestIndex}.Disbursement`,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ ...defaultDisbursement });
    }
  }, [append, fields.length]);

  return (
    <Box mt={3}>
      <Typography variant="subtitle1">Disbursements</Typography>
      {fields.map((field, j) => (
        <Grid container spacing={2} key={field.id} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="ALLOCATION_NAME"
              fullWidth
              error={
                !!errors?.INBOUND?.[nestIndex]?.Disbursement?.[j]
                  ?.ALLOCATION_NAME
              }
              helperText={
                errors?.INBOUND?.[nestIndex]?.Disbursement?.[j]?.ALLOCATION_NAME
                  ?.message
              }
              {...register(
                `INBOUND.${nestIndex}.Disbursement.${j}.ALLOCATION_NAME`,
                {
                  required: "Required",
                }
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="ALLOCATION_TYPE"
              fullWidth
              error={
                !!errors?.INBOUND?.[nestIndex]?.Disbursement?.[j]
                  ?.ALLOCATION_TYPE
              }
              helperText={
                errors?.INBOUND?.[nestIndex]?.Disbursement?.[j]?.ALLOCATION_TYPE
                  ?.message
              }
              {...register(
                `INBOUND.${nestIndex}.Disbursement.${j}.ALLOCATION_TYPE`,
                {
                  required: "Required",
                }
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="TRANSFER_METHOD"
              fullWidth
              error={
                !!errors?.INBOUND?.[nestIndex]?.Disbursement?.[j]
                  ?.TRANSFER_METHOD
              }
              helperText={
                errors?.INBOUND?.[nestIndex]?.Disbursement?.[j]?.TRANSFER_METHOD
                  ?.message
              }
              {...register(
                `INBOUND.${nestIndex}.Disbursement.${j}.TRANSFER_METHOD`,
                {
                  required: "Required",
                }
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="web.hook"
              fullWidth
              error={
                !!errors?.INBOUND?.[nestIndex]?.Disbursement?.[j]?.["web.hook"]
              }
              helperText={
                errors?.INBOUND?.[nestIndex]?.Disbursement?.[j]?.["web.hook"]
                  ?.message
              }
              {...register(`INBOUND.${nestIndex}.Disbursement.${j}.web.hook`, {
                required: "Required",
              })}
            />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default DisbursementField;
