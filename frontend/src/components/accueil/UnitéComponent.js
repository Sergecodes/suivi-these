import React,{useEffect} from "react";
import {GiMaterialsScience} from "react-icons/gi";
import {MdScience} from 'react-icons/md';
import {ImEarth} from "react-icons/im";
import {IoBarChartSharp} from "react-icons/io5";
import {RiComputerLine} from "react-icons/ri";
import Aos from "aos";
import 'aos/dist/aos.css';

const UnitéComponent = () => {
  useEffect(()=>{
    Aos.init({duration:2000,once:true});
  })
  return (
    <div className="unité py-5" >
      <div data-aos="fade-up" className="unitéText py-4 ">
        <h2>Unités de recherche</h2>
        <p>Voici les differentes unités de recherche de l'école doctorale</p>
      </div>
      <div className="row mx-4 d-flex justify-content-center">
        <div data-aos="fade-up" className=" my-4 col-12 col-sm-6 col-lg-4 " style={{backgroundColor:"transparent"}}>
            <div className="mx-2 my-2 unitéCard  d-flex flex-column align-items-center justify-content-center" style={{border:"none",backgroundColor:"white"}}>
              <div className="unitéCardIcon rounded-circle d-flex justify-content-center align-items-center"> <RiComputerLine style={{height:"30px",width:"30px"}}/></div>
                <div className="d-flex justify-content-center flex-column align-items-center py-5 px-2" style={{textAlign:"center"}}>
                  <h5>URFD MIBA</h5> 
                      <p>Description des differentes unités principales ainsi 
                          qu'une icone principale correspondant à l'unité</p>
                </div>
            </div>
        </div>
        <div data-aos="fade-up" className=" my-4 col-12 col-sm-6 col-lg-4 " style={{backgroundColor:"transparent"}}>
            <div className="mx-2 my-2 unitéCard  d-flex flex-column align-items-center justify-content-center" style={{border:"none",backgroundColor:"white"}}>
              <div className="unitéCardIcon rounded-circle d-flex justify-content-center align-items-center"> <GiMaterialsScience style={{height:"30px",width:"30px"}}/></div>
                <div className="d-flex justify-content-center flex-column align-items-center py-5 px-2" style={{textAlign:"center"}}>
                  <h5>URFD PA</h5> 
                      <p>Description des differentes unités principales ainsi 
                          qu'une icone principale correspondant à l'unité</p>
                </div>
            </div>
        </div>
        <div data-aos="fade-up" className=" my-4 col-12 col-sm-6 col-lg-4 " style={{backgroundColor:"transparent"}}>
            <div className="mx-2 my-2 unitéCard  d-flex flex-column align-items-center justify-content-center" style={{border:"none",backgroundColor:"white"}}>
              <div className="unitéCardIcon rounded-circle d-flex justify-content-center align-items-center"> <MdScience style={{height:"30px",width:"30px"}}/></div>
                <div className="d-flex justify-content-center flex-column align-items-center py-5 px-2" style={{textAlign:"center"}}>
                  <h5>URFD CA</h5> 
                      <p>Description des differentes unités principales ainsi 
                          qu'une icone principale correspondant à l'unité</p>
                </div>
            </div>
        </div>
        <div data-aos="fade-up" className=" my-4 col-12 col-sm-6 col-lg-4 " style={{backgroundColor:"transparent"}}>
            <div className="mx-2 my-2 unitéCard  d-flex flex-column align-items-center justify-content-center" style={{border:"none",backgroundColor:"white"}}>
              <div className="unitéCardIcon rounded-circle d-flex justify-content-center align-items-center"> <ImEarth style={{height:"30px",width:"30px"}}/></div>
                <div className="d-flex justify-content-center flex-column align-items-center py-5 px-2" style={{textAlign:"center"}}>
                  <h5>URFD GA</h5> 
                      <p>Description des differentes unités principales ainsi 
                          qu'une icone principale correspondant à l'unité</p>
                </div>
            </div>
        </div>
        <div data-aos="fade-up" className=" my-4 col-12 col-sm-6 col-lg-4 " style={{backgroundColor:"transparent"}}>
            <div className="mx-2 my-2 unitéCard  d-flex flex-column align-items-center justify-content-center" style={{border:"none",backgroundColor:"white"}}>
              <div className="unitéCardIcon rounded-circle d-flex justify-content-center align-items-center"> <IoBarChartSharp style={{height:"30px",width:"30px"}}/></div>
                <div className="d-flex justify-content-center flex-column align-items-center py-5 px-2" style={{textAlign:"center"}}>
                  <h5>URFD SIA</h5> 
                      <p>Description des differentes unités principales ainsi 
                          qu'une icone principale correspondant à l'unité</p>
                </div>
            </div>
        </div>
      </div>
    
    </div>
  );
};

export default UnitéComponent;
