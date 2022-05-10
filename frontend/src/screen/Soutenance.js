import React from "react";
import SoutenanceCalendar from "../components/pageSoutenance/SoutenanceCalendar";
import Header from "../screen/Header";
import Footer from "../screen/Footer";

const Soutenance=(props)=>{
    return(
       <section>
             <Header isLogin={props.isLogin}/>
            <SoutenanceCalendar/>
            <Footer/>
       </section>
    )
}

export default Soutenance;