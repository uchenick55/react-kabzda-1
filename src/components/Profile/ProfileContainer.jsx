import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunkCreator,
    putMyProfileThunkCreator,
    putStatusThunkCreator,
    setprofilePhotoThunkCreator
} from "../../redux/profile-reducer";
import {Navigate} from "react-router-dom"
import {compose} from "redux";
import {bedug_mode} from "../../redux/store-redux";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";
import withRouter2 from "../hoc/withRouter2";

class ProfileContainer extends React.Component {
    componentDidMount() {
        if (bedug_mode) {
            console.log("ProfileContainer.js componentDidMount()")
        } // дебаг
        this.props.getProfileThunkCreator(this.props.userId);// обновить профиль в зависомости от ID
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let userId = this.props.userId; // получить локальный userId из URL браузера

        if (userId === 0) {
            userId = this.props.myId // подставить мой ID если URL профиля пустой
        }// если кликнули на мой профиль (без ID в URL браузера) то смотрим мой профиль
        if (userId !== this.props.profile.userId) { // если считаный из URL ID не равен записаному в стейт (смена пользователя)
            this.props.getProfileThunkCreator(userId); // обновить профиль в зависомости от ID
            // здесь сменить setEditMode на false
        }
    }

    uploadImage = (profilePhoto) => {
        console.log(profilePhoto)
        this.props.setprofilePhotoThunkCreator(profilePhoto, this.props.myId)
    }

    putProfile = ( putProfile ) => { // обновить данные профиля просле правки
        // добавить в данные после изменения формы мой ID для чтения результата обновления с сервера
        let MyProfile = Object.assign({}, {userId: this.props.myId}, putProfile);
        this.props.putMyProfileThunkCreator(MyProfile, this.props.myId)// обновить данные профиля просле правки
    }

    render() {
        if (this.props.userId === this.props.myId) { /*при выборе своего профиля в списке пользователей*/
            return <Navigate to='../profile'/> /*редирект на страницу без ID в URL*/
        }

        return <Profile
            {...this.props}
            uploadImage={this.uploadImage} // загрузка
            putProfile={this.putProfile} // задание профиля на сервер после ввода данных
            dispatch={this.props.dispatch} // для резета формы профиля
            editProfileError = {this.props.editProfileError} // список ошибок правки формы профиля с сервера

        />
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        myId: state.auth.myId, // мой
        status: state.profilePage.status, // статус
        editProfileError: state.profilePage.editProfileError  // список ошибок правки формы профиля с сервера

    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getProfileThunkCreator: (userId) => {
            dispatch(getProfileThunkCreator(userId))
        },
        putStatusThunkCreator: (statusTmpInput, myId) => {
            dispatch(putStatusThunkCreator(statusTmpInput, myId))
        },
        setprofilePhotoThunkCreator: (profilePhoto, myId) => {
            dispatch(setprofilePhotoThunkCreator(profilePhoto, myId))
        },
        putMyProfileThunkCreator: (MyProfile, myId) => {
            dispatch(putMyProfileThunkCreator(MyProfile, myId))
        },
        dispatch: dispatch
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2// проверка, залогинен ли я
)
(ProfileContainer)















