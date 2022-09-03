import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthMeThunkCreator} from "../../redux/auth-reducer";

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
        isAuth: state.auth.isAuth,
        profile: state.auth.profile
    }
}
export default connect(mapStateToProps, {getAuthMeThunkCreator})(HeaderContainer);









