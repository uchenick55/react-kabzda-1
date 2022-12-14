import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunkCreator, putStatusThunkCreator, setprofilePhotoThunkCreator} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom"
import {NavigateToLoginHoc} from "../hoc/NavigateToLoginHoc";
import {compose} from "redux";
import {bedug_mode} from "../../redux/store-redux";

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
    connect(mapStateToProps, {getProfileThunkCreator, putStatusThunkCreator, setprofilePhotoThunkCreator}),
    withRouter,
    NavigateToLoginHoc
)
(ProfileContainer)















