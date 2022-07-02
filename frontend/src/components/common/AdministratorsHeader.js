import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";
import {
  BsBellFill,
  BsPersonCircle,
  BsArrowRight,
  BsPencil,
} from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaGraduationCap, FaHome } from "react-icons/fa";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../../redux/authentification/authSlice";

const AdministratorsHeader = (props) => {
  const { Search } = Input;
  const navigate = useNavigate();
  const onSearch = (value) => console.log(value);
  const [clicked, setClicked] = useState(false);
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  const handleLogout = () => {
    setClicked(!clicked);
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
    <section className="adminHeader py-2 d-flex  justify-content-around align-items-center row">
      <div
        className="col-6 col-sm-5 d-flex justify-content-around align-items-center "
        style={{ margin: "0px" }}
      >
        <Link to={props.dashboardLink} style={{ color: "white" }}>
          {" "}
          <p
            className=" d-flex align-items-center logoGraduation"
            style={{ margin: "0px", fontSize: "3vw" }}
          >
            {" "}
            <FaGraduationCap /> {props.acteur}
          </p>
        </Link>
        <p
          className=" fw-light text-center welcomeName"
          style={{ margin: "0px", fontSize: "3vw" }}
        >
          Bienvenu!!! <span className="ms-1">{props.nom}</span>
        </p>
      </div>
      <div
        className="col-5 col-sm-4 d-flex justify-content-center "
        style={{ margin: "0px" }}
      >
        <Search
          placeholder="input search text "
          allowClear
          onSearch={onSearch}
          style={{ width: "100%" }}
        />
      </div>

      <div
        className="d-none d-md-flex col-3    icons "
        style={{ margin: "0px" }}
      >
        <Link to="/">
          <p style={{ margin: "0px" }}>
            <FaHome />
          </p>
        </Link>
        <Link to={props.notification}>
          <p style={{ margin: "0px" }}>
            <BsBellFill />
          </p>
        </Link>
        <div
          style={
            props.children === undefined
              ? { display: "none" }
              : {
                  margin: "0",
                  padding: "0",
                  maxWidth: "15px",
                  maxHeight: "24px",
                  overflow: "hidden",
                }
          }
        >
          {props.children}
        </div>
        <div>
          <p style={{ margin: "0px" }} onClick={() => setClicked(!clicked)}>
            <BsPersonCircle />
          </p>
        </div>
      </div>
      <div
        className="mobile col-1 d-flex d-md-none "
        onClick={() => setHamburgerClicked(!hamburgerClicked)}
      >
        <GiHamburgerMenu style={{ transform: "scale(2.0)" }} />
      </div>

      {/*onClick options*/}
      <div
        className="profileOptions"
        style={clicked === false || width < 769 ? { display: "none" } : {}}
      >
        <p onClick={() => setClicked(!clicked)}>
          {" "}
          <Link to={props.profil}>
            <BsPencil />
            <span className="ms-1">Editer Profil</span>
          </Link>
        </p>
        <hr />
        <p
          onClick={handleLogout}
          className="profileOptionsLogout"
          style={{ cursor: "pointer" }}
        >
          {" "}
          <BsArrowRight /> <span>Se deconnecter</span>
        </p>
      </div>

      <div
        className="profileOptions"
        style={
          hamburgerClicked === false || width >= 769 ? { display: "none" } : {}
        }
      >
        <p onClick={() => setHamburgerClicked(!hamburgerClicked)}>
          {" "}
          <Link to="/">
            <FaHome />
            <span className="ms-1">Accueil</span>
          </Link>
        </p>

        <hr />
        <p onClick={() => setHamburgerClicked(!hamburgerClicked)}>
          {" "}
          <Link to={props.notification}>
            <BsBellFill />
            <span className="ms-1">Notification</span>
          </Link>
        </p>
        <hr />
        <p
          style={
            props.children === undefined ? { display: "none" } : { margin: "0" }
          }
        >
          {props.children}
        </p>

        <hr />
        <p onClick={() => setHamburgerClicked(!hamburgerClicked)}>
          {" "}
          <Link to={props.profil}>
            <BsPencil />
            <span className="ms-1">Editer Profil</span>
          </Link>
        </p>
        <hr />
        <p
          onClick={handleLogout}
          className="profileOptionsLogout"
          style={{ cursor: "pointer" }}
        >
          {" "}
          <BsArrowRight /> <span>Se deconnecter</span>
        </p>
      </div>
    </section>
  );
};
export default AdministratorsHeader;
