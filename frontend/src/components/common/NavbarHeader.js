import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import Dropdown from "react-bootstrap/Dropdown";
import { IoLanguage } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
const logo = require("../../assets/images/téléchargement.jpg");

const NavbarHeader = (props) => {
  const [clicked, setClicked] = useState(false);
  const location = useLocation(); //used to have the general idea of the location of the url

  return (
    <section
      className=" rounded container-fluid"
      style={{ borderBottom: "1px solid rgba(149, 157, 165, 0.2)" }}
    >
      <div className="container pb-1">
        <div className="d-flex justify-content-between  align-items-center my-3">
          <div className="logo d-flex align-items-center ">
            <img src={logo} alt="logo ecole doctorale"></img>
            <Link to="/">Ecole Doctorale STG</Link>
          </div>
          <div className="d-flex align-items-center">
            <div className=" d-none d-lg-flex justify-content-around navContent">
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
              <Link
                to="/*"
                style={
                  location.pathname === "/information"
                    ? { color: "var(--primaryColor)" }
                    : {}
                }
              >
                Informations
              </Link>
            </div>
            <Dropdown>
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
            </Dropdown>
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
            <Link
              to="/*"
              style={
                location.pathname === "/information"
                  ? { color: "var(--primaryColor)" }
                  : {}
              }
            >
              Informations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavbarHeader;
