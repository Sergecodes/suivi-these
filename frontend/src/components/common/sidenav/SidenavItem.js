import React from 'react';

const SidenavItem = (props) => {
  return (
    <div className="sidenavItem">
        {props.children}
    </div>
  )
}

export default SidenavItem