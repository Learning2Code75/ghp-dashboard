import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase-config";
import ImagesAdd from "./ImagesAdd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
function ImagesView() {
  const [imgGrid, setImgGrid] = useState([]);
  const imgGridCollectionRef = collection(db, "imgComponent");

  const getImgs = async () => {
    try {
      const data = await getDocs(imgGridCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setImgGrid(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteImg = async (id) => {
    const imgDoc = doc(db, "imgComponent", id);
    await deleteDoc(imgDoc);
    await getImgs();
  };
  return (
    <div
      style={{
        paddingLeft: "2rem",
      }}
    >
      <ImagesAdd />
      <div>
        <button className="btn-sm" onClick={() => getImgs()}>
          Show images
        </button>
      </div>
      <div className="HomeView">
        <div className="imgGrid">
          {/* <pre>{JSON.stringify(imgGrid, null, 2)}</pre> */}
          {imgGrid.map((img) => (
            <div key={img.id} className="imgComp">
              <img src={img.imgUrl} alt="img" height={150} width={150} />

              {/* <div>{img.imgUrl}</div> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <CopyToClipboard
                  text={img.imgUrl}
                  // onCopy={() => this.setState({ copied: true })}
                >
                  <button
                    className="btn-sm"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ContentCopyRoundedIcon />
                    <span>Copy</span>
                  </button>
                </CopyToClipboard>
                <button
                  className="btn-sm btn-logout"
                  onClick={() => deleteImg(img.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImagesView;
