import { useLocation } from 'react-router-dom';


const RapportAdminMaster = () => {
  const location = useLocation();
  const { etudiantInfo } = location.state;
  const rapportHtml = <div dangerouslySetInnerHTML={{ __html: etudiantInfo.rapport }}></div>;

  return (
    <section>
      <h4 className="my-3">
        Ici sera affiché le rapport de l'étudiant {etudiantInfo.nom} de 
        matricule {etudiantInfo.matricule}
      </h4>
      {rapportHtml}
    </section>
  )
}

export default RapportAdminMaster;
