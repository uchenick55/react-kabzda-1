import React from 'react';
import classes from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return <div className={classes.content}>
        <div>
            <img src="https://w-dog.ru/wallpapers/11/5/450299462616902/priroda-derevya-trava-nebo-leto.jpg" alt="img1"
                 width="1100px"/>
        </div>
        <div className={classes.descriptionBlock}>
            <img src="https://newsbuzz.ru/wp-content/uploads/2019/01/580.jpg" alt="img2" width="400px"/>
            ava + description
        </div>
    </div>
}
export default ProfileInfo;