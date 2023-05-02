import React from "react";
import classesCommon from "./dialog2Messages2Common.module.css";
import Dialog2Render from "./Dialog2/Dialog2Render";


type Dialog2RenderType = {
    patch: string,
    PageWidth: number
    MobileWidth: number
}


const Dialog2Messages2: React.FC<Dialog2RenderType> = ({patch, PageWidth, MobileWidth}) => {
    return <div>
        { // Поле остается на странице dialog всегда. На странице messages только при десктопной версии

            (patch === "messages" && PageWidth > MobileWidth || patch === "dialog")
            && <Dialog2Render PageWidth={PageWidth} MobileWidth={MobileWidth}/>
        }

        {(patch === "dialog" && PageWidth > MobileWidth) &&
        <div // Fixed все остальное поле справа. При переходе на мобильную версию на странице dialogs, поле исчезает
            className={`${classesCommon.messages2ChooseDialog}`}
        > по центру - предложение выбрать диалог
        </div>
        }


    </div>
}
export default Dialog2Messages2
