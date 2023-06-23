import React, {memo} from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfoBS";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {GetProfileType} from "../api/apiTypes";
import {NulableType, ProfileType} from "../common/types/commonTypes";
import PhotoContainer from "./Photo/PhotoContainer";
import StatusContainer from "./Status/StatusContainer";
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";

type ProfileType2 = {
    profile: NulableType<GetProfileType>,
    myId: number,
    userId: number,
    putProfile: (putProfile2: ProfileType) =>void,
    uploadImage: (profilePhoto: File)=>void,
    editProfileStatus:Array<string>,
    setEditProfileStatus: (editProfileStatus: Array<string>)=> void
}

const Profile: React.FC<ProfileType2> = memo ( ({  userId }) => {

    return <div>

    </div>
})
export default Profile;
