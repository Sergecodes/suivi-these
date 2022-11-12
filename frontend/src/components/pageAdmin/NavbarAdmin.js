import React, { useState } from "react";
import { BsPersonFill, BsBellFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPencil, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { setAdminClicked } from "../../redux/DashboardDisplaySlice";
import axios from "axios";
import { logout } from "../../redux/authentification/authSlice";
import { toast } from "react-toastify";

const logo = require("../../assets/images/téléchargement.jpg");

const NavbarAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const handleLogout = () => {
    axios
    .post("/logout")
    .then((res) => {
      console.log(res);
      dispatch(logout());
      toast.success("Deconnexion Reussie");
      localStorage.removeItem("user");
      localStorage.removeItem("actor");
      navigate("/");
    })
    .catch((err) => {
      console.error(err);
    });
  };

  return (
    <section className="container adminNavbar py-1">
      <div className="d-flex justify-content-between align-items-center row">
        <div className="d-flex justify-content-around align-items-center col-4">
          <GiHamburgerMenu
            onClick={() => dispatch(setAdminClicked())}
            style={{ cursor: "pointer", marginRight: '1.5rem', fontSize: '2rem' }}
          />
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="logo" />
            <span className="fs-4 ms-1">ECOLE DOCTORALE</span>
          </div>
        </div>
        <div className="d-flex fs-6 justify-content-around col-2">
          <BsBellFill
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/acteur/admin/notifications");
            }}
          />
          <BsPersonFill
            style={{ cursor: "pointer" }}
            onClick={() => setClicked(!clicked)}
          />
        </div>
      </div>

      {/*onClick options*/}
      <div
        className="profileOptions"
        style={clicked === false ? { display: "none" } : {}}
      >
        <p onClick={() => setClicked(!clicked)}>
          {" "}
          <Link to="/acteur/admin/profil">
            <BsPencil />
            <span className="ms-1">Editer Profil</span>
          </Link>
        </p>
        <hr />
        <p onClick={handleLogout} className="profileOptionsLogout" style={{cursor:"pointer"}}>
          {" "}
            <BsArrowRight /> <span>Se deconnecter</span>
        </p>
      </div>
    </section>
  );
};

export default NavbarAdmin;
