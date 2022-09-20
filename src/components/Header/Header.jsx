import React from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/no-image.jpg";

const Header = (props) => {
    let goToMyPage = () => {
        props.getProfileThunkCreator(props.myId);
    }
    return <header className={classes.header}>
            <img src='http://tiger.eplug-ins.com/wp-content/themes/tiger/assets/img/banner-breadcrumb.jpg'></img>
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
                    </span>
                    : <span><NavLink to='/login'>Login</NavLink></span>
            }
    </header>
}
export default Header;

















