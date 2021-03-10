import axios from "axios";
import { profileApi, usersApi } from "../api/api";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"


let initialState = {
  posts: [
    { id: 1, message: "hi, how are you", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
  ],
  userProfile: null,
  status: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 3,
        message: action.newPostText,
        likesCount: 22,
      };
      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    case SET_USER_PROFILE:
      return {
          ...state,
          userProfile: action.profile
      }
    case SET_STATUS:
      return {
        ...state, 
        status: action.status
      }
    default:
      return state;
  }
};

export let addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText
});

export let setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile
})

export const setStatus = (status) => ({
  type: SET_STATUS,
  status
})

//thunk-creator
export const getUserProfile = (userId) => {
  return (dispatch) => {
      usersApi.getProfile(userId).then((data) => {
        dispatch(setUserProfile(data))
      }
    )
  }
}

export const getStatus = (userId) => {
  return (dispatch) => {
    profileApi.getStatus(userId).then((response) => {
      dispatch(setStatus(response.data))
    })
  }
}

export const updateStatus = (status) => {
  return (dispatch) => {
    profileApi.updateStatus(status).then((response) => {
      if(response.data.resultCode === 0) {
        dispatch(setStatus(response.data.status))
      }
    })
  }
}

export default profileReducer;
