import { useLocation } from "react-router-dom";
import AdminNavigation from "./nav/AdminNavigation";
import HomeNavigation from "./nav/HomeNavigation";
import Logo from "./logo/Logo";


export default function Header() {
    //obtener la ubicacon actual con la url
    const location = useLocation();

  return (
    <header className="bg-slate-800 p-5">
        <div className="max-h-10 m-5 flex lg:flex-row flex-shrink items-center  md:justify-between">
          <div className="w-full  lg:p-0 md:w-1/3">
            <Logo/>
          </div>
          <nav className="w-full md:w-1/3 flex flex-col items-center md:flex-row md:justify-end">
            {/* mediante la localizacion usamos  distintos elementos */}
             {location.pathname ==='/' ? <HomeNavigation/> :<AdminNavigation />}
             
          </nav>
        </div>
      </header>
  )
}
