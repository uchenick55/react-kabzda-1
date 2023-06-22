import React, {memo, Suspense, useEffect, useMemo} from "react";
import {Route, Routes} from "react-router-dom";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import Tasks from "../Tasks/Tasks";
import Home from "../Home/Home";
import classes from "./ContentContainer.module.css"
import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import type {} from 'redux-thunk/extend-redux';
import {AppDispatch, GlobalStateType} from "../../redux/store-redux";
import {appActions} from "../../redux/app-reducer";
import ErrorToastContainer from "../common/ErrorToast/ErrorToastContainer";

const UsersContainer = React.lazy( () => import("../users/UsersContainerFC") )
const ProfileContainer = React.lazy( () => import("../Profile/ProfileContainerFC") )
const Dialog2Container = React.lazy( () => import("../Dialog2Messages2/Dialog2Messages2Container") )
const LoginContainer = React.lazy( () => import("../Login/LoginContainer") )
const News = React.lazy( () => import("../News/News") )
const Rest = React.lazy( () => import("../Rest/Krestiki-Noliki/KrestikiNoliki") )
const StackInfo = React.lazy( () => import("../Info/StackInfoBS") )
const FeedBackContainer = React.lazy( () => import("../FeedBack/FeedBackContainer") )

const ContentContainer: React.FC = memo( () => { // вынес роутинг контента в отдельную компоненту
    console.log("ContentContainer")
    const {setPatch, setPageWidth} = appActions
    const Patch: string = useSelector((state:GlobalStateType) => state.app.patch)

    const dispatch = useDispatch<AppDispatch>();

    const location = useLocation()
    useEffect( () => { // определение и запись в стор пути из адресной строки бораузера
        const patch2 = location.pathname // путь из URL вида /profile
            .split( "" ) // разделить все на массив ['/', 'd', 'i', 'a', 'l', 'o', 'g', 's', '/', '2', '8', '8', '3', '1',]
        const Aaa: Array<String> = [] // задать пустой массив
        for (let i: number = 1; i < patch2.length; i++) { // начиная со второго элемента, первый элемент всегда '/'
            if (patch2[i] === '/') {
                break // прервать цикл, если встречаем /
            }
            Aaa.push( patch2[i] ) // добавляем элементы в массив
        }

        const UpdatedPatch: string = Aaa.join( "" ) // итоговый путь
        if (Patch!== UpdatedPatch) {
            dispatch( setPatch( UpdatedPatch ))
            // обновить данные пути patch в app-reducer
        }

    }, [location, setPatch, dispatch, Patch] )

    const setPageWidthLocal  = () => { //записываем ширину окна в стор
        const pageWidth1 = document.documentElement.scrollWidth// изменяем ширину окна сразу
        setTimeout( () => { // делаем задержку
            const pageWidth2 = document.documentElement.scrollWidth // и повторно измеряем ширину окна
            if (pageWidth1 === pageWidth2) { // если дина не меняется больше чем время задержки,
               dispatch(setPageWidth( pageWidth1 )) //пушим длину в стор (защита от частого обновления стора)
            }
        }, 300 ) // время задержки между измерениями ширины окна
    }

    window.onresize = setPageWidthLocal;

    return (<div>
        {useMemo(()=><ErrorToastContainer/>,[]) }{/* вывод ошибок внутри 200 ответа*/}
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
                        <Route path='/feedback/*' element={<FeedBackContainer/>}/> {/*Общие Комментарии*/}
                        <Route path='/tasks/*' element={<Tasks/>}/> {/*Общие Комментарии*/}
                    </Routes>
                </div>
            </Suspense>
        </ErrorBoundary>
    </div>)
})
export default ContentContainer
