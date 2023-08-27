import React, { useState, useEffect } from "react";
import { storage, db } from "../../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function ImagesAdd() {
  const [file, setFile] = useState("");
  const [imgData, setImgData] = useState({});
  const [per, setPer] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + "_" + file.name;
      //uploading img to storage
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            // adding imgurl to img collection
            setImgData((prev) => ({ ...prev, imgUrl: downloadURL }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleInputImage = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "imgComponent"), {
        ...imgData,
        timestamp: serverTimestamp(),
      });
      await setFile(null);
      setImgData({});
      setPer(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid">
        <div className="grid-card">
          <h1>Add Image here</h1>
          <form className="createHomeForm" onSubmit={handleInputImage}>
            <div className="form-grid">
              <div className="inputCD">
                <label>Image File(.png, .jpg, .jpeg)</label>
                <input
                  placeholder="Name of Project"
                  type="file"
                  id={`img`}
                  onChange={(e) => setFile(e.target.files[0])}
                  className="btn-sm"
                  style={{
                    width: "50%",
                    margin: "1rem",
                  }}
                />
              </div>
            </div>

            <button
              disabled={per !== null && per < 100}
              className={`${
                per !== null && per < 100 ? "noneDisplay" : " "
              } btn-sm`}
              type="submit"
            >
              Add Image
            </button>
          </form>
          <div>
            <h4>Preview Image</h4>
            <img src={imgData.imgUrl} height="100" width="150" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ImagesAdd;
