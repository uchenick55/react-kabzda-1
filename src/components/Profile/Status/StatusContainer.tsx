import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";
import {putStatusThunkCreator} from "../../../redux/profile-reducer";
import ProfileStatusUseState from "./ProfileStatus/ProfileStatusUseState";

const StatusContainer:React.FC = () => {

    const dispatch = useDispatch()
    const myId: number = useSelector( (state: GlobalStateType) => state.auth.myId ) // мой id
    const userId: number | undefined = useSelector( (state: GlobalStateType) => state.profilePage.profile?.userId ) // id пользователя
    const status: string = useSelector( (state: GlobalStateType) => state.profilePage.status )//текущий статус
    const putStatusThunkCreatorLocal = (status: string) => {
        dispatch( putStatusThunkCreator( status ) ) // обновление статуса
    }

    return <div>
        <ProfileStatusUseState // можно еще использовать ProfileStatusUseState и ProfileStatusClass
            myId={myId} // мой id для модификации статуса
            userId={userId} // id отображаемого пользователя
            status={status} // статус из BLL
            putStatusThunkCreator={putStatusThunkCreatorLocal} // санкреатор для обновления сатуса
        />
    </div>
}
export default StatusContainer
