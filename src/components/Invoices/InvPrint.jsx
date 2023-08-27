import {
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useContext } from "react";
import { GrClose } from "react-icons/gr";
import { useReactToPrint } from "react-to-print";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

const InvPrint = ({ data, cliData }) => {
  const invRef = useRef();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDialog, setOpenDialog] = useState(false);
  const handlePrint = useReactToPrint({
    content: () => invRef.current,
    documentTitle: `${data.invoiceNo}_invoice`,
    onAfterPrint: () => alert("Inv printed"),
  });
  const {
    distributorName,
    distributorDetails,
    invoiceNo,
    dated,
    deliveryNote,
    supplierRef,
    otherRef,
    despatchDocNo,
    deliveryNoteDate,
    despatchedThrough,
    destination,
    invTable,
    totalQty,
    totalAmount,
    amtChargableInWords,
    invTaxTable,
    totalTaxableValue,
    totalCentralTaxAmt,
    totalStateTaxAmt,
    taxAmtInWords,
    companyPAN,
    companyBankDetails,
    for: forW,
  } = data;
  return (
    <>
      <div
        style={{
          margin: "1rem 0",
        }}
      >
        <h5
          style={{
            marginBottom: ".5rem",
          }}
        >
          Invoice Print
        </h5>

        <div>
          <div className="css1Btn" onClick={() => setOpenDialog(true)}>
            <Typography
              sx={{
                mb: 1.5,
                fontSize: "1rem",
                cursor: "pointer",
                transition: ".2s all",
                "&:hover": {
                  background: "cyan",
                  color: "white",
                  fontWeight: "bold",
                },
              }}
              color="text.secondary"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                fontSize: ".8rem",
                borderRadius: "1.4rem",
                border: "1px solid lightgrey",
                padding: ".1rem .5rem",
              }}
            >
              PDF
              <DownloadRoundedIcon
                size="small"
                style={{
                  fontSize: ".9rem",
                }}
              />
            </Typography>
          </div>
        </div>

        <Dialog
          open={openDialog}
          fullWidth={true}
          fullScreen={fullScreen}
          // maxWidth={}
          onClose={(e, r) => {
            if (r === "backdropClick") {
              setOpenDialog(false);
            } else {
              setOpenDialog(false);
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
          <IconButton
            onClick={() => {
              setOpenDialog(false);
            }}
            style={{
              padding: ".25rem",
              position: "absolute",
              top: "0",
              right: "0",
              margin: ".25rem",
            }}
          >
            <GrClose />
          </IconButton>
          <div className="dialogOpenContainer">
            <div className="openStylesButton1" onClick={handlePrint}>
              Print Invoice
            </div>
          </div>

          <div
            ref={invRef}
            style={{
              width: "100%",
              height: window.innerHeight,
              padding: "1rem",
            }}
          >
            <div
              style={{
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              INVOICE
            </div>

            <div
              style={{
                border: "1px solid black",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  border: "1px solid black",
                  width: "50%",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    padding: ".5rem",
                  }}
                >
                  {distributorName}
                  <div>{distributorDetails}</div>
                </div>
                <div
                  style={{
                    borderTop: "2px solid black",
                    padding: ".5rem",
                  }}
                >
                  <div>Buyer</div>
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {cliData.companyName}

                    <div
                      style={{
                        fontWeight: "500",
                      }}
                    >
                      {cliData.address}
                    </div>

                    <div
                      style={{
                        fontWeight: "500",
                      }}
                    >
                      {cliData.gst}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  border: "1px solid black",
                  width: "50%",
                }}
              >
                <div
                  style={{
                    borderBottom: "2px solid black",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      borderRight: "2px solid black",
                      padding: ".1rem",
                    }}
                  >
                    <div>Invoice No.</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {invoiceNo}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      padding: ".1rem",
                    }}
                  >
                    <div>Dated</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {dated}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    borderBottom: "2px solid black",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      borderRight: "2px solid black",
                    }}
                  >
                    <div>Delivery Note</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {deliveryNote}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      padding: ".1rem",
                    }}
                  >
                    {/* <div>Mode/Terms Of Payment</div> */}
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {/* {modeTermsOfPayment} */}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    borderBottom: "2px solid black",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      borderRight: "2px solid black",
                      padding: ".1rem",
                    }}
                  >
                    <div>Supplier's Ref</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {supplierRef}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      padding: ".1rem",
                    }}
                  >
                    <div>Other Reference(s)</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {otherRef}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    borderBottom: "2px solid black",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      borderRight: "2px solid black",
                      padding: ".1rem",
                    }}
                  >
                    <div>Despatch Document No.</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {despatchDocNo}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      padding: ".1rem",
                    }}
                  >
                    <div>Delivery Note Date</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {deliveryNoteDate}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    borderBottom: "2px solid black",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      borderRight: "2px solid black",
                      padding: ".1rem",
                    }}
                  >
                    <div>Despatched through</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {despatchedThrough}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      padding: ".1rem",
                    }}
                  >
                    <div>Destination</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {destination}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                border: "1px solid black",
                borderTop: "none",
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

              {invTable.map((entry, idx) => (
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
                  {totalCentralTaxAmt}
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
                  {totalStateTaxAmt}
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
                  {totalQty}
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
                  ₹{totalAmount}
                </div>
              </div>
            </div>
            <div
              style={{
                border: "2px solid black",
                borderTop: "none",
                // height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: ".5rem",
                  }}
                >
                  <div>Amount Chargeable (in words)</div>
                  <div>E. & O.E</div>
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    padding: "0 .5rem .5rem .5rem",
                    textTransform: "capitalize",
                  }}
                >
                  INR {amtChargableInWords}
                </div>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                border: "1px solid black",
                borderTop: "none",
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
                    width: "30%",
                    textAlign: "center",
                  }}
                >
                  HSN/SAC
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    width: "30%",
                    textAlign: "center",
                    fontSize: ".8em",
                  }}
                >
                  Taxable Value
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "10%",
                    fontSize: ".8em",
                  }}
                >
                  Central Tax Rate
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "10%",
                    fontSize: ".8em",
                  }}
                >
                  Central Tax Amount
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "10%",
                    fontSize: ".8em",
                  }}
                >
                  State Tax Rate
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "10%",
                    fontSize: ".8em",
                  }}
                >
                  State Tax Amount
                </div>
              </div>

              {invTaxTable?.map((entry, idx) => (
                <>
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
                        width: "30%",
                        textAlign: "center",
                      }}
                    >
                      {entry.hsnSAC}
                    </div>
                    <div
                      style={{
                        borderRight: "2px solid black",
                        width: "30%",
                        textAlign: "center",
                        fontSize: ".8em",
                      }}
                    >
                      {entry.taxableValue}
                    </div>
                    <div
                      style={{
                        borderRight: "2px solid black",
                        textAlign: "center",
                        width: "10%",
                        fontSize: ".8em",
                      }}
                    >
                      {entry.centralTaxRate}
                    </div>
                    <div
                      style={{
                        borderRight: "2px solid black",
                        textAlign: "center",
                        width: "10%",
                        fontSize: ".8em",
                      }}
                    >
                      {entry.centralTaxAmt}
                    </div>
                    <div
                      style={{
                        borderRight: "2px solid black",
                        textAlign: "center",
                        width: "10%",
                        fontSize: ".8em",
                      }}
                    >
                      {entry.stateTaxRate}
                    </div>
                    <div
                      style={{
                        borderRight: "2px solid black",
                        textAlign: "center",
                        width: "10%",
                        fontSize: ".8em",
                      }}
                    >
                      {entry.stateTaxAmt}
                    </div>
                  </div>
                </>
              ))}
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
                    width: "30%",
                    textAlign: "right",
                    fontWeight: "bold",
                    paddingRight: ".2em",
                  }}
                >
                  Total
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    width: "30%",
                    textAlign: "center",
                    fontSize: ".8em",
                  }}
                >
                  {totalTaxableValue}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "10%",
                    fontSize: ".8em",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "10%",
                    fontSize: ".8em",
                  }}
                >
                  {totalCentralTaxAmt}
                </div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "10%",
                    fontSize: ".8em",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: "2px solid black",
                    textAlign: "center",
                    width: "10%",
                    fontSize: ".8em",
                  }}
                >
                  {totalStateTaxAmt}
                </div>
              </div>
            </div>

            <div
              style={{
                border: "2px solid black",
                borderTop: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: ".5rem",
                  }}
                >
                  <div>
                    Tax Amount (in words) :
                    <span
                      style={{
                        fontWeight: "bold",
                        padding: "0 .5rem .5rem .5rem",
                        textTransform: "capitalize",
                      }}
                    >
                      INR {taxAmtInWords}
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "50%",
                  }}
                >
                  <div
                    style={{
                      paddingLeft: ".1em",
                    }}
                  >
                    Company's PAN :
                    <span
                      style={{
                        fontWeight: "bold",
                        marginLeft: "2em",
                      }}
                    >
                      {companyPAN}
                    </span>
                  </div>
                  <div
                    style={{
                      textDecoration: "underline",
                      paddingLeft: ".1em",
                    }}
                  >
                    Declaration
                  </div>
                  <div
                    style={{
                      fontSize: ".9em",
                      paddingLeft: ".1em",
                    }}
                  >
                    We declare that this invoice shows the actual price of the
                    goods described and that all particulars are true and
                    correct.
                  </div>
                </div>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    paddingLeft: ".5em",
                  }}
                >
                  <div>Company's Bank Details</div>
                  <div>
                    Bank Name
                    <span style={{ paddingLeft: "2em", fontWeight: "bold" }}>
                      : {companyBankDetails.bankName}
                    </span>
                  </div>
                  <div>
                    A/c No.
                    <span style={{ paddingLeft: "2em", fontWeight: "bold" }}>
                      : {companyBankDetails.acNo}
                    </span>
                  </div>
                  <div>
                    Branch & IFS Code
                    <span style={{ paddingLeft: "2em", fontWeight: "bold" }}>
                      : {companyBankDetails.BranchIFSCode}
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  flexGrow: "1",
                }}
              >
                <div
                  style={{
                    border: "2px solid black",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "none",
                    fontWeight: "bold",
                    width: "50%",
                    textAlign: "left",
                    paddingLeft: ".1em",
                  }}
                >
                  <div>Customer's Seal and Signature</div>
                  <div
                    style={{
                      marginTop: "3rem",
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    Authorized Signatory
                  </div>
                </div>
                <div
                  style={{
                    border: "2px solid black",
                    borderRight: "none",
                    borderBottom: "none",
                    fontWeight: "bold",
                    width: "50%",
                    textAlign: "right",
                    paddingRight: ".2em",
                  }}
                >
                  <div>for {distributorName}</div>
                  <div
                    style={{
                      marginTop: "3rem",
                      fontWeight: "500",
                      paddingRight: ".2em",
                    }}
                  >
                    Authorized Signatory
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
};

export default InvPrint;
