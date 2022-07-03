import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { CategorieFichierMaster } from "../../../constants/Constant";
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
} from "../../../redux/MasterFilesUploadSlice"
import {
  addDeclarationHonneur,
  addDiplomeLicense,
  addDiplomeBaccalaureat,
  addAttestationM2,
  addListeSelectionThese,
  addPreuveValidation,
  addFicheInscriptionThese,
  addRapportEncadreur,
  addLettreEncadreur,
  addLettreChefDepartement,
  addThese,
  addCouverture,
  addResume,
  addAbstract,
  addActeDeNaissanceThese,
  addCvThese,
  addDerogation,
  addAttestationInscriptionThese
} from "../../../redux/TheseFilesUploadSlice";

import { CategorieFichierMaster, CategorieFichierThese } from "../../../constants/Constant";

const FileUpload = (props) => {
  const dispatch = useDispatch();

  function handleupload(file) {
    if (props.niveau === "master") {
      addFileMaster(file);
    }
    else if (props.niveau === "these") {
      addFileThese(file)
    }
    // Prevent submitting file
    return false;
  }

  function addFileMaster(file) {
    if (props.name === CategorieFichierMaster.MEMOIRE)
      dispatch(addMemoire({ memoire: file }));
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
    else if (props.name === CategorieFichierMaster.FICHE_INSCRIP)
      dispatch(addFicheInscription({ ficheInscription: file }));
    else if (props.name === CategorieFichierMaster.CV)
      dispatch(addCv({ cv: file }));
    else if (props.name === CategorieFichierMaster.ACTE_NAISSANCE)
      dispatch(addActeDeNaissance({ acteDeNaissance: file }));
  }

  function addFileThese(file) {
    if (props.name === CategorieFichierThese.THESE) dispatch(addThese({ these: file }));
    else if (props.name === CategorieFichierThese.CV)
      dispatch(addCvThese({ cv: file }));
    else if (props.name === CategorieFichierThese.RESUME_THESE)
      dispatch(addResume({ resume: file }));
    else if (props.name === CategorieFichierThese.ACTE_NAISSANCE)
      dispatch(addActeDeNaissanceThese({ acteDeNaissance: file }));
    else if (props.name === CategorieFichierThese.ATTEST_INSCRIP)
      dispatch(addAttestationInscriptionThese({ attestationInscription: file }));
    else if (props.name === CategorieFichierThese.DECLAR_HONNEUR)
      dispatch(addDeclarationHonneur({ declarationHonneur: file }));
    else if (props.name === CategorieFichierThese.DIPLOME_LIC)
      dispatch(addDiplomeLicense({ diplomeLicense: file }));
    else if (props.name === CategorieFichierThese.DIPLOME_BAC)
      dispatch(addDiplomeBaccalaureat({ diplomeBaccalaureat: file }));
    else if (props.name === CategorieFichierThese.ATTEST_M2)
      dispatch(addAttestationM2({ attestationM2: file }));
    else if (props.name === CategorieFichierThese.PREUVE_VALID)
      dispatch(addPreuveValidation({ preuveValidation: file }));
    else if (props.name === CategorieFichierThese.COUVERTURE)
      dispatch(addCouverture({ couverture: file }));
    else if (props.name === CategorieFichierThese.ABSTRACT)
      dispatch(addAbstract({ abstract: file }));
    else if (props.name === CategorieFichierThese.DEROGATION)
      dispatch(addDerogation({ derogation: file }));
    else if (props.name === CategorieFichierThese.RAPPORT_ENC)
      dispatch(addRapportEncadreur({ rapportEncadreur: file }));
    else if (props.name === CategorieFichierThese.LETTRE_ENC)
      dispatch(addLettreEncadreur({ lettreEncadreur: file }));
    else if (props.name === CategorieFichierThese.LETTRE_CHEF)
      dispatch(addLettreChefDepartement({ lettreChefDepartement: file }));
    else if (props.name === CategorieFichierThese.LISTE_SELECT)
      dispatch(addListeSelectionThese({ listeSelection: file }));
      else if (props.name === CategorieFichierThese.FICHE_INSCRIP)
      dispatch(addFicheInscriptionThese({ ficheInscription: file }));

  }


  return (
    <Upload
      className="fileUpload"
      accept=".pdf"
      showUploadList={false}
      beforeUpload={handleupload}
      maxCount={1}
      name="file"
    >
      <Button>
        {<UploadOutlined />} {props.name}
      </Button>
    </Upload>
  );
};

export default FileUpload;
