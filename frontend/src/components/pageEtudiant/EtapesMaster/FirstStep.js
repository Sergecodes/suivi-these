import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addMasterSubject } from "../../../redux/DataStorageSlice";
import {AiOutlineWarning} from "react-icons/ai";
const { TextArea } = Input;

const FirtStep = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.dataStorage);
 /* dispatch(addMasterSubject("steph"))
  console.log(files.masterSubject)*/
  return (
    <section className="mt-5 step">
      <h2 >Veuillez entrer le sujet de votre memoire :</h2>
      <div className="d-flex flex-column align-items-center row my-2">
         <div className="col-8">
         <TextArea rows={3} placeholder="Entrer un sujet" onChange={(e) => {dispatch(addMasterSubject({subject:e.target.value}))}} />
         </div>
      </div>

      <p className="warning">
        <AiOutlineWarning className="me-2" />
        Attention le depot de dossier se fait une seule fois!!!
      </p>
    </section>
  );
};

export default FirtStep;
