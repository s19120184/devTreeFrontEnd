import { Link } from "react-router-dom";


export default function Logo() {
  return (
    <Link to={'/'}>
       <img src="/devTree.svg" className="   lg:w-full block  " alt="Logotipo DevTree" />
    </Link>
  )
}
