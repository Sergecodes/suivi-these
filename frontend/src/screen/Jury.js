import React, { useEffect } from "react";
import JuryHeader from "../components/pageJury/JuryHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/AdminCommon.css";
import "../Styles/Jury.css";
import { Outlet, useNavigate } from "react-router-dom";

const Jury = () => {
  const navigate = useNavigate();
  const juryInfos = JSON.parse(localStorage.getItem("juryInfos"));
  const accesRequired = () => {
    if (juryInfos == null) {
      alert("vous devez etre connecte ");
      navigate("/connexion/jury");
      console.log(`les infos des jury sont ${juryInfos}`);
    } else {
      toast.success("Connexion succesfull");
    }
  };
  useEffect(() => {
    // accesRequired();
  }, [navigate, juryInfos]);
  return (
    <div
      style={{
        backgroundColor: "#E9EAEF",
        minHeight: "100vh",
        maxWidth: "100vw",
        orverflow: "hidden",
      }}
    >
      <JuryHeader />
      <Outlet />
      <ToastContainer />
      <p className="border border-top text-center fw-bold py-2">
        ECOLE DOCTORALE STG
      </p>
    </div>
  );
};

export default Jury;
