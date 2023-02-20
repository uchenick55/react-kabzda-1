import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.min.css"
import React, {useState} from "react";
import LoginAndProfileRender from "./LoginAndProfileRender";
import goBack from "../../assets/images/swg/go-back2.svg"
import swgInfoPic from "../../assets/images/swg/info.svg"
import classes from './Header.module.css';
//import CallThemeRemote from "../Dark_light_theme/CallThemeRemote";
import Image from "react-bootstrap/Image";
import { useNavigate } from 'react-router-dom';
import ModalBS1 from "../common/ModalBS/ModalBS1";
import InfoContainer from "../Info/InfoContainer";



function HeaderBS({isAuth, goToMyPage, myProfile, deleteLogin}) {
    let navigate = useNavigate(); // хук для навигации по страницам (кнопка назад)

    const [show, setShow] = useState(false); // хук задания флага показать ли модальное Info

    const modalHeader = <div>TASKS</div>
    const modalBody = <div><InfoContainer/></div>
    // отображение штфоконтейнера, контекстнозависимого от URL
    const buttonOnClick = () => { // доп действия кроме закрытия окна

    }
    {/* иконка активатор модального окна с контекстной подсказкой для данной страницы*/}
    let infoModalRender = <div>
        <Image fluid={true} src={swgInfoPic} className={classes.myHeaderWH1}
                onClick={()=>{setShow(true)}}
        />

        <ModalBS1
            show={show} // флаг показать ли модальное окно
            setShow={setShow} // колбек смены флага показать модальное окно

            modalHeader={modalHeader} // заголовок модального окна
            modalBody={modalBody} // тело модального окна
            buttonOnClick={buttonOnClick} // действие по кнопке модального окна
            buttonName={"Закрыть"} // текст кнопки
        />
    </div>

    return (
        <Navbar variant="dark" bg="dark" expand="sm" fixed="top">
            <Container fluid className='text-uppercase'> {/*контейнер, текст большими буквами */}
                <div className="d-inline-flex">
                    <div><Image fluid={true} src={goBack} className={classes.myHeaderWH1}
                                alt={"go back"} title={"go back"}
                                onClick={() => navigate(-1)} // при клике перейти назад по истории
                    /></div>
                    {/* иконка активатор модального окна с контекстной подсказкой для данной страницы*/}

                    {/*<div><CallThemeRemote/></div>
                    переключатель темы*/}

                    {infoModalRender}
                    {/* иконка активатор модального окна с контекстной подсказкой для данной страницы*/}

                    <div>
                        <LoginAndProfileRender
                            // отрисовка иконки логина со ссылкой на профиль и кнопки логаут
                            isAuth={isAuth}
                            goToMyPage={goToMyPage}
                            myProfile={myProfile}
                            deleteLogin={deleteLogin}
                        />
                    </div>
                </div>
                <Navbar.Toggle/> {/*отображение меню при низком разрешении*/}
                <Navbar.Collapse>{/* выпадающее меню со ссылкам нва страницы*/}
                    <Nav>
                        <NavDropdown title="Pages" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#/">Home</NavDropdown.Item>
                            <NavDropdown.Item href="#/mystack">My Stack</NavDropdown.Item>
                            <NavDropdown.Item href="#/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#/users">Users</NavDropdown.Item>
                            <NavDropdown.Item href="#/news">News</NavDropdown.Item>
                            <NavDropdown.Item href="#/rest">Rest</NavDropdown.Item>
                            <NavDropdown.Item href="#/feedback">FeedBack</NavDropdown.Item>
                            <NavDropdown.Item href="#/tasks">Tasks</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderBS;
