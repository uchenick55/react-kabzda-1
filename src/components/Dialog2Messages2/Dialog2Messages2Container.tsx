import React, {useCallback, useEffect} from "react";
import {connect} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import {
    deleteDialog2MessageIdThCr,
    getDialog2MessageIdViewedThCr, getDialog2MessagesNewerThenThCr,
    getDialog2AllThCr, postDialog2MessageIdToSpamThCr,
    postDialog2MessageThCr, putDialog2MessageIdRestoreThCr,
    putDialog2StartThCr, getDailog2UnreadMessagesThCr, Dialog2Actions, MarkersType
} from "../../redux/dialog2-reducer";
import Dialog2Messages2COM from "./Dialog2Messages2COM";
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
    Markers: MarkersType

    getDialog2AllThCr: (userId: number, page: number, count: number) => void,// получить список всех диалогов
    setD2UserId: (userId: number) => void, // задать userId из URL в стейт
    setMarkers: (Markers: MarkersType) => void // задать вспомогательные маркеры
    setD2Item: (D2Item: newMessagesItem) => void // задать D2Item (шапку сообщений)
    getDialog2AllAC: (Dialog2All: getDialog2AllType) => void, // изменить локально данные в диалоглис

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
        patch, PageWidth, MobileWidth, Dialog2All, userId, MessagesNewerThen, setD2UserId, d2UserId, D2Item,
        Markers, setMarkers, setD2Item, getDialog2AllAC
    }
) => {
    //cde7821a-6981-4f49-8b12-faf681cb1621 от "555"
    // 84ac68ee-73d0-43c4-82bb-0fd0273d4808 (привет андрей)
    // 25528  | 27045 | 1079

    const Msg2DeleteMessage = useCallback( (message2Id: string) => {
        deleteDialog2MessageIdThCr( message2Id, userId, "2022-04-30T19:10:31.843" ) // - удалить сообщение (только у себя) по ID сообщения
    }, [userId] )
    const Msg2SendMessage = (messageBody: string) => {
        postDialog2MessageThCr( userId, messageBody, "2022-04-30T19:10:31.843" )// отправить сообщение указав ID пользователя
        if (Markers.dialogId !== userId) { //Если мы еще не начали диалог с пользователем, и отправили сообщение
            putDialog2StartThCr( userId ) // инициировать диалог
            setMarkers( { // маркер пометить, что диалог начался
                ...Markers,
                dialogId: userId
            } )
        }
    }

    useEffect( () => {
            if (D2Item && D2Item.newMessagesCount > 0) {         //если маркер непрочтенных сообщений больше нуля
                setTimeout( () => { // делаем таймер паузу пока сообщение не исчезнет
                    const Dialog2AllLocal2: getDialog2AllType = [];
                    Dialog2All.forEach( dd => {
                        if (dd.id === userId) { // если это диалог в котором есть новые сообщения
                            dd.hasNewMessages = false; // зануляем значения
                            dd.newMessagesCount = 0;
                        }
                        Dialog2AllLocal2.push( dd ) //на каждой итерации добавляем элемент в новый массив копию
                    } )
                    console.log( "таймер закончился" )
                    getDialog2AllAC( Dialog2AllLocal2 )
                    //локально пометить сообщение как прочитаное. При следующем получении данных с сервера,
                    //все синхронизируется
                }, 1000 )
            }

            //запускаем setTimeOut допустим на пару секунд.
            // потом получаем еще раз диалоглис
        },
        [D2Item] )

    // getDialog2MessageIdViewedThCr("84ac68ee-73d0-43c4-82bb-0fd0273d4808") // проверить прочитано ли сообщение по его ID
    // postDialog2MessageIdToSpamThCr("cde7821a-6981-4f49-8b12-faf681cb1621") // пометить как спам сообщение по его ID
    // putDialog2MessageIdRestoreThCr("826de61e-76e6-4fe4-b9c9-5bee8fc16d12") // - восстановить сообщение из спама и удаленных
    // getDailog2UnreadMessagesThCr() // - вернуть количество непрочтенных сообщений
    useEffect( () => {
        if (userId !== 0 && !Markers.straightFirstUploaded) {
            console.log( "начать диалог по непустому userId " )
            putDialog2StartThCr( userId ) // начать диалог
            setMarkers( {
                ...Markers, straightFirstUploaded: true
            } )
        }
    }, [userId] )
    useEffect( () => {
        if (userId !== 0) {
            console.log( "получить сообщения при смене userId" )
            getDialog2MessagesNewerThenThCr( userId, "2022-04-30T19:10:31.843" )

            const D2ItemLocal: newMessagesItem = Dialog2All.filter( d2 => d2.id === userId )[0]
            setD2Item( D2ItemLocal )
        }
    }, [userId] )
    useEffect( () => {
        if (patch === "dialog2" && !Markers.Dialog2FirstUploaded) {
            console.log( "Единичное получение списка диалогов на странице dialog2" )
            getDialog2AllThCr( 25528, 1, 10 )
            setMarkers( {
                ...Markers, Dialog2FirstUploaded: true
            } )
        }
    }, [userId, patch] )


    const secondBlock = document.querySelector( '.second-block' ) // ссылка на прокрутку вниз

    const MSG2ScrollBottom = () => {
        secondBlock && secondBlock.scrollIntoView( true )
    }
    //Сама метка className="second-block" находится в дочерней Messages2Render

    return <div>
        <Dialog2Messages2COM
            patch={patch} PageWidth={PageWidth} MobileWidth={MobileWidth} Dialog2All={Dialog2All}
            MessagesNewerThen={MessagesNewerThen} Msg2DeleteMessage={Msg2DeleteMessage}
            Msg2SendMessage={Msg2SendMessage} userId={userId} D2Item={D2Item} MSG2ScrollBottom={MSG2ScrollBottom}
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
        D2Item: state.dialog2.D2Item,
        Markers: state.dialog2.Markers
    }
}
type mapStateToPropsType = {
    patch: string,
    PageWidth: number,
    MobileWidth: number,
    Dialog2All: getDialog2AllType,
    MessagesNewerThen: Array<sendMessageType>,
    d2UserId: number,
    D2Item: newMessagesItem,
    Markers: MarkersType

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
    setD2UserId: (userId: number) => void,
    setMarkers: (Markers: MarkersType) => void,
    setD2Item: (D2Item: newMessagesItem) => void,
    getDialog2AllAC: (Dialog2All: getDialog2AllType) => void,
}
const {setD2UserId, setMarkers, setD2Item, getDialog2AllAC} = Dialog2Actions // получить экшены

export default compose<any>(
    connect<mapStateToPropsType,
        mapDispatchToPropsType,
        unknown,
        GlobalStateType>( mapStateToProps,
        {
            putDialog2StartThCr, getDialog2AllThCr, postDialog2MessageThCr,
            getDialog2MessageIdViewedThCr, postDialog2MessageIdToSpamThCr, deleteDialog2MessageIdThCr,
            putDialog2MessageIdRestoreThCr, getDialog2MessagesNewerThenThCr, getDailog2UnreadMessagesThCr,
            setD2UserId, setMarkers, setD2Item, getDialog2AllAC
        }
    ),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2
)
( Dialog2Messages2Container );
