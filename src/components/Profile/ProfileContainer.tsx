import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunkCreator,
    putMyProfileThunkCreator,
    putStatusThunkCreator, setEditProfileStatus,
    setprofilePhotoThunkCreator
} from "../../redux/profile-reducer";
import {Navigate} from "react-router-dom"
import {compose} from "redux";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";
import withRouter2 from "../hoc/withRouter2";
import {GlobalStateType} from "../../redux/store-redux";
import {ProfileType} from "../../types/commonTypes";
import {getProfileType} from "../api/apiTypes";

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
    setprofilePhotoThunkCreator: (profilePhoto: any, myId: number) => void,// санкреатор установки фотографии моего профиля
    putMyProfileThunkCreator: (MyProfile: ProfileType, myId: number) => void,

}

class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {

        this.props.getProfileThunkCreator( this.props.userId, false, 0 );// обновить профиль в зависомости от ID
    }

    componentDidUpdate() {
        let userId = this.props.userId; // получить локальный userId из URL браузера

        if (userId === 0) {
            userId = this.props.myId // подставить мой ID если URL профиля пустой
        }// если кликнули на мой профиль (без ID в URL браузера) то смотрим мой профиль
        if (userId !== this.props.profile.userId) { // если считаный из URL ID не равен записаному в стейт (смена пользователя)
            this.props.getProfileThunkCreator( userId, false, 0 ); // обновить профиль в зависомости от ID
            // здесь сменить setEditMode на false
        }
    }

    uploadImage = (profilePhoto: any) => {
        console.log( profilePhoto )
        this.props.setprofilePhotoThunkCreator( profilePhoto, this.props.myId )
    }

    putProfile = (putProfile: ProfileType) => { // обновить данные профиля просле правки
        // добавить в данные после изменения формы мой ID для чтения результата обновления с сервера
        let MyProfile = Object.assign( {}, {userId: this.props.myId}, putProfile );
        this.props.putMyProfileThunkCreator( MyProfile, this.props.myId )// обновить данные профиля просле правки
    }

    render() {
        if (this.props.userId === this.props.myId) { /*при выборе своего профиля в списке пользователей*/
            return <Navigate to='../profile'/> /*редирект на страницу без ID в URL*/
        }

        return <Profile
            profile={this.props.profile} // профиль
            status={this.props.status} //статус
            myId={this.props.myId}// мой ID
            putStatusThunkCreator={this.props.putStatusThunkCreator}
            uploadImage={this.uploadImage}// загрузка картинки
            userId={this.props.userId}// id пользователя (может совпадать с myId если смотрим свой профиль)
            // @ts-ignore
            putProfile={this.putProfile}// задание профиля на сервер после ввода данных
            editProfileStatus={this.props.editProfileStatus}// список ошибок правки формы профиля с сервера
            setEditProfileStatus={this.props.setEditProfileStatus}// экшн креатор задания ошибки с сервера в стейт после правки профиля
        />
    }
}

type mapStateToPropsType = {
    profile: getProfileType,
    isAuth: boolean,
    myId: number, // мой
    status: string, // статус
    editProfileStatus: Array<string>  // список ошибок правки формы профиля с сервера
}

let mapStateToProps = (state: GlobalStateType) => {
    return {
        profile: state.profilePage.profile as getProfileType,
        isAuth: state.auth.isAuth as boolean,
        myId: state.auth.myId as number, // мой
        status: state.profilePage.status as string, // статус
        editProfileStatus: state.profilePage.editProfileStatus as Array<string>  // список ошибок правки формы профиля с сервера
    }
}

type mapDispatchToPropsType = {
    setEditProfileStatus: (editProfileStatus: Array<string>) => void,// экшн креатор задания ошибки с сервера в стейт после правки профиля
    getProfileThunkCreator: (userId: number, shouldUpdateDialogList: boolean, myId: number) => void,// санкреатор на получение профиля выбранного пользователя
    putStatusThunkCreator: (statusTmpInput: string, myId: number) => void,// санкреатор обновления моего статуса
    setprofilePhotoThunkCreator: (profilePhoto: any, myId: number) => void,// санкреатор установки фотографии моего профиля
    putMyProfileThunkCreator: (MyProfile: ProfileType, myId: number) => void,
}

export default compose<any>(
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
)( ProfileContainer )















