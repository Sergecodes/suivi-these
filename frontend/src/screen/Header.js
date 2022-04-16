import React from 'react';
import NavBarHeader from "../components/common/NavbarHeader";
import TopHeader from "../components/common/TopHeader";



const Header = (props) => {
  return (
    <>  
        <TopHeader  isLogin={props.isLogin}  page={props.page}/>
        <NavBarHeader page={props.page}/>
        
    </>
  )
}

export default Header