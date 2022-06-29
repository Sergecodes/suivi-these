import React from "react";
import SidenavCoordo from "../components/pageCoordonateur/SidenavCoordo";
import NavbarCoordo from "../components/pageCoordonateur/NavbarCoordo";
import "../Styles/AdminCommon.css";
import "../Styles/Jury.css";
import { useWindowSize } from "react-use";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCoordoClicked } from "../redux/DashboardDisplaySlice";

const Coordonateur = () => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const files = useSelector((state) => state.dashboardDisplay);
  const handleClick=()=>{
    if(files.adminClicked===false && width<922){
      dispatch(setCoordoClicked())
    }
  }

  return (
    <section className="d-flex" style={{ backgroundColor: "#E9EAEF" }}>
      <SidenavCoordo />
      <div
        className="mx-2"
        style={
          files.adminClicked === true || width < 922
            ? { width: "100%", minHeight: "100vh" }
            : { width: "79%", minHeight: "100vh" }
        }
        onClick={handleClick}
      >
       <NavbarCoordo/>
        <Outlet />
      </div>
    </section>
  );
};

export default Coordonateur;
