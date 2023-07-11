import React, {memo} from "react";
import classes from "./chat.module.css"
import dialogBlack from "../../assets/images/swg/dialog-black.svg"
import dialogLight from "../../assets/images/swg/dialog-light.svg"
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import {chatActions} from "../../redux/chat-reducer";
import Toast from "react-bootstrap/Toast";

const ChatBookmark: React.FC = memo(() => {
    //console.log( "ChatBookmark" )

    const dispatch = useDispatch()

    const {switchRenderChat} = chatActions // экшн смены флага отрисовки чата

    const theme = useSelector( (state: GlobalStateType) => state.theme.themeBLL ) // тема
    return <div>
        <div
            onClick={() => dispatch( switchRenderChat() )}
        >

            <div className={classes.chatBookmark}>
                <Toast bg={theme}>
                    <Toast.Body>
                        <strong className="me-auto">Общий чат</strong>
                    </Toast.Body>
                </Toast>
            </div>
            <img src={theme === "light" ? dialogBlack : dialogLight} alt={"Задать вопрос"}
                 title={"Задать вопрос"} className={classes.imgDialog}/>
        </div>
    </div>
})
export default ChatBookmark
