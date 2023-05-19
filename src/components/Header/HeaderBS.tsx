import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css"
import React, {useState} from "react";
import goBack from "../../assets/images/swg/back-arrow1.svg"
import swgInfoPic from "../../assets/images/swg/info.svg"
import classes from './Header.module.css';
import Image from "react-bootstrap/Image";
import {useNavigate} from 'react-router-dom';
import ModalBS1 from "../common/ModalBS/ModalBS1";
import InfoContainer from "../Info/InfoContainer";
import {useLocation} from "react-router";
import dayNightLight from "../../assets/images/swg/day-night.svg";
import {modalBodyType, modalHeaderType, NulableType} from "../../types/commonTypes";
import {getProfileType} from "../api/apiTypes";
import NavbarDarkExample from "./DropdownNavbarBS";
import LoginRender from "./LoginRender";
import ProfileRender from "./ProfileRender";

type HeaderBSType = {
    isAuth: boolean, // Флаг авторизации
    myProfile: NulableType<getProfileType>, // мой расширенный профиль по умолчанию
    deleteLogin: () => void,
    setTheme1: () => void,

}
const HeaderBS: React.FC<HeaderBSType> = ({isAuth, myProfile, deleteLogin, setTheme1}) => {
    const navigate = useNavigate(); // хук для навигации по страницам (кнопка назад)

    const [show, setShow] = useState<boolean>( false ); // хук задания флага показать ли модальное Info

    const location = useLocation()

    let modalHeader1: modalHeaderType = "";
    let modalBody:modalBodyType ="";
    const buttonOnClick = () => {} // доп действия кроме закрытия окна

    if (show) {
        modalHeader1 = location.pathname // путь из URL вида /profile
            .toUpperCase() // в верхний регистр /PROFILE
            .split( "" ) // разделить все на массив ['/', 'P', 'R', 'O', 'F', 'I', 'L', 'E']
            .filter( i => i !== "/" ) // удалить все символы "/" ['P', 'R', 'O', 'F', 'I', 'L', 'E']
            .join( "" ) //Склеить в слово PROFILE

        modalBody = <div><InfoContainer/></div>
        // отображение фоконтейнера, контекстнозависимого от URL

        if (location.pathname === "/") {
            modalHeader1 = "HOME"
        }
    }

    /* иконка активатор модального окна с контекстной подсказкой для данной страницы*/
    const infoRender = <Image fluid={true} src={swgInfoPic} className={classes.myHeaderWH1}
               onClick={() => {
                   setShow( true )
               }} alt={"info"} title={"info"}
        />

    const showModalBS1 = show && <ModalBS1
        show={show} // флаг показать ли модальное окно
        setShow={setShow} // колбек смены флага показать модальное окно
        modalHeader={modalHeader1} // заголовок модального окна
        modalBody={modalBody} // тело модального окна
        buttonOnClick={buttonOnClick} // действие по кнопке модального окна
        buttonName={"Закрыть"} // текст кнопки
    />

    /* Переключатель день/ночь */
    const dayNightRender = <Image fluid={true} src={dayNightLight} className={classes.myHeaderWH1}
                                  onClick={setTheme1} // по клику вызвать themeTogglerLocal
                                  alt="Switch Theme" title="Switch Theme" // альтернативный текст
    />

    // Перейти назад по истории
    const goBackRender = <Image fluid={true} src={goBack} className={classes.myHeaderWH1}
                                alt={"go back"} title={"go back"}
                                onClick={() => navigate( -1 )} // при клике перейти назад по истории
    />

    const loginRender = <LoginRender
        // отрисовка иконки логина со ссылкой на профиль и кнопки логаут
        isAuth={isAuth}
        deleteLogin={deleteLogin}
    />
    const profileRender = <ProfileRender
        // отрисовка иконки профиля
        isAuth={isAuth}
        myProfile={myProfile}
    />

    const dropDownRender = <NavbarDarkExample/>

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
}

export default HeaderBS;
