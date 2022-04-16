import React,{useState} from 'react';

/*import Accueil from './screen/Accueil';
import Header from './screen/Header';
import Footer from './screen/Footer';
import TopHeader from "./components/common/TopHeader"
import NavbarHeader from "./components/common/NavbarHeader"
import Copyright from "./components/common/Copyright";
import TopHeader from "./components/common/TopHeader"
import NavbarHeader from './components/common/NavbarHeader';*/
import Accueil from './screen/Accueil';
import Header from './screen/Header';
import Footer from './screen/Footer';



const App = () => {
  const [isLogin,setIsLogin]= useState(true);
  const [page,setPage]=useState("accueil");
  return (
    <div >
      

      <Header isLogin={isLogin} page={page}/>
      <Accueil isLogin={isLogin} />
      <Footer/>
</div>
  )
}

export default App;
