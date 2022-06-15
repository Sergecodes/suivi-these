import React, { useState } from "react";
import NavbarCoordonateur from "./NavbarCoordonateur";
import SidebarCoordonateur from "./SidebarCoordonateur";
import "../../Styles/coordonateurPage/DateDeSoutenance.css";
import { BsFillPersonCheckFill, BsFillPersonXFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { ImCancelCircle } from "react-icons/im";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { dataSoutenance } from "./DataSoutenance";
import { FaFileAlt } from "react-icons/fa";

function DateDeSoutenance() { 
   const [data, setData]=useState(dataSoutenance)

  const dataNonProgramme = data.filter((data) => (data.isPrograme = 'false'));
  const dataProgramme = data.filter((data) => (data.isPrograme = 'true'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const nombreDeSoutenanceNonProgramme =dataNonProgramme.length
  const nombreDeSoutenanceProgramme  =0
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  const [modal, setModal] = useState(false);
  const handleSuccessPupop = () => {
    setModal(!modal);
    toast.success("Reussie");
    console.log(dataNonProgramme);
  };
  const removeitem =(id,nom)=>{
    setData(data.filter(d=> d.id !==id))
    toast.success (`Suppression du dossier de ${nom} Ok`)

  }
  const HandleProgramation =(id)=>{
    setModal(true)
    setData(data.filter(d=> d.id !==id))
    

   
    
  }
  
  return (
    <div className="containere">
      <NavbarCoordonateur sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <SidebarCoordonateur
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />
      <Modal size="md" isOpen={modal} toggle={() => setModal(!modal)} centered>
        <ModalHeader toggle={() => setModal(!modal)}>
          Programmer Une Soutenance
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12}>
              <div className="popup-text">
                <p>Choisir Une date de soutenance</p>
              </div>
              <div className="popup-input-box">
                <input type="date" className="popup-input"></input>
              </div>
              <div className="btn-pupop-container">
                <button
                  className="popup-btn btn-danger"
                  onClick={() => setModal(!modal)}
                >
                  {" "}
                  <i>
                    <ImCancelCircle />
                  </i>{" "}
                  Annuler
                </button>
                <button
                  className="popup-btn btn-success"
                  onClick={handleSuccessPupop}
                >
                  {" "}
                  <i>
                    <IoCheckmarkDoneCircle />
                  </i>{" "}
                  Valider
                </button>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <div className="main">
        <ToastContainer />

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3  infos-box">
              <div className="icon-box  bg-vert">
                <i className="icon-container">
                  <BsFillPersonXFill />
                </i>
              </div>
              <div className="soutenance-text">
                soutenances Deja programmees
              </div>
              <div className="nombre">00</div>
            </div>
            <div className="col-md-3  infos-box">
              <div className="icon-box bg-rouge">
                <i className="icon-container ">
                  {" "}
                  <BsFillPersonCheckFill />
                </i>
              </div>
              <div className="soutenance-text">soutenances Non programmees</div>
              <div className="nombre">{nombreDeSoutenanceNonProgramme}</div>
            </div>
          </div>

          <div className="row">
            <div className="container">
              <div className="table-soutenance-programe">
                <div className="header-table-programme">
                  <div className="icon-box-table">
                    <i>
                                          <FaFileAlt/>

                    </i>
                  </div>
                  <div><p>Soutenance des etudiants en master 2</p></div>
                </div>
                <div className="container-fluid">
                  <table className="tableau-style">
                    <tr className="ligne-tableau">
                      <td>photo</td>
                      <td>Nom</td>
                      <td>Matricule</td>
                      <td>Encardreur</td>
                      <td>expert</td>
                      <td>cordo</td>
                      <td>programme</td>
                    </tr>
                    {
                      dataNonProgramme.map(data => (
                        <tr key={data.id}>
                      <td className="photo-box">photo</td>
                      <td className="nom-box">{data.nom}</td>
                      <td className="matricule-box">{data.matricule}</td>
                      <td className="encardreur-box">{data.Encardreur}</td>
                      <td className="expert-box">{data.expert}</td>
                      <td className="coordo-box">{data.cordo}</td>
                      <td>
                        <div className="programe-box ">
                          <div className="icon-poubelle"  onClick={(e)=>removeitem(data.id ,data.nom)}>
                          
                            {" "}
                            <AiFillDelete  />
                          </div>
                          <div>
                            {" "}
                            <button
                              className="programe-btn"
                              onClick={() => HandleProgramation(data.id)}
                              // onClick={() => setModal(true)}
                            >
                              programer
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                      ))
                    }
                    


                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default DateDeSoutenance;
