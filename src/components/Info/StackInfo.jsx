import ScrollContainer from "../common/Scroll/ScrollContainer";
import React from "react";

let StackInfo = () => {
    const usedStack = <div>
        <h3>Used Stack</h3>
        <p>UI (React):function component, props (spread), import/export, map, context,
            connect (mstp, mdtp), class component (lifecycle methods), pagination, presentation/wrapped components,
            compose, preloader, ref/value, isAuth redirect, async. buttons disabled, initial App,
            debugger/ breakpoint/console/network/window.store, useState/useEffect/useReducer/
            useRef/useCallback/useParams, lazy/Suspense/ErrorBoundary/namedExport        </p>
        <p>BLL (Redux): store, state, reducer, callback, dispatch, action (type), action creator, case/switch,
            thunk/thunkCreator, thunkMiddleWare.        </p>
        <p>DAL (API): ajax, axios, get, post, put, delete, async/await, .then/.catch.        </p>
        <p>JS: try/catch, setTimeout/setInterval,  Object.keys/values </p>
        <p>Git: checkout (-b), commit –a -m, merge, push, branch (–m), gitk –all&, reset –hard, pull.       </p>
        <p>Libs: react-router-dom, react-redux, redux-form (+ validation), reselect, styled-components.        </p>
        <p>Node: npm </p>
        <p>IDE: Webstorm/ codesandbox.io </p>
        <p>Test: Jest</p>
        <p>Extra: html, css, module.css, grid</p>
        <p>ReduxDevTools (state, history)</p>
    </div>

    return (<div>
        <ScrollContainer // обернуть диалоги скролом
            child={usedStack}
            height={window.screen.availHeight - 230} // высота поля скрола
            firstInsideContainer={"DialogsUp"}
            secondInsideContainer={"DialogsDown"}
            containerElement={"DialogsContainer"}
        /> {/*отрисовка диалогов в скрол контейнере*/}

    </div>)
}
export default StackInfo
