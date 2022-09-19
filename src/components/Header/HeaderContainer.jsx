import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthMeThunkCreator} from "../../redux/auth-reducer";
import {getProfileThunkCreator, getStatusThunkCreator} from "../../redux/profile-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthMeThunkCreator() // санки, я авторизован?
    }
    render() {
        return <Header {...this.props}/>
    }
}
let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        myId: state.auth.userID,
        isAuth: state.auth.isAuth,
        profile: state.auth.profile
    }
}
export default connect(mapStateToProps, {getAuthMeThunkCreator, getProfileThunkCreator, getStatusThunkCreator})(HeaderContainer);









