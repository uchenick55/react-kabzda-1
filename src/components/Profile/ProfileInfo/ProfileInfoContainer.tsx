import ProfileInfo from "./ProfileInfoBS";
import React from "react";
import {NotifyType, NulableType, ProfileType} from "../../common/types/commonTypes";
import {GetProfileType} from "../../api/apiTypes";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../../redux/store-redux";
import {profileActions, putMyProfileThunkCreator} from "../../../redux/profile-reducer";

const ProfileInfoContainer = () => {
    console.log( "ProfileInfoContainer" )

    const {setEditProfileStatus} = profileActions
    const dispatch = useDispatch()

    const profile: NulableType<GetProfileType> = useSelector( (state: GlobalStateType) => state.profilePage.profile )
    const myId: number = useSelector( (state: GlobalStateType) => state.auth.myId )
    const userId: number | undefined = useSelector( (state: GlobalStateType) => state.profilePage?.profile?.userId ) // id пользователя
    const editProfileStatus: Array<string> = useSelector( (state: GlobalStateType) => state.profilePage.editProfileStatus )
    const notify: Array<NotifyType> = useSelector( (state: GlobalStateType) => state.app.notify ) // массив уведомлений

    const putProfile = (putProfile2: ProfileType) => { // обновить данные профиля просле правки
        // добавить в данные после изменения формы мой ID для чтения результата обновления с сервера
        const MyProfile = Object.assign( {}, {userId: myId}, putProfile2 );
        dispatch( putMyProfileThunkCreator( MyProfile ) )// обновить данные профиля просле правки
    }

    const isMyProfile: boolean = userId === myId

    let isProfileEditedSuccesssfully: boolean = false
    notify.forEach( (item: NotifyType) => {
            if (item.message === "Edited successfully!") {
                isProfileEditedSuccesssfully = true
            }
        }
    )
    return <ProfileInfo // Отображение данных выбранного пользователя
        profile={profile} // профиль выбранного пользователя
        isMyProfile={isMyProfile} // id выбранного пользователя, берется из URL
        putProfile={putProfile}
        editProfileStatus={editProfileStatus} // список ошибок правки формы профиля с сервера
        setEditProfileStatus={setEditProfileStatus}
        isProfileEditedSuccesssfully={isProfileEditedSuccesssfully}
    />
}
export default ProfileInfoContainer
