import { Toaster } from "sonner";
import Header from "../../components/Header";
import SearchForm from "../../components/SearchForm";


export default function HomeView() {
  return (
    <>
      <Header/>
      <main className=" bg-gray-100 py-10  min-h-screen bg-no-repeat bg-right-top lg:bg-home lg:bg-home-xl ">
          <div className="max-w-5xl mx-auto mt-10">
              <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                  <h1 className="text-6xl font-black">
                    Todas tus <span className="text-cyan-400">Redes sociales </span>
                    En Un enlace
                  </h1>
                  <p className="text-slate-800 text-xl ">
                    Unete a mas de 200 mil developers compartiendo sus redes sociales, comparte tuperfil de Tiktok, Facebook, Instagra,
                    Youtube, Github y mas.
                  </p>
                  <SearchForm/>
              </div>
          </div>
          <Toaster position="top-right" />
      </main>
      


    </>
  )
}
