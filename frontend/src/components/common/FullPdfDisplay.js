import { useLocation } from "react-router-dom";

const FullPdfDisplay = () => {
    
    const location = useLocation();
    const {lien}= location.state;
    console.log(JSON.stringify(lien))
  return (
    <object 
            data={lien.url}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              Votre navigateur n'a pas de plugin pour la lecture des fichiers PDF. <br />
              Vous pouvez néanmoins <a href="file_url" download>telecharger</a> le fichier.
            </p>
          </object>
  )
}

export default FullPdfDisplay