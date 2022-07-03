export default function PdfViewer (props) {
  // const testUrl = "https://firebasestorage.googleapis.com/v0/b/suivi-these.appspot.com/o/17M5678%20-%202022%5CDroits%20universitaires.pdf?alt=media&token=bf60d851-aa48-47ad-b226-f342d32f0e64";

  return (
    <object 
      data={props.url}
      type="application/pdf"
      width="100%"
      height="450px"
    >
      <p>
        Votre navigateur n'a pas de plugin pour la lecture des fichiers PDF. <br />
        Vous pouvez néanmoins <a href="file_url" download>telecharger</a> le fichier.
      </p>
    </object>
  );

}
