import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Button, TextField } from "@mui/material";
export default function MediaControlCard({
  data,
  tag,
  handleDistributorNameChange,
  handleDistributorDetailsChange,
  handleBankNameChange,
  handleAcNoChange,
  handleIFSCChange,
  handleWhatsappChange,
  handlePhoneNoChange,
  handleInstagramLinkChange,
  handleGpayQRImgURLChange,
  editGeneralInfo,
}) {
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex" }}>
      {tag === "invoice" ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {"Invoice Details "}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{
                maxHeight: 100,
                overflowY: "scroll",
              }}
            >
              {"General details to prefill in the invoice"}
            </Typography>
            <TextField
              value={data?.distributorName}
              placeholder={"Seller Name"}
              onChange={(e) => handleDistributorNameChange(e)}
              variant="standard"
              label="Seller Name"
              fullWidth
              sx={{
                margin: "1rem 0",
              }}
            />
            <TextField
              value={data?.distributorDetails}
              placeholder={"Seller Details(addr)"}
              onChange={(e) => handleDistributorDetailsChange(e)}
              variant="standard"
              label="Seller Details(addr)"
              fullWidth
              sx={{
                margin: "1rem 0",
              }}
            />
            <Typography variant="h6">Bank Details</Typography>
            <TextField
              value={data?.companyBankDetails?.bankName}
              placeholder={"Bank Name"}
              onChange={(e) => handleBankNameChange(e)}
              variant="standard"
              label="Bank Name"
              fullWidth
              sx={{
                margin: "1rem 0",
              }}
            />
            <TextField
              value={data?.companyBankDetails?.acNo}
              placeholder={"A/C No."}
              onChange={(e) => handleAcNoChange(e)}
              variant="standard"
              label="A/C No."
              fullWidth
              sx={{
                margin: "1rem 0",
              }}
            />
            <TextField
              value={data?.companyBankDetails?.BranchIFSCode}
              placeholder={"Branch IFSC Code"}
              onChange={(e) => handleIFSCChange(e)}
              variant="standard"
              label="Branch IFSC Code"
              fullWidth
              sx={{
                margin: "1rem 0",
              }}
            />
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Button variant="contained" onClick={editGeneralInfo}>
              Save Details
            </Button>
          </Box>
        </Box>
      ) : tag === "landing_page" ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {"Website Details "}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{
                maxHeight: 100,
                overflowY: "scroll",
              }}
            >
              {"General details to display on website."}
            </Typography>
            <TextField
              value={data?.contactPage?.whatsappBusinessLink}
              placeholder={"WhatsApp Business Link"}
              onChange={(e) => handleWhatsappChange(e)}
              variant="standard"
              label="WhatsApp Business Link"
              fullWidth
              sx={{
                margin: "1rem 0",
              }}
            />
            <TextField
              value={data?.contactPage?.phoneNo}
              placeholder={"Phone No."}
              onChange={(e) => handlePhoneNoChange(e)}
              variant="standard"
              label="Phone No."
              fullWidth
              sx={{
                margin: "1rem 0",
              }}
            />
            <TextField
              value={data?.contactPage?.instagramLink}
              placeholder={"Instagram Link"}
              onChange={(e) => handleInstagramLinkChange(e)}
              variant="standard"
              label="Instagram Link"
              fullWidth
              sx={{
                margin: "1rem 0",
              }}
            />
            <TextField
              value={data?.contactPage?.gpayQRImgURL}
              placeholder={"GPay QR Image Link"}
              onChange={(e) => handleGpayQRImgURLChange(e)}
              variant="standard"
              label="GPay QR Image Link"
              fullWidth
              sx={{
                margin: "1rem 0",
              }}
            />
            <CardMedia
              component="img"
              sx={{ width: 151, maxHeight: 151 }}
              image={data?.contactPage?.gpayQRImgURL}
              alt="Live from space album cover"
            />
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Button variant="contained" onClick={editGeneralInfo}>
              Save Details
            </Button>
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Card>
  );
}
