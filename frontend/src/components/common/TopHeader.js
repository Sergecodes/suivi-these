import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { BsClock, BsTelephoneFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";

const TopHeader = (props) => {
  return (
    <section className="container-fluid topHeader px-5 ">
      <div className="d-flex justify-content-around topHeaderInfo fs-6">
        <span>
          <FaEnvelope className="topHeaderIcon" /> ecoledoctorale@gmail.com
        </span>
        <span>
          <BsTelephoneFill className="topHeaderIcon" /> 243898521
        </span>
        <span>
          <BsClock className="topHeaderIcon" /> Lun-Ven 10h-18h
        </span>
        <span>
          <GoLocation className="topHeaderIcon" /> B.P, 812 Yaoundé 1
        </span>
      </div>
      <div className="d-flex justify-content-end">
        <Link to="/connexion/etudiant">
          <button
            className="my-1 me-1 headerIconEmpty rounded-pill"
            style={props.isLogin === true ? { display: "none" } : {}}
          >
            {" "}
             Se connecter
          </button>
        </Link>
        <Link to="/inscription/etudiant">
          <button
            className=" my-1 px-4 ms-3 headerIconFull rounded-pill"
            style={props.isLogin === true ? { display: "none" } : {}}
          >
            {" "}
            S'inscrire
          </button>
        </Link>
        <Link to="/*">
          <button
            className=" my-1 px-4 ms-3 headerIconFull rounded-pill"
            style={props.isLogin === false ? { display: "none" } : {}}
          >
            Profil
          </button>
        </Link>
        <Link to="/*">
          <button
            className=" my-1 px-3 ms-3 headerIconEmpty rounded-pill"
            style={props.isLogin === false ? { display: "none" } : {}}
          >
            Deconnexion
          </button>
        </Link>
      </div>
    </section>
  );
};

export default TopHeader;
