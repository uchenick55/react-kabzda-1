import React from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/no-image.jpg";

const Header = (props) => {
    return <header className={classes.header}>
            <img src='http://tiger.eplug-ins.com/wp-content/themes/tiger/assets/img/banner-breadcrumb.jpg'></img>
            {
                props.isAuth
                    ? <>
                        {props.login}
                        {!props.profile
                            ? <img src={userPhoto}/>
                            : <>
                                {!props.profile.photos.small
                                    ? <img src={userPhoto}/>
                                    : <img src={props.profile.photos.small}/>}
                            </>
                        }
                    </>
                    : <NavLink to='/login'>Login</NavLink>
            }
    </header>
}
export default Header;

















