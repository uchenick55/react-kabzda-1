import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunkCreator,
    putStatusThunkCreator,
    setprofilePhotoThunkCreator
} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom"
import {NavigateToLoginHoc} from "../hoc/NavigateToLoginHoc";
import {compose} from "redux";
import {bedug_mode} from "../../redux/store-redux";
import {putMyProfileThunkCreator} from "../../redux/auth-reducer";

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

    putProfile = ( FullName, AboutMe, LookingForAJob, LookingForAJobDescription,
        github, vk, facebook, instagram, twitter, website, youtube, mainLink ) => {
        let MyProfile = {
            userId: this.props.myId, //userId: required(integer) мой ID
            LookingForAJob: LookingForAJob, //lookingForAJob: required(boolean)
            AboutMe: AboutMe,
            LookingForAJobDescription: LookingForAJobDescription, //  lookingForAJobDescription: required(string)
            FullName: FullName,//required(string)
            contacts: {
                github: github, //  required(string)
                vk: vk, // required(string)
                facebook: facebook, // required(string)
                instagram: instagram, //required(string),
                twitter: twitter, //required(string),
                website: website, //required(string),
                youtube: youtube, //required(string),
                mainLink: mainLink //required(string)
            }
        }
        this.props.putMyProfileThunkCreator(MyProfile, this.props.myId)
    }

    render() {
        return <Profile
            {...this.props}
            uploadImage={this.uploadImage} // загрузка
            putProfile={this.putProfile} // задание профиля на сервер после ввода данных
            dispatch={this.props.dispatch} // для резета формы профиля
        />
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        myId: state.auth.myID,
        status: state.profilePage.status,
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


function withRouter(Children) {
    return (props) => {
        let match = {params: useParams()}
        let userId = Number(match.params["*"]); // получить локальный userId из URL браузера
        return <Children {...props} match={match} userId={userId}/>
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    NavigateToLoginHoc
)
(ProfileContainer)















