import React from 'react';
import { useLocation } from 'react-router-dom';

const DossierThese = () => {
  const location = useLocation();
  const {etudiantInfo} = location.state;
  return (
    <section>
        <h4 className="my-3">Ici sera affiché les differents dossiers de l'étudiant {etudiantInfo.nom} de matricule {etudiantInfo.matricule}</h4>
    </section>
  )
}

export default DossierThese