import ProfileInfo from "./ProfileInfoBS";
import React from "react";
import {NulableType, ProfileType} from "../../common/types/commonTypes";
import {GetProfileType} from "../../api/apiTypes";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";
import {profileActions, putMyProfileThunkCreator} from "../../../redux/profile-reducer";

const ProfileInfoContainer = () => {
    const {setEditProfileStatus} = profileActions
    const dispatch = useDispatch()

    const profile: NulableType<GetProfileType> = useSelector( (state: GlobalStateType) => state.profilePage.profile )
    const myId: number = useSelector( (state: GlobalStateType) => state.auth.myId )
    const userId: number | undefined = useSelector( (state: GlobalStateType) => state.profilePage?.profile?.userId ) // id пользователя
    const editProfileStatus: Array<string> = useSelector( (state: GlobalStateType) => state.profilePage.editProfileStatus )

    const putProfile = (putProfile2: ProfileType) => { // обновить данные профиля просле правки
        // добавить в данные после изменения формы мой ID для чтения результата обновления с сервера
        const MyProfile = Object.assign( {}, {userId: myId}, putProfile2 );
        dispatch( putMyProfileThunkCreator( MyProfile ) )// обновить данные профиля просле правки
    }

    return  <ProfileInfo // Отображение данных выбранного пользователя
        profile={profile} // профиль выбранного пользователя
        myId={myId} // мой id для модификации статуса
        userId={userId} // id выбранного пользователя, берется из URL
        putProfile={putProfile}
        editProfileStatus={editProfileStatus} // список ошибок правки формы профиля с сервера
        setEditProfileStatus={setEditProfileStatus}
    />
}
export default ProfileInfoContainer
