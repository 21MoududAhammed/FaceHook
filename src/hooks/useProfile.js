import { ProfileContext } from "../context"
import {useContext} from 'react'

 const useProfile =()=>{
    return useContext(ProfileContext)
 }

 export default useProfile;