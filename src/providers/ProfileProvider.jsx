import { ProfileContext } from '../context';
import {useReducer} from 'react';
import { profileReducer, initialState } from "../reducers/profileReducer";


const ProfileProvider =({children})=>{

    const [state, dispatch] = useReducer(profileReducer, initialState);
    const name = 'Moudud';

    return(
        <ProfileContext.Provider value={{state, dispatch}}>
        {children}
       </ProfileContext.Provider>
    )
    
}

export default ProfileProvider;