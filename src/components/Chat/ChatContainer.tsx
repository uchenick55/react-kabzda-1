import React, {useMemo, useState} from "react";
import Chat from "./Chat";
import {compose} from "redux";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";
import ChatBookmark from "./ChatBookmark";

const ChatContainer:React.FC = () => {
    const [showChatBookmark, setShowChatBookmark] = useState<boolean>(true)

    return <div>
        <ChatBookmark/>  {/*вкладка вызова чата*/}

        {useMemo(()=><Chat showChatBookmark={showChatBookmark} setShowChatBookmark={setShowChatBookmark}/>,[])}
    </div>
}
export default compose<React.ComponentType>(
    NavigateToLoginHoc2// проверка, залогинен ли я
)( ChatContainer )
