import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { setClicked } from "../../redux/DashboardDisplaySlice";
import { useDispatch, useSelector } from "react-redux";

const NavbarEtudiant = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.dashboardDisplay);
  const location = useLocation();
  function test() {
    if (location.pathname === "/account/depot")
      return "DEPOT DU DOSSIER DE SOUTENANCE";
    else if (location.pathname === "/account/evolution")
      return "EVOLUTION DU DOSSIER DE SOUTENACE";
    else if (location.pathname === "/account/profil")
      return "PROFIL DE L'ETUDIANT";
  }

  return (
    <section className="navHeaderElements d-flex justify-content-between align-items-center px-3">
      <GiHamburgerMenu
        className="options"
        onClick={() => {
          dispatch(setClicked());
        }}
        style={files.clicked === true ? { color: "#FF5821" } : {}}
      />
      <h4 style={{ margin: "0px" }}>{test()}</h4>
      <Link to="/">
        <p style={{ margin: "0px" }}>Retour vers la page d'accueil</p>
      </Link>
    </section>
  );
};

export default NavbarEtudiant;
