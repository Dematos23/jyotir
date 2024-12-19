"use client";

import axios from "axios";

const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
});

const setTokenInterceptor = (getToken:()=> string | null)=>{
  backendApi.interceptors.request.use((config)=>{
    const token =getToken()
    if (token){
      config.headers['Authorization']= `Bearer ${token}`
    }
    return config
  })
}

export { backendApi, setTokenInterceptor };
