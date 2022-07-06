
export default function PdfViewer (props) {
  return (
    <object 
      data={props.url}
      type="application/pdf"
      width="100%"
      height={props.height}
    >
      <p>
        Votre navigateur n'a pas de plugin pour la lecture des fichiers PDF. <br />
        Vous pouvez néanmoins <a href="file_url" download>telecharger</a> le fichier.
      </p>
    </object>
  );

}
