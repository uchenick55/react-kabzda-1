import React, {useState} from "react";
import classes from "./chat.module.css"
import dialogBlack from "../../assets/images/swg/dialog-black.svg"
import dialogLight from "../../assets/images/swg/dialog-light.svg"
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import {chatActions} from "../../redux/chat-reducer";

const ChatBookmark:React.FC = () => {
    console.log("ChatBookmark")

    const dispatch = useDispatch()

    const {switchRenderChat} = chatActions // экшн смены флага отрисовки чата

    const renderChat = useSelector((state:GlobalStateType) => state.chat.renderChat) // флаг отрисовки чата

    const theme = useSelector((state:GlobalStateType) => state.theme.themeBLL) // тема
    return <div>
        <div
            className={`${classes.chatBookmarkExtCommon} ${renderChat?classes.hideChatBookmarkExt:classes.chatBookmarkExt}`}
            onClick={()=>dispatch( switchRenderChat() )}
        >
            <div className={classes.chatBookmark}>
                <div className={classes.bookmarkText}>Общий чат</div>

            </div>
            <img src={theme === "light" ? dialogBlack : dialogLight} alt={"Задать вопрос"}
                 title={"Задать вопрос"} className={classes.imgDialog}/>
        </div>
    </div>
}
export default ChatBookmark
