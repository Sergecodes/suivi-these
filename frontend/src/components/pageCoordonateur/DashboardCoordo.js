import React from "react";
import { Link } from "react-router-dom";
import {BsPersonFill, BsFillFolderFill} from  "react-icons/bs";
import {FaGraduationCap} from "react-icons/fa"

const DashboardCoordo = () => {
  const infos = [
    { slug: "master", nom: "Dossiers etudiants master", nombre: "15",color:"orange",icon:<BsFillFolderFill style={{color:"white"}}/> },
    { slug: "doctorat", nom: "Dossiers etudiants thèse", nombre: "9" ,color:"green",icon:<BsFillFolderFill style={{color:"white"}}/> },
    { slug: "total", nom: "Etudiants en master notés", nombre: "6",color:"rgb(44, 177, 230)" ,icon:<BsPersonFill style={{color:"white"}}/> },
    { slug: "dossiers", nom: "Etudiants en thèse notés", nombre: "0" ,color:"rgb(233, 73, 73)",icon:<FaGraduationCap style={{color:"white"}}/> },
  ];
  return (
    <section className="container dashboardAdmin my-4">
      <div className="row">
        {infos.map((info, index) => {
          return (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
              <div
                className="mx-1 my-2 py-2 px-2"
               style={{backgroundColor:"white",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",borderRadius:"5px"}}
              >
                <div className="d-flex justify-content-between">
                    <div className="fs-4 d-flex justify-content-center align-items-center" style={{borderRadius:"8px",backgroundColor:info.color, height:"50px", width:"50px"}}>
                        {info.icon}
                    </div>
                   <div className="d-flex flex-column align-items-end" >
                        <p className="fw-lighter" style={{margin:"0px",padding:"0px"}}>{info.nom}</p>
                        <p className="fs-4" style={{margin:"0px",padding:"0px"}}>{info.nombre}</p>
                   </div>
                </div>
                <hr style={{color:'gray'}}/>
                <Link to="/acteur/admin/liste" style={{color:"gray"}} className="adminDashboardDetail">Plus de details</Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardCoordo;
