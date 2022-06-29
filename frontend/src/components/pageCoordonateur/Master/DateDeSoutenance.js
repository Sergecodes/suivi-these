import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

const DateDeSoutenance = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {etudiantInfo}=location.state;
  return (
    <section>
        <div className='row d-flex justify-content-center align-items-center my-5' style={{width:"100% "}} >
            <div className="col-10  col-sm-6 col-lg-5 px-2 py-2" style={{backgroundColor:"white", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}>
                <div className="text-center dateDescription">
                    <h4>Programmation date de soutenance</h4>
                    <p>Vous ètes sur le point de programmer une date de soutenance pour l'étudiant <span style={{color:"var(--secondaryColor)"}}>{etudiantInfo.nom}</span> de matricule <span style={{color:"var(--secondaryColor)"}}>{etudiantInfo.matricule}</span></p>
                </div>
                <div className="dateInput px-2 pt-4">
                    <p >Selectionnez une date</p>
                    <input type="date" name="dateSoutenance"></input>
                </div>
               <div className="d-flex justify-content-between align-items-center my-2">
               <div className="dateButtonEmpty px-2">
                    <button type="button" className="btn" onClick={()=>{navigate('/acteur/coordonateur/autorisation')}}>Retour</button>
                </div>
               <div className="dateButton px-2">
                    <button type="button" className="btn">Programmer</button>
                </div>
               </div>
            </div>
        </div>
    </section>
  )
}

export default DateDeSoutenance