import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Input } from 'antd';
import {BsBellFill,BsPersonCircle,BsArrowRight,BsPencil} from "react-icons/bs";
import {FaGraduationCap} from "react-icons/fa";



const AdministratorsHeader = (props) => {
  const { Search } = Input;
  const onSearch = value => console.log(value);
  const [clicked,setClicked]=useState(false);

  
  return (
    <section className="adminHeader py-2 d-flex  justify-content-around align-items-center row">
      <div className="col-5 d-flex justify-content-around align-items-center " style={{margin:"0px"}}>
           <Link to={props.dashboardLink} style={{color:"white"}}>  <p  className="fs-5 d-flex align-items-center "  style={{margin:"0px"}}> <FaGraduationCap/> {props.acteur}</p></Link> 
          <p className="fs-5 fw-light text-center " style={{margin:"0px"}}>Bienvenu!!! <span className="ms-1">{props.nom}</span></p>
      </div>
      <div className="col-4 d-flex justify-content-center searchBar" style={{margin:"0px"}}>
        <Search placeholder="input search text " allowClear onSearch={onSearch} style={{ width: 350 }} />
      </div>
      
      <div className="col-3 col-sm-2  icons " style={{margin:"0px"}}>
        <Link to={props.notification}>
          <p style={{ margin: "0px" }}><BsBellFill/></p>
        </Link>
       {props.children}
         <div><p style={{ margin: "0px" }} onClick={()=>setClicked(!clicked)}><BsPersonCircle/></p></div> 
      </div>
      <div className="profileOptions" style={clicked===false?{display:"none"}:{}}>
       <p onClick={()=>setClicked(!clicked)}> <Link to={props.profil}><BsPencil /><span className="ms-1">Editer Profil</span></Link></p>
       <hr/>
      <p onClick={()=>setClicked(!clicked)}>  <Link to='/'><BsArrowRight/> <span>Se deconnecter</span></Link></p>
      </div>
     
    </section>
  );
};
export default AdministratorsHeader;
