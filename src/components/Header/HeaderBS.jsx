import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react";
import swgInfoPic from "../../assets/images/swg/info.svg"
import classes from './Header.module.css';
import CallThemeRemote from "../Dark_light_theme/CallThemeRemote";
import LoginAndProfileRender from "./LoginAndProfileRender";
import Image from "react-bootstrap/Image";


function HeaderBS({isAuth, goToMyPage, myProfile, deleteLogin}) {
    return (
        <Navbar variant="dark" bg="dark" expand="sm" fixed="top">
            <Container fluid className='text-uppercase'> {/*контейнер, текст большими буквами */}
                <div className="d-inline-flex">
                    <div><CallThemeRemote/></div>
                    {/*переключатель темы*/}

                    <div><Image fluid={true} src={swgInfoPic} className={classes.myHeaderWH1}/></div>
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
                            <NavDropdown.Item href="#/">Info</NavDropdown.Item>
                            <NavDropdown.Item href="#/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#/users">Users</NavDropdown.Item>
                            <NavDropdown.Item href="#/friends">My friends</NavDropdown.Item>
                            <NavDropdown.Item href="#/dialogs">Dialogs</NavDropdown.Item>
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
