import React from "react";
import classesCommon from "./dialog2Messages2Common.module.scss";
import Dialog2Render from "./Dialog2/Dialog2Render";
import Messages2Render from "./Messages2/Messages2Render";


type Dialog2RenderType = {
    patch: string,
    PageWidth: number
    MobileWidth: number
}


const Dialog2Messages2Common: React.FC<Dialog2RenderType> = ({patch, PageWidth, MobileWidth}) => {
    return <div className={classesCommon.dialog2Messages2Common}>
        {/*Отрисовка поля диалогов*/}
        <Dialog2Render PageWidth={PageWidth} MobileWidth={MobileWidth} patch={patch}/>

        <Messages2Render PageWidth={PageWidth} MobileWidth={MobileWidth} patch={patch}/>

    </div>
}
export default Dialog2Messages2Common
