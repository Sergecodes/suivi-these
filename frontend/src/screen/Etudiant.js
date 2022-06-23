import { useState, useEffect } from 'react';
import StudentDashboard from '../components/pageEtudiant/StudentDashboard';
import "../components/pageEtudiant/etudiant.css";
import NavbarEtudiant from '../components/pageEtudiant/NavbarEtudiant';
import { Outlet } from 'react-router-dom';
import { setClicked } from "../redux/DashboardDisplaySlice";
import {useSelector,useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import EtudiantConnexionScreen from '../screen/inscriptionScreens/EtudiantConnexionScreen';


const Etudiant = () => {
  const navigate = useNavigate();
  const dispatch=  useDispatch();
  const files = useSelector(state => state.dashboardDisplay);
  const [isAuth, setIsAuth] = useState(false);

  const handeClick = () => {
    if(files.clicked === true) {
      dispatch(setClicked());
    }
  }

  console.log(localStorage);
  const actor = localStorage.getItem("actor");

  // todo change url of page too

  // if (actor !== 'etudiant') {
  //   alert("Not authenticated");
  //   return <EtudiantConnexionScreen />;
  // }

  useEffect(() => {
    console.log(localStorage);

    if (actor !== 'etudiant') {
      console.log("Not authenticated");
      navigate("/connexion/etudiant");
    } else {
      setIsAuth(true);
    }
  }, []);

  return isAuth && (
    <section className="d-flex" >
      <StudentDashboard />
      <div className="studentContent" onClick={handeClick}>
        <NavbarEtudiant/>
        <div className="px-3">
        <Outlet/>
        </div>
      </div>
    </section>
  );
}

export default Etudiant