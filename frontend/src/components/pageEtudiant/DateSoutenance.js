import React from "react";
import { Result } from "antd";
import moment from "moment";

moment.locale("fr");

const DateSoutenance = () => {
  const etudiant = JSON.parse(localStorage.getItem("user"));
  const date = moment(etudiant.dateSoutenance).format("LLLL")

  return (
    <section className="d-flex justify-content-center my-3">
      <Result
        status="success"
        title="Date de soutenance programmée avec succès!"
        subTitle={<p className="fs-5">Félicitations <span className="fw-bold">{etudiant.nom} {etudiant.prenom} </span> , vous soutenez le <span className="fw-bold" style={{color:"var(--primaryColor)"}}>{date}</span></p>}
        
      />
    </section>
  );
};

export default DateSoutenance;
