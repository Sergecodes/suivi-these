import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import NavbarCoordonateur from "./NavbarCoordonateur";
import SidebarCoordonateur from "./SidebarCoordonateur";
import "../../Styles/coordonateurPage/autorisationDeSoutenance.css";
import UploadFile from "./UploadFile";
import FileList from "./FileList";
const pdf = require("../../assets/images/image-pdf.jpg");

function RapportAudition() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  const [files,setFiles]=useState([{
    name:'myFiles.pdf'
  }])
  const removeFile =(filename)=>{
    setFiles(files.filter(file=>filename.name!==filename))
  }
  console.log(files);
  return (
    <div className="containere">
      <NavbarCoordonateur sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <SidebarCoordonateur
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />
      <div className="main">
       
        <div className="container">
          {" "}
          <h1 className="first-autorisation-title">
            Tous vos Rapport D'auditons
          </h1>
          <div className="row">
            <UploadFile files={files} setFiles={setFiles } removeFile={removeFile}/>
            <FileList files={files} removeFile={removeFile} />
          </div>
         
        </div>
      </div>
      ;
    </div>
  );
}

export default RapportAudition;
