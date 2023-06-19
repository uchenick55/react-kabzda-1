import {getProfileType} from "../api/apiTypes";
import {NulableType, ProfileType} from "../../types/commonTypes";
import {GlobalStateType} from "../../redux/store-redux";
import {compose} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {
    getProfileThunkCreator,
    profileActions, putMyProfileThunkCreator, putStatusThunkCreator, setprofilePhotoThunkCreator
} from "../../redux/profile-reducer";
import withRouter2 from "../hoc/withRouter2";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";
import React, {useEffect} from "react";
import Profile from "./Profile";
import Preloader from "../common/Preloader/Preloader";

type OwnPropsType = {
    userId: number // id пользователя
}

const ProfileContainerFC: React.FC<OwnPropsType> = ({userId}) => {

    const profile: NulableType<getProfileType> = useSelector( (state: GlobalStateType) => state.profilePage.profile )
    const editProfileStatus: Array<string> = useSelector( (state: GlobalStateType) => state.profilePage.editProfileStatus )
    const isFetching: boolean = useSelector( (state: GlobalStateType) => state.app.isFetching )

    const myId: number = useSelector( (state: GlobalStateType) => state.auth.myId )
    const status: string = useSelector( (state: GlobalStateType) => state.profilePage.status )

    const dispatch = useDispatch()

    const {setEditProfileStatus} = profileActions

    const setEditProfileStatusLocal = (editProfileStatus: Array<string>) => {
        dispatch( setEditProfileStatus(editProfileStatus) )
    }
    const uploadImage = (profilePhoto: File) => {
        dispatch( setprofilePhotoThunkCreator( profilePhoto ) )
    }

    const putStatusThunkCreatorLocal = (status: string) => {
        dispatch( putStatusThunkCreator( status ) )
    }

    const putProfile = (putProfile2: ProfileType) => { // обновить данные профиля просле правки
        // добавить в данные после изменения формы мой ID для чтения результата обновления с сервера
        const MyProfile = Object.assign( {}, {userId: myId}, putProfile2 );
        dispatch( putMyProfileThunkCreator( MyProfile ) )// обновить данные профиля просле правки
    }

    useEffect( () => {
        dispatch( getProfileThunkCreator( userId ) );// обновить профиль в зависомости от ID
    }, [userId, dispatch] )

    return <div>
        {isFetching && <Preloader/>}
        <Profile
            status={status} //статус
            myId={myId}// мой ID
            userId={userId}// id пользователя (может совпадать с myId если смотрим свой профиль)

            profile={profile} // профиль
            editProfileStatus={editProfileStatus}// список ошибок правки формы профиля с сервера

            putProfile={putProfile }// задание профиля на сервер после ввода данных
            uploadImage={uploadImage}// загрузка картинки
            putStatusThunkCreator={putStatusThunkCreatorLocal}
            setEditProfileStatus={ setEditProfileStatusLocal }// экшн креатор задания ошибки с сервера в стейт после правки профиля
        />
    </div>
}

export default compose<React.ComponentType>(
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2// проверка, залогинен ли я
)( ProfileContainerFC )
