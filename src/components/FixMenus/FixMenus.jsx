import {
  Button,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { blogs } from "../../data/blogs";
import { fixmenus } from "../../data/fixmenus";
import FixMenuCard from "./FixMenuCard";
import { RxCrossCircled } from "react-icons/rx";
import { v4 as uuidv4 } from "uuid";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const FixMenus = () => {
  const [segment, setSegment] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [fixMenuData, setFixMenuData] = React.useState([
    // {
    //   id: uuidv4(),
    //   title: "Chunda",
    //   desc: "Chunda Pickle lorem10  Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 Chunda Pickle lorem10 ",
    //   imgUrl: "https://picsum.photos/300/200",
    // },
    // {
    //   id: uuidv4(),
    //   title: "Godkeri",
    //   desc: "Godkeri Pickle",
    //   imgUrl: "https://picsum.photos/300/200",
    // },
    // {
    //   id: uuidv4(),
    //   title: "Muraba",
    //   desc: "Muraba Pickle",
    //   imgUrl: "https://picsum.photos/300/200",
    // },
    // {
    //   id: uuidv4(),
    //   title: "Methia Keri",
    //   desc: "Methia Keri Pickle",
    //   imgUrl: "https://picsum.photos/300/200",
    // },
  ]);
  const [fmdId, setFmdId] = React.useState("");
  const [currItem, setCurrItem] = React.useState({
    id: uuidv4(),
    title: "",
    desc: "",
    imgUrl: "",
  });
  const [isUpdate, setIsUpdate] = React.useState(false);

  const clearCurrItem = () => {
    setIsUpdate(false);
    setCurrItem({
      id: uuidv4(),
      title: "",
      desc: "",
      imgUrl: "",
    });
  };

  const handleChange = (event) => {
    setSegment(event.target.value);
  };
  const handleAddItem = () => {
    setOpen(true);
    clearCurrItem();
  };
  const handleTitleChange = (e) => {
    setCurrItem({ ...currItem, title: e.target.value });
  };
  const handleDescChange = (e) => {
    setCurrItem({ ...currItem, desc: e.target.value });
  };
  const handleImgChange = (e) => {
    setCurrItem({ ...currItem, imgUrl: e.target.value });
  };

  const addItem = async () => {
    let new_item = { ...currItem };
    let new_fix_menu_data = [];
    if (fixMenuData?.length > 0) {
      new_fix_menu_data = [...fixMenuData, new_item];
    } else {
      new_fix_menu_data = [new_item];
    }
    await editFixmenuCompData(new_fix_menu_data);
    setFixMenuData(new_fix_menu_data);
    setOpen(false);
  };

  const deleteItem = async (id) => {
    let new_fix_menu_data = [];
    if (fixMenuData?.length > 0) {
      new_fix_menu_data = [...fixMenuData];
    }
    new_fix_menu_data = new_fix_menu_data?.filter((d) => d.id !== id);
    await editFixmenuCompData(new_fix_menu_data);
    setFixMenuData(new_fix_menu_data);
  };

  const updateItem = async () => {
    let new_item = { ...currItem };
    let new_fix_menu_data = [];
    if (fixMenuData?.length > 0) {
      new_fix_menu_data = [...fixMenuData];
    }
    new_fix_menu_data = new_fix_menu_data.map((d) => {
      if (d?.id === new_item.id) {
        return new_item;
      }
      return d;
    });
    await editFixmenuCompData(new_fix_menu_data);
    setFixMenuData(new_fix_menu_data);
    setOpen(false);
  };

  const fixmenuCompCollectionRef = collection(db, "fixmenuComponent");
  const getFixmenuComp = async () => {
    try {
      const data = await getDocs(fixmenuCompCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFmdId(filteredData[0]?.id);
      setFixMenuData(filteredData[0]?.data);
    } catch (err) {
      console.error(err);
    }
  };
  const editFixmenuCompData = async (fmd) => {
    const aboutDoc = doc(db, "fixmenuComponent", fmdId);
    await updateDoc(aboutDoc, { data: [...fmd] });
    await getFixmenuComp();
  };
  useEffect(() => {
    getFixmenuComp();
  }, []);

  return (
    <>
      <Dialog
        variant="outlined"
        fullWidth={true}
        fullScreen={true}
        open={open}
        onClose={(e, r) => {
          if (r === "backdropClick") {
            setOpen(!open);
          } else {
            setOpen(!open);
          }
        }}
        scroll={"body"}
      >
        <div
          style={{
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <div onClick={() => setOpen(false)}>
              <RxCrossCircled
                style={{
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          <div
            style={{
              width: "100%",
              // background: `url(${currItem?.imgUrl})`,
              backgroundSize: "cover",
              borderRadius: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* <pre>{JSON.stringify(currItem, null, 2)}</pre> */}
              <TextField
                id="standard-basic"
                label="Enter Item name"
                value={currItem?.title}
                onChange={(e) => handleTitleChange(e)}
                variant="standard"
              />
              <TextField
                id="standard-basic"
                label="Enter Description"
                value={currItem?.desc}
                onChange={(e) => handleDescChange(e)}
                variant="standard"
              />

              <TextField
                id="standard-basic"
                label="Enter Image Link"
                value={currItem?.imgUrl}
                onChange={(e) => handleImgChange(e)}
                variant="standard"
              />

              <Button
                variant="contained"
                onClick={isUpdate ? updateItem : addItem}
              >
                {isUpdate ? "Update Item" : "Add Item"}
              </Button>
            </div>
            <Typography component="div" variant="h5">
              {currItem?.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{
                maxHeight: 300,
                overflowY: "scroll",
              }}
            >
              {currItem?.desc}
            </Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <img
                src={currItem?.imgUrl}
                alt={currItem?.imgUrl}
                style={{
                  width: "40%",
                  background: `url(${currItem?.imgUrl})`,
                  backgroundSize: "cover",
                  borderRadius: "1rem",
                }}
              />
            </div>
          </div>
        </div>
      </Dialog>
      <div
        style={{
          padding: "0 1rem",
        }}
      >
        <h2>Fix Menus</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "1rem",
            }}
            onClick={handleAddItem}
          >
            <ControlPointRoundedIcon
              sx={{ fontSize: "1.2rem", marginRight: ".4rem" }}
            />
            Add Item
          </Button>

          {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Segment</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={segment}
            label="Segment"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value={"ueu-segment1"}>Segment 1</MenuItem>
            <MenuItem value={"ueu-segment2"}>Segment 2</MenuItem>
            <MenuItem value={"ueu-segment3"}>Segment 3</MenuItem>
            <MenuItem value={"ueu-segment4"}>Segment 4</MenuItem>
            <MenuItem value={"ueu-segment5"}>Segment 5</MenuItem>
            <MenuItem value={"ueu-segment6"}>Segment 6</MenuItem>
          </Select>
        </FormControl> */}
        </div>
        <div>
          <Grid
            container
            gap={2}
            style={{
              padding: "1rem .5rem",
              justifyContent: "center",
              alignItems: "center",
              width: "91vw",
            }}
          >
            {fixMenuData
              // ?.filter((b) => b.segment === "fix-menus-updates")
              // ?.filter((b) => b.subSegment === segment || segment === "")
              ?.map((fms) => (
                <Grid item xs={12} md={5}>
                  <FixMenuCard
                    data={fms}
                    key={fms?.id}
                    setOpen={setOpen}
                    setCurrItem={setCurrItem}
                    deleteItem={deleteItem}
                    setIsUpdate={setIsUpdate}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default FixMenus;
