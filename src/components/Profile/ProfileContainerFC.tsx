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

type OwnPropsType = {
    userId: number // id пользователя
}

const ProfileContainerFC:React.FC<mapStateToPropsType & mapDispatchToPropsType & OwnPropsType> = (
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
type mapStateToPropsType = ReturnType<typeof mapStateToProps>

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
    putMyProfileThunkCreator: (MyProfile: ProfileType, myId: number) => void,// санкреатор установки моего профиля myProfile
}

export default compose<React.ComponentType>(
    connect<mapStateToPropsType, // тип mapStateToProps
        mapDispatchToPropsType, // тип mapDispatchToProps
        OwnPropsType, // тип входящих пропсов от родителя
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
