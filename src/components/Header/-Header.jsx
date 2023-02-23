import React from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/no-image3.png";
import logoutImg from "../../assets/images/power-off.png";
import loginImg from "../../assets/images/login.png";
import CallThemeRemote from "../-Dark_light_theme/-CallThemeRemote";

const Header = ({getProfileThunkCreator, deleteLogin, isAuth, myId, myProfile, switchInfo, info_mode}) => {
    const commentsRender = <div> {/*отрисовка переключателя для отображения/скрытия комментариев*/}
        <div className={classes.font1word}>comments</div>
        <div className={classes.checkboxGroup}>
            <div><input type="checkbox" className={classes.checkbox} id="checkbox"
                        checked={info_mode} onChange={switchInfo}/>
                <label htmlFor="checkbox" className={classes.checkboxLabel}></label></div>
        </div>
    </div>

    let goToMyPage = () => {
        getProfileThunkCreator(myId); //получить профиль по моему ID
    }
    let DeleteLogin = () => {
        deleteLogin(); // вызов deleteLoginThunkCreator из HeaderContainer
    }

    const loginAndProfileRender = <div> {/*блок отрисовки профиля в header и ссылки logout*/}
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
                    <span onClick={DeleteLogin}>
                              <NavLink to='/login'><img src={logoutImg} alt="logout"/></NavLink>
                          </span> {
                        /*переход на логин страницу после логаута*/}
                    </span>
                : <span><NavLink to='/login'><img src={loginImg} alt="login"/></NavLink></span>
        }
    </div>

    return <header className={classes.header}>
        <div className={classes.headerGreed}>
            <div>
                {commentsRender} {/*отрисовка переключателя для отображения/скрытия комментариев*/}
            </div>
            <div className={classes.callThemeRemoteTheme}>
                <CallThemeRemote/> {/*переключатель темы*/}
            </div>
            <div className={classes.myProfilePart}>
                {loginAndProfileRender} {/*блок отрисовки профиля в header и ссылки logout*/}
            </div>
        </div>
    </header>
}
export default Header;

















