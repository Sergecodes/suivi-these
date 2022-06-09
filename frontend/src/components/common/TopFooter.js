import React, { useState } from "react";
import { Modal } from "antd";
import { GoLocation } from "react-icons/go";
import { BsTelephoneFill, BsFacebook } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";
import Copyright from "./Copyright";
import {useNavigate} from "react-router-dom";

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
    if(adminSelect!==""){
      navigate("/connexion/"+adminSelect)
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
          <p style={{ fontSize: "20px" }}>About Connexion Ndé</p>
          <div>
            <h6>
              We are a group of Cameroonians from “Ndé” in the UK who seek to
              promote the culture and tradition of our ethnic group and its
              values such as communitarianism and solidarity.
            </h6>
            <h6>
              We and our partners love to provide for those in need. Sharing is
              caring! Join us to cater for the needy and spread positivity
            </h6>
            <div className="d-flex align-items-center">
              <input
                type="text"
                value={adminCode}
                className="border rounded-pill adminModal"
                onChange={(e) => setAdminCode(e.target.value)}
              ></input>
              <button
                type="button"
                className="btn border rounded-pill ms-2 adminModalButton"
                onClick={handleModalClick}
              >
                OK
              </button>
            </div>

            <div >
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
                          alt="profile"
                          style={
                            adminSelect === "admin"
                              ? {
                                  border:
                                    "2px solid var(--primaryColor) !important",
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
                        className=" py-1"
                        style={
                          adminSelect === "rectorat"
                            ? { boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }
                            : {}
                        }
                      >
                        <img
                          className="border rounded-circle"
                          src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                          alt="profile"
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
                          alt="profile"
                        />
                        <p>COORDONNATEUR</p>
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
                          alt="profile"
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
                        className=" py-1"
                        style={
                          adminSelect === "jury"
                            ? { boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }
                            : {}
                        }
                      >
                        <img
                          className="border rounded-circle"
                          src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                          alt="profile"
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
                          alt="profile"
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
                          alt="profile"
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
        <div className="footerCol py-2 col-12 col-lg-3" style={{}}>
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
        </div>

        <div className="footerCol py-2 col-12 col-lg-3 " style={{}}>
          <p style={{ marginBottom: "16px", fontSize: "20px" }}>Contact Info</p>
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
              className="contactCard  d-flex flex-wrap"
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
                <p>+237655386776</p>
              </div>
            </div>
            <div
              className="contactCard  d-flex flex-row flex-wrap "
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
                <p>ecoledoctorale@gmail.com</p>
              </div>
            </div>
            <div
              className="contactCard  d-flex flex-wrap"
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
