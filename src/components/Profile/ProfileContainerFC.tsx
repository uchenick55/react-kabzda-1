import {getProfileType} from "../api/apiTypes";
import {NulableType, ProfileType} from "../../types/commonTypes";
import {GlobalStateType} from "../../redux/store-redux";
import {compose} from "redux";
import {connect, useDispatch, useSelector} from "react-redux";
import {
    getProfileThunkCreator,
    ProfileActions, putMyProfileThunkCreator, putStatusThunkCreator, setprofilePhotoThunkCreator
} from "../../redux/profile-reducer";
import withRouter2 from "../hoc/withRouter2";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";
import React, {useCallback, useEffect, useMemo} from "react";
import Profile from "./Profile";
import Preloader from "../common/Preloader/Preloader";

const {setEditProfileStatus} = ProfileActions

type OwnPropsType = {
    userId: number // id пользователя
}

const ProfileContainerFC:React.FC<OwnPropsType> = ( {userId}) => {

    const profile: NulableType<getProfileType> = useSelector((state:GlobalStateType) =>state.profilePage.profile )
    const editProfileStatus: Array<string>  = useSelector((state:GlobalStateType) =>state.profilePage.editProfileStatus )
    const isFetching: boolean  = useSelector((state:GlobalStateType) =>state.app.isFetching )


    const myId: number  = useSelector((state:GlobalStateType) =>state.auth.myId )
    const status: string  = useSelector((state:GlobalStateType) =>state.profilePage.status )

    const dispatch = useDispatch()

    const uploadImage = (profilePhoto: File) => {
        dispatch( setprofilePhotoThunkCreator( profilePhoto, myId ))
    }

    const putStatusThunkCreatorLocal = (status:string) => {
        dispatch(putStatusThunkCreator(status))
    }

    const putProfile =(putProfile2: ProfileType) => { // обновить данные профиля просле правки
        // добавить в данные после изменения формы мой ID для чтения результата обновления с сервера
        const MyProfile = Object.assign( {}, {userId: myId}, putProfile2 );
        dispatch( putMyProfileThunkCreator( MyProfile, myId ))// обновить данные профиля просле правки
    }

    useEffect(()=>{
        dispatch(getProfileThunkCreator(userId)) ;// обновить профиль в зависомости от ID
    },[getProfileThunkCreator, userId])

    return <div>
        {isFetching && <Preloader/>}
        <Profile
            status={status} //статус
            myId={myId}// мой ID
            userId={userId}// id пользователя (может совпадать с myId если смотрим свой профиль)

            profile={useMemo(()=>profile,[profile]) } // профиль
            editProfileStatus={useMemo(()=>editProfileStatus,[editProfileStatus]) }// список ошибок правки формы профиля с сервера

            putProfile={useCallback(putProfile,[]) }// задание профиля на сервер после ввода данных
            uploadImage={useCallback(uploadImage,[]) }// загрузка картинки
            putStatusThunkCreator={useCallback(putStatusThunkCreatorLocal,[])}
            setEditProfileStatus={ useCallback(setEditProfileStatus,[]) }// экшн креатор задания ошибки с сервера в стейт после правки профиля
        />
    </div>
}

export default compose<React.ComponentType>(
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2// проверка, залогинен ли я
)( ProfileContainerFC )
