import React, {useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import {
    dialog2Actions, MarkersType,
    getDialog2AllThCr, getDialog2MessagesNewerThenThCr,
    postDialog2MessageThCr,
    putDialog2StartThCr
} from "../../redux/dialog2-reducer";
import Dialog2Messages2COM from "./Dialog2Messages2COM";
import {GetDialog2AllType, D2ItemType, SendMessageType} from "../api/apiTypes";
import {compose} from "redux";
import withRouter2 from "../hoc/withRouter2";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";

type OwnPropsType = {
    userId: number, // id пользователя из URL (withRouter2)
}

const Dialog2Messages2Container: React.FC<OwnPropsType> = ({userId}) => {

    const messagesNewerThen: Array<SendMessageType> = useSelector( (state: GlobalStateType) => state.dialog2.messagesNewerThen )// сообщения выбранного диалога, новее заданной даты
    const markers: MarkersType = useSelector( (state: GlobalStateType) => state.dialog2.markers )//вспомогательные маркеры
    const d2Item: D2ItemType = useSelector( (state: GlobalStateType) => state.dialog2.d2Item )// отфильтрованый  из dialog2All выбранный пользователь по userId
    const dialog2All: GetDialog2AllType = useSelector( (state: GlobalStateType) => state.dialog2.dialog2All )// список всех диалогов для левой колонки
    const myId: number = useSelector( (state: GlobalStateType) => state.auth.myId )// номер моего id
    const patch: string = useSelector( (state: GlobalStateType) => state.app.patch )// имя страницы из URL
    const pageWidth: number = useSelector( (state: GlobalStateType) => state.app.pageWidth )// ширина страницы
    const mobileWidth: number = useSelector( (state: GlobalStateType) => state.app.mobileWidth )// ширина страницы, считающаяся мобильной версткой

    const {setMarkers, setD2Item} = dialog2Actions // получить экшены

    const dispatch = useDispatch()
    //const wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

    type NewMessageType = {
        "userId": number,//27695
        "userName": string, //"catDonut"
        "message": string, //"hi"
        "photo": string //"https://social-network.samuraijs.com/activecontent/images/users/27695/user-small.jpg?v=1"

    }
/*    useEffect(()=>{
        wsChannel.addEventListener('message', (e:MessageEvent)=>{
            const newMessages: Array<NewMessageType> = JSON.parse(e.data)
            console.log(newMessages)
        })
    },[])*/


    const Msg2SendMessage = (messageBody: string) => {
        dispatch( postDialog2MessageThCr( messageBody, "2022-04-30T19:10:31.843") )// отправить сообщение указав ID пользователя
        if (d2Item.id !== userId) { //Если мы еще не начали диалог с пользователем, и отправили сообщение
            console.log("Если мы еще не начали диалог с пользователем, и отправили сообщение - начать диалог")
            dispatch( putDialog2StartThCr( userId ) )
        }
    }

    const secondBlock = document.querySelector( '.second-block' ) // ссылка на прокрутку вниз

    const MSG2ScrollBottom = useCallback (() => {
        secondBlock && secondBlock.scrollIntoView( true )
    },[secondBlock])//Сама метка className="second-block" находится в дочерней Messages2Render


    useEffect(()=>{ // работа с уже имеющимся диалоглистом слева
        console.log( "получить сообщения при смене userId", userId )
        dispatch( getDialog2MessagesNewerThenThCr( userId, "2019-04-30T19:10:31.843" ) )

        const d2ItemLocal: D2ItemType = dialog2All.filter( d2 => d2.id === userId )[0]
        if (d2ItemLocal) { //если userId уже присутствует в списке диалогов
            dispatch( setD2Item( d2ItemLocal ) ) // отфильтрровать и получить d2Item
        } else {
            console.log( "Получение списка диалогов при смене userId" )
            getDialog2AllThCr()
        }

    },[userId])

    useEffect( () => {
        if (patch === "dialog2" && !markers.dialog2FirstUploaded && myId) {
            console.log( "Единичное получение списка диалогов на странице dialog2" )
            dispatch( getDialog2AllThCr() )
            dispatch( setMarkers( {
                ...markers, dialog2FirstUploaded: true
            } ) )
        }
    }, [markers] )

    useEffect( () => {
        if (userId !== 0 && !markers.straightFirstUploaded) {
            console.log( "начать диалог по непустому userId " )
            dispatch( putDialog2StartThCr( userId ) )
            dispatch( setMarkers( {
                ...markers, straightFirstUploaded: true // задать маркер прямой загрузки в true
            } ) )
        }
    }, [userId, markers, setMarkers, dispatch] )


    useEffect( () => {
        if (markers.needToScrollBottom) {
            MSG2ScrollBottom() // прокручиваем список сообщений вниз
            dispatch( setMarkers( {
                ...markers, needToScrollBottom: false // ставим маркер - прокручивать вниз не нужно
            } ) )
        }
    }, [MSG2ScrollBottom, markers, setMarkers, dispatch] )

    return <div>
        <Dialog2Messages2COM
            dialog2All={useMemo(()=>dialog2All,[dialog2All]) }
            messagesNewerThen={useMemo(()=>messagesNewerThen,[messagesNewerThen])}
            d2Item={useMemo(()=>d2Item,[d2Item])}

            patch={patch} pageWidth={pageWidth} mobileWidth={mobileWidth}
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





// dispatch( setMarkers( { // маркер пометить, что диалог начался
//     ...markers,
//     dialogId: userId
// } ) )
