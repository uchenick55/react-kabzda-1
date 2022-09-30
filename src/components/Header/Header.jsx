import React from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/no-image.jpg";

const Header = (props) => {
    let goToMyPage = () => {
        props.getProfileThunkCreator(props.myId);
    }
    let deleteLogin = () => {
        props.deleteLogin(); // вызов deleteLoginThunkCreator из HeaderContainer
    }
    return <header className={classes.header}>
            <img width="50px" src='http://tiger.eplug-ins.com/wp-content/themes/tiger/assets/img/banner-breadcrumb.jpg'></img>
            {
                props.isAuth
                    ? <span onClick={goToMyPage}> <NavLink to={`/profile/`}>
                        {props.myLogin}
                        {!props.myProfile
                            ? <img src={userPhoto}/>
                            : <>
                                {!props.myProfile.photos.small
                                    ? <img src={userPhoto}/>
                                    : <img src={props.myProfile.photos.small}/>}
                            </>
                        }
                        </NavLink>
                        {/*отрисовка моих логина и фото с профиля + ссылка на профиль*/}
                        <span>
                          <span onClick={deleteLogin}><NavLink to='/login'>LogOut</NavLink></span> {
                          /*переход на логин страницу после логаута*/}
                      </span>
                    </span>
                    : <span><NavLink to='/login'>Login</NavLink></span>
            }
    </header>
}
export default Header;

















