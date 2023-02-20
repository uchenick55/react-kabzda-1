import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/no-image3.png";
import logoutImg from "../../assets/images/swg/logout2.svg";
import loginImg from "../../assets/images/swg/login.svg";
import React from "react";
import classes from "./Header.module.css"

const LoginAndProfileRender = ({isAuth, goToMyPage, myProfile, deleteLogin}) => {

    const UserPhoto = ({src}) => <img src={src} alt={"userPhoto"} title={"profile"} className={classes.myHeaderWH1 + " " + classes.rounded}/>

    const LoginLogoutImg = ({text, src, scale}) => {
        return <NavLink to='/login'>
            <img src={src} alt={text} className={classes.myHeaderWH1 + " " + classes.scale20}
                 title={"logout"}
            />
        </NavLink>
    }

/*    classes.myHeaderWH1 + " " + classes.scale10*/

    return <div> {/*блок отрисовки профиля в header и ссылки logout*/}
        {
            isAuth
                ? <span onClick={goToMyPage}> <NavLink to={`/profile/`}>
                            {!myProfile
                                ? <UserPhoto src={userPhoto}/> // просто заглушка если нет моего профиля
                                : <span>
                                    {!myProfile.photos.small
                                        ? <UserPhoto src={userPhoto}/> // просто заглушка если нет моей фотки в профиле
                                        : <UserPhoto src={myProfile.photos.small}/>
                                    }
                                </span>
                            }
                        </NavLink>
                    {/*отрисовка моих логина и фото с профиля + ссылка на профиль*/}
                    <span onClick={deleteLogin}>
                              <LoginLogoutImg text={"logout"} src={logoutImg}/>
                          </span> {
                        /*переход на логин страницу после логаута*/}
                    </span>
                : <span><LoginLogoutImg text={"login"} src={loginImg} scale={classes.scale10}/></span>
        }
    </div>
}

export default LoginAndProfileRender
