import React from 'react';
import {FaEnvelope} from "react-icons/fa";
import { BsTelephoneFill} from "react-icons/bs";
import {GoLocation} from "react-icons/go";


const ContactComponent = () => {
  return (
    <div className="contact px-4 py-4">
        <div className="contactText " style={{textAlign:"center"}}>
            <h2 className="pb-2">Contact</h2>
            <p className="pb-4">Vous pouvez nous joindre via notre adresse ou alors vous rendre sur notre site dans nos locaux</p>
        </div>
        <div className=" row d-flex justify-content-center ">
            <div className="col-12 col-sm-6 col-lg-3 contactCard px-3 d-flex py-4" style={{backgroundColor:"white"}}>
                <div className="contactCardIcon rounded-circle d-flex justify-content-center align-items-center " style={{}}> <GoLocation style={{height:"30px",width:"30px"}}/></div>
                <div className="px-3" >
                        <h5 className="fs-4">Notre adresse</h5> 
                        <p>B.P, 812 Yaoundé 1</p>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 contactCard px-2 d-flex py-4" style={{backgroundColor:"white"}}>
                <div className="contactCardIcon rounded-circle d-flex justify-content-center  align-items-center "> <FaEnvelope style={{height:"30px",width:"30px"}}/></div>
                <div className="px-3"  >
                        <h5 className="fs-4 pb-2">Nos mail</h5> 
                        <div style={{lineHeight:"8px"}} >
                            <p >ecoledoctorale@gmail.com</p>
                            <p>xxx@gmail.com</p>
                        </div>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 contactCard px-3 d-flex py-4" style={{backgroundColor:"white"}}>
                <div className="contactCardIcon rounded-circle d-flex justify-content-center align-items-center "> <BsTelephoneFill style={{height:"30px",width:"30px"}}/></div>
                <div className="px-3" >
                        <h5 className="fs-4  pb-2">Nos contacts</h5> 
                        <div style={{lineHeight:"8px"}}>
                            <p>+237655386776</p>
                            <p>+237655386776</p>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactComponent