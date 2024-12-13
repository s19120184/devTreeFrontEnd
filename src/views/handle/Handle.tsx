
import { useQuery } from '@tanstack/react-query'
import { Navigate, useParams } from 'react-router-dom'
import { getUserByHandle } from '../../api/DevTreeApi'
import HandleData from '../../components/HandleData'

export default function Handle() {
    //obtern handel de la url
    const params= useParams()
    const handle = params.handle!

    const {data, error, isLoading}= useQuery({
        queryKey:['handle', handle],
        queryFn : ()=> getUserByHandle(handle),
        retry:1
    })

    if(isLoading) return 'Cargando...'
    if(error)return <Navigate to={'/404'}/>


if(data) return <HandleData data={data}/>
}
