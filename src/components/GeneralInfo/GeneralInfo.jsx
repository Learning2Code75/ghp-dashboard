import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import GeneralInfoCard from "./GeneralInfoCard";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

const GeneralInfo = () => {
  const [generalInfo, setGeneralInfo] = React.useState({
    for_invoice: {
      distributorName: "Good Home Pickles",
      distributorDetails: "9833244723, Mumbai",
      companyBankDetails: {
        bankName: "HDFC Bank",
        acNo: "1211423446546",
        BranchIFSCode: "HDFC0012",
      },
    },
    for_landing_page: {
      contactPage: {
        whatsappBusinessLink: "",
        phoneNo: "9833244723",
        instagramLink:
          "https://instagram.com/vandana_jerajani?igshid=MzRlODBiNWFlZA==",
        gpayQRImgURL: "https://picsum.photos/200/300",
      },
    },
  });

  const handleDistributorNameChange = (e) => {
    setGeneralInfo({
      ...generalInfo,
      for_invoice: {
        ...generalInfo.for_invoice,
        distributorName: e.target.value,
      },
    });
  };
  const handleDistributorDetailsChange = (e) => {
    setGeneralInfo({
      ...generalInfo,
      for_invoice: {
        ...generalInfo.for_invoice,
        distributorDetails: e.target.value,
      },
    });
  };

  const handleBankNameChange = (e) => {
    setGeneralInfo({
      ...generalInfo,
      for_invoice: {
        ...generalInfo.for_invoice,
        companyBankDetails: {
          ...generalInfo.for_invoice.companyBankDetails,
          bankName: e.target.value,
        },
      },
    });
  };
  const handleAcNoChange = (e) => {
    setGeneralInfo({
      ...generalInfo,
      for_invoice: {
        ...generalInfo.for_invoice,
        companyBankDetails: {
          ...generalInfo.for_invoice.companyBankDetails,
          acNo: e.target.value,
        },
      },
    });
  };
  const handleIFSCChange = (e) => {
    setGeneralInfo({
      ...generalInfo,
      for_invoice: {
        ...generalInfo.for_invoice,
        companyBankDetails: {
          ...generalInfo.for_invoice.companyBankDetails,
          BranchIFSCode: e.target.value,
        },
      },
    });
  };

  const handleWhatsappChange = (e) => {
    setGeneralInfo({
      ...generalInfo,
      for_landing_page: {
        ...generalInfo.for_landing_page,
        contactPage: {
          ...generalInfo.for_landing_page.contactPage,
          whatsappBusinessLink: e.target.value,
        },
      },
    });
  };
  const handlePhoneNoChange = (e) => {
    setGeneralInfo({
      ...generalInfo,
      for_landing_page: {
        ...generalInfo.for_landing_page,
        contactPage: {
          ...generalInfo.for_landing_page.contactPage,
          phoneNo: e.target.value,
        },
      },
    });
  };
  const handleInstagramLinkChange = (e) => {
    setGeneralInfo({
      ...generalInfo,
      for_landing_page: {
        ...generalInfo.for_landing_page,
        contactPage: {
          ...generalInfo.for_landing_page.contactPage,
          instagramLink: e.target.value,
        },
      },
    });
  };
  const handleGpayQRImgURLChange = (e) => {
    setGeneralInfo({
      ...generalInfo,
      for_landing_page: {
        ...generalInfo.for_landing_page,
        contactPage: {
          ...generalInfo.for_landing_page.contactPage,
          gpayQRImgURL: e.target.value,
        },
      },
    });
  };

  const generalInfoCollectionRef = collection(db, "generalInfo");
  const getGeneralInfo = async () => {
    try {
      const data = await getDocs(generalInfoCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGeneralInfo(filteredData[0]);
    } catch (err) {
      console.error(err);
    }
  };
  const editGeneralInfo = async () => {
    const homeDoc = doc(db, "generalInfo", generalInfo?.id);
    await updateDoc(homeDoc, generalInfo);
    await getGeneralInfo();
  };
  useEffect(() => {
    getGeneralInfo();
  }, []);

  return (
    <>
      <div
        style={{
          padding: "0 1rem",
        }}
      >
        <h2>General Info</h2>

        {/* <pre>{JSON.stringify(generalInfo, null, 2)}</pre> */}

        <div>
          <Grid
            container
            gap={2}
            style={{
              padding: "1rem .5rem",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "91vw",
            }}
          >
            <Grid item xs={12} md={5}>
              <GeneralInfoCard
                tag={"invoice"}
                data={generalInfo?.for_invoice}
                handleDistributorNameChange={handleDistributorNameChange}
                handleDistributorDetailsChange={handleDistributorDetailsChange}
                handleBankNameChange={handleBankNameChange}
                handleAcNoChange={handleAcNoChange}
                handleIFSCChange={handleIFSCChange}
                editGeneralInfo={editGeneralInfo}
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <GeneralInfoCard
                tag={"landing_page"}
                data={generalInfo?.for_landing_page}
                handleWhatsappChange={handleWhatsappChange}
                handlePhoneNoChange={handlePhoneNoChange}
                handleInstagramLinkChange={handleInstagramLinkChange}
                handleGpayQRImgURLChange={handleGpayQRImgURLChange}
                editGeneralInfo={editGeneralInfo}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;
