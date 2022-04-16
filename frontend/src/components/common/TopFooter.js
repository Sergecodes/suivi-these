import React from 'react';
import {GoLocation} from "react-icons/go";
import {BsTelephoneFill,BsFacebook} from 'react-icons/bs';
import {FaEnvelope} from 'react-icons/fa';
import Copyright from './Copyright';


const TopFooter = () => {
  return (
    <div className=" py-5 mx-5" style={{backgroundColor:"white",borderTop:"1px solid #cdd6d5",color:"#595656"}} >
        
        <div className='footer row'>
            <div className="footerCol py-2 col-12 col-lg-6" style={{}}>
                <p style={{fontSize:"20px"}}>About Connexion Ndé</p>
                <div>
                    <h6>We are a group of Cameroonians from “Ndé” in the UK who seek to promote the culture and tradition of our ethnic group and its values such as communitarianism and solidarity.</h6>
                    <h6>We and our partners love to provide for those in need. Sharing is caring! Join us to cater for the needy and spread positivity</h6>
                </div>
            </div>
            <div className="footerCol py-2 col-12 col-lg-3" style={{}}>
                <div className="footerLink">
                    <p>Important Links</p>
                    <ul style={{padding:"0px"}}>
                        <li><a href="www.google.com">Privacy Policy</a></li>
                        <li><a href="www.google.com" >Cookies Policy</a></li>
                        <li><a href="www.google.com">Terms And Conditions</a></li>
                    </ul>
                </div>
                <div className="footerLink">
                    <p>Useful Links</p>
                    <ul style={{padding:"0px"}}>
                        <li ><a href="www.google.com">Introduction</a></li>
                        <li ><a href="www.google.com" >About Us</a></li>
                        <li ><a href="www.google.com" >Our Journey</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="footerCol py-2 col-12 col-lg-3 " style={{}}>
               <p style={{marginBottom:'16px',fontSize:"20px"}}>Contact Info</p>
               <div style={{}}>
                    <div className="contactCard  d-flex  flex-wrap" style={{border:"none", marginBottom:"10px"}}>
                        <div className="contactCardIcon rounded-circle d-flex justify-content-center align-items-center " style={{}}> <GoLocation style={{height:"30px",width:"30px"}}/></div>
                        <div className="px-3 d-flex flex-column" >
                                <h5 className="fs-6" style={{margin:'0px'}}>Notre adresse:</h5> 
                                <p>B.P, 812 Yaoundé 1</p>
                        </div>
                    </div>
                    <div className="contactCard  d-flex flex-wrap" style={{border:"none", marginBottom:"10px"}} >
                        <div className="contactCardIcon rounded-circle d-flex justify-content-center align-items-center "> <BsTelephoneFill style={{height:"30px",width:"30px"}}/></div>
                        <div className="px-3 d-flex flex-column" >
                                <h5 className="fs-6" style={{margin:'0px'}}>Telephone:</h5> 
                                <p>+237655386776</p>
                        </div>
                    </div>
                    <div className="contactCard  d-flex flex-row flex-wrap " style={{border:"none", marginBottom:"10px"}}>
                        <div className="contactCardIcon rounded-circle d-flex justify-content-center align-items-center "> <FaEnvelope style={{height:"30px",width:"30px"}}/></div>
                        <div className="ps-3 d-flex flex-column" style={{width:"80%",wordBreak:'break-word'}} >
                                <h5 className="fs-6" style={{margin:'0px'}}>Email:</h5> 
                                <p >ecoledoctorale@gmail.com</p>
                        </div>
                    </div>
                    <div className="contactCard  d-flex flex-wrap" style={{border:"none", marginBottom:"10px"}} >
                        <div className="contactCardIcon rounded-circle d-flex justify-content-center align-items-center "> <BsFacebook style={{height:"30px",width:"30px"}}/></div>
                        <div className="ps-3 d-flex flex-column" style={{width:"80%",wordBreak:'break-word'}}>
                                <h5 className="fs-6" style={{margin:'0px'}}>Facebook:</h5> 
                                <p >https://www.facebook.com/UnivYaounde1/</p>
                        </div>
                    </div>

               </div>
            </div>
        </div>
        <Copyright/>
    </div>
  )
}

export default TopFooter