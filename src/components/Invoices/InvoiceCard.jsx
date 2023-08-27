import {
  Box,
  Card,
  CardActions,
  CardContent,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import InvPrint from "./InvPrint";

const InvoiceCard = ({
  data,
  setCurrItem,
  deleteItem,
  setIsUpdate,
  currItem,
  invoices,
  setInvoices,
  clearCurrItem,
  open,
  setOpen,
}) => {
  return (
    <>
      <Box sx={{ minWidth: 275 }} key={data.id}>
        <Card variant="outlined" style={{ cursor: "pointer" }}>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  fontSize: "1.2rem",
                  width: "70%",
                }}
              >
                {data?.invoice?.client}
              </div>

              <div
                style={{
                  fontSize: "1.2rem",
                  width: "30%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                #{data?.invoice?.invoiceNo}
              </div>
            </div>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {new Date(data?.invoice?.dated).toDateString()}
            </Typography>
          </CardContent>
          <CardActions
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: ".5rem 1.5rem ",
            }}
          >
            <Typography
              sx={{ mb: 1.5, fontSize: "1rem" }}
              color="text.secondary"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              ₹{data?.invoice?.totalAmount}
            </Typography>
            <IconButton
              aria-label="previous"
              onClick={() => {
                setOpen(true);
                setIsUpdate(true);
                setCurrItem(data);
              }}
            >
              <EditNoteRoundedIcon />
            </IconButton>
            <IconButton
              aria-label="previous"
              onClick={() => deleteItem(data?.id)}
            >
              <DeleteForeverRoundedIcon />
            </IconButton>

            {/* <pre>{JSON.stringify(data?.invoice, null, 2)}</pre> */}
            <InvPrint data={data?.invoice} cliData={{}} />
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default InvoiceCard;
