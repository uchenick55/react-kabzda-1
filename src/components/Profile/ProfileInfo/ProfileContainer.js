import React from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {getProfileThunkCreator, putStatusThunkCreator} from "../../../redux/profile-reducer";
import {useParams} from "react-router-dom"
import {NavigateToLoginHoc} from "../../hoc/NavigateToLoginHoc";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
      const {match, getProfileThunkCreator} = this.props;
        let userId = match.params["*"];
        getProfileThunkCreator(userId);
    }
    render () {
        return <>
            <Profile {...this.props}/>
        </>
}}
let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        myId: state.auth.myID,
        status: state.profilePage.status,
    }
}

function withRouter (Children) {
    return (props) => {
        let match = {params: useParams()}
        return <Children {...props} match = {match}/>
    }
}

export default compose(
    connect(mapStateToProps, {getProfileThunkCreator, putStatusThunkCreator}),
    withRouter,
    NavigateToLoginHoc
)
(ProfileContainer)















