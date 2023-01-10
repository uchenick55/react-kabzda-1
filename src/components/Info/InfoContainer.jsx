import React, {Suspense} from "react";
import classes from "../Content/ContentContainer.module.css";
import {Route, Routes} from "react-router-dom";
import ScrollContainer from "../common/Scroll/ScrollContainer";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import TasksInfo from "./TasksInfo";

const ProfileInfo2 = React.lazy(() => import("../Info/ProfileInfo2"))
const DialogsInfo = React.lazy(() => import("../Info/DialogsInfo"))
const UsersInfo = React.lazy(() => import("../Info/UsersInfo"))
const LoginInfo = React.lazy(() => import("../Info/LoginInfo"))
const NewsInfo = React.lazy(() => import("../Info/NewsInfo"))
const RestInfo = React.lazy(() => import("../Info/RestInfo"))
const IndexInfo = React.lazy(() => import("../Info/IndexInfo"))
const FeedBackInfo = React.lazy(() => import("../Info/FeedBackInfo"))


let InfoContainer = () => {
    let info = <div className={classes.contentClass}>
        <Suspense fallback={
            <div>Загрузка...</div>}> {/*Оборачивает компоненты, по которым идет Lazy import и выдает fallback на время загрузки*/}
            <Routes> {/*в зависимости от URL подгрузка разного контента*/}
                <Route path='/profile/*' element={<ProfileInfo2/>}/>{/*Профиль Комментарии*/}
                <Route path='/dialogs/*' element={<DialogsInfo/>}/> {/*Диалоги Комментарии*/}
                <Route path='/users/*' element={<UsersInfo/>}/> {/*Поиск по пользователям Комментарии*/}
                <Route path='/login/*' element={<LoginInfo/>}/> {/*Логин Комментарии*/}
                <Route path='/news/*' element={<NewsInfo/>}/>{/*Новости Комментарии*/}
                <Route path='/rest/*' element={<RestInfo/>}/> {/*Отдых Комментарии*/}
                <Route path='' element={<IndexInfo/>}/> {/*Общие Комментарии*/}
                <Route path='feedback' element={<FeedBackInfo/>}/> {/*Комментарии обратной связи*/}
                <Route path='tasks' element={<TasksInfo/>}/> {/*Комментарии обратной связи*/}
            </Routes>
        </Suspense>

    </div>

    return (<div>
        <ErrorBoundary> {/*Локальный обработчик ошибок InfoContainer*/}
            <ScrollContainer // обернуть диалоги скролом
                child={info}
                height={window.screen.availHeight - 208} // высота поля скрола
                firstInsideContainer={"DialogsUp"}
                secondInsideContainer={"DialogsDown"}
                containerElement={"DialogsContainer"}
            /> {/*отрисовка диалогов в скрол контейнере*/}
        </ErrorBoundary>
    </div>)

}
export default InfoContainer
