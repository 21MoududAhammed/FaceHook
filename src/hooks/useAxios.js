import { useEffect } from "react";
import useAuth from "./useAuth";
import api from "../api/api";
import axios from "axios";

const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const authToken = auth?.authToken;
    // request intercept
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (authToken) {
          config.headers["Authorization"] = `Bearer ${authToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );
    // response intercept
    const responseIntercept = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        const originalRequest = err.config;
        // if the error status is 401 and there is no originalRequest._retry flag, it means the token has expired and we need to refresh it.
        if(err.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            const refreshToken = auth?.refreshToken;
            try{
                const response = await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/auth/refresh-token`, {refreshToken});
                const {token} = response?.data;
                // set the new token as authToken 
                setAuth({...auth, authToken: token});

                //retry the original request with the new token 
                originalRequest.headers.Authorization = `Bearer ${token}`;
                // in originalRequest we have every information about the previous request like what was the method and other things that's why we are not using any method like post or get 
                return axios(originalRequest);
                
            }catch(err){
                throw err;
            }
           
        }
        return Promise.reject(err);
      }
      
    );

    // clean up function
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth?.authToken]);
  return { api };
};

export default useAxios;
