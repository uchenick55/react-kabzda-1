import {compose} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {
    getProfileThunkCreator,
} from "../../redux/profile-reducer";
import withRouter2 from "../hoc/withRouter2";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";
import React, {useEffect, useMemo} from "react";
import PhotoContainer from "./Photo/PhotoContainer";
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";
import StatusContainer from "./Status/StatusContainer";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {Col, Row} from "react-bootstrap";
import {GlobalStateType} from "../../redux/store-redux";
import {NulableType} from "../common/types/commonTypes";
import {GetProfileType} from "../api/apiTypes";

type OwnPropsType = {
    userId: number // id пользователя из withRouter
}

const ProfileContainerFC: React.FC<OwnPropsType> = ({userId}) => {

    const dispatch = useDispatch()

    const profile: NulableType<GetProfileType> = useSelector( (state: GlobalStateType) => state.profilePage.profile )

    useEffect( () => {
        if (userId !== profile?.userId)
        dispatch( getProfileThunkCreator( userId ) );// обновить профиль в зависомости от ID
    }, [userId, dispatch] )

    const isMyPrifile: boolean = userId === 0 //это мой аккаунт в профиле? (пустой userId в URL на моем аккаунте)

    const myPostsRender = useMemo( () => <MyPostsContainer/>, [] )

    const photoContainer = useMemo( () => <PhotoContainer/>, [] )

    const profileInfoContainer = useMemo( () => <ProfileInfoContainer/>, [] )

    const statusContainer = useMemo( () => <StatusContainer/>, [] )

    return <div>
        { (userId === profile?.userId // отрисовать профиль если профиль пользователя загружен
        || userId === 0) // или это мой профиль

        && <div>
            <Row>
                <Col lg={6} md={6} sm={12}>
                    {photoContainer} {/*Отрисовка фото выбранного профиля с возможностью редактирования на моей странице*/}
                </Col>
                <Col lg={6} md={6} sm={12}>
                    {profileInfoContainer} {/*Отрисовка данных выбранного профиля и возможность редактировать свой профиль*/}
                </Col>
            </Row>

            {statusContainer}{/* отобразить статус*/}

            {isMyPrifile && myPostsRender} {/* для моего аккаункт отобразить мои посты*/}
        </div>}

    </div>
}

export default compose<React.ComponentType>(
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2// проверка, залогинен ли я
)( ProfileContainerFC )
