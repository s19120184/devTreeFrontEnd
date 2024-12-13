import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import slugify from "react-slugify";
import { useMutation } from "@tanstack/react-query";
import { SearchByHandle } from "../api/DevTreeApi";

import { Link } from "react-router-dom";

export default function SearchForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      handle: ""
    }
  });

  const mutation = useMutation({
    mutationFn: SearchByHandle
  });

  const handle = watch("handle");

  const handleSubmitForm = () => {
    const slug = slugify(handle);
    console.log(slug);
    mutation.mutate(slug);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-5">
      <div className="relative flex items-center  bg-white  px-2">
        <label htmlFor="handle">devtree.com/</label>
        <input
          type="text"
          id="handle"
          className="border-none bg-transparent p-2 focus:ring-0 flex-1"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio"
          })}
        />
      </div>
      {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

      <div className="mt-10">
        {mutation.isPending && <p className="text-center">Cargando</p>}
        {mutation.error && (
          <p className="text-center text-red-600 font-bold">
            {mutation.error.message}
          </p>
        )}
        {mutation.data && (
          <p className="text-center text-cyan-500 font-black">
            {mutation.data} ir a
            <Link
              className="bg-slate-600 p-1 rounded-lg cursor-pointer ml-1"
              state={{ handle: slugify(handle) }}
              to={"/auth/register"}
            >
              Registro
            </Link>
          </p>
        )}
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Obtener mi DevTree"
      />
    </form>
  );
}
