import React from 'react'
import { useLocation } from 'react-router-dom'


const DetailsNotation = () => {
    const location = useLocation()
  const { matricule } = location.state
  return (
  <section>
      <div>DetailsNotation</div>
      <p>{matricule}</p>
  </section>

  
  )
}

export default DetailsNotation