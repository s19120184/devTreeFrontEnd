import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import type { LoginForm } from "../types";
import ErrorMessage from "../components/ErrorMessage";



export default function LoginView() {
  const initialValues= {
    email:'',
    password:'',
   
}

const {register,reset, handleSubmit, formState:{errors}}=useForm<LoginForm>({defaultValues:initialValues})

const navigate = useNavigate()

const handleLogin=async(formData:LoginForm) => {
   try {
      const {data}= await api.post('/auth/login',formData)
       //gurdamos en local estorage 
      localStorage.setItem("AUTH_TOKEN", data)
      reset()
      navigate('/admin')
      
   } catch (error) {
       if(isAxiosError(error) && error.response){
         toast.error(error.response.data.error)
       }
   }
}

  return (
    <>
    <h1 className="text-4xl text-white font-bold">Iniciar Sesion</h1>
    <form
        onSubmit={ handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
       
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('email',{
                required:'El email es obligatorio',
                pattern:{
                    value:/\S+@\S+\.\S+/,
                    message:"E-mail no valido"
                },
            }) }
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
       
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password',{
                required:'El password es obligatorio',
                minLength:{
                    value:8,
                    message:'El passsword min 8 caracteres',
                }
            }) }
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Iniciar Sesion"
        />
      </form>
     <nav className="mt-10">
        <Link 
           className="text-center text-white text-lg block" to={"/auth/register"} >
            ¿No tienes una cuenta? Crea una Aquí
        </Link>
     </nav>

    </>
   
  )
}
