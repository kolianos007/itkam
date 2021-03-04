const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE"


let initialState = {
  posts: [
    { id: 1, message: "hi, how are you", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
  ],
  newPostText: "it-kamasutra.com",
  userProfile: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 3,
        message: state.newPostText,
        likesCount: 22,
      };
      return {
        ...state,
        newPostText: '',
        posts: [...state.posts, newPost]
      }
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText
      }
    case SET_USER_PROFILE:
      return {
          ...state,
          userProfile: action.profile
      }
    default:
      return state;
  }
};

export let addPostActionCreator = () => ({
  type: ADD_POST,
});

export let updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});

export let setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile
})

export default profileReducer;
