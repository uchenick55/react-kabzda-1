import React from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {getProfileThunkCreator} from "../../../redux/profile-reducer";
import {useParams, Navigate} from "react-router-dom"

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params["*"];
        this.props.getProfileThunkCreator(userId)
    }
    render () {
        if (!this.props.isAuth) {
            return <Navigate to="/login" />
        }
        return <>
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


//+++













