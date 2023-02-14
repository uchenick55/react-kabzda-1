import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/no-image3.png";
import logoutImg from "../../assets/images/power-off.png";
import loginImg from "../../assets/images/login.png";
import React from "react";

const LoginAndProfileRender = ({isAuth, goToMyPage, myProfile, deleteLogin}) =>{

    let DeleteLogin = () => {
        deleteLogin(); // вызов deleteLoginThunkCreator из HeaderContainer
    }
    return <div> {/*блок отрисовки профиля в header и ссылки logout*/}
        {
            isAuth
                ? <span onClick={goToMyPage}> <NavLink to={`/profile/`}>
                            {!myProfile
                                ? <img src={userPhoto} alt={"userPhoto"}/>
                                : <span>
                                    {!myProfile.photos.small
                                        ? <img src={userPhoto} alt={"userPhoto"}/>
                                        : <img src={myProfile.photos.small} alt={"userPhoto"}/>}
                                </span>
                            }
                        </NavLink>
                    {/*отрисовка моих логина и фото с профиля + ссылка на профиль*/}
                    <span onClick={deleteLogin}>
                              <NavLink to='/login'><img src={logoutImg} alt="logout"/></NavLink>
                          </span> {
                        /*переход на логин страницу после логаута*/}
                    </span>
                : <span><NavLink to='/login'><img src={loginImg} alt="login"/></NavLink></span>
        }
    </div>
}

export default LoginAndProfileRender
