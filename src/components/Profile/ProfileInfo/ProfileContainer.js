import React from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {getProfileThunkCreator} from "../../../redux/profile-reducer";
import {useParams} from "react-router-dom"

class ProfileContainer extends React.Component {
    componentDidMount() {
       let userId = this.props.match.params["*"];
       this.props.getProfileThunkCreator(userId)
    }
    render () {
        return <>
        <Profile {...this.props} profile = {this.props.profile}/>
        </>
}}
let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
}

function withRouter (Children) {
    return (props) => {
        let match = {params: useParams()}
        return <Children {...props} match = {match}/>
    }
}

export default connect(mapStateToProps, {getProfileThunkCreator})(withRouter(ProfileContainer))
















