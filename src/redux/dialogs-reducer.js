const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";

export let sendMessageCreator = (text1) => {
    return {type: SEND_MESSAGE, newMessageProps: text1}
};
export let updateNewMessageBodyCreator = (body) => {
    return {type: UPDATE_NEW_MESSAGE_BODY, body: body}
};

let dialogsReducer = (state, action) => {
       switch (action.type) {
        case SEND_MESSAGE:
            let addMessageLocal = {
                id: 5,
                message: state.newMessageBody,
            };
            state.messages.push(addMessageLocal);
            state.newMessageBody = "";
            break;
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            break;
        default:
            return state;
    }
}

export default dialogsReducer;
