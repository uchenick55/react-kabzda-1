import React, {useEffect} from "react";
import {connect} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";
import {
    deleteDialog2MessageIdThCr,
    getDialog2MessageIdViewedThCr, getDialog2MessagesNewerThenThCr,
    getDialog2AllThCr, postDialog2MessageIdToSpamThCr,
    postDialog2MessageThCr, putDialog2MessageIdRestoreThCr,
    putDialog2StartThCr, getDailog2UnreadMessagesThCr
} from "../../../redux/dialog2-reducer";
import Dialog2Messages2Common from "./Dialog2Messages2Common";
import {getDialog2AllType, sendMessageType} from "../../api/apiTypes";
import {compose} from "redux";
import withRouter2 from "../../hoc/withRouter2";

type DialogContainerType = {
    patch: string,// имя страницы из URL
    PageWidth: number, // ширина страницы
    MobileWidth: number, // ширина страницы, считающаяся мобильной версткой
    Dialog2All: getDialog2AllType, // список всех диалогов для левой колонки
    userId: number, // id пользователя из URL (withRouter2)
    MessagesNewerThen: Array<sendMessageType> // сообщения выбранного диалога, новее заданной даты

    getDialog2AllThCr: (userId: number, page: number, count: number) => void,// получить список всех диалогов

    putDialog2StartThCr: (currentDialogId: number) => void,
    postDialog2MessageThCr: (userId: number, body: string, date:string) => void,
    getDialog2MessageIdViewedThCr: (messageId: string) => void,
    postDialog2MessageIdToSpamThCr: (messageId: string) => void,
    deleteDialog2MessageIdThCr: (messageId: string, userId: number, date: string) => void,
    putDialog2MessageIdRestoreThCr: (messageId: string) => void,
    getDialog2MessagesNewerThenThCr: (userId: number, date: string) => void,
    getDailog2UnreadMessagesThCr: () => void,

}
const Dialog2Messages2Container: React.FC<DialogContainerType> = (
    {
        putDialog2StartThCr, getDialog2AllThCr, postDialog2MessageThCr,
        getDialog2MessageIdViewedThCr, postDialog2MessageIdToSpamThCr, deleteDialog2MessageIdThCr,
        putDialog2MessageIdRestoreThCr, getDialog2MessagesNewerThenThCr, getDailog2UnreadMessagesThCr,
        patch, PageWidth, MobileWidth, Dialog2All, userId, MessagesNewerThen
    }
) => {
    //cde7821a-6981-4f49-8b12-faf681cb1621 от "555"
    // 84ac68ee-73d0-43c4-82bb-0fd0273d4808 (привет андрей)
    // 25528  | 27045 | 1079
    useEffect( () => {
        console.log( userId )
        Msg2GetAllDialogs() // получить все сообщения от указанного ID пользователя новее чем указанная дата
    }, [userId] )
    useEffect( () => { // при загрузке получить список всех диалогов
        getDialog2AllThCr( 9999999999, 1, 10 ) // получить список всех диалогов

        //putDialog2StartThCr(1079)
        //  getDialog2MessageIdViewedThCr("84ac68ee-73d0-43c4-82bb-0fd0273d4808") // проверить прочитано ли сообщение по его ID
        // postDialog2MessageIdToSpamThCr("cde7821a-6981-4f49-8b12-faf681cb1621") // пометить как спам сообщение по его ID
        // putDialog2MessageIdRestoreThCr("cde7821a-6981-4f49-8b12-faf681cb1621") // - восстановить сообщение из спама и удаленных
        // getDailog2UnreadMessagesThCr() // - вернуть количество непрочтенных сообщений
    }, [] )

    const Msg2DeleteMessage = (message2Id:string) => {
        deleteDialog2MessageIdThCr(message2Id, userId, "2022-04-30T19:10:31.843") // - удалить сообщение (только у себя) по ID сообщения
    }
    const Msg2SendMessage = (messageBody:string) => {
        postDialog2MessageThCr(userId, messageBody, "2022-04-30T19:10:31.843")// отправить сообщение указав ID пользователя
    }
    const Msg2GetAllDialogs = () => {
        getDialog2MessagesNewerThenThCr( userId, "2022-04-30T19:10:31.843" ) // получить все сообщения от указанного ID пользователя новее чем указанная дата
    }

    return <div>
        <Dialog2Messages2Common
            patch={patch} PageWidth={PageWidth} MobileWidth={MobileWidth} Dialog2All={Dialog2All}
            MessagesNewerThen={MessagesNewerThen} Msg2DeleteMessage={Msg2DeleteMessage} Msg2SendMessage={Msg2SendMessage}
        />

    </div>
}
const mapStateToProps = (state: GlobalStateType) => {
    return {
        patch: state.app.patch,
        PageWidth: state.app.PageWidth,
        MobileWidth: state.app.MobileWidth,
        Dialog2All: state.dialog2.Dialog2All,
        MessagesNewerThen: state.dialog2.MessagesNewerThen,
    }
}
type mapStateToPropsType = {
    patch: string,
    PageWidth: number,
    MobileWidth: number,
    Dialog2All: getDialog2AllType,
    MessagesNewerThen: Array<sendMessageType>
}
type mapDispatchToPropsType = {
    putDialog2StartThCr: (currentDialogId: number) => void,
    getDialog2AllThCr: (userId: number, page: number, count: number) => void,
    postDialog2MessageThCr: (userId: number, body: string, date:string) => void,
    getDialog2MessageIdViewedThCr: (messageId: string) => void,
    postDialog2MessageIdToSpamThCr: (messageId: string) => void,
    deleteDialog2MessageIdThCr: (messageId: string, userId: number, date: string) => void,
    putDialog2MessageIdRestoreThCr: (messageId: string) => void,
    getDialog2MessagesNewerThenThCr: (userId: number, date: string) => void,
    getDailog2UnreadMessagesThCr: () => void,

}
export default compose<any>(
    connect<mapStateToPropsType,
        mapDispatchToPropsType,
        unknown,
        GlobalStateType>( mapStateToProps,
        {
            putDialog2StartThCr, getDialog2AllThCr, postDialog2MessageThCr,
            getDialog2MessageIdViewedThCr, postDialog2MessageIdToSpamThCr, deleteDialog2MessageIdThCr,
            putDialog2MessageIdRestoreThCr, getDialog2MessagesNewerThenThCr, getDailog2UnreadMessagesThCr
        }
    ),
    withRouter2// получить данные ID из URL браузера и добавить в пропсы
)
( Dialog2Messages2Container );

/*
export default compose<any>(
    connect<
        mapStateToPropsType,
        mapDispatchToPropsType,
        unknown,
        GlobalStateType
        >( mapStateToProps,
        {
    putDialog2StartThCr, getDialog2AllThCr, postDialog2MessageThCr,
    getDialog2MessageIdViewedThCr, postDialog2MessageIdToSpamThCr, deleteDialog2MessageIdThCr,
    putDialog2MessageIdRestoreThCr, getDialog2MessagesNewerThenThCr, getDailog2UnreadMessagesThCr

        }
    ),
    withRouter2// получить данные ID из URL браузера и добавить в пропсы
)
( Dialog2Messages2Container );

* */
