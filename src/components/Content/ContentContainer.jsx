import React, {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import Tasks from "../Tasks/Tasks";
import ProfileContainer from "../Profile/ProfileContainer";
import Home from "../Home/Home";
import classes from "./ContentContainer.module.css"

//const ProfileContainer = React.lazy(() => import("../Profile/ProfileContainer"))
const DialogsContainer = React.lazy(() => import("../DialogList/DialogListContainer"))
// В случае именного экспорта, оборачиваем компоненту в промежуточную с экспортом по умолчанию, чтобы работал lazy
const ExportDefaultUsersContainer = React.lazy(() => import("../users/ExportDefaultUsersContainer"))
const LoginContainer = React.lazy(() => import("../Login/LoginContainer"))
const News = React.lazy(() => import("../News/News"))
const Rest = React.lazy(() => import("../Rest/Krestiki-Noliki/krestiki-noliki"))
const StackInfo = React.lazy(() => import("../Info/StackInfoBS"))
const FeedBackContainer = React.lazy(() => import("../FeedBack/FeedBackContainer"))

let ContentContainer = () => { // вынес роутинг контента в отдельную компоненту
    return (<div>
        <ErrorBoundary> {/*Локальный обработчик ошибок ContentContainer*/}
            <Suspense fallback={
                <div>Загрузка...</div>}> {/*Оборачивает компоненты, по которым идет Lazy import и выдает fallback на время загрузки*/}
                <div className={classes.contentContainer}>
                    <Routes> {/*в зависимости от URL подгрузка разного контента*/}
                        <Route path='' element={<Home/>}/> {/*Общие Комментарии*/}
                        <Route path='/mystack/*' element={<StackInfo/>}/> {/*Общие Комментарии*/}
                        <Route path='/profile/*' element={<ProfileContainer/>}/> {/*Профиль*/}
                        <Route path='/dialogs/*' element={<DialogsContainer/>}/> {/*Диалоги*/}
                        <Route path='/users/*' element={<ExportDefaultUsersContainer/>}/> {/*Поиск по UsersBS*/}
                        <Route path='/login/*' element={<LoginContainer/>}/> {/*Логин*/}
                        <Route path='/news/*' element={<News/>}/> {/*Поиск по новостям hn algonia*/}
                        <Route path='/rest/*' element={<Rest/>}/> {/*Страница отдыха*/}
                        <Route path='/feedback/*' element={<FeedBackContainer/>}/> {/*Общие Комментарии*/}
                        <Route path='/tasks/*' element={<Tasks/>}/> {/*Общие Комментарии*/}
                    </Routes>
                </div>
            </Suspense>
        </ErrorBoundary>
    </div>)
}
export default ContentContainer
