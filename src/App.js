import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/News";
import Settings from "./components/Settings/News";
import Draft from "./components/Draft/Draft";

function App(props) {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/dialogs/*' element={<Dialogs dialogsData={props.dialogsData}
                                                                   messagesData={props.messagesData}/>}/>
                        <Route path='/profile/*' element={<Profile postsData={props.postsData} />}/>
                        <Route path='/news/*' element={<News/>}/>
                        <Route path='/music/*' element={<Music/>}/>
                        <Route path='/settings/*' element={<Settings/>}/>
{/*
                        <Route path='/draft/*' element={<Draft/>}/>
*/}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;