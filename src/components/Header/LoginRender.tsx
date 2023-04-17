import {NavLink} from "react-router-dom";
import logoutImg from "../../assets/images/swg/logout2.svg";
import loginImg from "../../assets/images/swg/login.svg";
import React from "react";
import classes from "./Header.module.css"

type LoginRenderType = {
    isAuth: boolean, // Флаг авторизации
    goToMyPage:() =>void
    deleteLogin:() =>void
}
const LoginRender:React.FC<LoginRenderType> = ({isAuth, goToMyPage, deleteLogin}) => {

    type LoginLogoutImgType = {
        text: "login" | "logout",
        src: typeof logoutImg | typeof loginImg,
    }
    const LoginLogoutImg:React.FC<LoginLogoutImgType> = ({text, src}) => {
        return <NavLink to='/login'>
            <img src={src} alt={text} className={classes.myHeaderWH1}
                 title={text}
            />
        </NavLink>
    }

    return <span> {/*блок отрисовки login/logout*/}
        {
            isAuth
                ? <span onClick={goToMyPage}>
                    {/*отрисовка login/logout*/}
                    <span onClick={deleteLogin}>
                              <LoginLogoutImg text={"logout"} src={logoutImg}/>
                          </span> {
                        /*переход на логин страницу после логаута*/}
                    </span>
                : <span><LoginLogoutImg text={"login"} src={loginImg}/></span>
        }
    </span>
}

export default LoginRender
