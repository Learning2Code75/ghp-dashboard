import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import CreateInvoice from "./CreateInvoice";
import InvoiceCard from "./InvoiceCard";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { convertMenuItemsToInvoiceProducts } from "../utils/helpers";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [allMenuData, setAllMenuData] = useState([]);
  const [currItem, setCurrItem] = useState({
    id: uuidv4(),
    invoice: {
      distributorName: "",
      distributorDetails: "",
      invoiceNo: "",
      dated: "",
      deliveryNote: "",
      supplierRef: "",
      otherRef: "",
      despatchDocNo: "",
      deliveryNoteDate: "",
      despatchedThrough: "",
      destination: "",
      invTable: [],
      totalQty: "",
      totalAmount: "",
      amtChargableInWords: "",
      invTaxTable: [],
      totalTaxableValue: "",
      totalCentralTaxAmt: "",
      totalStateTaxAmt: "",
      taxAmtInWords: "",
      companyPAN: "",
      companyBankDetails: "",
      forW: "",
    },
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [invDialog, setInvDialog] = useState(false);

  const clearCurrItem = () => {
    setIsUpdate(false);
    setCurrItem({
      id: uuidv4(),
      invoice: {
        distributorName: "",
        distributorDetails: "",
        invoiceNo: "",
        dated: "",
        deliveryNote: "",
        supplierRef: "",
        otherRef: "",
        despatchDocNo: "",
        deliveryNoteDate: "",
        despatchedThrough: "",
        destination: "",
        invTable: [],
        totalQty: "",
        totalAmount: "",
        amtChargableInWords: "",
        invTaxTable: [],
        totalTaxableValue: "",
        totalCentralTaxAmt: "",
        totalStateTaxAmt: "",
        taxAmtInWords: "",
        companyPAN: "",
        companyBankDetails: "",
        forW: "",
      },
    });
  };

  const deleteItem = async (id) => {
    let new_fix_menu_data = [];
    if (invoices.length > 0) {
      new_fix_menu_data = [...invoices];
    }
    new_fix_menu_data = new_fix_menu_data?.filter((d) => d.id !== id);
    await deleteInvAPI(id);
    setInvoices(new_fix_menu_data);
  };

  const invoicesCompCollectionRef = collection(db, "invoiceComponent");
  const getInvoiceComp = async () => {
    try {
      const data = await getDocs(invoicesCompCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setInvoices(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  const editInvoiceCompAPI = async (item_id, item_data) => {
    const invDoc = doc(db, "invoiceComponent", item_id);
    try {
      await updateDoc(invDoc, item_data);
      await getInvoiceComp();
    } catch (err) {
      console.error(err);
    }
  };

  const addNewInvAPI = async (item_data) => {
    try {
      await addDoc(invoicesCompCollectionRef, item_data);
      await getInvoiceComp();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInvAPI = async (id) => {
    try {
      const invDoc = doc(db, "invoiceComponent", id);
      await deleteDoc(invDoc);
      await getInvoiceComp();
    } catch (err) {
      console.log(err);
    }
  };

  const fixmenuCompCollectionRef = collection(db, "fixmenuComponent");
  const dailymenuCompCollectionRef = collection(db, "dailymenuComponent");
  const festivemenuCompCollectionRef = collection(db, "festivemenuComponent");

  const getAllMenuComp = async () => {
    try {
      const data1 = await getDocs(fixmenuCompCollectionRef);
      const data2 = await getDocs(dailymenuCompCollectionRef);
      const data3 = await getDocs(festivemenuCompCollectionRef);

      const filteredData1 = data1.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filteredData2 = data2.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const filteredData3 = data3.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllMenuData([
        ...convertMenuItemsToInvoiceProducts(filteredData1[0]?.data),
        ...convertMenuItemsToInvoiceProducts(filteredData2[0]?.data),
        ...convertMenuItemsToInvoiceProducts(filteredData3[0]?.data),
      ]);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getInvoiceComp();
    getAllMenuComp();
  }, []);

  return (
    <div
      style={{
        padding: "0 1rem",
      }}
    >
      <CreateInvoice
        invDialog={invDialog}
        setInvDialog={setInvDialog}
        state={currItem}
        setState={setCurrItem}
        setIsUpdate={setIsUpdate}
        isUpdate={isUpdate}
        invoices={invoices}
        setInvoices={setInvoices}
        allMenuData={allMenuData}
        addNewInvAPI={addNewInvAPI}
        editInvoiceCompAPI={editInvoiceCompAPI}
      />
      <h2>Invoices</h2>
      <div>
        <Grid
          container
          gap={2}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "91vw",
          }}
        >
          {
            // ?.filter((b) => b.segment === "invoices")
            // ?.filter((b) => b.subSegment === segment || segment === "")
            invoices?.map((inv) => (
              <Grid item xs={12} md={5}>
                <InvoiceCard
                  data={inv}
                  key={inv?.id}
                  setCurrItem={setCurrItem}
                  deleteItem={deleteItem}
                  setIsUpdate={setIsUpdate}
                  currItem={currItem}
                  invoices={invoices}
                  setInvoices={setInvoices}
                  clearCurrItem={clearCurrItem}
                  open={invDialog}
                  setOpen={setInvDialog}
                />
              </Grid>
            ))
          }
        </Grid>
      </div>
      {/* <pre>{JSON.stringify(invoices, null, 2)}</pre> */}
    </div>
  );
};

export default Invoices;
