import {NavLink} from "react-router-dom";
import logoutImg from "../../assets/images/swg/logout2.svg";
import loginImg from "../../assets/images/swg/login.svg";
import React from "react";
import classes from "./Header.module.css"

type LoginRenderType = {
    isAuth: boolean, // Флаг авторизации
    deleteLogin: () => void
}
const LoginRender: React.FC<LoginRenderType> = ({isAuth, deleteLogin}) => {

    type LoginLogoutImgType = {
        text: "login" | "logout",
        src: typeof logoutImg | typeof loginImg,
    }

    return <span> {/*блок отрисовки login/logout*/}
        {
            isAuth // а авторизован?
                ? <img onClick={deleteLogin} src={logoutImg} alt={"logout"} className={classes.myHeaderWH1}
                       title={"logout"}/> // если да, при нажатии запустить процедуру логаута
                : <NavLink to='/login'>  {/*если я не залогинен, перейти на страницу логина*/}
                    <img src={loginImg} alt={"login"} className={classes.myHeaderWH1} title={"login"}/>
                </NavLink>
        }
    </span>
}

export default LoginRender
