import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunkCreator, putStatusThunkCreator, setprofilePhotoThunkCreator} from "../../redux/profile-reducer";
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
        this.putProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let userId = this.props.userId; // получить локальный userId из URL браузера
        if (userId === 0) {
            userId = this.props.myId
        }// если кликнули на мой профиль (без ID в URL браузера) то смотрим мой профиль
        if (userId !== this.props.profile.userId) { // если считаный из URL ID не равен записаному в стейт (смена пользователя)
            this.props.getProfileThunkCreator(userId); // обновить профиль в зависомости от ID
        }
    }

    uploadImage = (profilePhoto) => {
        console.log(profilePhoto)
        this.props.setprofilePhotoThunkCreator(profilePhoto, this.props.myId)
    }

    putProfile = () => {
        let MyProfile = {
            userId: this.props.myID, //userId: required(integer) мой ID
            LookingForAJob: false, //lookingForAJob: required(boolean)
            AboutMe: "Обо Мне AboutMe222нннннннннннннннннн",
            LookingForAJobDescription: "myLookingForAJobDescription", //  lookingForAJobDescription: required(string)
            FullName: "myFullName1",//required(string)
            contacts: {
                github: "https://github.com/uchenick55/react-kabzda-1", //  required(string)
                vk: "https://vk.com/vk", // required(string)
                facebook: "https://ru.wikipedia.org/wiki/Facebook", // required(string)
                instagram: "https://github.com/instagram", //required(string),
                twitter: "https://vk.com/twitter", //required(string),
                website: "https://ru.wikipedia.org", //required(string),
                youtube: "https://github.com/Alexrus-cyber", //required(string),
                mainLink: "https://github.com/Alexrus-cyber" //required(string)
            }
        }

        this.props.putMyProfileThunkCreator(MyProfile, this.props.myID)
    }

    render() {
        return <Profile {...this.props} uploadImage={this.uploadImage}/>
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

function withRouter(Children) {
    return (props) => {
        let match = {params: useParams()}
        let userId = Number(match.params["*"]); // получить локальный userId из URL браузера
        return <Children {...props} match={match} userId={userId}/>
    }
}

export default compose(
    connect(mapStateToProps, {
        getProfileThunkCreator,
        putStatusThunkCreator,
        setprofilePhotoThunkCreator,
        putMyProfileThunkCreator
    }),
    withRouter,
    NavigateToLoginHoc
)
(ProfileContainer)















