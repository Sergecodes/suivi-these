import React, { useState } from "react";
import { Modal } from "antd";
import { AiOutlineCheck } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { BsTelephoneFill, BsFacebook } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";
import Copyright from "./Copyright";
import { useNavigate } from "react-router-dom";

const TopFooter = () => {
  const [adminCode, setAdminCode] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [adminSelect, setAdminSelect] = useState("");
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (adminSelect !== "") {
      navigate("/connexion/" + adminSelect)
    }

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalClick = () => {
    if (adminCode === "1234") {
      showModal();
    }

    setAdminCode("");
  };

  return (
    <div
      className=" py-5 mx-5"
      style={{
        backgroundColor: "white",
        borderTop: "1px solid #cdd6d5",
        color: "#595656",
      }}
    >
      <div className="footer row">
        <div className="footerCol py-2 col-12 col-lg-6" style={{}}>
          <p style={{ fontSize: "20px" }}>A propos de l'Ecole Doctorale STG</p>
          <div>
            <h6>
              Le Centre de Recherche et de Formation Doctorale en Sciences, Technologies et Geosciences(CRFD/STG) est une structure de l’Université de Yaoundé I créée en 2013 par arrêté de Mr le Ministre de l’Enseignement Supérieur dans le but de rendre la recherche plus moderne, plus féconde et plus professionnelle et d'aider les doctorants à développer leur compétence et à construire leur projet professionnel.
              Il est composé de cinq unités de recherche et de formation dirigées chacune par un coordinateur. Chaque unité dispose de plusieurs laboratoires gérés par des équipes de recherche.
            </h6>
            <div className="d-flex align-items-center">
              <input
                style={{ width: '20%' }}
                type="password"
                value={adminCode}
                className="border rounded-pill adminModal"
                onChange={(e) => setAdminCode(e.target.value)}
              />
              <button
                type="button"
                className="btn border rounded-pill ms-2 adminModalButton"
                onClick={handleModalClick}
              >
                <AiOutlineCheck />
              </button>
            </div>

            <div>
              <Modal
                title="CONNEXION ACTEURS"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}

              >
                <section>
                  <p className="text-center fs-5 fw-light">
                    Choisissez votre mode de connection
                  </p>
                  <section className="d-flex justify-content-center row">
                    <div
                      className="adminProfileSection text-center col-3 "
                      onClick={() => setAdminSelect("admin")}
                      style={
                        adminSelect === "admin"
                          ? { color: "var(--primaryColor)" }
                          : {}
                      }
                    >
                      <div
                        className=" py-1"
                        style={
                          adminSelect === "admin"
                            ? { boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }
                            : {}
                        }
                      >
                        <img
                          className="border rounded-circle"
                          src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                          alt="profil admin"
                          style={
                            adminSelect === "admin"
                              ? {
                                border: "2px solid var(--primaryColor) !important",
                              }
                              : {}
                          }
                        />
                        <p>ADMIN</p>
                      </div>
                    </div>
                    <div
                      className="adminProfileSection text-center col-3 "
                      onClick={() => setAdminSelect("rectorat")}
                      style={
                        adminSelect === "rectorat"
                          ? { color: "var(--primaryColor)" }
                          : {}
                      }
                    >
                      <div
                        className="py-1"
                        style={
                          adminSelect === "rectorat"
                            ? { boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }
                            : {}
                        }
                      >
                        <img
                          className="border rounded-circle"
                          src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                          alt="profil rectorat"
                        />
                        <p>RECTORAT</p>
                      </div>
                    </div>
                    <div
                      className="adminProfileSection text-center col-3 "
                      onClick={() => setAdminSelect("coordonateur")}
                      style={
                        adminSelect === "coordonateur"
                          ? { color: "var(--primaryColor)" }
                          : {}
                      }
                    >
                      <div
                        className=" py-1"
                        style={
                          adminSelect === "coordonateur"
                            ? { boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }
                            : {}
                        }
                      >
                        <img
                          className="border rounded-circle"
                          src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                          alt="profil coordonateur"
                        />
                        <p>COORDONATEUR</p>
                      </div>
                    </div>
                    <div
                      className="adminProfileSection text-center col-3 "
                      onClick={() => setAdminSelect("departement")}
                      style={
                        adminSelect === "departement"
                          ? { color: "var(--primaryColor)" }
                          : {}
                      }
                    >
                      <div
                        className=" py-1"
                        style={
                          adminSelect === "departement"
                            ? { boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }
                            : {}
                        }
                      >
                        <img
                          className="border rounded-circle"
                          src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                          alt="profil departement"
                        />
                        <p>DEPARTEMENT</p>
                      </div>
                    </div>
                    <div
                      className="adminProfileSection text-center col-3 "
                      onClick={() => setAdminSelect("jury")}
                      style={
                        adminSelect === "jury"
                          ? { color: "var(--primaryColor)" }
                          : {}
                      }
                    >
                      <div
                        className="py-1"
                        style={
                          adminSelect === "jury"
                            ? { boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }
                            : {}
                        }
                      >
                        <img
                          className="border rounded-circle"
                          src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                          alt="profil jury"
                        />
                        <p>JURY</p>
                      </div>
                    </div>
                    <div
                      className="adminProfileSection text-center col-3 "
                      onClick={() => setAdminSelect("conseil")}
                      style={
                        adminSelect === "conseil"
                          ? { color: "var(--primaryColor)" }
                          : {}
                      }
                    >
                      <div
                        className=" py-1"
                        style={
                          adminSelect === "conseil"
                            ? { boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }
                            : {}
                        }
                      >
                        <img
                          className="border rounded-circle"
                          src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                          alt="profil conseil"
                        />
                        <p>CONSEIL</p>
                      </div>
                    </div>
                    <div
                      className="adminProfileSection text-center col-3 "
                      onClick={() => setAdminSelect("expert")}
                      style={
                        adminSelect === "expert"
                          ? { color: "var(--primaryColor)" }
                          : {}
                      }
                    >
                      <div
                        className=" py-1"
                        style={
                          adminSelect === "expert"
                            ? { boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }
                            : {}
                        }
                      >
                        <img
                          className="border rounded-circle"
                          src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                          alt="profil expert"
                        />
                        <p>EXPERT</p>
                      </div>
                    </div>
                  </section>
                </section>
              </Modal>
            </div>
          </div>
        </div>
        {/* <div className="footerCol py-2 col-12 col-lg-3" style={{}}>
          <div className="footerLink">
            <p>Important Links</p>
            <ul style={{ padding: "0px" }}>
              <li>
                <a href="www.google.com">Privacy Policy</a>
              </li>
              <li>
                <a href="www.google.com">Cookies Policy</a>
              </li>
              <li>
                <a href="www.google.com">Terms And Conditions</a>
              </li>
            </ul>
          </div>
          <div className="footerLink">
            <p>Useful Links</p>
            <ul style={{ padding: "0px" }}>
              <li>
                <a href="www.google.com">Introduction</a>
              </li>
              <li>
                <a href="www.google.com">About Us</a>
              </li>
              <li>
                <a href="www.google.com">Our Journey</a>
              </li>
            </ul>
          </div>
        </div> */}

        <div className="footerCol py-2 col-12 col-lg-6" style={{}}>
          <p style={{ marginBottom: "16px", fontSize: "20px" }}>Contact</p>
          <div style={{}}>
            <div
              className="contactCard  d-flex  flex-wrap"
              style={{ border: "none", marginBottom: "10px" }}
            >
              <div
                className="contactCardIcon rounded-circle d-flex justify-content-center align-items-center "
                style={{}}
              >
                {" "}
                <GoLocation style={{ height: "30px", width: "30px" }} />
              </div>
              <div className="px-3 d-flex flex-column">
                <h5 className="fs-6" style={{ margin: "0px" }}>
                  Notre adresse:
                </h5>
                <p>B.P, 812 Yaoundé 1</p>
              </div>
            </div>
            <div
              className="contactCard d-flex flex-wrap"
              style={{ border: "none", marginBottom: "10px" }}
            >
              <div className="contactCardIcon rounded-circle d-flex justify-content-center align-items-center ">
                {" "}
                <BsTelephoneFill style={{ height: "30px", width: "30px" }} />
              </div>
              <div className="px-3 d-flex flex-column">
                <h5 className="fs-6" style={{ margin: "0px" }}>
                  Telephone:
                </h5>
                <p>(+237) 243 312 288</p>
              </div>
            </div>
            <div
              className="contactCard d-flex flex-row flex-wrap "
              style={{ border: "none", marginBottom: "10px" }}
            >
              <div className="contactCardIcon rounded-circle d-flex justify-content-center align-items-center ">
                {" "}
                <FaEnvelope style={{ height: "30px", width: "30px" }} />
              </div>
              <div
                className="ps-3 d-flex flex-column"
                style={{ width: "80%", wordBreak: "break-word" }}
              >
                <h5 className="fs-6" style={{ margin: "0px" }}>
                  Email:
                </h5>
                <p>edc.uy1.stg@gmail.com</p>
              </div>
            </div>
            <div
              className="contactCard d-flex flex-wrap"
              style={{ border: "none", marginBottom: "10px" }}
            >
              <div className="contactCardIcon rounded-circle d-flex justify-content-center align-items-center ">
                {" "}
                <BsFacebook style={{ height: "30px", width: "30px" }} />
              </div>
              <div
                className="ps-3 d-flex flex-column"
                style={{ width: "80%", wordBreak: "break-word" }}
              >
                <h5 className="fs-6" style={{ margin: "0px" }}>
                  Facebook:
                </h5>
                <p>https://www.facebook.com/UnivYaounde1/</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default TopFooter;
