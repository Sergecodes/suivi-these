import React from 'react'

const SidenavTitle = (props) => {
  return (
    <div className="sidenavTitle my-2 ms-1">
        <p style={{margin:"0px",paddingLeft:"10px"}}>{props.titre}</p>
        {props.children}
    </div>
  )
}

export default SidenavTitle