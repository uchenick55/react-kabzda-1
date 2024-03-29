import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css"
import React, {memo, useMemo, useState} from "react";
import goBack from "../../assets/images/swg/back-arrow1.svg"
import swgInfoPic from "../../assets/images/swg/info.svg"
import classes from './Header.module.css';
import Image from "react-bootstrap/Image";
import {useNavigate} from 'react-router-dom';
import ModalBS1 from "../common/ModalBS/ModalBS1";
import InfoContainer from "../Info/InfoContainer";
import dayNightLight from "../../assets/images/swg/day-night.svg";
import {ModalBodyType, ModalHeaderType, NulableType} from "../common/types/commonTypes";
import {GetProfileType} from "../api/apiTypes";
import NavbarDarkExample from "./DropdownNavbarBS";
import userPhoto from "../../assets/images/no-image3.png";
import logoutImg from "../../assets/images/swg/logout2.svg";
import loginImg from "../../assets/images/swg/login.svg";
import {ImageMemo} from "../common/BootstrapMemo/BootstrapMemo";

type HeaderBSType = {
    isAuth: boolean, // Флаг авторизации
    myProfile: NulableType<GetProfileType>, // мой расширенный профиль по умолчанию
    deleteLogin: () => void,
    setTheme1: () => void,
    path: string

}
const HeaderBS: React.FC<HeaderBSType> = memo( ({isAuth, myProfile, deleteLogin, setTheme1, path}) => {
  //  console.log( "HeaderBS" )
    const navigate = useNavigate(); // хук для навигации по страницам (кнопка назад)

    const [show, setShow] = useState<boolean>( false ); // хук задания флага показать ли модальное Info

    let modalHeader1: ModalHeaderType = "";
    let modalBody: ModalBodyType = "";
    const buttonOnClick = () => {
    } // доп действия кроме закрытия окна

    if (show) {
        modalHeader1 = path.toUpperCase() || "HOME"
        modalBody = <div><InfoContainer/></div>
        // отображение фоконтейнера, контекстнозависимого от URL
    }

    // Перейти назад по истории
    const goBackRender = useMemo( () => <ImageMemo fluid={true} src={goBack} className={classes.myHeaderWH1}
                                               alt={"go back"} title={"go back"}
                                               onClick={() => navigate( -1 )} // при клике перейти назад по истории
    />, [navigate] )

    /* Переключатель день/ночь */
    const dayNightRender = useMemo( () => <ImageMemo fluid={true} src={dayNightLight} className={classes.myHeaderWH1}
                                                 onClick={setTheme1} // по клику вызвать themeTogglerLocal
                                                 alt="Switch Theme" title="Switch Theme" // альтернативный текст
    />, [setTheme1] )

    /* иконка активатор модального окна с контекстной подсказкой для данной страницы*/
    const infoRender = useMemo( () => <Image fluid={true} src={swgInfoPic} className={classes.myHeaderWH1}
                                             onClick={() => {
                                                 setShow( true )
                                             }} alt={"info"} title={"info"}
    />, [] )

    const profileRender = <a href='#/profile'>
        {isAuth && <img src={myProfile?.photos?.small || userPhoto} alt={"userPhoto"} title={"profile"}
              className={classes.myHeaderWH1 + " " + classes.rounded}/>}
        </a>

    const loginRender = <div> {/*отрисовка иконки логина / логаута*/}
        {
            isAuth // а авторизован?
                ? <img onClick={deleteLogin} src={logoutImg} alt={"logout"} className={classes.myHeaderWH1}
                       title={"logout"}/> // если да, при нажатии запустить процедуру логаута
                : <a href='#/login'>  {/*если я не залогинен, перейти на страницу логина*/}
                    <img src={loginImg} alt={"login"} className={classes.myHeaderWH1} title={"login"}/>
                </a>
        }
    </div>

    const showModalBS1 = show && <ModalBS1
        show={show} // флаг показать ли модальное окно
        setShow={setShow} // колбек смены флага показать модальное окно
        modalHeader={modalHeader1} // заголовок модального окна
        modalBody={modalBody} // тело модального окна
        buttonOnClick={buttonOnClick} // действие по кнопке модального окна
        buttonName={"Закрыть"} // текст кнопки
    />

    const dropDownRender = useMemo( () => <NavbarDarkExample/>, [] )

    return (
        <Navbar collapseOnSelect variant="dark" bg="dark" fixed="top" className={classes.myHeader1}>
            <Container fluid className='text-uppercase'> {/*контейнер, текст большими буквами */}
                <div className="d-inline-flex align-items-center">
                    {/*<div className="d-inline-flex align-items-center">*/}

                    {goBackRender} {/*Перейти назад по истории*/}

                    {dayNightRender}{/* Переключение день/ночь*/}

                    {infoRender} {/* иконка информации*/}

                    {showModalBS1} {/* отрисовка модального окна*/}

                    {profileRender} {/*отрисовка иконки профиля*/}

                    {loginRender} {/*отрисовка иконки логин / логаут*/}

                    {dropDownRender} {/*выпадающее меню*/}
                </div>

            </Container>
        </Navbar>
    );
} )

export default HeaderBS;
