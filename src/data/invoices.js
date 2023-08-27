import { v4 as uuidv4 } from "uuid";

export const invoices = [
  {
    id: uuidv4(),
    invoice_pdf_data: {},
    client_name: "Client1",
    date: new Date().toISOString(),
    amount: "400",
  },
  {
    id: uuidv4(),
    invoice_pdf_data: {},
    client_name: "Client2",
    date: new Date().toISOString(),
    amount: "500",
  },
  {
    id: uuidv4(),
    invoice_pdf_data: {},
    client_name: "Client3",
    date: new Date().toISOString(),
    amount: "600",
  },
  {
    id: uuidv4(),
    invoice_pdf_data: {},
    client_name: "Client4",
    date: new Date().toISOString(),
    amount: "800",
  },
];
