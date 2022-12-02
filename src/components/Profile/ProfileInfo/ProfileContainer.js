import React from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {getProfileThunkCreator, putStatusThunkCreator} from "../../../redux/profile-reducer";
import {useParams} from "react-router-dom"
import {NavigateToLoginHoc} from "../../hoc/NavigateToLoginHoc";
import {compose} from "redux";
import {bedug_mode, debugItem} from "../../../redux/store-redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
      if (bedug_mode) {console.log("ProfileContainer.js componentDidMount()")} // дебаг

      const {match, getProfileThunkCreator} = this.props;
        let userId = match.params["*"];
        getProfileThunkCreator(userId);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
      const {match, getProfileThunkCreator} = this.props;
      let userId = Number(match.params["*"]);
      if (userId!==this.props.profile.userId) {
        console.log ("смена пользователя")
        getProfileThunkCreator(userId);
      }
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















