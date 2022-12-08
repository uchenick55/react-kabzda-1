import React, {Suspense} from "react";
import classes from "../Content/ContentContainer.module.css";
import {Route, Routes} from "react-router-dom";
import DialogsInfo from "./DialogsInfo";
import LoginInfo from "./LoginInfo";
import ProfileInfo2 from "../Profile/ProfileInfo/ProfileInfo2";
import NewsInfo from "./NewsInfo";
import RestInfo from "./RestInfo";
import UsersInfo from "./UsersInfo";
import IndexInfo from "./IndexInfo";
import ScrollContainer from "../common/Scroll/ScrollContainer";




let InfoContainer = () => {
    let info = <div className={classes.contentClass}>
        <Routes> {/*в зависимости от URL подгрузка разного контента*/}
            <Route path='/profile/*' element={<ProfileInfo2/>}/>{/*Профиль Комментарии*/}
            <Route path='/dialogs/*' element={<DialogsInfo/>}/> {/*Диалоги Комментарии*/}
            <Route path='/users/*' element={<UsersInfo/>}/> {/*Поиск по пользователям Комментарии*/}
            <Route path='/login/*' element={<LoginInfo/>}/> {/*Логин Комментарии*/}
            <Route path='/news/*' element={<NewsInfo/>}/>{/*Новости Комментарии*/}
            <Route path='/rest/*' element={<RestInfo/>}/> {/*Отдых Комментарии*/}
            <Route path='' element={<IndexInfo/>}/> {/*Общие Комментарии*/}
        </Routes>
    </div>

    return (<div>
        <Suspense fallback={
            <div>Загрузка...</div>}> {/*Оборачивает компоненты, по которым идет Lazy import и выдает fallback на время загрузки*/}
        <ScrollContainer // обернуть диалоги скролом
            child={info}
            height={window.screen.availHeight - 270} // высота поля скрола
            firstInsideContainer={"DialogsUp"}
            secondInsideContainer={"DialogsDown"}
            containerElement={"DialogsContainer"}
        /> {/*отрисовка диалогов в скрол контейнере*/}
        </Suspense>
    </div>)

}
export default InfoContainer
