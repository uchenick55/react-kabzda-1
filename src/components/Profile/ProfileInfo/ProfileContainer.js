import React from "react";
import Profile from "../Profile";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../../redux/profile-reducer";
import {useParams} from "react-router-dom"

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params["*"];
        if (!userId) {
            userId=2;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+ userId)
            .then((response) => {
                this.props.setUserProfile(response.data)
            })
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

export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer))
















