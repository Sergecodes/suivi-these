import React from 'react'
import { useLocation } from 'react-router-dom'

const RapportSoutenance = () => {
    const location = useLocation()
  const { matricule } = location.state
  return (
  <section>
      <div>Rapport de soutenance</div>
      <p>{matricule}</p>
  </section>)
}

export default RapportSoutenance