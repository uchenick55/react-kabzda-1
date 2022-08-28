import React from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {setUserProfile} from "../../../redux/profile-reducer";
import {useParams} from "react-router-dom"
import {getAuthMe, getProfile} from "../../api/api";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params["*"];
        if (!userId) {
            getAuthMe()
                .then((response)=>{
                    userId = response.data.id;
                })
        }

        getProfile(userId)
            .then((response) => {
                this.props.setUserProfile(response)
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
















