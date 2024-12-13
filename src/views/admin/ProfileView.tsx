import { useForm } from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage"
import { EditFormUser, User } from "../../types"
import { useMutation, useQueryClient} from "@tanstack/react-query"
import { updatedUser, uploadImage } from "../../api/DevTreeApi"
import { toast } from "sonner"
import { ChangeEvent } from "react"

export default function ProfileView() {

    //accedemos a los datos que tenemos en catche
    const queryClietn= useQueryClient()
    const data : User= queryClietn.getQueryData(['user'])! //el id de la consulta

    const editUser:EditFormUser= {
        handle:data.handle,
        description:data.description
    }

    const {register, handleSubmit, formState:{errors}} =useForm({defaultValues:editUser})

    //usar mutation
    const updateProfileMutation= useMutation({
        mutationFn: updatedUser,
        onError:(error)=>{
           toast.error(error.message)
        },
        onSuccess:(data)=>{
            toast.success(data)
            //invalidar 
            queryClietn.invalidateQueries({queryKey:["user"]})
        }
    })

    //mutacion para subir la imagen
    const uploadImageMutation= useMutation({
        mutationFn:uploadImage,
        onError:(error) => {
            toast.error(error.message)
        },
        onSuccess:(data) => {
           // toast.success(data)
            //usamos setQueryData para adelanrnos y acutualizar 
            //los datos cacheados 
            queryClietn.setQueryData(['user'],(prevData:User)=>{
               return {
                ...prevData,
                image:data.image
               }
            })
         
        }
    })
   

    //verificar cambios en subida de imagen
    const hadleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            uploadImageMutation.mutate(e.target.files[0])
        }
        
    }

    const handleUserProfileForm= (formdata:EditFormUser)=>{
        //obtenemos la data en cache con getQueryData
        const user : User = queryClietn.getQueryData(['user'])!
        user.description=formdata.description
        user.handle=formdata.handle

        updateProfileMutation.mutate(user)
    }
    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"

                    {...register('handle',{
                        required:"El handle es obligatorio"
                    })}
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register('description',{
                        required:'La Descripcion es obligatoria'
                    })}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={ hadleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}