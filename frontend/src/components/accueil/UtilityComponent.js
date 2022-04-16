import React ,{useEffect} from 'react';
import {BiCubeAlt} from 'react-icons/bi';
import {BsImages} from 'react-icons/bs';
import {IoNewspaperOutline} from "react-icons/io5";

import Aos from "aos";
import "aos/dist/aos.css";

const UtilityComponent = () => {
    useEffect(()=>{
        Aos.init({duration:2000,once:true})
    },[])
  return (
    <section data-Aos="fade-up" className="Aos" style={{position:"relative"}}>
        <div  className=" d-flex justify-content-center row mx-4 " style={{position:"absolute",top:"-40px"}}>
            <div className="prior my-3 col-12 col-md-6 col-lg-4"  style={{backgroundColor:"#FF5821"}}>
               <div className="  d-flex px-4 py-4 flex-column align-items-center ">
                    <h2>A quoi sert cette plateforme?</h2>
                    <p>
                        Cette plateforme est un miroir refletant l'ecole doctorale. Elle vous aidera à ...
                    </p>
                    <button className="rounded-pill "> En savoir plus ! </button>
               </div>
            </div>
            <div className="my-3 col-12 col-md-6 col-lg " style={{backgroundColor:"transparent"}}>
               <div className=" px-4 py-5 second d-flex flex-column align-items-center " >
                <IoNewspaperOutline style={{color:"#FF5821", height:"35px",width:"35px"}}/>
                    <h4 className="pt-4 pb-3">
                        Titre 1
                    </h4>
                    <p style={{textAlign:"center"}}>
                        Petite description du titre resume en question pour attirer l'attention du visiteur
                    </p>
               </div>
            </div>
            <div className="my-3 col-12 col-md-6 col-lg " style={{backgroundColor:"transparent"}}>
               <div className="px-4 py-5 second d-flex flex-column align-items-center  px-4 py-4" >
                <BiCubeAlt style={{color:"#FF5821", height:"35px",width:"35px"}}/>
                    <h4 className="pt-4 pb-3">
                        Titre 1
                    </h4>
                    <p style={{textAlign:"center"}}>
                        Petite description du titre resume en question pour attirer l'attention du visiteur
                    </p>
               </div>
            </div>
            <div className=" my-3 col-12 col-md-6 col-lg " style={{backgroundColor:"transparent"}}>
               <div className="px-4 py-5 second d-flex flex-column align-items-center  px-4 py-4" >
                <BsImages style={{color:"#FF5821", height:"35px",width:"35px"}}/>
                    <h4 className="pt-4 pb-3">
                        Titre 1
                    </h4>
                    <p style={{textAlign:"center"}}>
                        Petite description du titre resume en question pour attirer l'attention du visiteur
                    </p>
               </div>
            </div>
        </div>
    </section>
  )
}

export default UtilityComponent