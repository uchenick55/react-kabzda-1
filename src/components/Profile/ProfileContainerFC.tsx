import {GlobalStateType} from "../../redux/store-redux";
import {compose} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {
    getProfileThunkCreator,
} from "../../redux/profile-reducer";
import withRouter2 from "../hoc/withRouter2";
import NavigateToLoginHoc2 from "../hoc/NavigateToLoginHoc2";
import React, {useEffect, useMemo} from "react";
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

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch( getProfileThunkCreator( userId ) );// обновить профиль в зависомости от ID
    }, [userId, dispatch] )

    const isMyPrifile: boolean = userId === 0 //это мой аккаунт в профиле? (пустой userId в URL на моем аккаунте)

    const myPostsRender = useMemo(()=><MyPostsContainer/>,[])

    return <div>
        <Row>
            <Col lg={6} md={6} sm={12}>
                {useMemo(()=><PhotoContainer/>,[])} {/*Отрисовка фото выбранного профиля с возможностью редактирования на моей странице*/}
            </Col>
            <Col lg={6} md={6} sm={12}>
                {useMemo(()=><ProfileInfoContainer/>,[])} {/*Отрисовка данных выбранного профиля и возможность редактировать свой профиль*/}
            </Col>
        </Row>

        {useMemo(()=><StatusContainer/>,[])}{/* отобразить статус*/}

        {isMyPrifile && myPostsRender} {/* для моего аккаункт отобразить мои посты*/}
    </div>
}

export default compose<React.ComponentType>(
    withRouter2,// получить данные ID из URL браузера и добавить в пропсы
    NavigateToLoginHoc2// проверка, залогинен ли я
)( ProfileContainerFC )
