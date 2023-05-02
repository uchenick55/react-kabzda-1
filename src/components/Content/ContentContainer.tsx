import React, {Suspense, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import Tasks from "../Tasks/Tasks";
import Home from "../Home/Home";
import classes from "./ContentContainer.module.css"
import {useLocation} from "react-router";

const UsersContainer = React.lazy(() => import("../users/UsersContainerFC"))
const ProfileContainer = React.lazy(() => import("../Profile/ProfileContainerFC"))
const DialogsContainer = React.lazy(() => import("../DialogList/DialogListContainer"))
const Dialog2Container = React.lazy(() => import("../common/Dialog2Messages2/Dialog2Messages2Container"))
const LoginContainer = React.lazy(() => import("../Login/LoginContainer"))
const News = React.lazy(() => import("../News/News"))
const Rest = React.lazy(() => import("../Rest/Krestiki-Noliki/KrestikiNoliki"))
const StackInfo = React.lazy(() => import("../Info/StackInfoBS"))
const FeedBackContainer = React.lazy(() => import("../FeedBack/FeedBackContainer"))

type ContentContainerType = {
    setPatch: (patch:string)=>void,
    setPageWidth: (PageWidth:number) => void
}
let ContentContainer: React.FC<ContentContainerType> = ({setPatch, setPageWidth}) => { // вынес роутинг контента в отдельную компоненту

    const location = useLocation()
    useEffect(()=>{ // определение и запись в стор пути из адресной строки бораузера
        let patch = location.pathname // путь из URL вида /profile
            .split( "" ) // разделить все на массив ['/', 'd', 'i', 'a', 'l', 'o', 'g', 's', '2', '8', '8', '3', '1',]
            .filter( i => i !== "/" ) // удалить все символы "/" ['d', 'i', 'a', 'l', 'o', 'g', 's', '2', '8', '8', '3', '1',]
            .join( "" ) //Склеить в слово dialogs или users
        patch = patch.replace(/[0-9]/g, '');// удалить все цифры ID пользователя для dialogs
        setPatch(patch)
        // обновить данные пути patch в app-reducer
    },[location, setPatch])

    function setPageWidthLocal() { //записываем ширину окна в стор
        const PageWidth1 = document.documentElement.scrollWidth// изменяем ширину окна сразу
        setTimeout(()=>{ // делаем задержку
            const PageWidth2 = document.documentElement.scrollWidth // и повторно измеряем ширину окна
            if (PageWidth1===PageWidth2) { // если дина не меняется больше чем время задержки,
                setPageWidth(PageWidth1) //пушим длину в стор (защита от частого обновления стора)
            }
        }, 300) // время задержки между измерениями ширины окна
    }
    window.onresize = setPageWidthLocal;


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
                        <Route path='/dialog/*' element={<Dialog2Container/>}/> {/*Диалоги*/}
                        <Route path='/messages/*' element={<Dialog2Container/>}/> {/*Диалоги*/}
                        <Route path='/users/*' element={<UsersContainer/>}/> {/*Поиск по UsersBS*/}
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
