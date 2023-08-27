import {
  Button,
  Dialog,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import numWords from "num-words";
import { GrClose } from "react-icons/gr";
import InvTableEntry from "./InvTableEntry";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { v4 as uuidv4 } from "uuid";
import { generalDetails } from "../../data/generalDetails";
import { useEffect } from "react";

const CreateInvoice = ({
  invoices,
  setInvoices,
  invDialog,
  setInvDialog,
  state,
  setState,
  isUpdate,
  setIsUpdate,
  allMenuData,
  addNewInvAPI,
  editInvoiceCompAPI,
}) => {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [refreshInit, setRefreshInit] = useState("");
  const invoice_pre = generalDetails().for_invoice;

  const clearState = () => {
    setState({
      id: uuidv4(),
      invoice: {
        distributorName: "",
        distributorDetails: "",
        invoiceNo: "",
        dated: "",
        deliveryNote: "",
        supplierRef: "",
        otherRef: "",
        client: "",
        despatchDocNo: "",
        deliveryNoteDate: "",
        despatchedThrough: "",
        destination: "",
        invTable: [],
        totalQty: 0,
        totalAmount: "",
        amtChargableInWords: "",
        invTaxTable: [],
        totalTaxableValue: "",
        totalCentralTaxAmt: "",
        totalStateTaxAmt: "",
        taxAmtInWords: "",
        companyPAN: "",
        companyBankDetails: {
          bankName: "",
          acNo: "",
          BranchIFSCode: "",
        },
        for: "",
      },
    });
    setIsUpdate(false);
  };

  const addInvoice = async () => {
    let new_invoice = { ...state };
    let new_invoices = [];
    if (invoices.length > 0) {
      new_invoices = [...invoices];
    }
    new_invoices = [...new_invoices, new_invoice];
    await addNewInvAPI(new_invoice);
    setInvoices(new_invoices);
  };
  const updateItem = async () => {
    let new_item = { ...state };
    let new_fix_menu_data = [];
    if (invoices.length > 0) {
      new_fix_menu_data = [...invoices];
    }
    new_fix_menu_data = new_fix_menu_data.map((d) => {
      if (d?.id === new_item.id) {
        return new_item;
      }
      return d;
    });
    setInvoices(new_fix_menu_data);
    await editInvoiceCompAPI(new_item?.id, new_item);
    setInvDialog(false);
  };

  const prePopulateInvoice = () => {
    let MyDate = new Date();
    let MyDateString;

    MyDateString =
      MyDate.getFullYear() +
      "-" +
      ("0" + (MyDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + MyDate.getDate()).slice(-2);

    setState({
      ...state,
      invoice: {
        ...state.invoice,
        distributorName: invoice_pre?.distributorName,
        distributorDetails: invoice_pre?.distributorDetails,
        companyBankDetails: {
          bankName: invoice_pre?.companyBankDetails?.bankName,
          acNo: invoice_pre?.companyBankDetails?.acNo,
          BranchIFSCode: invoice_pre?.companyBankDetails?.BranchIFSCode,
        },
        invoiceNo:
          invoices.length !== 0
            ? invoices[invoices?.length - 1].invoice.invoiceNo + 1
            : 1,
        dated: MyDateString,
      },
    });
  };

  return (
    <div>
      <div>
        <Button
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "1rem",
          }}
          onClick={() => setInvDialog(true)}
        >
          <ControlPointRoundedIcon
            sx={{ fontSize: "1.2rem", marginRight: ".4rem" }}
          />
          Create Invoice
        </Button>
      </div>
      <div>
        <Dialog
          open={invDialog}
          fullWidth={true}
          fullScreen={fullScreen}
          // maxWidth={}
          onClose={(e, r) => {
            if (r === "backdropClick") {
              clearState();
              setInvDialog(false);
            } else {
              clearState();
              setInvDialog(false);
            }
          }}
          // PaperComponent={<PaperC />}
          PaperProps={{
            sx: {
              borderRadius: "1rem",
            },
          }}
          scroll={"body"}
        >
          <form className="css5Form">
            <Button onClick={() => prePopulateInvoice()}>Prefill</Button>
            {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
            <div className="FlexBetween">
              <h2>Invoice </h2>
              <IconButton
                onClick={() => {
                  setInvDialog(false);
                  clearState();
                }}
                style={{
                  padding: ".25rem",
                }}
              >
                <GrClose />
              </IconButton>
            </div>
            <div>{/* <p>{currOrder}</p> */}</div>
            <div className="formLabel">Seller name</div>
            <input
              type="text"
              value={state.invoice.distributorName}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  distributorName: e.target.value,
                };
                setState(new_state);
              }}
              id="invDistributorName"
              placeholder="distributor name"
              className="formControl"
            />

            <div className="formLabel">Seller details</div>
            <input
              type="text"
              value={state.invoice.distributorDetails}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  distributorDetails: e.target.value,
                };
                setState(new_state);
              }}
              id="invDistributorDetails"
              placeholder="distributor details"
              className="formControl"
            />

            <div className="formLabel">Invoice No.</div>
            <input
              type="text"
              value={state.invoice.invoiceNo}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  invoiceNo: e.target.value,
                };
                setState(new_state);
              }}
              placeholder="invoice no."
              id="invInvNo"
              className="formControl"
            />

            <div className="formLabel">Dated</div>
            <input
              type="date"
              value={state.invoice.dated}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  dated: e.target.value,
                };
                setState(new_state);
              }}
              id="invDated"
              className="formControl"
            />

            <div className="formLabel">Delivery Note</div>
            <input
              type="text"
              value={state.invoice.deliveryNote}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  deliveryNote: e.target.value,
                };
                setState(new_state);
              }}
              id="invDeliveryNote"
              placeholder="delivery note"
              className="formControl"
            />

            <div className="formLabel">Supplier Ref.</div>
            <input
              type="text"
              value={state.invoice.supplierRef}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  supplierRef: e.target.value,
                };
                setState(new_state);
              }}
              id="invSupplierRef"
              placeholder="supplier ref"
              className="formControl"
            />

            <div className="formLabel">Other Ref.</div>
            <input
              type="text"
              value={state.invoice.otherRef}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  otherRef: e.target.value,
                };
                setState(new_state);
              }}
              id="invotherRef"
              placeholder="other ref"
              className="formControl"
            />

            <div className="formLabel">Client</div>
            <input
              type="text"
              value={state.invoice.client}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  client: e.target.value,
                };
                setState(new_state);
              }}
              id="invClient"
              placeholder="client"
              className="formControl"
            />

            <div className="formLabel">Despatch Doc No</div>
            <input
              type="text"
              value={state.invoice.despatchDocNo}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  despatchDocNo: e.target.value,
                };
                setState(new_state);
              }}
              id="invdespatchDocNo"
              placeholder="despatch doc no."
              className="formControl"
            />

            <div className="formLabel">Delivery Note Date</div>
            <input
              type="date"
              value={state.invoice.deliveryNoteDate}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  deliveryNoteDate: e.target.value,
                };
                setState(new_state);
              }}
              id="invdeliveryNoteDate"
              placeholder="delivery note date"
              className="formControl"
            />

            <div className="formLabel">Despatch Through</div>
            <input
              type="text"
              value={state.invoice.despatchedThrough}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  despatchedThrough: e.target.value,
                };
                setState(new_state);
              }}
              id="invdespatchedThrough"
              placeholder="despatched through"
              className="formControl"
            />

            <div className="formLabel">Destination</div>
            <input
              type="text"
              value={state.invoice.destination}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  destination: e.target.value,
                };
                setState(new_state);
              }}
              id="invdestination"
              placeholder="destination"
              className="formControl"
            />

            <div className="formLabel">Invoice Table</div>
            <button
              className="btn1"
              style={{
                width: "10%",
                marginLeft: "0",
                fontSize: "1.3em",
                padding: ".6rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                let new_invoice = { ...state.invoice };
                new_invoice.invTable = [
                  ...new_invoice.invTable,
                  {
                    siNo: uuidv4(),
                    descriptionOfGoods: "",
                    hsnSAC: "",
                    GSTRate: "",
                    qty: 0,
                    rate: "",
                    per: "unit",
                    amount: "",
                  },
                ];
                setState({ ...state, invoice: new_invoice });
              }}
            >
              +
            </button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                let new_invoice = { ...state.invoice };
                new_invoice.refresh = new Date();
                setState({ ...state, invoice: new_invoice });
              }}
            >
              Refresh
            </Button>
            {state.invoice.invTable.map((invTEntry, index) => (
              <InvTableEntry
                state={state}
                setState={setState}
                index={index}
                invTEntry={invTEntry}
                allMenuData={allMenuData}
              />
            ))}

            <div
              style={{
                width: "100%",
                border: "1px solid black",
                borderTop: "2px solid black",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid black",
                }}
              >
                <div
                  style={{
                    borderRight: "2px solid black",
                    borderLeft: "1px solid black",
                    width: "5%",
                    textAlign: "center",
                    fontSize: ".8em",
                  }}
                >
                  SI No.
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    width: "45%",
                    textAlign: "center",
                    fontSize: ".85em",
                  }}
                >
                  Description of Goods
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                  }}
                >
                  HSN /SAC
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                  }}
                >
                  GST Rate
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".8em",
                  }}
                >
                  Quan tity
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "15%",
                    fontSize: ".85em",
                  }}
                >
                  Rate
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "5%",
                    fontSize: ".85em",
                  }}
                >
                  per
                </div>
                <div
                  style={{
                    borderRight: "1px solid black",
                    textAlign: "center",
                    width: "12%",
                    fontSize: ".85em",
                  }}
                >
                  Amount
                </div>
              </div>

              {state.invoice.invTable.map((entry, idx) => (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      border: "1px solid black",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    <div
                      style={{
                        borderRight: "2px solid black",
                        borderLeft: "1px solid black",
                        width: "5%",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div
                      style={{
                        borderRight: "2px solid black",
                        width: "45%",
                        textAlign: "center",
                        fontSize: ".85em",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.descDisplay}
                    </div>
                    <div
                      style={{
                        borderRight: "2px solid black",
                        textAlign: "center",
                        width: "11%",
                        fontSize: ".7em",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.hsnSAC}
                    </div>
                    <div
                      style={{
                        borderRight: "2px solid black",
                        textAlign: "center",
                        width: "11%",
                        fontSize: ".85em",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.GSTRate}
                    </div>
                    <div
                      style={{
                        borderRight: "2px solid black",
                        textAlign: "center",
                        width: "11%",
                        fontSize: ".85em",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.qty}
                    </div>
                    <div
                      style={{
                        borderRight: "2px solid black",
                        textAlign: "center",
                        width: "15%",
                        fontSize: ".8em",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.rate}
                    </div>
                    <div
                      style={{
                        borderRight: "2px solid black",
                        textAlign: "center",
                        width: "5%",
                        fontSize: ".6em",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.per}
                    </div>
                    <div
                      style={{
                        borderRight: "1px solid black",
                        textAlign: "center",
                        width: "12%",
                        fontSize: ".85em",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.amount}
                    </div>
                  </div>
                </>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid black",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              >
                <div
                  style={{
                    borderRight: "2px solid black",
                    borderLeft: "1px solid black",
                    width: "5%",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    width: "45%",
                    textAlign: "right",
                    fontSize: ".85em",
                    fontWeight: "bold",
                    paddingRight: ".2em",
                  }}
                >
                  Output CGST
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".7em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "15%",
                    fontSize: ".8em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "5%",
                    fontSize: ".6em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "1px solid black",
                    textAlign: "center",
                    width: "12%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                >
                  {state?.invoice?.totalCentralTaxAmt}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid black",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              >
                <div
                  style={{
                    borderRight: "2px solid black",
                    borderLeft: "1px solid black",
                    width: "5%",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    width: "45%",
                    textAlign: "right",
                    fontSize: ".85em",
                    fontWeight: "bold",
                    paddingRight: ".2em",
                  }}
                >
                  Output SGST
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".7em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "15%",
                    fontSize: ".8em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "5%",
                    fontSize: ".6em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "1px solid black",
                    textAlign: "center",
                    width: "12%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                >
                  {state?.invoice?.totalStateTaxAmt}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid black",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              >
                <div
                  style={{
                    borderRight: "2px solid black",
                    borderLeft: "1px solid black",
                    width: "5%",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    width: "45%",
                    textAlign: "right",
                    fontSize: ".85em",
                    fontWeight: "bold",
                    paddingRight: ".2em",
                  }}
                >
                  Total
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".7em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "11%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                >
                  {state?.invoice?.totalQty}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "15%",
                    fontSize: ".8em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "5%",
                    fontSize: ".6em",
                    fontWeight: "bold",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "1px solid black",
                    textAlign: "center",
                    width: "12%",
                    fontSize: ".85em",
                    fontWeight: "bold",
                  }}
                >
                  ₹{state?.invoice?.totalAmount}
                </div>
              </div>
            </div>

            <div className="formLabel">Total Qty</div>
            <input
              type="number"
              value={state.invoice.totalQty}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  totalQty: e.target.value,
                };
                setState(new_state);
              }}
              id="invtotalQty"
              placeholder="total qty"
              className="formControl"
              disabled={true}
            />

            <div className="formLabel">Total Amount</div>
            <input
              type="text"
              value={state.invoice.totalAmount}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  totalAmount: e.target.value,
                };
                setState(new_state);
              }}
              id="invtotalAmount"
              placeholder="total amount"
              className="formControl"
              disabled={true}
            />

            <div className="formLabel">Amount in words</div>
            <input
              type="text"
              value={state.invoice.amtChargableInWords}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  amtChargableInWords: e.target.value,
                };
                setState(new_state);
              }}
              id="invamtChargableInWords"
              placeholder="amt in words"
              className="formControl"
            />

            <div className="formLabel">Invoice Tax Table</div>
            <table
              style={{
                border: "1px solid lightgrey",
              }}
            >
              <thead
                style={{
                  borderBottom: "2px solid white",
                }}
              >
                <tr>
                  <td>HSN SAC</td>
                  <td>Taxable value</td>
                  <td>central tax rate</td>
                  <td>central tax amt</td>
                  <td>state tax rate</td>
                  <td>state tax amt</td>
                </tr>
              </thead>

              {state.invoice.invTaxTable.map((i) => (
                <tr>
                  <td>{i.hsnSAC}</td>
                  <td>{i.taxableValue}</td>
                  <td>{i.centralTaxRate}</td>
                  <td>{i.centralTaxAmt}</td>
                  <td>{i.stateTaxRate}</td>
                  <td>{i.stateTaxAmt}</td>
                </tr>
              ))}
            </table>

            <div className="formLabel">Total Taxable Value</div>
            <input
              type="text"
              value={state.invoice.totalTaxableValue}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  totalTaxableValue: e.target.value,
                };
                setState(new_state);
              }}
              id="invtotalTaxableValue"
              className="formControl"
              placeholder="total taxable value"
              disabled={true}
            />

            <div className="formLabel">Total Central Tax Amount</div>
            <input
              type="text"
              value={state.invoice.totalCentralTaxAmt}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  totalCentralTaxAmt: e.target.value,
                };
                setState(new_state);
              }}
              id="invtotalCentralTaxAmt"
              placeholder="total central tax amt"
              className="formControl"
              disabled={true}
            />

            <div className="formLabel">Total State Tax Amount</div>
            <input
              type="text"
              value={state.invoice.totalStateTaxAmt}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  totalStateTaxAmt: e.target.value,
                };
                setState(new_state);
              }}
              id="invtotalStateTaxAmt"
              placeholder="total state tax amt"
              className="formControl"
              disabled={true}
            />

            <div className="formLabel">Tax Amount In Words</div>
            <input
              type="text"
              value={state.invoice.taxAmtInWords}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  taxAmtInWords: e.target.value,
                };
                setState(new_state);
              }}
              id="invtaxAmtInWords"
              placeholder="tax amt in words"
              className="formControl"
            />

            <div className="formLabel">Company PAN</div>
            <input
              type="text"
              value={state.invoice.companyPAN}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  companyPAN: e.target.value,
                };
                setState(new_state);
              }}
              id="invcompanyPAN"
              placeholder="company PAN no."
              className="formControl"
            />

            <h4>Company Bank Details</h4>
            <div className="formLabel">Bank Name</div>
            <input
              type="text"
              value={state.invoice.companyBankDetails.bankName}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice.companyBankDetails = {
                  ...new_state.invoice.companyBankDetails,
                  bankName: e.target.value,
                };
                setState(new_state);
              }}
              placeholder="bank name"
              id="invbankName"
              className="formControl"
            />

            <div className="formLabel">A/C No.</div>
            <input
              type="text"
              value={state.invoice.companyBankDetails.acNo}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice.companyBankDetails = {
                  ...new_state.invoice.companyBankDetails,
                  acNo: e.target.value,
                };
                setState(new_state);
              }}
              placeholder="A/C no."
              id="invacNo"
              className="formControl"
            />

            <div className="formLabel">BranchIFSCode</div>
            <input
              type="text"
              value={state.invoice.companyBankDetails.BranchIFSCode}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice.companyBankDetails = {
                  ...new_state.invoice.companyBankDetails,
                  BranchIFSCode: e.target.value,
                };
                setState(new_state);
              }}
              placeholder="branch IFSC Code"
              id="invBranchIFSCode"
              className="formControl"
            />

            <div className="formLabel">For</div>
            <input
              type="text"
              value={state.invoice.for}
              onChange={(e) => {
                let new_state = { ...state };
                new_state.invoice = {
                  ...new_state.invoice,
                  for: e.target.value,
                };
                setState(new_state);
              }}
              placeholder="invoice for"
              id="invfor"
              className="formControl"
            />

            <div className="formLabel">
              <div
                onClick={(e) => {
                  if (isUpdate) {
                    updateItem();
                  } else {
                    addInvoice();
                  }
                  clearState();
                  setInvDialog(false);
                }}
                className="btn2"
              >
                Save Invoice
              </div>
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateInvoice;
