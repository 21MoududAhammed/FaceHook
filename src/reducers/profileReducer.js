import {actions} from '../actions/index.jsx';
const initialState = {
    user: null,
    posts: [],
    loading: false,
    error: null,
}

const profileReducer = (state,action) =>{
    switch(action.type){
        case actions.profile.DATA_FETCHING:{
            return {
                ...state,
                loading: true,
                error: null,
            }
        }
        case actions.profile.DATA_FETCHED:{
            return {
                ...state,
                loading: false,
                posts: action.payload.posts,
                user: action.payload.user,
            }
        }
        case actions.profile.DATA_FETCH_ERROR:{
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }
        case actions.profile.USER_DATA_EDITED:{
            return{
                ...state,
                loading: false,
                user: action.payload,
            }
        }
        case actions.profile.IMAGE_UPDATED:{
            return{
                ...state,
                loading: false,
                user:{
                    ...state.user,
                    avatar: action.payload,
                }
            }
        }
        case actions.profile.PROFILE_POST_DELETED:{
            return{
                ...state,
                posts: [...state.posts.filter(item =>  item.id !== action.payload)]
            }
        }
        default:{
            return state;
        }
    }
}

export {initialState, profileReducer}