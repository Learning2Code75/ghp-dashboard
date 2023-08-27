import React from "react";
import { useState, useEffect } from "react";
import { FiDelete, FiSave } from "react-icons/fi";
import numWords from "num-words";

import { fixmenuProducts } from "../../data/fixmenus";

const InvTableEntry = ({ state, setState, index, invTEntry, allMenuData }) => {
  // const products = fixmenuProducts;
  // console.log({ products });
  console.log({ allMenuData });
  const products = allMenuData;

  const [entry, setEntry] = useState({
    siNo: 0,
    descriptionOfGoods: "",
    hsnSAC: "",
    GSTRate: "",
    qty: "",
    rate: "",
    per: "unit",
    amount: "",
  });

  const calcInvTaxTable = (invTable) => {
    let invTaxTable = [];
    let hsnTaxMap = {
      hsns: [],
      rates: [],
    };
    for (let i = 0; i < invTable.length; i++) {
      if (!hsnTaxMap.hsns.includes(invTable[i].hsnSAC)) {
        hsnTaxMap.hsns.push(invTable[i].hsnSAC);
        hsnTaxMap.rates.push(invTable[i].GSTRate);
      }
    }

    for (let i = 0; i < hsnTaxMap.hsns.length; i++) {
      let taxable_value = 0;
      for (let j = 0; j < invTable.length; j++) {
        if (invTable[j].hsnSAC === hsnTaxMap.hsns[i]) {
          taxable_value =
            parseFloat(taxable_value) + parseFloat(invTable[j].amount);
        }
      }
      let central_tax_rate = parseFloat(hsnTaxMap.rates[i]) / 2;
      let central_tax_amt =
        (parseFloat(taxable_value) * central_tax_rate) / 100;

      let state_tax_rate = parseFloat(hsnTaxMap.rates[i]) / 2;
      let state_tax_amt = (parseFloat(taxable_value) * state_tax_rate) / 100;

      let invTaxTableEntry = {
        hsnSAC: hsnTaxMap.hsns[i],
        taxableValue: taxable_value.toString(),
        centralTaxRate: central_tax_rate.toString(),
        centralTaxAmt: central_tax_amt.toString(),
        stateTaxRate: state_tax_rate.toString(),
        stateTaxAmt: state_tax_amt.toString(),
      };
      invTaxTable.push(invTaxTableEntry);
    }

    return invTaxTable;
  };

  const calcInvFields = (invTable) => {
    let totalQty = 0;
    let totalAmount = 0;
    let amtChargableInWords = "";

    for (let i = 0; i < invTable.length; i++) {
      totalQty = totalQty + invTable[i].qty;
      console.log(invTable[i].qty);
      totalAmount = parseFloat(totalAmount) + parseFloat(invTable[i].amount);
    }

    totalAmount = totalAmount.toFixed();
    amtChargableInWords = numWords(totalAmount) + " only";

    console.log(totalQty);
    return {
      totalQty,
      totalAmount: totalAmount.toString(),
      amtChargableInWords,
    };
  };

  const calcInvTaxFields = (invTaxTable, ta) => {
    let totalTaxableValue = 0;
    let totalCentralTaxAmt = 0;
    let totalStateTaxAmt = 0;
    let taxAmtInWords = "";
    let totalAmount = parseFloat(ta);
    let amtChargableInWords = "";

    for (let i = 0; i < invTaxTable.length; i++) {
      totalTaxableValue =
        parseFloat(totalTaxableValue) + parseFloat(invTaxTable[i].taxableValue);
      totalCentralTaxAmt =
        parseFloat(totalCentralTaxAmt) +
        parseFloat(invTaxTable[i].centralTaxAmt);
      totalStateTaxAmt =
        parseFloat(totalStateTaxAmt) + parseFloat(invTaxTable[i].stateTaxAmt);
    }

    let ttax = parseFloat(totalCentralTaxAmt + totalStateTaxAmt);
    console.log(ttax);
    ttax = ttax.toFixed();
    taxAmtInWords = numWords(ttax);
    taxAmtInWords = taxAmtInWords + " only";
    console.log(taxAmtInWords);
    totalAmount = totalAmount + totalCentralTaxAmt + totalStateTaxAmt;
    totalAmount = totalAmount.toFixed();
    amtChargableInWords = numWords(totalAmount);
    amtChargableInWords = amtChargableInWords + " only";

    return {
      totalTaxableValue: totalTaxableValue.toString(),
      totalCentralTaxAmt: totalCentralTaxAmt.toString(),
      totalStateTaxAmt: totalStateTaxAmt.toString(),
      taxAmtInWords,
      totalAmount: totalAmount.toString(),
      amtChargableInWords,
    };
  };

  const findDesc = (id) => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].prodSKU === id) {
        return products[i].prodName;
      }
    }
  };

  const addEntry = (e) => {
    e.preventDefault();
    let descDisplay = findDesc(entry?.descriptionOfGoods);

    let new_invoice_table = [...state.invoice.invTable];
    let curr_entry = { ...entry, descDisplay };
    new_invoice_table[index] = curr_entry;
    let new_invoice = { ...state.invoice };
    new_invoice.invTable = new_invoice_table;
    let inv_fields = calcInvFields(new_invoice_table);
    new_invoice.totalQty = inv_fields.totalQty;
    new_invoice.totalAmount = inv_fields.totalAmount;
    new_invoice.amtChargableInWords = inv_fields.amtChargableInWords;

    let new_inv_tax_table = calcInvTaxTable(new_invoice_table);
    new_invoice.invTaxTable = new_inv_tax_table;

    let inv_tax_fields = calcInvTaxFields(
      new_inv_tax_table,
      new_invoice.totalAmount
    );

    new_invoice.totalTaxableValue = inv_tax_fields.totalTaxableValue;
    new_invoice.totalCentralTaxAmt = inv_tax_fields.totalCentralTaxAmt;
    new_invoice.totalStateTaxAmt = inv_tax_fields.totalStateTaxAmt;
    new_invoice.taxAmtInWords = inv_tax_fields.taxAmtInWords;
    new_invoice.totalAmount = inv_tax_fields.totalAmount;
    new_invoice.amtChargableInWords = inv_tax_fields.amtChargableInWords;

    setState({
      ...state,
      invoice: new_invoice,
    });
  };
  const delEntry = (e) => {
    e.preventDefault();
    let new_state = { ...state };
    new_state.invoice.invTable.splice(index, 1);
    let inv_fields = calcInvFields(new_state.invoice.invTable);

    new_state.invoice.totalQty = inv_fields.totalQty;
    new_state.invoice.totalAmount = inv_fields.totalAmount;
    new_state.invoice.amtChargableInWords = inv_fields.amtChargableInWords;

    let new_inv_tax_table = calcInvTaxTable(new_state.invoice.invTable);
    new_state.invoice.invTaxTable = new_inv_tax_table;

    let inv_tax_fields = calcInvTaxFields(
      new_inv_tax_table,
      new_state.invoice.totalAmount
    );

    new_state.invoice.totalTaxableValue = inv_tax_fields.totalTaxableValue;
    new_state.invoice.totalCentralTaxAmt = inv_tax_fields.totalCentralTaxAmt;
    new_state.invoice.totalStateTaxAmt = inv_tax_fields.totalStateTaxAmt;
    new_state.invoice.taxAmtInWords = inv_tax_fields.taxAmtInWords;
    new_state.invoice.totalAmount = inv_tax_fields.totalAmount;
    new_state.invoice.amtChargableInWords = inv_tax_fields.amtChargableInWords;

    setState(new_state);
  };
  useEffect(() => {
    console.log("rendered");
    console.log(state.invoice.invTable[index]);

    setEntry({
      ...state.invoice.invTable[index],
    });
  }, [state]);

  useEffect(() => {
    let new_amount = 0;
    new_amount = parseInt(entry.qty) * parseFloat(entry.rate);
    setEntry({ ...entry, amount: new_amount.toString() });
  }, [entry.qty, entry.rate]);

  const populateProduct = () => {
    let new_entry = { ...entry };
    let prodSKUSel = new_entry.descriptionOfGoods;
    let prod = {};
    for (let i = 0; i < products?.length; i++) {
      if (products[i]?.prodSKU === prodSKUSel) {
        prod = { ...products[i] };
        break;
      }
    }
    // console.log("rendered");
    setEntry({
      ...entry,
      GSTRate: prod.prodTax,
      rate: prod.productUnitRate,
    });
  };

  return (
    <>
      {/* <pre>{JSON.stringify(entry, null, 2)}</pre> */}
      <div
        className="FlexBetween"
        style={{
          margin: ".3em 0",
          alignItems: "center",
        }}
      >
        <select
          placeholder="descn of goods"
          value={entry.descriptionOfGoods}
          onChange={(e) =>
            setEntry({ ...entry, descriptionOfGoods: e.target.value })
          }
          className="formControl"
          style={{ width: "80%" }}
        >
          <option value="">select product</option>
          {products.map((p) => (
            <option value={p.prodSKU}>
              {p.prodName}|{p.prodDesc}
            </option>
          ))}
        </select>
        <div
          className="btn1"
          onClick={() => populateProduct()}
          style={{
            fontSize: ".8em",
            margin: "0",
            width: "20%",
            marginLeft: ".3em",
            padding: ".5em .4em",
          }}
        >
          Populate
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <pre>{JSON.stringify(entry, null, 2)}</pre> */}
        {/* <input
        placeholder="descn of goods"
        value={entry.descriptionOfGoods}
        onChange={(e) =>
          setEntry({ ...entry, descriptionOfGoods: e.target.value })
        }
        className="formControl"
      /> */}

        <input
          placeholder="HSN SAC"
          value={entry.hsnSAC}
          onChange={(e) => setEntry({ ...entry, hsnSAC: e.target.value })}
          className="formControl"
        />

        <input
          placeholder="GST Rate"
          value={entry.GSTRate}
          onChange={(e) => setEntry({ ...entry, GSTRate: e.target.value })}
          className="formControl"
        />

        <input
          type="number"
          placeholder="qty"
          value={entry.qty}
          onChange={(e) =>
            setEntry({ ...entry, qty: parseInt(e.target.value) })
          }
          className="formControl"
        />
        <input
          placeholder="rate"
          value={entry.rate}
          onChange={(e) => setEntry({ ...entry, rate: e.target.value })}
          className="formControl"
        />

        {/* <select
        value={entry.per}
        onChange={(e) => setEntry({ ...entry, per: e.target.value })}
      >
        <option value={"unit"}>unit</option>
      </select> */}

        <input value={entry.per} disabled={true} className="formControl" />

        <input
          placeholder="amount"
          value={entry.amount}
          // onChange={(e) => setEntry({ ...entry, amount: e.target.value })}
          disabled={true}
          className="formControl"
        />

        <button
          className="btn1"
          style={{
            margin: "0 0 0 .4em",
            padding: ".4rem 0",
            width: "20%",
          }}
          onClick={addEntry}
        >
          <FiSave />
        </button>

        <button
          className="btn3"
          style={{
            margin: "0 0 0 .4em",
            padding: ".4rem 0",
            width: "20%",
          }}
          onClick={delEntry}
        >
          <FiDelete />
        </button>
      </div>
    </>
  );
};

export default InvTableEntry;
