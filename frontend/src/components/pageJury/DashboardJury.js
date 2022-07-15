import React from "react";
import { Link } from "react-router-dom";
import {BsCheck, BsX, BsFillFolderFill} from  "react-icons/bs";
import TableList from "./TableList";

const DashboardJury = () => {
  const infos = [
    { slug: "total", nom: "Dossiers totaux", nombre: "3",color:"orange",icon:<BsFillFolderFill className="fs-4" /> },
    { slug: "noté", nom: "Etudiants déja notés", nombre: "2" ,color:"green",icon:<BsCheck className="fs-3"/> },
    { slug: "non-noté", nom: "Etudiants restant", nombre: "1",color:"red" ,icon:<BsX className="fs-3"/> },
  ];
  return (
    <section className="container DashboardJury my-4">
      <div className="row d-flex justify-content-around">
        {infos.map((info, index) => {
          return (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
              <div
                className="mx-1 my-2 py-2 px-2"
               style={{backgroundColor:"white",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",borderRadius:"5px"}}
              >
                <div className="d-flex justify-content-between">
                    <div className=" d-flex justify-content-center align-items-center" style={{borderRadius:"50%",color:info.color, border:`3px solid ${info.color}`, height:"50px", width:"50px"}}>
                        {info.icon}
                    </div>
                   <div className="d-flex flex-column align-items-end" >
                        <p className="fw-lighter" style={{margin:"0px",padding:"0px"}}>{info.nom}</p>
                        <p className="fs-4" style={{margin:"0px",padding:"0px"}}>{info.nombre}</p>
                   </div>
                </div>
                <hr style={{color:'gray'}}/>
                <Link to="/acteur/jury/dashboard" style={{color:"gray"}} className="adminDashboardDetail">Plus de details</Link>
              </div>
            </div>
          );
        })}
      </div>
      <TableList/>
    </section>
  );
};

export default DashboardJury;
