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

type OwnPropsType = {
    userId: number, // id пользователя из URL (withRouter2)
}

const Dialog2Messages2Container: React.FC<mapStateToPropsType & mapDispatchToPropsType & OwnPropsType> = (
    {
        putDialog2StartThCr, getDialog2AllThCr, postDialog2MessageThCr,
        getDialog2MessageIdViewedThCr, postDialog2MessageIdToSpamThCr, deleteDialog2MessageIdThCr,
        putDialog2MessageIdRestoreThCr, getDialog2MessagesNewerThenThCr, getDailog2UnreadMessagesThCr,
        patch, PageWidth, MobileWidth, Dialog2All, userId, MessagesNewerThen, D2Item,
        Markers, setMarkers, getDialog2AllAC, myId, setD2Item
    }
) => {
    //cde7821a-6981-4f49-8b12-faf681cb1621 от "555"
    // 84ac68ee-73d0-43c4-82bb-0fd0273d4808 (привет андрей)
    // 25528  | 27045 | 1079

    const Msg2DeleteMessage = useCallback( (message2Id: string) => {// - удалить сообщение (только у себя) по ID сообщения
        deleteDialog2MessageIdThCr( message2Id, userId, "2022-04-30T19:10:31.843", MessagesNewerThen )
    }, [userId, MessagesNewerThen, deleteDialog2MessageIdThCr] )

    const Msg2MarkAsSpam = (message2Id: string) => {// - пометить сообщение как спам по ID сообщения
        postDialog2MessageIdToSpamThCr( message2Id, MessagesNewerThen )
    }
    const Msg2Restore = (message2Id: string) => {// - пометить сообщение как спам по ID сообщения
        putDialog2MessageIdRestoreThCr( message2Id, MessagesNewerThen ) // - восстановить сообщение из спама и удаленных
    }

    const Msg2SendMessage = (messageBody: string) => {
        postDialog2MessageThCr( userId, messageBody, "2022-04-30T19:10:31.843", Markers )// отправить сообщение указав ID пользователя
        if (Markers.dialogId !== userId) { //Если мы еще не начали диалог с пользователем, и отправили сообщение
            putDialog2StartThCr( userId ) // инициировать диалог
            setMarkers( { // маркер пометить, что диалог начался
                ...Markers,
                dialogId: userId
            } )
        }
    }
    const secondBlock = document.querySelector( '.second-block' ) // ссылка на прокрутку вниз

    const MSG2ScrollBottom = useCallback( () => {
        secondBlock && secondBlock.scrollIntoView( true )
    }, [secondBlock] )
    //Сама метка className="second-block" находится в дочерней Messages2Render

    useEffect( () => {
            // через интервал времени при выборе диалога с новыми сообщениями локально пометить сообщение
            // как прочитаное. При следующем получении данных с сервера, все синхронизируется
            if (D2Item && D2Item.newMessagesCount > 0) {  //если маркер непрочтенных сообщений больше нуля
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
                }, 1000 )
            }
        },
        [D2Item, Dialog2All, getDialog2AllAC, userId] )

    // getDialog2MessageIdViewedThCr("84ac68ee-73d0-43c4-82bb-0fd0273d4808") // проверить прочитано ли сообщение по его ID
    // getDailog2UnreadMessagesThCr() // - вернуть количество непрочтенных сообщений
    useEffect( () => {
        if (userId !== 0 && !Markers.straightFirstUploaded) {
            console.log( "начать диалог по непустому userId " )
            putDialog2StartThCr( userId )
            setMarkers( {
                ...Markers, straightFirstUploaded: true // задать маркер прямой загрузки в true
            } )
        }
    }, [userId, Markers, putDialog2StartThCr, setMarkers] )

    useEffect( () => { // получаем новые сообщения если
        if (userId !== 0 && (MessagesNewerThen.length === 0 || // userId не равен нулю, и список сообщений пустой
            (MessagesNewerThen.length > 0 && // или список сообщений может быть не пустым
                (MessagesNewerThen[0].senderId !== userId && MessagesNewerThen[0].recipientId !== userId) // но эти сообщения мы еще не загружали
            )
        )) {

            console.log( "получить сообщения при смене userId", userId )
            getDialog2MessagesNewerThenThCr( userId, "2022-04-30T19:10:31.843" )

            const D2ItemLocal: newMessagesItem = Dialog2All.filter( d2 => d2.id === userId )[0]
            setD2Item( D2ItemLocal ) // отфильтрровать d2Item
        }
    }, [userId, Dialog2All, getDialog2MessagesNewerThenThCr, setD2Item] )

    useEffect( () => {
        if (patch === "dialog2" && !Markers.Dialog2FirstUploaded && myId) {
            console.log( "Единичное получение списка диалогов на странице dialog2" )
            getDialog2AllThCr( myId, 1, 10 )
            setMarkers( {
                ...Markers, Dialog2FirstUploaded: true
            } )
        }
    }, [userId, patch, Markers, getDialog2AllThCr, setMarkers, myId] )

    useEffect( () => {
        if (Markers.needToScrollBottom) {
            MSG2ScrollBottom() // прокручиваем список сообщений вниз
            setMarkers( {
                ...Markers, needToScrollBottom: false // ставим маркер - прокручивать вниз не нужно
            } )
        }
    }, [Markers, MSG2ScrollBottom, setMarkers] )

    return <div>
        <Dialog2Messages2COM
            patch={patch} PageWidth={PageWidth} MobileWidth={MobileWidth} Dialog2All={Dialog2All}
            MessagesNewerThen={MessagesNewerThen} Msg2DeleteMessage={Msg2DeleteMessage}
            Msg2SendMessage={Msg2SendMessage} userId={userId} D2Item={D2Item}
            myId={myId} Msg2MarkAsSpam={Msg2MarkAsSpam} Msg2Restore={Msg2Restore}
        />
    </div>
}
const mapStateToProps = (state: GlobalStateType) => {
    return {
        patch: state.app.patch as string,// имя страницы из URL
        PageWidth: state.app.PageWidth as number,// ширина страницы
        MobileWidth: state.app.MobileWidth as number,// ширина страницы, считающаяся мобильной версткой
        Dialog2All: state.dialog2.Dialog2All as getDialog2AllType,// список всех диалогов для левой колонки
        MessagesNewerThen: state.dialog2.MessagesNewerThen as Array<sendMessageType>,// сообщения выбранного диалога, новее заданной даты
        D2Item: state.dialog2.D2Item as newMessagesItem,// отфильтрованый  из Dialog2All выбранный пользователь по userId
        Markers: state.dialog2.Markers as MarkersType,//вспомогательные маркеры
        myId: state.auth.myId as number// номер моего id
    }
}

type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
    getDialog2AllThCr: (userId: number, page: number, count: number) => void,// получить список всех диалогов
    setMarkers: (Markers: MarkersType) => void // задать вспомогательные маркеры
    getDialog2AllAC: (Dialog2All: getDialog2AllType) => void, //- получить список диалогов по id пользователя
    putDialog2StartThCr: (currentDialogId: number) => void,// начало диалога с пользователем по его ID
    postDialog2MessageThCr: (userId: number, body: string, date: string, Markers: MarkersType) => void,// - отправить сообщение пользователю
    postDialog2MessageIdToSpamThCr: (messageId: string, MessagesNewerThen: Array<sendMessageType>) => void,// - пометить сообщение как спам
    deleteDialog2MessageIdThCr: (messageId: string, userId: number, date: string, MessagesNewerThen: Array<sendMessageType>) => void,//- удалить сообщение (только у себя) по ID сообщения
    putDialog2MessageIdRestoreThCr: (messageId: string, MessagesNewerThen: Array<sendMessageType>) => void,//  - восстановить сообщение из спама и удаленных
    getDialog2MessagesNewerThenThCr: (userId: number, date: string) => void,// получить все сообщения от указанного ID пользователя новее чем указанная дата
    setD2Item: (D2Item: newMessagesItem) => void // задать D2Item (шапку сообщений)
    getDialog2MessageIdViewedThCr: (messageId: string) => void,//- проверить, было ли прочитано сообщение по Id сообщения
    getDailog2UnreadMessagesThCr: () => void, // вернуть количество непрочтенных сообщений
}
const {setMarkers, setD2Item, getDialog2AllAC} = Dialog2Actions // получить экшены

export default compose<React.ComponentType>(
    connect<mapStateToPropsType,
        mapDispatchToPropsType,
        unknown,
        GlobalStateType>( mapStateToProps,
        {
            putDialog2StartThCr, getDialog2AllThCr, postDialog2MessageThCr,
            getDialog2MessageIdViewedThCr, postDialog2MessageIdToSpamThCr, deleteDialog2MessageIdThCr,
            putDialog2MessageIdRestoreThCr, getDialog2MessagesNewerThenThCr, getDailog2UnreadMessagesThCr,
            setMarkers, getDialog2AllAC, setD2Item
        }
    ),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2
)
( Dialog2Messages2Container );