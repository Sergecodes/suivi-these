import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  addMemoire,
  addAttestationLicense,
  addDroitsUniversitaires,
  addFicheInscription,
  addRapportPresoutenance,
  addListeSelection,
  addAttestationInscription,
  addReleveM1,
  addReleveM2,
  addActeDeNaissance,
  addCv
} from "../../../redux/MasterFilesUploadSlice";

const FileUpload = (props) => {
  const dispatch = useDispatch();
  function handleupload(file) {
    if (props.niveau === "master") {
      addFileMaster(file);
    }
  }
  function addFileMaster(file) {
    if (props.name === "Memoire") dispatch(addMemoire({ memoire: file }));
    else if (props.name === "Attestation de license")
      dispatch(addAttestationLicense({ attestationLicense: file }));
    else if (props.name === "Droits universitaires")
      dispatch(addDroitsUniversitaires({ droitsUniversitaires: file }));
    else if (props.name === "Rapport presoutenance")
      dispatch(addRapportPresoutenance({ rapportPresoutenance: file }));
    else if (props.name === "Attestation d'inscription")
      dispatch(addAttestationInscription({ attestationInscription: file }));
    else if (props.name === "Rélevé de notes M1")
      dispatch(addReleveM1({ releveM1: file }));
    else if (props.name === "Rélevé de notes M2")
      dispatch(addReleveM2({ releveM2: file }));
    else if (props.name === "Liste selection")
      dispatch(addListeSelection({ listeSelection: file }));
    else if (props.name === "Fiche d'inscription")
      dispatch(addFicheInscription({ ficheInscription: file }));
    else if (props.name === "Curriculum vitae")
      dispatch(addCv({ cv: file }));
    else if (props.name === "Acte de naissance")
      dispatch(addActeDeNaissance({ acteDeNaissance: file }));
  }

  return (
    <Upload
    className="fileUpload"
      accept=".txt,.pdf, .csv"
      showUploadList={false}
      beforeUpload={handleupload}
      maxCount="1"
    >
      <Button>
        {<UploadOutlined />} {props.name}
      </Button>
    </Upload>
  );
};

export default FileUpload;
