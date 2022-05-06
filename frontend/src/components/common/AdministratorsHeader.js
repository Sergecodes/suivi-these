import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { setAdminClicked } from "../../redux/DashboardDisplaySlice";
import { useDispatch, useSelector } from "react-redux";
import { Input } from 'antd';
import {BsBellFill,BsDownload,BsPersonCircle} from "react-icons/bs";



const AdministratorsHeader = (props) => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.dashboardDisplay);
 /// const location = useLocation();
  const { Search } = Input;
  const onSearch = value => console.log(value);
  

  
  return (
    <section className="adminHeader my-2 d-flex  justify-content-around align-items-center row">
      <div className="col-5 d-flex justify-content-around align-items-center " style={{margin:"0px"}}>
          <GiHamburgerMenu
            className="adminOptions"
            onClick={() => {
              dispatch(setAdminClicked());
            }}
            style={files.adminClicked === true ? { color: "#FF5821" } : {}}
          />
          <p className="fs-5 fw-light d-flex justify-content-center flex-wrap align-items-center " style={{margin:"0px"}}>Bienvenu!!! <span className="ms-1">{props.nom}</span></p>
      </div>
      <div className=" col-5 d-flex justify-content-center " style={{margin:"0px"}}>
        <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 300 }} />
      </div>
      
      <div className="col-2  icons " style={{margin:"0px"}}>
        <Link to="/">
          <p style={{ margin: "0px" }}><BsBellFill/></p>
        </Link>
        <Link to="/">
          <p style={{ margin: "0px" }}><BsDownload/></p>
        </Link>
        <Link to="/">
          <p style={{ margin: "0px" }}><BsPersonCircle/></p>
        </Link>
      </div>
     
    </section>
  );
};
export default AdministratorsHeader;
