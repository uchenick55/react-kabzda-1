import React, {useMemo} from "react";
import Chat from "./Chat";
import {compose} from "redux";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";

const ChatContainer:React.FC = () => {
    return <div>
        {useMemo(()=><Chat/>,[])}
    </div>
}
export default compose<React.ComponentType>(
    NavigateToLoginHoc2// проверка, залогинен ли я
)( ChatContainer )
