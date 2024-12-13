import { isAxiosError } from "axios";
import api from "../lib/axios";
import {  User, userHandle } from "../types";

export const getUSer = async () => {
  try {
    const { data } = await api.get<User>("/user");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
export const updatedUser = async (user: User) => {
  try {
   
    const { data } = await api.patch<string>("/user", user);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const uploadImage=async(file:File)=>{
   //creamos un objeto formdata para subir el archivo
   const formdata = new FormData()
   formdata.append('file', file)

   try {
    const {data} = await api.post('/user/imagen',formdata)
    console.log(data)
    return data
    
   } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
   }
}

export const getUserByHandle = async (handle:string) => {
  try {
   
    const { data } = await api.get<userHandle>(`/${handle}`);
    return data;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const SearchByHandle = async (handle:string) => {
  try {
   
   
    const { data } = await api.post<string>('/search',{ handle:handle});
    return data;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};


