import React, {useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import {
    Dialog2Actions, MarkersType,
    getDialog2AllThCr, getDialog2MessagesNewerThenThCr,
    postDialog2MessageThCr,
    putDialog2StartThCr
} from "../../redux/dialog2-reducer";
import Dialog2Messages2COM from "./Dialog2Messages2COM";
import {getDialog2AllType, newMessagesItem, sendMessageType} from "../api/apiTypes";
import {compose} from "redux";
import withRouter2 from "../hoc/withRouter2";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";

type OwnPropsType = {
    userId: number, // id пользователя из URL (withRouter2)
}

const Dialog2Messages2Container: React.FC<OwnPropsType> = ({userId}) => {

    const MessagesNewerThen: Array<sendMessageType> = useSelector( (state: GlobalStateType) => state.dialog2.MessagesNewerThen )// сообщения выбранного диалога, новее заданной даты
    const Markers: MarkersType = useSelector( (state: GlobalStateType) => state.dialog2.Markers )//вспомогательные маркеры
    const D2Item: newMessagesItem = useSelector( (state: GlobalStateType) => state.dialog2.D2Item )// отфильтрованый  из Dialog2All выбранный пользователь по userId
    const Dialog2All: getDialog2AllType = useSelector( (state: GlobalStateType) => state.dialog2.Dialog2All )// список всех диалогов для левой колонки
    const patch: string = useSelector( (state: GlobalStateType) => state.app.patch )// имя страницы из URL
    const myId: number = useSelector( (state: GlobalStateType) => state.auth.myId )// номер моего id
    const PageWidth: number = useSelector( (state: GlobalStateType) => state.app.PageWidth )// ширина страницы
    const MobileWidth: number = useSelector( (state: GlobalStateType) => state.app.MobileWidth )// ширина страницы, считающаяся мобильной версткой

    const {setMarkers, setD2Item, getDialog2AllAC, setd2Userid} = Dialog2Actions // получить экшены

    const dispatch = useDispatch()

    const Msg2SendMessage = useCallback((messageBody: string) => {
        dispatch( postDialog2MessageThCr( userId, messageBody, "2022-04-30T19:10:31.843", Markers ) )// отправить сообщение указав ID пользователя
        if (Markers.dialogId !== userId) { //Если мы еще не начали диалог с пользователем, и отправили сообщение
            dispatch( putDialog2StartThCr( userId ) ) // инициировать диалог
            dispatch( setMarkers( { // маркер пометить, что диалог начался
                ...Markers,
                dialogId: userId
            } ) )
        }
    },[])

    const secondBlock = document.querySelector( '.second-block' ) // ссылка на прокрутку вниз

    const MSG2ScrollBottom = useCallback( () => {
        secondBlock && secondBlock.scrollIntoView( true )
    }, [secondBlock] )
    //Сама метка className="second-block" находится в дочерней Messages2Render

    useEffect(()=>{
       dispatch(setd2Userid(userId)) // задание userId из URL в стейт
        console.log("setd2Userid(userId)")
    },[userId])

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
                    dispatch( getDialog2AllAC( Dialog2AllLocal2 ) )
                }, 1000 )
            }
        },
        [D2Item, Dialog2All, getDialog2AllAC, userId] )

    // getDialog2MessageIdViewedThCr("84ac68ee-73d0-43c4-82bb-0fd0273d4808") // проверить прочитано ли сообщение по его ID
    // getDailog2UnreadMessagesThCr() // - вернуть количество непрочтенных сообщений
    useEffect( () => {
        if (userId !== 0 && !Markers.straightFirstUploaded) {
            console.log( "начать диалог по непустому userId " )
            dispatch( putDialog2StartThCr( userId ) )
            dispatch( setMarkers( {
                ...Markers, straightFirstUploaded: true // задать маркер прямой загрузки в true
            } ) )
        }
    }, [userId, Markers, putDialog2StartThCr, setMarkers] )

    useEffect( () => { // получаем новые сообщения
        if (userId !== 0 && (MessagesNewerThen.length === 0 || //если userId не равен нулю, и список сообщений пустой или
            (MessagesNewerThen.length > 0 && //  список сообщений может быть не пустым
                (MessagesNewerThen[0].senderId !== userId && MessagesNewerThen[0].recipientId !== userId) // и эти сообщения мы еще не загружали
            )
        )) {

            console.log( "получить сообщения при смене userId", userId )
            dispatch( getDialog2MessagesNewerThenThCr( userId, "2022-04-30T19:10:31.843" ) )

            const D2ItemLocal: newMessagesItem = Dialog2All.filter( d2 => d2.id === userId )[0]
            dispatch( setD2Item( D2ItemLocal ) ) // отфильтрровать d2Item
        }
    }, [userId, Dialog2All, getDialog2MessagesNewerThenThCr, setD2Item] )

    useEffect( () => {
        if (patch === "dialog2" && !Markers.Dialog2FirstUploaded && myId) {
            console.log( "Единичное получение списка диалогов на странице dialog2" )
            dispatch( getDialog2AllThCr( myId, 1, 10 ) )
            dispatch( setMarkers( {
                ...Markers, Dialog2FirstUploaded: true
            } ) )
        }
    }, [userId, patch, Markers, getDialog2AllThCr, setMarkers, myId] )

    useEffect( () => {
        if (Markers.needToScrollBottom) {
            MSG2ScrollBottom() // прокручиваем список сообщений вниз
            dispatch( setMarkers( {
                ...Markers, needToScrollBottom: false // ставим маркер - прокручивать вниз не нужно
            } ) )
        }
    }, [Markers, MSG2ScrollBottom, setMarkers] )

    return <div>
        <Dialog2Messages2COM
            Dialog2All={useMemo(()=>Dialog2All,[Dialog2All]) }
            MessagesNewerThen={useMemo(()=>MessagesNewerThen,[MessagesNewerThen])}
            D2Item={useMemo(()=>D2Item,[D2Item])}

            patch={patch} PageWidth={PageWidth} MobileWidth={MobileWidth}
            Msg2SendMessage={Msg2SendMessage} userId={userId}
            myId={myId}
        />
    </div>
}
export default compose<React.ComponentType>(
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2
)
( Dialog2Messages2Container );
