import { useWindowSize } from "react-use";
import { BsFolderFill, BsPersonFill,BsDoorOpenFill ,BsArrowRepeat,BsCalendar2DateFill } from "react-icons/bs";
import { IoRocketSharp } from "react-icons/io5";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setClicked } from "../../redux/DashboardDisplaySlice";
import { ImCross } from "react-icons/im";
import { logout } from "../../redux/authentification/authSlice";
import { toast } from "react-toastify";
import axios from 'axios';


const StudentDashboard = (props) => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.dashboardDisplay);
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation()
  const etudiant = JSON.parse(localStorage.getItem('user'));


  const handleLogout = () => {
    axios.post('/logout')
      .then(res => {
        console.log(res);
        dispatch(logout());
        toast.success("Deconnexion Reussie");
        localStorage.removeItem('user');
        localStorage.removeItem('actor');
        navigate("/");
      })
      .catch(err => {
        console.error(err);
      });
  };
  
  return (
    <section
      className="studentDashboard px-2 pt-3"
      style={files.clicked === false && width < 1015 ? { display: "none" } : {}}
    >
      <ImCross
        className="dashboardCross"
        onClick={() => {
          dispatch(setClicked());
        }}
        style={
          files.clicked === true && width < 1015 ? {} : { display: "none" }
        }
      />
      <div className="">
        <div className="d-flex justify-content-center">
          <img
            className="studentPicture"
            src={etudiant.urlPhotoProfil}
            alt=""
          />
       
      </div>
      <div className="studentInfo" style={{ lineHeight: "1.4" }}>
          <p className="fs-6 fw-bold" style={{}}>
            {etudiant.nom}
          </p>
          <p className="fs-6 fw-bold" style={{}}>
            {etudiant.prenom}
          </p>
          <p>Niveau: <span style={{color:"green"}}>{etudiant.niveau}</span></p>
          <p className="fw-light" style={{}}>
            Unité: <span style={{color:"#ff5821"}}> {etudiant.departement.uniteRecherche.code}</span>
          </p>
        </div>
      <div className="dashboardLinks mt-4">
        <Link to="/account/depot">
          <p style={location.pathname === "/account/depot"?{backgroundColor:"#ff5821",color:"white"}:{}}>
            <BsFolderFill className="me-2 fs-5"/> Depot dossier
          </p>
        </Link>
        <Link to="/account/changement-sujet">
          <p style={location.pathname === "/account/changement-sujet"?{backgroundColor:"#ff5821",color:"white"}:{}}>
            <BsArrowRepeat className="me-2 fs-5"/> Changement de sujet
          </p>
        </Link>
        <Link to="/account/changement-encadreur">
          <p style={location.pathname === "/account/changement-encadreur"?{backgroundColor:"#ff5821",color:"white"}:{}}>
            <BsArrowRepeat className="me-2 fs-5"/> Changement d'encadreur
          </p>
        </Link>

          <Link
            to="/account/profil"
            style={
              props.url === "/account/profil"
                ? {
                    color: "var(--primaryColor)",
                    borderColor: "var(--primaryColor)",
                  }
                : {}
            }
          >
            <p style={location.pathname === "/account/profil"?{backgroundColor:"#ff5821",color:"white"}:{}}>
              <BsPersonFill className="me-2 fs-5"/> Editer Profil
            </p>
          </Link>
          <Link to="/account/evolution">
            <p style={location.pathname === "/account/evolution"?{backgroundColor:"#ff5821",color:"white"}:{}}>
              <IoRocketSharp className="me-2 fs-5"/> Evolution du dossier
            </p>
          </Link>
          <Link to="/account/date-soutenance">
            <div style={typeof etudiant.dateSoutenance === 'undefined'?{display:"none",margin:0}:{margin:0}}>
              <p style={location.pathname === "/account/date-soutenance"?{backgroundColor:"#ff5821",color:"white"}:{}}>
                <BsCalendar2DateFill className="me-2 fs-5"/> Date soutenance <span className="ms-1 " style={{border:"1px solid green",borderRadius:"3px",color:"green",backgroundColor:"transparent",fontSize:"13px",padding:"2px"}}>NEW !</span>
              </p>
            </div>
          </Link>
          <p onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <BsDoorOpenFill  className="me-2 fs-5"/> Deconnexion
          </p>
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;

