import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";


let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth, // текущий флаг авторизации
    }
}

let NavigateToLoginHoc = (Component) => {
    class NavigateToLoginHocWithAuth extends React.Component {
        componentDidUpdate(prevProps) {
            console.log('Текущие пропсы: ', this.props);
            console.log('Предыдущие пропсы: ', prevProps);
        }

        render() {
            if (!this.props.isAuth) {
                return <Navigate to='../login'/>;
            }
            return <Component {...this.props}/>;

        }
    }

    return connect(mapStateToProps, null)(NavigateToLoginHocWithAuth);
}

export default NavigateToLoginHoc
