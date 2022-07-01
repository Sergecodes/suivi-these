import React, {useEffect,useState} from "react";
import { FaEnvelope } from "react-icons/fa";
import { BsClock, BsTelephoneFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TopHeader = (props) => {
  const navigate = useNavigate();
  console.log(localStorage.actor);

  const handleProfileRedirect = () => {
    if(localStorage.actor === "etudiant"){
      navigate('/account/evolution');
    }
    else (
      navigate(`/acteur/${localStorage.actor}/dashboard`)
    )
  }

  const handleLogout = () => {
    axios
      .post("/logout")
      .then((res) => {
        console.log(res);
        localStorage.removeItem("user");
        localStorage.removeItem("actor");
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
        <button
          className=" my-1 px-4 ms-3 headerIconFull rounded-pill"
          style={props.isLogin === false ? { display: "none" } : {}}
          onClick={handleProfileRedirect}
        >
          Profil
        </button>
        <Link to="/">
          <button
              className=" my-1 px-3 ms-3 headerIconEmpty rounded-pill"
              style={props.isLogin === false ? { display: "none" } : {}}
              onClick={handleLogout}
            >
              Deconnexion
            </button>
        </Link>
      </div>
    </section>
  );
};

export default TopHeader;
