import useEditPost from "../../hooks/useEditPost";
import closeIcon from '../../assets/icons/close.svg';
import addIcon from '../../assets/icons/addPhoto.svg'
import useAuth from '../../hooks/useAuth';
import useProfile from '../../hooks/useProfile';
import {useState, useRef} from 'react';
import useAxios from '../../hooks/useAxios'
import {useNavigate} from 'react-router-dom';

export default function EditPost() {
    const {auth} = useAuth();
    const {state} = useProfile();
    const {api} = useAxios();
    const {editablePost} = useEditPost();
    const user = state?.user ?? auth?.user 
    const [comment, setComment] = useState(editablePost?.content);
    const [newPhoto, setNewPhoto] = useState('');
    const [newPhotoLocalUrl, setNewPhotoLocalUrl] = useState(null);
    const photoRef = useRef();
    const navigate = useNavigate();

    const handleEditPhoto = (e) =>{
      e.preventDefault();
      photoRef.current.click();
    }

    const getNewPhoto = (e) =>{
      const photo = e.target.files[0];
      const cachedURL = URL.createObjectURL(photo)
      setNewPhotoLocalUrl(cachedURL);
      setNewPhoto(photo);
    }

    const handleSave = async(e) =>{
      e.preventDefault();
      try{
        const formData = new FormData();
        formData.append('image', newPhoto);
        formData.append('content', comment);
        const response = await api.patch(`http://localhost:3000/posts/${editablePost?.id}`, formData );
        if(response.status === 200){
          navigate('/');
          console.log(response);
        }
        
      }catch(err){
        console.log(err);
      }
    }   

    const poster = newPhotoLocalUrl ?? `${import.meta.env.VITE_BASE_SERVER_URL}/${editablePost?.image}`;
    
  return (
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Edit Post
      </h6>
      <button className="absolute right-3 top-3 transition-all hover:opacity-80 active:scale-95 active:opacity-70" 
      onClick={()=>navigate(-1)}
      >
        <img src={closeIcon} alt="close" />
      </button>
      <form>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_BASE_SERVER_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">{user?.firstName} {' '} {user?.lastName}</h6>
              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>
          <label
            className="btn-primary cursor-pointer !text-gray-100"
            htmlFor="photo"
            onClick={handleEditPhoto}
          >
            <img src={addIcon} alt="Add Photo" />
            Add Photo
          </label>
          <input ref={photoRef} onChange={getNewPhoto} type="file" name="photo" id="photo" className="hidden" />
        </div>
        {/* Post Text Input */}
        <textarea
          name="post"
          id="post"
          placeholder="Share your thoughts..."
          className="mb-4 h-[50px] w-full bg-transparent focus:outline-none lg:mb-6 lg:h-[60px]"
          value={comment}
          onChange={(e)=> setComment(e.target.value)}
        />
        {/* Image */}
        <div className="mx-auto mb-4 flex max-w-[90%] items-center justify-center lg:mb-6">
          <div className="relative">
            <img
              className="max-w-full"
              src={poster}
              alt="image"
            />
            <button className="absolute right-2 top-2 transition-all hover:opacity-80 active:scale-95 active:opacity-70">
              <img src={closeIcon} alt="close" />
            </button>
          </div>
        </div>
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
