import React, {memo, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import classes from "./ContentContainer.module.css"

const UsersContainer = React.lazy( () => import("../users/UsersContainerFC") )
const ProfileContainer = React.lazy( () => import("../Profile/ProfileContainerFC") )
const Dialog2Container = React.lazy( () => import("../Dialog2Messages2/Dialog2Messages2Container") )
const LoginContainer = React.lazy( () => import("../Login/LoginContainer") )
const News = React.lazy( () => import("../News/News") )
const Rest = React.lazy( () => import("../Rest/Krestiki-Noliki/KrestikiNoliki") )
const StackInfo = React.lazy( () => import("../Info/StackInfoBS") )
const FeedBackContainer = React.lazy( () => import("../FeedBack/FeedBackContainer") )
const ChatContainer = React.lazy( () => import("../Chat/ChatContainer") )
const Home = React.lazy( () => import("../Home/Home") )
const Tasks = React.lazy( () => import("../Tasks/Tasks") )

const ContentContainer: React.FC = memo( () => { // вынес роутинг контента в отдельную компоненту
    console.log("ContentContainer")

    return (<div>
        <ErrorBoundary> {/*Локальный обработчик ошибок ContentContainer*/}
            <Suspense fallback={
                <div>Загрузка...</div>}> {/*Оборачивает компоненты, по которым идет Lazy import и выдает fallback на время загрузки*/}
                <div className={classes.contentContainer}>
                    <Routes> {/*в зависимости от URL подгрузка разного контента*/}
                        <Route path='' element={<Home/>}/> {/*Общие Комментарии*/}
                        <Route path='/mystack/*' element={<StackInfo/>}/> {/*Общие Комментарии*/}
                        <Route path='/profile/*' element={<ProfileContainer/>}/> {/*Профиль*/}
                        <Route path='/dialog2/*' element={<Dialog2Container/>}/> {/*Диалоги*/}
                        <Route path='/messages/*' element={<Dialog2Container/>}/> {/*Диалоги*/}
                        <Route path='/users/*' element={<UsersContainer/>}/> {/*Поиск по Users*/}
                        <Route path='/login/*' element={<LoginContainer/>}/> {/*Логин*/}
                        <Route path='/news/*' element={<News/>}/> {/*Поиск по новостям hn algonia*/}
                        <Route path='/rest/*' element={<Rest/>}/> {/*Страница отдыха*/}
                        <Route path='/feedback/*' element={<FeedBackContainer/>}/> {/**/}
                        <Route path='/tasks/*' element={<Tasks/>}/> {/**/}
                        <Route path='/chat/*' element={<ChatContainer/>}/> {/**/}
                    </Routes>
                </div>
            </Suspense>
        </ErrorBoundary>
    </div>)
})
export default ContentContainer
