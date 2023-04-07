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

class ProfileContainer extends React.Component {
    componentDidMount() {

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
            editProfileStatus = {this.props.editProfileStatus} // список ошибок правки формы профиля с сервера
            setEditProfileStatus={this.props.setEditProfileStatus}// экшн креатор задания ошибки с сервера в стейт после правки профиля
        />
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        myId: state.auth.myId, // мой
        status: state.profilePage.status, // статус
        editProfileStatus: state.profilePage.editProfileStatus  // список ошибок правки формы профиля с сервера
    }
}


export default compose(
    connect(mapStateToProps, {
        setEditProfileStatus,// экшн креатор задания ошибки с сервера в стейт после правки профиля
        getProfileThunkCreator,// санкреатор на получение профиля выбранного пользователя
        putStatusThunkCreator,// санкреатор обновления моего статуса
        setprofilePhotoThunkCreator,// санкреатор установки фотографии моего профиля
        putMyProfileThunkCreator, // санкреатор установки моего профиля myProfile

    }),
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2// проверка, залогинен ли я
)
(ProfileContainer)















