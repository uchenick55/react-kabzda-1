import {NavLink} from "react-router-dom";
import logoutImg from "../../assets/images/swg/logout2.svg";
import loginImg from "../../assets/images/swg/login.svg";
import React from "react";
import classes from "./Header.module.css"

const LoginRender = ({isAuth, goToMyPage, deleteLogin}) => {

    const LoginLogoutImg = ({text, src, scale}) => {
        return <NavLink to='/login'>
            <img src={src} alt={text} className={classes.myHeaderWH1 + " " + classes.scale20}
                 title={"logout"}
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
                : <span><LoginLogoutImg text={"login"} src={loginImg} scale={classes.scale10}/></span>
        }
    </span>
}

export default LoginRender
