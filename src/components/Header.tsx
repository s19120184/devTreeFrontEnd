import { useLocation } from "react-router-dom";
import AdminNavigation from "./nav/AdminNavigation";
import HomeNavigation from "./nav/HomeNavigation";
import Logo from "./logo/Logo";


export default function Header() {
    //obtener la ubicacon actual con la url
    const location = useLocation();

  return (
    <header className="bg-slate-800 p-5">
        <div className="mx-auto max-w-2xl flex flex-col md:flex-row items-center  md:justify-between">
          <div className="w-full p-5 lg:p-0 md:w-1/3">
            <Logo/>
          </div>
          <nav className="md:w-1/3 md:flex md:justify-end">
            {/* mediante la localizacion usamos  distintos elementos */}
             {location.pathname ==='/' ? <HomeNavigation/> :<AdminNavigation />}
             
          </nav>
        </div>
      </header>
  )
}
