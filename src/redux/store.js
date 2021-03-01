import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "hi, how are you", likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 11 },
      ],
      newPostText: "it-kamasutra.com",
    },
    dialogsPage: {
      messagesData: [
        { id: 1, message: "hi" },
        { id: 2, message: "fdgdfgfd" },
        { id: 3, message: "qeqweqweqwewq" },
        { id: 4, message: "qwe" },
        { id: 5, message: "sdf" },
        { id: 6, message: "fgh" },
      ],
      dialogsData: [
        { id: 1, name: "Dimych" },
        { id: 2, name: "Sasha" },
        { id: 3, name: "Sveta" },
        { id: 4, name: "Tanya" },
        { id: 5, name: "Vanya" },
        { id: 6, name: "Katya" },
      ],
      newMessageBody: "",
    },
    sidebar: {},
  },
  _callSubscriber() {
    console.log("State changed");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebare, action);

    this._callSubscriber(this._state);
  },
};

window.store = store;

export default store;
