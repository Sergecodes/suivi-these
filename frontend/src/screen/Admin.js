import React from "react";
import AdminSidenav from "../components/pageAdmin/AdminSidenav";
import NavbarAdmin from "../components/pageAdmin/NavbarAdmin";
import "../Styles/AdminCommon.css";
import "../Styles/Admin.css";
import "../Styles/Jury.css";
import { useWindowSize } from "react-use";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAdminClicked } from "../redux/DashboardDisplaySlice";

const Admin = () => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const files = useSelector((state) => state.dashboardDisplay);
  const handleClick=()=>{
    if(files.adminClicked===false && width<922){
      dispatch(setAdminClicked())
    }
  }

  return (
    <section className="d-flex" style={{ backgroundColor: "#E9EAEF" }}>
      <AdminSidenav />
      <div
        className="mx-2"
        style={
          files.adminClicked === true || width < 922
            ? { width: "100%", minHeight: "100vh" }
            : { width: "79%", minHeight: "100vh" }
        }
        onClick={handleClick}
      >
       <NavbarAdmin/>
        <Outlet />
      </div>
    </section>
  );
};

export default Admin;
