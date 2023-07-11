import React from "react";
import Chat from "./Chat";
import {compose} from "redux";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";
import ChatBookmark from "./ChatBookmark";
import classes from "./chat.module.css";
import {useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";

const ChatContainer:React.FC = () => {
    const renderChat = useSelector( (state: GlobalStateType) => state.chat.renderChat ) // флаг отрисовки чата

    return <div>
        <div
            className={`${classes.chatBookmarkExtCommon} ${renderChat ? classes.hideChatBookmarkExt : classes.chatBookmarkExt}`}
        >
            <ChatBookmark/>  {/*вкладка вызова чата*/}
        </div>
        <div
            className={`${classes.ChatCommon} ${renderChat ? classes.MakeChatVisible : classes.MakeChatInvisible}`}
        >
            <Chat/>
        </div>
    </div>
}
export default compose<React.ComponentType>(
    NavigateToLoginHoc2// проверка, залогинен ли я
)( ChatContainer )
