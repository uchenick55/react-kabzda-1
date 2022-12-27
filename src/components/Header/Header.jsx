import React from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/no-image3.png";
import logoutImg from "../../assets/images/power-off.png";
import loginImg from "../../assets/images/login.png";
import CallThemeRemote from "../Dark_light_theme/CallThemeRemote";

const Header = ({getProfileThunkCreator, deleteLogin, isAuth, myId, myLogin, myProfile, switchInfo, info_mode}) => {
    let goToMyPage = () => {
        getProfileThunkCreator(myId);
    }
    let DeleteLogin = () => {
        deleteLogin(); // вызов deleteLoginThunkCreator из HeaderContainer
    }

    return <header className={classes.header}>
        <div className={classes.headerGreed}>
            <div>
                <div className={classes.font1word}>comments</div>
                <div className={classes.checkboxGroup}>
                    <div><input type="checkbox" className={classes.checkbox} id="checkbox" 
                                checked={info_mode} onChange={switchInfo}/>
                        <label htmlFor="checkbox" className={classes.checkboxLabel}></label></div>
                </div>
            </div>
            <div className={classes.callThemeRemoteTheme}>
                <CallThemeRemote/>
            </div>
            <div className={classes.myProfilePart}>
                {
                    isAuth
                        ? <span onClick={goToMyPage}> <NavLink to={`/profile/`}>
{/*
                        {myLogin}
*/}
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
        </div>
    </header>
}
export default Header;

















