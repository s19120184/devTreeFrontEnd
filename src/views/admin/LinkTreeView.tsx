import React, { useEffect, useState } from "react";
import { social } from "../../data/social";

import DevTreeInput from "../../components/DevTreeInput";
import { urlValid } from "../../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatedUser } from "../../api/DevTreeApi";
import { SocialNetwork, User } from "../../types";


export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  //obtener los datos en cache del usuario
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  //mutacion para agregar los links
  const { mutate } = useMutation({
    mutationFn: updatedUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Actualizado correctamente");
    }
  });

  //
  useEffect(() => {
    const updatedData = devTreeLinks.map((item) => {
      const userlink = JSON.parse(user.links).find(
        (link: User) => link.name === item.name
      );

      if (userlink) {
        return { ...item, url: userlink.url, enabled: userlink.enabled };
      }
      return item;
    });

    setDevTreeLinks(updatedData);
  }, []);

  const handelUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );

    setDevTreeLinks(updatedLinks);

  };

  //links desde la base de datos
  const links: SocialNetwork[] = JSON.parse(user.links);
 
  const handleEnableLink = (socialNetwork: string) => {
    const updateEnableLink = devTreeLinks.map((link) => {
      if (link.name == socialNetwork) {
        if (urlValid(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("Url no valida");
        }
      }
      return link;
    });
    setDevTreeLinks(updateEnableLink);


    //arreglo para los nuevos enlaces
    let updatedItems: SocialNetwork[] = [];
    const selectedSocial = updateEnableLink.find(
      (link) => link.name === socialNetwork
    );

    if (selectedSocial?.enabled) {
      //obtener los elementos con id > 0 y 
      const id= links.filter(link=> link.id>0).length +1
    
      if(links.some(link => link.name === socialNetwork)){
         updatedItems= links.map(link => {
            if(link.name === socialNetwork){
               return {
                ...link,
                id:id,
                enabled:true
               }
            }else{
              return link
            }
         })
      }else{
        // creamos un nuevo objeto con los datos del ya tine el selec pero le agremaos un id
      const newItem = {
        ...selectedSocial,
        id: links.length + 1
      };
      //agregamos los enlaces que ya venian de la base de datos mas el nuevo
      updatedItems = [...links, newItem];

      }
      
    } else {
      //find index solo nos retorna el indice
      const indexToUpdate = links.findIndex(
        (link) => link.name === socialNetwork
      );

      updatedItems = links.map((link) => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false
          };
        } else if(link.id > indexToUpdate && (indexToUpdate !==0 && link.id ===1)){
              return{
                ...link,
                id:link.id -1
              }
        } else {
          return link;
        }
      });
    }

    console.log( updatedItems)

    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData, //para no perder los otros datos
        links: JSON.stringify(updatedItems) //actualizamos los links
      };
    });
  };


  return (
    <>
    
    <div className="space-y-5">
      {devTreeLinks.map((item) => (
        <DevTreeInput
          key={item.name}
          item={item}
          handelUrlChange={handelUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
      <button
        className="bg-cyan-400 p-2 text-lg font-bold w-full uppercase text-slate-600 rounded-lg"
        onClick={() => mutate(queryClient.getQueryData(['user'])!)}
      >
        Guardar Cambios
      </button>
    </div>
    </>
    
  );
}
