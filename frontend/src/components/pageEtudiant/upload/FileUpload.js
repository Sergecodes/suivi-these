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
import { CategorieFichierMaster } from "../../../constants/Constant";

const FileUpload = (props) => {
  const dispatch = useDispatch();
  function handleupload(file) {
    if (props.niveau === "master") {
      addFileMaster(file);
    }
  }
  function addFileMaster(file) {
    if (props.name ===CategorieFichierMaster.MEMOIRE) dispatch(addMemoire({ memoire: file }));
    else if (props.name === CategorieFichierMaster.ATTEST_LIC)
      dispatch(addAttestationLicense({ attestationLicense: file }));
    else if (props.name === CategorieFichierMaster.DROITS_UNIV)
      dispatch(addDroitsUniversitaires({ droitsUniversitaires: file }));
    else if (props.name === CategorieFichierMaster.RAPPORT_PRESOUTIENT)
      dispatch(addRapportPresoutenance({ rapportPresoutenance: file }));
    else if (props.name === CategorieFichierMaster.ATTEST_INSCRIP)
      dispatch(addAttestationInscription({ attestationInscription: file }));
    else if (props.name === CategorieFichierMaster.REL_NOTES_M1)
      dispatch(addReleveM1({ releveM1: file }));
    else if (props.name === CategorieFichierMaster.REL_NOTES_M2)
      dispatch(addReleveM2({ releveM2: file }));
    else if (props.name === CategorieFichierMaster.LISTE_SELECT)
      dispatch(addListeSelection({ listeSelection: file }));
    else if (props.name ===CategorieFichierMaster.FICHE_INSCRIP)
      dispatch(addFicheInscription({ ficheInscription: file }));
    else if (props.name === CategorieFichierMaster.CV)
      dispatch(addCv({ cv: file }));
    else if (props.name === CategorieFichierMaster.ACTE_NAISSANCE)
      dispatch(addActeDeNaissance({ acteDeNaissance: file }));
  }

  return (
    <Upload
    className="fileUpload"
      accept=".pdf"
      showUploadList={false}
      beforeUpload={handleupload}
      maxCount="1"
      name="hello"
    >
      <Button>
        {<UploadOutlined />} {props.name}
      </Button>
    </Upload>
  );
};

export default FileUpload;
