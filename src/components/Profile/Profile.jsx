import React from 'react';
import classes from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return <div className={classes.content}>
        <div>
            <img src="https://w-dog.ru/wallpapers/11/5/450299462616902/priroda-derevya-trava-nebo-leto.jpg" alt="img1"
                 width="1100px"/>
        </div>
        <div>
            <img src="https://newsbuzz.ru/wp-content/uploads/2019/01/580.jpg" alt="img2" width="400px"/>
            ava + description
        </div>
        <MyPosts/>
    </div>


}
export default Profile;