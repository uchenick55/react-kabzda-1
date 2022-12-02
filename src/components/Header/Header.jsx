import React from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/no-image3.png";
import CallThemeRemote from "../Dark_light_theme/CallThemeRemote";
import {bedug_mode} from "../../redux/store-redux";


const Header = ({getProfileThunkCreator, deleteLogin, isAuth, myId, myLogin, myProfile}) => {
    let goToMyPage = () => {
        getProfileThunkCreator(myId);
    }
    let DeleteLogin = () => {
        deleteLogin(); // вызов deleteLoginThunkCreator из HeaderContainer
    }
    return <header className={classes.header}>
{/*
        коммент перед CallThemeRemote
*/}
        <CallThemeRemote/>

        {
            isAuth
                ? <span onClick={goToMyPage}> <NavLink to={`/profile/`}>
                        {myLogin}
                    {!myProfile
                        ? <img src={userPhoto}/>
                        : <>
                            {!myProfile.photos.small
                                ? <img src={userPhoto}/>
                                : <img src={myProfile.photos.small}/>}
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

    </header>
}
export default Header;

















