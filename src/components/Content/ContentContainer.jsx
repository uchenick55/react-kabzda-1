import React, {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import News from "../News/News";
import Rest from "../Rest/Krestiki-Noliki/krestiki-noliki";
import classes from './ContentContainer.module.css';

const ProfileContainer = React.lazy(() => import("../Profile/ProfileInfo/ProfileContainer"))
const DialogsContainer = React.lazy(() => import("../Dialogs/DialogsContainer"))
// В случае именного экспорта, оборачиваем компоненту в промежуточную с экспортом по умолчанию, чтобы работал lazy
const ExportDefaultUsersContainer = React.lazy(() => import("../users/ExportDefaultUsersContainer"))
const LoginContainer = React.lazy(() => import("../Login/LoginContainer"))


let ContentContainer = () => { // вынес роутинг контента в отдельную компоненту
    return (<div>
        <Suspense fallback={<div>Загрузка...</div>}> {/*Оборачивает компоненты, по которым идет Lazy import и выдает fallback на время загрузки*/}
            <div className={classes.contentClass}>
                <Routes> {/*в зависимости от URL подгрузка разного контента*/}
                    <Route path='/profile/*' element={<ProfileContainer/>}/> {/*Профиль*/}
                    <Route path='/dialogs/*' element={<DialogsContainer/>}/> {/*Диалоги*/}
                    <Route path='/users/*' element={<ExportDefaultUsersContainer/>}/> {/*Поиск по Users*/}
                    <Route path='/login/*' element={<LoginContainer/>}/> {/*Логин*/}
                    <Route path='/news/*' element={<News/>}/> {/*Поиск по новостям hn algonia*/}
                    <Route path='/rest/*' element={<Rest/>}/> {/*Страница отдыха*/}
                </Routes>
            </div>
        </Suspense>
    </div>)
}
export default ContentContainer
