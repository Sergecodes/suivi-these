import { AiFillHome, AiFillProfile } from "react-icons/ai";
import { BsCalendarDateFill, BsFillDoorOpenFill } from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { IoDocumentText, IoNotifications } from "react-icons/io5";

export const SidebarData = [
  {
    title: "Accueil",
    icon: <AiFillHome />,
    link: "/acteur/coordonateur",
  },

  {
    title: "autorisation soutenance",
    icon: <ImUsers />,
    link: "/acteur/coordonateur/autorisation",
  },
  {
    title: "Rapport audition",
    icon: <IoDocumentText />,
    link: "/acteur/coordonateur/audition",
  },
  {
    title: "date soutenance",
    icon: <BsCalendarDateFill />,
    link: "/acteur/coordonateur/date",
  },
  {
    title: "Profil",
    icon: <AiFillProfile />,
    link: "/acteur/coordonateur/profil",
  },
  {
    title: "Notification",
    icon: <IoNotifications />,
    link: "/acteur/coordonateur/notification",
  },
  // {
  //   title: "Deconnexion",
  //   icon: <BsFillDoorOpenFill />,
  //   link: "/",
  // },
];
