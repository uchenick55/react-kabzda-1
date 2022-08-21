import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserData, setUserProfile} from "../../redux/auth-reducer";
import * as axios from "axios";

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then((response) => {
                let id = response.data.data.id;
                let email = response.data.data.email;
                let login = response.data.data.login;
                if (response.data.resultCode === 0) {
                    this.props.setAuthUserData(id, email, login)
                    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + id)
                        .then((response) => {
                            this.props.setUserProfile(response.data)
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









