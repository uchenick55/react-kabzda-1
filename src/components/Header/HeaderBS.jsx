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


function HeaderBS({isAuth, goToMyPage, myProfile, deleteLogin}) {
    return (
        <Navbar variant="dark" bg="dark" expand="lg" fixed="top" class='mb-2'>
            <Container className='text-uppercase'>
{/*
                <div className="justify-content-end d-inline-flex ">
*/}
                <div className="d-inline-flex ">
                    <div><CallThemeRemote/></div>
                    {/*переключатель темы*/}

                    <div><img src={swgInfoPic} className={classes.myHeaderWH1}/></div>

                    <div>
                        <LoginAndProfileRender
                            isAuth={isAuth}
                            goToMyPage={goToMyPage}
                            myProfile={myProfile}
                            deleteLogin={deleteLogin}
                        />

                    </div>
                </div>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavDropdown title="Pages">
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




                  {/*  <Nav class="justify-content-end d-inline-flex ">
                    <Nav class=" ">
                        <div class='px-1'><CallThemeRemote/></div>
                        <div class='px-1'><img src={swgInfoPic} className={classes.myHeaderWH1}/></div>
                        <div class='px-1' className={classes.myHeaderWH2}>
                            <LoginAndProfileRender
                                isAuth={isAuth}
                                goToMyPage={goToMyPage}
                                myProfile={myProfile}
                                DeleteLogin={DeleteLogin}
                            />
                        </div>
                    </Nav>*/}
            </Container>
        </Navbar>
    );
}

export default HeaderBS;
