const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.messText
      return {
        ...state,
        messagesData: [...state.messagesData, { id: 7, message: body }]
      }
    default:
      return state;
  }
};

export let sendMessageCreator = (messText) => ({
  type: SEND_MESSAGE,
  messText
});

export default dialogsReducer;
