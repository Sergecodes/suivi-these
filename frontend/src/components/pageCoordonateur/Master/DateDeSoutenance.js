import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';


const DateDeSoutenance = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const dateRef = useRef();
   const today = moment();
   const { etudiantInfo } = location.state;

   const handleSubmit = () => {
      const date = dateRef.current.value;
      console.log("date", date);

      axios.put('/coordonateurs/programmer-date-soutenance-master', {
         dateSoutient: date,
         idEtudiant: etudiantInfo.id
      })
         .then(res => {
            console.log(res);
            toast.success("Date de soutenance programmee avec succes!", { hideProgressBar: true });
            
            // Close toasts after x seconds and go to previous page
            setTimeout(() => {
               toast.dismiss();
               navigate("/acteur/coordonateur/date-programmees");
            }, 3000);
         })
         .catch(err => {
            console.error(err);
            toast.error("Une erreur est survenue!", { hideProgressBar: true } );
         })
   }

   return (
      <section>
         <ToastContainer />
         <div 
            className='row d-flex justify-content-center align-items-center my-5' 
            style={{ width: "100% " }}
         >
            <div 
               className="col-10  col-sm-6 col-lg-5 px-2 py-2" 
               style={{ 
                  backgroundColor: "white", 
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" 
               }}
            >
               <div className="text-center dateDescription">
                  <h4>Programmation date de soutenance</h4>
                  <p>
                     Vous ètes sur le point de programmer une date de soutenance pour l'étudiant 
                     <span style={{ color: "var(--secondaryColor)" }}>
                        {etudiantInfo.nom}
                     </span> 
                     de matricule 
                     <span style={{ color: "var(--secondaryColor)" }}>
                        {etudiantInfo.matricule}
                     </span>
                  </p>
               </div>
               <div className="dateInput px-2 pt-4">
                  <p>Selectionnez une date</p>
                  <input 
                     type="date" 
                     ref={dateRef}
                     min={today.format('YYYY-MM-DD')}
                     max={today.add(1, 'year').format('YYYY-MM-DD')}
                     name="dateSoutenance"  
                  />
               </div>
               <div className="d-flex justify-content-between align-items-center my-2">
                  <div className="dateButtonEmpty px-2">
                     <button 
                        type="button" 
                        className="btn" 
                        onClick={() => navigate('/acteur/coordonateur/autorisation')}
                     >
                        Retour
                     </button>
                  </div>
                  <div className="dateButton px-2">
                     <button type="button" className="btn" onClick={handleSubmit}>
                        Programmer
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>
    )
}

export default DateDeSoutenance