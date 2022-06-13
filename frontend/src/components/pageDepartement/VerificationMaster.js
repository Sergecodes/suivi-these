import React from 'react';
import { useSelector } from 'react-redux';
import PdfViewer from "../../components/common/PdfViewer";

const VerificationMaster = () => {
  const files= useSelector(state=>state.masterFilesUpload);
  console.log(files.memoire);

  return (
    <div>

      <PdfViewer/>
    </div>
  )
}

export default VerificationMaster