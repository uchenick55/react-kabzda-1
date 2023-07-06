import React, {useMemo} from "react";
import Chat from "./Chat";

const ChatContainer:React.FC = () => {
    return <div>
        {useMemo(()=><Chat/>,[])}
    </div>
}
export default ChatContainer
