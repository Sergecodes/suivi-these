import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import "../../Styles/coordonateurPage/UploadFile.css";

const UploadFile = ({ files, setFiles }) => {
  const UploadHandle = (event) => {
    const file = event.target.files[0];
    file.isUploading = true;
    setFiles([...files, file]);
  };
  return (
    <>
      <div className="container-fluid" style={{padding:'3%'}}>
        <div className="row">
          <div className="file-card col-md-4">
            <div className="file-input">
              <button>
                <i>
                  <BsPlusLg />
                  {/* <FaTrash/> */}
                </i>{" "}
                uplaod fichier
                <input type="file" onChange={UploadHandle} />
              </button>
            </div>
            <p className="file-support"> Support files</p>
            <p className="file-inof"> PDF , JPG ,PNG</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
