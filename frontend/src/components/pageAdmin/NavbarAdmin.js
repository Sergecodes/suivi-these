import React from 'react';
const logo= require('../../assets/images/téléchargement.jpg')

const NavbarAdmin = () => {
  return (
    <section className="container adminNavbar">
        <div className="d-flex justify-content-between align-items-center">
          <div >
            <img src={logo} style={{scale:'3'}} alt="logo"/>
            <span>ECOLE DOCTOALE</span>
          </div>
        </div>
    </section>
  )
}

export default NavbarAdmin