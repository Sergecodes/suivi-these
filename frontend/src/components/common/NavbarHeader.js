import React,{useState} from 'react';
import {BiLogIn} from "react-icons/bi";
import {RiAccountCircleFill} from "react-icons/ri";
import {CgProfile} from "react-icons/cg";
import {GiHamburgerMenu} from "react-icons/gi"
import {ImCross} from "react-icons/im";
import Dropdown from "react-bootstrap/Dropdown";
import {IoLanguage} from "react-icons/io5";
const logo=require('../../assets/images/téléchargement.jpg');

const NavbarHeader = (props) => {
    const [clicked,setClicked]=useState(false);
  return (
    <section className="shadow rounded container-fluid "  >
        <div className="container pb-1">
            <div className="d-flex justify-content-between  align-items-center my-3" >
                <div className="logo d-flex align-items-center " >
                    <img src={logo} alt="logo ecole doctorale" ></img>
                    <a href="">Ecole Doctorale STG</a>
                </div>
            <div className="d-flex align-items-center">
                <div className=" d-none d-lg-flex justify-content-around navContent" >
                        <a href="google.com" style={props.page==="accueil"?{color:"#FF5821"}:{}}>Accueil</a>
                        <a href="google.com">Soutenances</a>
                        <a href="google.com">Informations</a>
                    </div>
                    <Dropdown >
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:"white",color:"#595656",border:"none",boxShadow:"none"}}>
                        <IoLanguage  className="language" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Français</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Anglais</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <GiHamburgerMenu className="d-flex d-lg-none options" onClick={()=>{setClicked(!clicked)}} style={clicked===true?{color:'#FF5821'}:{}}/>
            </div>
            </div>
            <div className="navMobile  d-lg-none" style={clicked===true?{}:{display:"none"}}>  
                <div className="d-flex fs-5 fw-bold flex-column navContent align-items-center" >
                <ImCross className="my-5 cross" onClick={()=>{setClicked(!clicked)}} style={{height:"30px",width:"30px"}}/>
                        <a href="google.com" style={props.page==="accueil"?{color:"#FF5821"}:{}}>Accueil</a>
                        <a href="google.com">Soutenances</a>
                        <a href="google.com">Informations</a>
                </div>
        </div> 
        </div>

    </section>
  )
}

export default NavbarHeader