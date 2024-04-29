import { actions } from "../actions";
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case actions.post.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.post.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        posts: action.payload.sort((a,b)=>{
          const dateA = new Date(a.createAt);
          const dateB = new Date(b.createAt);
          return dateB - dateA;
        })
      };
    }
    case actions.post.POST_CREATED: {
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.payload].sort((a,b)=>{
          const dateA = new Date(a.createAt);
          const dateB = new Date(b.createAt);
          return dateB - dateA;
        })
      };
    }
    case actions.post.POST_DELETED:{
      return{
        ...state,
        posts: [...state.posts.filter(item => item.id !== action.payload)]
      }
    }
    case actions.post.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export { postReducer, initialState };
