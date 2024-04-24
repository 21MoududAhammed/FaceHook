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
        default:{
            return state;
        }
    }
}

export {initialState, profileReducer}