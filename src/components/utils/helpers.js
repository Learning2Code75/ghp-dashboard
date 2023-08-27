export const convertMenuItemsToInvoiceProducts = (arr) => {
  let new_inv_prods = [];

  arr.forEach((item, idx) => {
    new_inv_prods.push({
      category: "",
      discount: "",
      prodDesc: item?.desc,
      prodImgUrl: item?.imgUrl,
      prodName: item?.title,
      prodSKU: item?.id,
      prodTax: "5",
      productUnitRate: "",
      qty: 0,
    });
  });
  return new_inv_prods;
};
