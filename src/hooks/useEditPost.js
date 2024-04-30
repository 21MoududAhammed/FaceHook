import {useContext} from 'react';
import { EditPostContext } from '../context';

const useEditPost = () =>{
    return useContext(EditPostContext);
}

export default useEditPost;