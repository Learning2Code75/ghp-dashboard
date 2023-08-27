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
export default function MediaControlCard({
  data,
  setOpen,
  setCurrItem,
  deleteItem,
  setIsUpdate,
}) {
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151, maxHeight: 151 }}
        image={data?.imgUrl}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {data?.title}
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
            {data?.desc}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
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
        </Box>
      </Box>
    </Card>
  );
}
