import React from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/no-image3.png";
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
                    <div><input type="checkbox" className={classes.checkbox} id="checkbox" onClick={switchInfo}
                                checked={info_mode}/>
                        <label htmlFor="checkbox" className={classes.checkboxLabel}></label></div>
                </div>
            </div>
            <div className={classes.callThemeRemoteTheme}>
                <CallThemeRemote/>
            </div>
            <div>
                {
                    isAuth
                        ? <span onClick={goToMyPage}> <NavLink to={`/profile/`}>
                        {myLogin}
                            {!myProfile
                                ? <img src={userPhoto} alt={"userPhoto"}/>
                                : <>
                                    {!myProfile.photos.small
                                        ? <img src={userPhoto} alt={"userPhoto"}/>
                                        : <img src={myProfile.photos.small} alt={"userPhoto"}/>}
                                </>
                            }
                        </NavLink>
                            {/*отрисовка моих логина и фото с профиля + ссылка на профиль*/}
                            <span>
                          <span onClick={DeleteLogin}><NavLink to='/login'>Logout</NavLink></span> {
                                /*переход на логин страницу после логаута*/}
                      </span>
                    </span>
                        : <span><NavLink to='/login'>Login</NavLink></span>
                }
            </div>
        </div>
    </header>
}
export default Header;

















