import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserData, setUserProfile} from "../../redux/auth-reducer";
import * as axios from "axios";
import {getAuthMe, getProfile} from "../api/api";

class HeaderContainer extends React.Component {
    componentDidMount() {
        getAuthMe()
            .then((response) => {
                if (response.resultCode === 0) {
                    let id = response.data.id;
                    let email = response.data.email;
                    let login = response.data.login;
                    this.props.setAuthUserData(id, email, login)
                    getProfile(id)
                        .then((response) => {
                            this.props.setUserProfile(response)
                        })

                }
            })
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

export default connect(mapStateToProps, {setAuthUserData, setUserProfile})(HeaderContainer);









