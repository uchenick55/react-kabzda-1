import {getProfileType} from "../api/apiTypes";
import {ProfileType} from "../../types/commonTypes";
import {GlobalStateType} from "../../redux/store-redux";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    getProfileThunkCreator, putMyProfileThunkCreator,
    putStatusThunkCreator,
    ProfileActions,
    setprofilePhotoThunkCreator
} from "../../redux/profile-reducer";
import withRouter2 from "../hoc/withRouter2";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";
import React, {useEffect} from "react";
import Profile from "./Profile";

const {setEditProfileStatus} = ProfileActions

type ProfileContainerType = {
    profile: getProfileType, // весь профиль пользователя
    isAuth: boolean, // авторизация прошла?
    myId: number, // мой ID
    status: string, // статус
    editProfileStatus: Array<string>  // список ошибок правки формы профиля с сервера
    userId: number // id пользователя
    setEditProfileStatus: (editProfileStatus: Array<string>) => void,// экшн креатор задания ошибки с сервера в стейт после правки профиля
    getProfileThunkCreator: (userId: number, shouldUpdateDialogList: boolean, myId: number) => void,// санкреатор на получение профиля выбранного пользователя
    putStatusThunkCreator: (statusTmpInput: string, myId: number) => void,// санкреатор обновления моего статуса
    setprofilePhotoThunkCreator: (profilePhoto: File, myId: number) => void,// санкреатор установки фотографии моего профиля
    putMyProfileThunkCreator: (MyProfile: ProfileType, myId: number) => void,
}

const ProfileContainerFC:React.FC<ProfileContainerType> = (
    {profile, myId, status, editProfileStatus, userId, setEditProfileStatus,
    getProfileThunkCreator,   putStatusThunkCreator, setprofilePhotoThunkCreator,
    putMyProfileThunkCreator}) => {

    const uploadImage = (profilePhoto: File) => {
        setprofilePhotoThunkCreator( profilePhoto, myId )
    }
    const putProfile = (putProfile2: ProfileType) => { // обновить данные профиля просле правки
        // добавить в данные после изменения формы мой ID для чтения результата обновления с сервера
        const MyProfile = Object.assign( {}, {userId: myId}, putProfile2 );
        putMyProfileThunkCreator( MyProfile, myId )// обновить данные профиля просле правки
    }

    useEffect(()=>{
        getProfileThunkCreator(userId, false, 0 );// обновить профиль в зависомости от ID
    },[getProfileThunkCreator, userId])

    return <Profile
        profile={profile} // профиль
        status={status} //статус
        myId={myId}// мой ID
        putStatusThunkCreator={putStatusThunkCreator}
        uploadImage={uploadImage}// загрузка картинки
        userId={userId}// id пользователя (может совпадать с myId если смотрим свой профиль)
        putProfile={putProfile}// задание профиля на сервер после ввода данных
        editProfileStatus={editProfileStatus}// список ошибок правки формы профиля с сервера
        setEditProfileStatus={setEditProfileStatus}// экшн креатор задания ошибки с сервера в стейт после правки профиля
    />
}
type mapStateToPropsType = {
    profile: getProfileType,
    myId: number, // мой
    status: string, // статус
    editProfileStatus: Array<string>  // список ошибок правки формы профиля с сервера
}

let mapStateToProps = (state: GlobalStateType) => {
    return {
        profile: state.profilePage.profile as getProfileType,
        myId: state.auth.myId as number, // мой
        status: state.profilePage.status as string, // статус
        editProfileStatus: state.profilePage.editProfileStatus as Array<string>  // список ошибок правки формы профиля с сервера
    }
}

type mapDispatchToPropsType = {
    setEditProfileStatus: (editProfileStatus: Array<string>) => void,// экшн креатор задания ошибки с сервера в стейт после правки профиля
    getProfileThunkCreator: (userId: number, shouldUpdateDialogList: boolean, myId: number) => void,// санкреатор на получение профиля выбранного пользователя
    putStatusThunkCreator: (statusTmpInput: string, myId: number) => void,// санкреатор обновления моего статуса
    setprofilePhotoThunkCreator: (profilePhoto: File, myId: number) => void,// санкреатор установки фотографии моего профиля
    putMyProfileThunkCreator: (MyProfile: ProfileType, myId: number) => void,
}

export default compose<React.ComponentType>(
    connect<mapStateToPropsType, // тип mapStateToProps
        mapDispatchToPropsType, // тип mapDispatchToProps
        unknown, // тип входящих пропсов от родителя
        GlobalStateType // глобальный стейт из стора
        >( mapStateToProps, {
        setEditProfileStatus,// экшн креатор задания ошибки с сервера в стейт после правки профиля
        getProfileThunkCreator,// санкреатор на получение профиля выбранного пользователя
        putStatusThunkCreator,// санкреатор обновления моего статуса
        setprofilePhotoThunkCreator,// санкреатор установки фотографии моего профиля
        putMyProfileThunkCreator, // санкреатор установки моего профиля myProfile
    } ),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2// проверка, залогинен ли я
)( ProfileContainerFC )
