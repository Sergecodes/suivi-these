import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
// import Dropdown from "react-bootstrap/Dropdown";
// import { IoLanguage } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
const logo = require("../../assets/images/téléchargement.jpg");

const NavbarHeader = (props) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const location = useLocation(); 

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("Informations", "info", null, [
      getItem("Ecole doctorale", "ecole-doctorale", null, [
        getItem("Presentation", "presentation"),
        getItem("Equipe", "equipe"),
        getItem("Unite de recherche", "unites-recherche"),
        getItem("Conseil scientifique", "conseil"),
      ]),
      getItem("Sujet de thèse", "sujet-de-thèse", null, [
        getItem("Candidature", "candidature"),
      ]),
      getItem("Le doctorat", "le-doctorat", null, [
        getItem("Inscription", "inscription"),
        getItem("Formation en thèse", "formation"),
        getItem("Suivi de formation", "suivi-de-formation"),
        getItem("Procédure de présoutenance", "procédure"),
        getItem("Thèse en cotutelle", "thèse-cotutelle"),
        getItem("Thèse en cours", "thèse-en-cours"),
      ]),
      getItem("Divers", "divers", null, [
        getItem("Documents importants", "document"),
      ]),
    ]),
  ];

  const onClick = (e) => {
    navigate(`/informations/` + e.key);
  };

  return (
    <section
      className="navbarHeader rounded container-fluid"
      style={{
        borderBottom: "1px solid rgba(149, 157, 165, 0.2)",
        width: "100%",
      }}
    >
      <div className="container pb-1">
        <div className="d-flex justify-content-between  align-items-center py-2">
          <div className="logo d-flex align-items-center ">
            <img
              src={logo}
              alt="logo ecole doctorale"
              onClick={() => navigate("/")}
            ></img>
            <Link to="/">Ecole Doctorale STG</Link>
          </div>
          <div className="d-flex align-items-center">
            <div className=" d-none d-lg-flex justify-content-around align-items-center navContent">
              <Link
                to="/"
                style={
                  location.pathname === "/"
                    ? { color: "var(--primaryColor)" }
                    : {}
                }
              >
                Accueil
              </Link>
              <div className="navContentCascader">
                <Menu onClick={onClick} mode="vertical" items={items} />
              </div>
              <Link
                to="/soutenances"
                style={
                  location.pathname === "/soutenances"
                    ? { color: "var(--primaryColor)" }
                    : {}
                }
              >
                Soutenances
              </Link>
            </div>
            {/* <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{
                  backgroundColor: "white",
                  color: "#595656",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <IoLanguage className="language" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#595656" }}
                  >
                    Français
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#595656" }}
                  >
                    Anglais
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
            <GiHamburgerMenu
              className="d-flex d-lg-none options"
              onClick={() => {
                setClicked(!clicked);
              }}
              style={clicked === true ? { color: "var(--primaryColor)" } : {}}
            />
          </div>
        </div>
        <div
          className="navMobile  d-lg-none"
          style={clicked === true ? {} : { display: "none" }}
        >
          <div className="d-flex fs-5 fw-bold flex-column navContent align-items-center">
            <ImCross
              className="my-5 cross"
              onClick={() => {
                setClicked(!clicked);
              }}
              style={{ height: "30px", width: "30px" }}
            />
            <Link
              to="/"
              style={
                location.pathname === "/"
                  ? { color: "var(--primaryColor)" }
                  : {}
              }
            >
              Accueil
            </Link>
            <Link
              to="/soutenance"
              style={
                location.pathname === "/soutenance"
                  ? { color: "var(--primaryColor)" }
                  : {}
              }
            >
              Soutenances
            </Link>
            <div className="navContentCascader" style={{ 
              position: 'relative', 
              height: 'initial', 
              width: '80%',
              border: 'none',
              marginRight: '4.5rem',
            }}>
              <Menu onClick={onClick} mode="vertical" items={items} />
            </div>
            {/* <Link
              to="/*"
              style={
                location.pathname === "/information"
                  ? { color: "var(--primaryColor)" }
                  : {}
              }
            >
              Informations
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavbarHeader;
