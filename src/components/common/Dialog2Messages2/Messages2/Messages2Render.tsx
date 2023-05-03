import React from "react";
import classes from "./messages2Render.module.scss"

type Dialog2RenderType = {
    PageWidth: number
    MobileWidth: number
    patch: string
}
const Messages2Render: React.FC<Dialog2RenderType> = ({PageWidth, MobileWidth, patch}) => {
    return <div>
        {patch === "dialog" && PageWidth > MobileWidth && <div
            //- предложение выбрать диалог
            // эта часть отображается только на странице dialog и только в десктопной версии
            //  Fixed все остальное поле справа.
            className={`${classes.Fixed} ${classes.messages2ChooseDialog}`}
        > Выберите диалог
        </div>}

        {patch === "messages" &&
        <div // эта часть компоненты Messages2Render отрисовывается на странице messages всегда.
        >
            <div
                //fixed справа вверху - имя собеседника и ссылка картинка на его профиль
                // отображается всегда на странице messages
                className={`${classes.Fixed} ${classes.messages2NameAndProfileLink} ${PageWidth < MobileWidth ?
                    classes.MobileMessagesLeft : classes.DesktopMessagesLeft}`}
            >
                имя собеседника и ссылка картинка на его профиль
            </div>
            <div //fixed справа вверху - имя собеседника и ссылка картинка на его профиль
                // отображается всегда на странице messages
                className={`${classes.Fixed} ${classes.messages2RenderMessages} ${PageWidth < MobileWidth ?
                    classes.MobileMessagesLeft : classes.DesktopMessagesLeft}`}
            >
                отрисовка всех сообщений
            </div>
            <div//fixed справа вверху - имя собеседника и ссылка картинка на его профиль
                // отображается всегда на странице messages
                className={`${classes.Fixed} ${classes.messages2PrintMessage} ${PageWidth < MobileWidth ?
                    classes.MobileMessagesLeft : classes.DesktopMessagesLeft}`}
            >
               здесь печатаем новые сообщения
            </div>
        </div>
        }

    </div>

}
export default Messages2Render
