import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

import InboundField from "./InboundField";
import ServiceButtonGroup from "./ServiceButtonGroup";
import OutputJSON from "./OutputJSON";

const defaultDisbursement = {
  ALLOCATION_NAME: "",
  ALLOCATION_TYPE: "",
  TRANSFER_METHOD: "",
  "web.hook": "",
};

const defaultInbound = {
  ID: "",
  IRS_Receive_Days: "",
  IRS_Amount: "",
  Disbursement: [defaultDisbursement],
  AchPaymentReceived: { Amount: "" },
};

// JSON data for service buttons
const SERVICE_JSONS = {
  A: {
    auth_id: "A-9411825657985428",
    INBOUND: [
      {
        "IRS Receive Days": "After 5DE",
        "IRS Amount": "6000",
        ID: "1",
        Disbursement: [
          {
            ALLOCATION_NAME: "NET_TAX_REFUND",
            ALLOCATION_TYPE: "DISBURSEMENT",
            TRANSFER_METHOD: "RTP",
            "web.hook": "rtp.payment.sent",
          },
        ],
        AchPaymentReceived: {
          Amount: "6000",
        },
      },
    ],
  },
  B: {
    auth_id: "B-9411825657985428",
    INBOUND: [
      {
        "IRS Receive Days": "Same Day",
        "IRS Amount": "5000",
        ID: "2",
        Disbursement: [
          {
            ALLOCATION_NAME: "STATE_TAX",
            ALLOCATION_TYPE: "ALLOCATION",
            TRANSFER_METHOD: "ACH",
            "web.hook": "ach.payment.processed",
          },
        ],
        AchPaymentReceived: {
          Amount: "5000",
        },
      },
    ],
  },
  C: {
    auth_id: "C-9411825657985428",
    INBOUND: [
      {
        "IRS Receive Days": "Before 5DE",
        "IRS Amount": "4500",
        ID: "3",
        Disbursement: [
          {
            ALLOCATION_NAME: "ADVANCE",
            ALLOCATION_TYPE: "CREDIT",
            TRANSFER_METHOD: "WIRE",
            "web.hook": "wire.sent",
          },
        ],
        AchPaymentReceived: {
          Amount: "4500",
        },
      },
    ],
  },
  D: {
    auth_id: "D-9411825657985428",
    INBOUND: [
      {
        "IRS Receive Days": "Delayed",
        "IRS Amount": "7000",
        ID: "4",
        Disbursement: [
          {
            ALLOCATION_NAME: "FINAL_REFUND",
            ALLOCATION_TYPE: "SETTLEMENT",
            TRANSFER_METHOD: "CHECK",
            "web.hook": "check.printed",
          },
        ],
        AchPaymentReceived: {
          Amount: "7000",
        },
      },
    ],
  },
};

const TurboTax5DEForm = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auth_id: "",
      INBOUND: [defaultInbound],
    },
  });

  const { fields: inboundFields } = useFieldArray({
    control,
    name: "INBOUND",
  });

  const [outputJson, setOutputJson] = useState(null);

  const onSubmit = (data) => {
    const formatted = {
      auth_id: data.auth_id,
      INBOUND: data.INBOUND.map((inbound) => ({
        "IRS Receive Days": inbound.IRS_Receive_Days,
        "IRS Amount": inbound.IRS_Amount,
        ID: inbound.ID,
        Disbursement: inbound.Disbursement.map((d) => ({
          ALLOCATION_NAME: d.ALLOCATION_NAME,
          ALLOCATION_TYPE: d.ALLOCATION_TYPE,
          TRANSFER_METHOD: d.TRANSFER_METHOD,
          "web.hook": d["web.hook"],
        })),
        AchPaymentReceived: { Amount: inbound.AchPaymentReceived.Amount },
      })),
    };

    console.log("Formatted Payload:", formatted);
    reset({
      auth_id: "",
      INBOUND: [defaultInbound],
    });
  };

  const handleClear = () => {
    reset({
      auth_id: "",
      INBOUND: [defaultInbound],
    });
  };

  const handleServiceClick = (serviceKey) => {
    setOutputJson(SERVICE_JSONS[serviceKey]);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        TurboTax 5DE Form
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          border: "1px solid #ccc",
          boxShadow: 3,
          borderRadius: 2,
          p: 3,
          mt: 3,
          backgroundColor: "#fff",
        }}>
        <Box mb={3}>
          <TextField
            label="Auth ID"
            fullWidth
            error={!!errors.auth_id}
            helperText={errors.auth_id?.message}
            {...register("auth_id", { required: "Required" })}
          />
        </Box>

        {inboundFields.map((inbound, i) => (
          <InboundField
            key={inbound.id}
            control={control}
            register={register}
            errors={errors}
            index={i}
            fieldId={inbound.id}
          />
        ))}

        <Box mt={4} display="flex" gap={2}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            type="button"
            onClick={handleClear}>
            Clear Fields
          </Button>
        </Box>
      </Box>

      <ServiceButtonGroup onSelect={handleServiceClick} />

      <OutputJSON title="Output for Selected Service" data={outputJson} />
    </Container>
  );
};

export default TurboTax5DEForm;
