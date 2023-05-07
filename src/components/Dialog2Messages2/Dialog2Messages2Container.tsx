import React, {useCallback, useEffect} from "react";
import {connect} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import {
    deleteDialog2MessageIdThCr,
    getDialog2MessageIdViewedThCr, getDialog2MessagesNewerThenThCr,
    getDialog2AllThCr, postDialog2MessageIdToSpamThCr,
    postDialog2MessageThCr, putDialog2MessageIdRestoreThCr,
    putDialog2StartThCr, getDailog2UnreadMessagesThCr, Dialog2Actions
} from "../../redux/dialog2-reducer";
import Dialog2Messages2Common from "./Dialog2Messages2Common";
import {getDialog2AllType, newMessagesItem, sendMessageType} from "../api/apiTypes";
import {compose} from "redux";
import withRouter2 from "../hoc/withRouter2";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";

type DialogContainerType = {
    patch: string,// имя страницы из URL
    PageWidth: number, // ширина страницы
    MobileWidth: number, // ширина страницы, считающаяся мобильной версткой
    Dialog2All: getDialog2AllType, // список всех диалогов для левой колонки
    userId: number, // id пользователя из URL (withRouter2)
    MessagesNewerThen: Array<sendMessageType> // сообщения выбранного диалога, новее заданной даты
    d2UserId: number // ID пользователя, записанный в стейт из URL
    D2Item: newMessagesItem // отфильтрованый  из Dialog2All выбранный пользователь по userId

    getDialog2AllThCr: (userId: number, page: number, count: number) => void,// получить список всех диалогов
    setD2UserId: (d2UserId:number) => void, // задать userId из URL в стейт
    setD2Item: (d2UserId:number) => void, // задать и отфильтровать из Dialog2All выбранного пользователя по userId

    putDialog2StartThCr: (currentDialogId: number) => void,
    postDialog2MessageThCr: (userId: number, body: string, date: string) => void,
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
        patch, PageWidth, MobileWidth, Dialog2All, userId, MessagesNewerThen, setD2UserId, d2UserId, setD2Item, D2Item
    }
) => {
    //cde7821a-6981-4f49-8b12-faf681cb1621 от "555"
    // 84ac68ee-73d0-43c4-82bb-0fd0273d4808 (привет андрей)
    // 25528  | 27045 | 1079

    const Msg2DeleteMessage = (message2Id: string) => {
         deleteDialog2MessageIdThCr(message2Id, d2UserId, "2022-04-30T19:10:31.843") // - удалить сообщение (только у себя) по ID сообщения
    }
    const Msg2SendMessage = (messageBody: string) => {
        postDialog2MessageThCr( d2UserId, messageBody, "2022-04-30T19:10:31.843" )// отправить сообщение указав ID пользователя
    }

    useEffect(()=>{
        if (userId!==0) {
            console.log("записать из URL в стейт userId")
            setD2UserId(userId) // записать из URL в стейт userId
        }
    },[userId])

    useEffect(()=>{
        if (d2UserId!==0 && (D2Item.id!==d2UserId)) {
            console.log("Отфильтровать setD2Item при смене d2UserId")
            setD2Item(d2UserId) // отфильтровать из стейта Dialog2All по d2UserId чтобы получить D2Item
        }
    },[d2UserId, setD2Item])

    useEffect(()=>{
        if (!D2Item ) {
            console.log("Отфильтровать setD2Item если !D2Item")
            setD2Item(d2UserId) // отфильтровать из стейта Dialog2All по d2UserId чтобы получить D2Item
        }
    },[D2Item, d2UserId,Dialog2All, setD2Item])

    useEffect( () => {
        if (patch === "dialog2") {
            console.log("useEffect получить список всех диалогов при загрузке страницы dialog")
            getDialog2AllThCr( d2UserId, 1, 10 )
        }
    }, [patch] )

    useEffect(()=>{
        if (patch==="messages") {
            console.log("useEffect получить сообщения при смене d2UserId")
            getDialog2MessagesNewerThenThCr( d2UserId, "2022-04-30T19:10:31.843" )
        }
    },[d2UserId, patch])

    useEffect(()=>{
        if (patch==="messages") {
            console.log("useEffect начать диалог при прямой ссылке и первой загрузке")
            putDialog2StartThCr(userId)
        }
    },[])


    //  getDialog2MessageIdViewedThCr("84ac68ee-73d0-43c4-82bb-0fd0273d4808") // проверить прочитано ли сообщение по его ID
    // postDialog2MessageIdToSpamThCr("cde7821a-6981-4f49-8b12-faf681cb1621") // пометить как спам сообщение по его ID
    // putDialog2MessageIdRestoreThCr("826de61e-76e6-4fe4-b9c9-5bee8fc16d12") // - восстановить сообщение из спама и удаленных
    // getDailog2UnreadMessagesThCr() // - вернуть количество непрочтенных сообщений
    // putDialog2StartThCr(userId)
    return <div>
        <Dialog2Messages2Common
            patch={patch} PageWidth={PageWidth} MobileWidth={MobileWidth} Dialog2All={Dialog2All}
            MessagesNewerThen={MessagesNewerThen} Msg2DeleteMessage={Msg2DeleteMessage}
            Msg2SendMessage={Msg2SendMessage} userId={userId} D2Item={D2Item}
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
        d2UserId: state.dialog2.d2UserId,
        D2Item: state.dialog2.D2Item
    }
}
type mapStateToPropsType = {
    patch: string,
    PageWidth: number,
    MobileWidth: number,
    Dialog2All: getDialog2AllType,
    MessagesNewerThen: Array<sendMessageType>,
    d2UserId: number,
    D2Item: newMessagesItem

}
type mapDispatchToPropsType = {
    putDialog2StartThCr: (currentDialogId: number) => void,
    getDialog2AllThCr: (userId: number, page: number, count: number) => void,
    postDialog2MessageThCr: (userId: number, body: string, date: string) => void,
    getDialog2MessageIdViewedThCr: (messageId: string) => void,
    postDialog2MessageIdToSpamThCr: (messageId: string) => void,
    deleteDialog2MessageIdThCr: (messageId: string, userId: number, date: string) => void,
    putDialog2MessageIdRestoreThCr: (messageId: string) => void,
    getDialog2MessagesNewerThenThCr: (userId: number, date: string) => void,
    getDailog2UnreadMessagesThCr: () => void,
    setD2UserId: (d2UserId:number) => void,
    setD2Item: (d2UserId:number) => void,
}
const {setD2UserId, setD2Item} = Dialog2Actions // получить экшены

export default compose<any>(
    connect<mapStateToPropsType,
        mapDispatchToPropsType,
        unknown,
        GlobalStateType>( mapStateToProps,
        {
            putDialog2StartThCr, getDialog2AllThCr, postDialog2MessageThCr,
            getDialog2MessageIdViewedThCr, postDialog2MessageIdToSpamThCr, deleteDialog2MessageIdThCr,
            putDialog2MessageIdRestoreThCr, getDialog2MessagesNewerThenThCr, getDailog2UnreadMessagesThCr,
            setD2UserId, setD2Item
        }
    ),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2
)
( Dialog2Messages2Container );
