import { Link } from "react-router-dom";


type PropsLogo={
  user?:boolean
}

export default function Logo({user}:PropsLogo) {
  return (
    <Link to={'/'}>
       <img src="/devTree.svg" className={ `${user && "m-auto w-24" }   w-16 lg:w-24 bg-lime-500 rounded-full block  `} alt="Logotipo DevTree" />
       {user && <p className="text-center mt-1 text-white font-semibold ">Red<span className="text-lime-300 font-bold">Tree</span></p>}
    </Link>
  )
}
