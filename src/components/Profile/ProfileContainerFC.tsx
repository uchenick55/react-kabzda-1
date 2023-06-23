import {GetProfileType} from "../api/apiTypes";
import {NulableType} from "../common/types/commonTypes";
import {GlobalStateType} from "../../redux/store-redux";
import {compose} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {
    getProfileThunkCreator,
} from "../../redux/profile-reducer";
import withRouter2 from "../hoc/withRouter2";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";
import React, {useEffect} from "react";
import Preloader from "../common/Preloader/Preloader";
import PhotoContainer from "./Photo/PhotoContainer";
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";
import StatusContainer from "./Status/StatusContainer";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {Col, Row} from "react-bootstrap";

type OwnPropsType = {
    userId: number // id пользователя из withRouter
}

const ProfileContainerFC: React.FC<OwnPropsType> = ({userId}) => {

    const isFetching: boolean = useSelector( (state: GlobalStateType) => state.app.isFetching )

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch( getProfileThunkCreator( userId ) );// обновить профиль в зависомости от ID
    }, [userId, dispatch] )

    const isMyPrifile: boolean = userId === 0 //это мой аккаунт в профиле? (пустой userId в URL на моем аккаунте)

    return <div>
        {isFetching && <Preloader/>} {/*прелоадер при загрузке*/}

        <Row>
            <Col lg={6} md={6} sm={12}>
                <PhotoContainer/> {/*Отрисовка фото выбранного профиля с возможностью редактирования на моей странице*/}
            </Col>
            <Col lg={6} md={6} sm={12}>
                <ProfileInfoContainer/> {/*Отрисовка данных выбранного профиля и возможность редактировать свой профиль*/}
            </Col>
        </Row>


        <StatusContainer/> {/* отобразить статус*/}

        {isMyPrifile && <MyPostsContainer/>} {/* для моего аккаункт отобразить мои посты*/}
    </div>
}

export default compose<React.ComponentType>(
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2// проверка, залогинен ли я
)( ProfileContainerFC )
