import React from "react";
import { AiFillEye } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import "../../Styles/coordonateurPage/autorisationDeSoutenance.css";

const pdf = require("../../assets/images/image-pdf.jpg");

const FileList = ({ files, removeFile }) => {
  return (
    <div>
      <div className="row">
        {files &&
          files.map((f) => (
            <div className="col-md-4" key={f.name}>
              <div className="lettre-conatainer">
                <div className="title-section">
                  <h1>Rapport: {f.name}</h1>
                  <p>Informatique</p>
                </div>
                <div className="body-section">
                  <img src={pdf} alt="logo de pdf" />
                </div>
                <div className="footer-section">
                  <div>
                    <button className="btn-voir button">
                      <AiFillEye /> Voir
                    </button>
                  </div>
                  <div>
                    <button className="btn-tele button">
                      {" "}
                      <IoSend style={{ marginRight: "2px" }} />
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FileList;
