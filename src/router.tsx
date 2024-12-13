import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import LinkTreeView from "./views/admin/LinkTreeView";
import ProfileView from "./views/admin/ProfileView";
import AppLayout from "./layouts/AppLayout";
import Handle from "./views/handle/Handle";
import NotFoundView from "./views/404/NotFoundView";
import HomeView from "./views/home/HomeView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path="/auth/login" element={<LoginView />}></Route>
          <Route path="/auth/register" element={<RegisterView />}></Route>
        </Route>

        {/* rutas para la administracion */}
        <Route path="/admin" element={<AppLayout/>} >
            {/* con index ture toma la ruta del padre /admin */}
           <Route index={true} element={<LinkTreeView/>} />
           <Route path="profile" element={<ProfileView/>} />
            {/* al poner path="profile" esto anida la ruta con la del padre  /admin/profile */}
        </Route>

        {/* home */}
        <Route path="/"  element={<HomeView/>}/>

         {/* ruta para el perfil del usuario */}
        <Route path="/:handle" element={<AuthLayout/>} >
               <Route element={<Handle/>} index={true} />
        </Route>

        {/* pagina 404 */}
        <Route path="/404" element={<AuthLayout/>} >
             <Route element={<NotFoundView/>} index={true} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}
