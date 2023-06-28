import React, {useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/store-redux";
import {
    dialog2Actions, MarkersType,
    getDialog2AllThCr, getDialog2MessagesNewerThenThCr,
    putDialog2StartThCr
} from "../../redux/dialog2-reducer";
import Dialog2Messages2COM from "./Dialog2Messages2COM";
import {GetDialog2AllType, D2ItemType} from "../api/apiTypes";
import {compose} from "redux";
import withRouter2 from "../hoc/withRouter2";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";

type OwnPropsType = {
    userId: number, // id пользователя из URL (withRouter2)
}

const Dialog2Messages2Container: React.FC<OwnPropsType> = ({userId}) => {

    const markers: MarkersType = useSelector( (state: GlobalStateType) => state.dialog2.markers )//вспомогательные маркеры
    const d2Item: D2ItemType = useSelector( (state: GlobalStateType) => state.dialog2.d2Item )// отфильтрованый  из dialog2All выбранный пользователь по userId
    const dialog2All: GetDialog2AllType = useSelector( (state: GlobalStateType) => state.dialog2.dialog2All )// список всех диалогов для левой колонки
    const patch: string = useSelector( (state: GlobalStateType) => state.app.patch )// имя страницы из URL
    const pageWidth: number = useSelector( (state: GlobalStateType) => state.app.pageWidth )// ширина страницы
    const mobileWidth: number = useSelector( (state: GlobalStateType) => state.app.mobileWidth )// ширина страницы, считающаяся мобильной версткой
    const listUniqueDialog2Id: Array<number> = useSelector((state:GlobalStateType) => state.dialog2.listUniqueDialog2Id)  // список уникальных id пользователей, с которыми начат диалог

    const {setMarkers} = dialog2Actions // получить экшены

    const dispatch = useDispatch()
    /*    const wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

        type NewMessageType = {
            "userId": number,//27695
            "userName": string, //"catDonut"
            "message": string, //"hi"
            "photo": string //"https://social-network.samuraijs.com/activecontent/images/users/27695/user-small.jpg?v=1"


        useEffect(()=>{
            wsChannel.addEventListener('message', (e:MessageEvent)=>{
                const newMessages: Array<NewMessageType> = JSON.parse(e.data)
                console.log(newMessages)
            })
        },[])}*/

    const secondBlock = document.querySelector( '.second-block' ) // ссылка на прокрутку вниз

    const MSG2ScrollBottom = useCallback (() => {
        secondBlock && secondBlock.scrollIntoView( true )
    },[secondBlock])//Сама метка className="second-block" находится в дочерней Messages2Render

    useEffect(()=>{
        patch==="dialog2" && dispatch( getDialog2AllThCr() ) // при начальной загрузке страницы диалогов получили список диалогов
    },[patch, dispatch])

    useEffect(()=>{
        if (userId!==0) { // при ненулевом userId
            if (!listUniqueDialog2Id.includes(userId)) { // если userId нет в списке диалогов (прямой переход по url, например из users)
                 console.log( "начать диалог по непустому userId " )
                 dispatch( putDialog2StartThCr( userId ) )
            } else { // если с таким userId ранее уже был начат диалог (клик по списку диалогов)
                dispatch( dialog2Actions.setD2Item(/*отфильтровать d2Item */
                    dialog2All.filter((dialogItem:D2ItemType)=>dialogItem.id === userId)[0] ) )
            }
        }
    }, [userId]) // убрал зависимости dispatch, dialog2All, listUniqueDialog2Id, так как лишние вхождения

    useEffect(()=>{
        if (d2Item?.id === userId) {
            console.log("при смене d2Item загружаем список сообщений (пока все, после - загрузка порциями)")
            dispatch( getDialog2MessagesNewerThenThCr( userId, "2019-04-30T19:10:31.843" ) )
        }
    }, [d2Item, userId, dispatch])

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
            patch={patch}
            pageWidth={pageWidth}
            mobileWidth={mobileWidth}
            dialog2All={useMemo(()=>dialog2All,[dialog2All]) }
        />
    </div>
}
export default compose<React.ComponentType>(
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2
)
( Dialog2Messages2Container );
