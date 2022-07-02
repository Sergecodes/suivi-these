import React from "react";
import ConseilHeader from "../components/pageConseil/ConseilHeader";
import "../Styles/AdminCommon.css";
import "../Styles/Jury.css";
import { Outlet } from "react-router-dom";

const Conseil = () => {
  
  return (
    <div
      style={{
        backgroundColor: "#E9EAEF",
        minHeight: "100vh",
        maxWidth: "100vw",
        orverflow: "hidden",
      }}
    >
      <ConseilHeader />
      <Outlet />
      <p className="border border-top text-center fw-bold py-2">
        ECOLE DOCTORALE STG
      </p>
    </div>
  );
};

export default Conseil;
