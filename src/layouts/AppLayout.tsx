
import { useQuery } from "@tanstack/react-query";
import { getUSer } from "../api/DevTreeApi";
import DevTreeAdmin from "../components/DevTreeAdmin";
import { Navigate } from "react-router-dom";


export default function AppLayout() {
   
  const {data, isLoading , isError}= useQuery({
    queryFn: getUSer,//la funcion que se va ejecutar
    queryKey:['user'],//devemos darle un query key para identificarlo
    retry:2, //solo intenta una ves la consulta
  })


  if(isLoading) return 'Cargando...'
  if(isError){
    return <Navigate to={'/auth/login'} />
  }
  if(data) return <DevTreeAdmin data={data}/>
  
}
