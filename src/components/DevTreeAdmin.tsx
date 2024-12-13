import NavigationTabs from "./NavigationTabs";
import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";
import { SocialNetwork, User } from "../types";
import { useEffect, useState } from "react";
import DevTreeLink from "./DevTreeLink";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";

type DevTreeAdminProps = {
  data: User;
};
export default function DevTreeAdmin({ data }: DevTreeAdminProps) {
  const [enableLinks, setEnableLinks] = useState<SocialNetwork[]>(
    JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
  );

  useEffect(() => {
    setEnableLinks(
      JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
    );
  }, [data]);

  const queryClient = useQueryClient();
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && over.id) {
      const prevIdenx = enableLinks.findIndex((link) => link.id === active.id);
      const newIndex = enableLinks.findIndex((link) => link.id === over.id);

      const disableLinks: SocialNetwork[] = JSON.parse(data.links).filter(
        (item: SocialNetwork) => !item.enabled
      );

      //resive el arreglo , el index previo y el nuevo index
      const order = arrayMove(enableLinks, prevIdenx, newIndex);
      //concatenar los arreglos de links abilitados y desabilitados
      const links = order.concat(disableLinks);

      //actualizamos el state

      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          links: JSON.stringify(links)
        };
      });
    }
  };

  return (
    <>
      <Header/>
      
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          {/* componente navigation tabs */}
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil:/{data.handle}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              {/* donde se coloca las vistas */}
              <Outlet />
            </div>
            {/* previsualizacion del perfil */}
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
              <p className=" text-4xl text-white text-center">{data.handle}</p>
              {data.image && (
                <img
                  src={data.image}
                  alt="imagen perfil"
                  className="mx-auto max-w-[250px]"
                />
              )}
              <p className="text-cente text-lg font-black text-white">
                {data.description}
              </p>
              {/* drag N drop */}
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <div className="mt-20 flex flex-col gap-5">
                  <SortableContext
                    items={enableLinks} //elementos a los que le queremos aplicar el drag n drop
                    strategy={verticalListSortingStrategy} //la manera en que se van ordenar
                  >
                    {enableLinks.map((link) => (
                      <DevTreeLink key={link.name} link={link} />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
