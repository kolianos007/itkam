const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";

let initialState = {
  posts: [
    { id: 1, message: "hi, how are you", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
  ],
  newPostText: "it-kamasutra.com",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 3,
        message: state.newPostText,
        likesCount: 22,
      };
      state.newPostText = "";
      state.posts.push(newPost);
      return state;
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newText;
      return state;
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

export default profileReducer;
