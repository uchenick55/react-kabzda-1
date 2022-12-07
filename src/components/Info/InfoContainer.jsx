import React, {Suspense} from "react";
import classes from "../Content/ContentContainer.module.css";
import {Route, Routes} from "react-router-dom";
import DialogsInfo from "../Dialogs/DialogsInfo";
import LoginInfo from "../Login/LoginInfo";
import ProfileInfo2 from "../Profile/ProfileInfo/ProfileInfo2";
import NewsInfo from "../News/NewsInfo";
import RestInfo from "../Rest/RestInfo";
import UsersInfo from "../users/UsersInfo";
import IndexInfo from "../../IndexInfo";
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

    const availableScreenHeight = window.screen.availHeight

    return (<div>
        <Suspense fallback={
            <div>Загрузка...</div>}> {/*Оборачивает компоненты, по которым идет Lazy import и выдает fallback на время загрузки*/}
        <ScrollContainer // обернуть диалоги скролом
            child={info}
            height={availableScreenHeight - 270} // высота поля скрола
            firstInsideContainer={"DialogsUp"}
            secondInsideContainer={"DialogsDown"}
            containerElement={"DialogsContainer"}
        /> {/*отрисовка диалогов в скрол контейнере*/}
        </Suspense>
    </div>)

}
export default InfoContainer
