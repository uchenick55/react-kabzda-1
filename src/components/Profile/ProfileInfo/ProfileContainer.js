import React from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {getProfileThunkCreator} from "../../../redux/profile-reducer";
import {useParams} from "react-router-dom"
import IsAuthCheckToLogin from "../../api/isAuthCheckToLogin";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params["*"];
        this.props.getProfileThunkCreator(userId)
    }
    render () {
        return <>
            <IsAuthCheckToLogin/>
            <Profile {...this.props} profile = {this.props.profile}/>
        </>
}}
let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}

function withRouter (Children) {
    return (props) => {
        let match = {params: useParams()}
        return <Children {...props} match = {match}/>
    }
}

export default connect(mapStateToProps, {getProfileThunkCreator})(withRouter(ProfileContainer))















