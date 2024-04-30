import { EditPostContext } from "../context"
import {useState} from 'react';

const EditPostProvider = ({children})=>{
    const [editablePost, setEditablePost] = useState({})
    const name = 'Moudud';
    return(
        <EditPostContext.Provider value={{name, editablePost, setEditablePost}}>
            {children}
        </EditPostContext.Provider>
    )
}

export default EditPostProvider;