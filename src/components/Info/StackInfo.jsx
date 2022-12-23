import ScrollContainer from "../common/Scroll/ScrollContainer";
import React from "react";

let StackInfo = () => {
    const usedStack = <div>
        <h3>Used Stack</h3>
        <p>UI (React): create-react-app, function component, props (spread), import /export (named/default),
            connect (mstp, mdtp (short record)), class component (lifecycle methods, localState), pagination,
            presentation/wrapped components, HOC, compose, preloader, ref/value, isAuth redirect,
            async. buttons disabled, initial App, useState/useEffect/useReducer/useParams,
            lazy/Suspense/ErrorBoundary/namedExport, selector, BrowserRouter/HashRouter
            (NavLink/redirect/switch), top-down (unidirectional) flow.       </p>
        <p>BBLL (Redux): store, state, reducer, callback, dispatch, action (type), action creator, case/switch,
            thunk/thunkCreator, thunkMiddleWare, redux-ducks. </p>
        <p>DAL (API): ajax, axios, get, post, put, delete, async/await, .then/.catch.        </p>
        <p>JJS: try/catch, setTimeout/setInterval, Object.keys/values, deep/shallow copy, closure, map, filter, some.</p>
        <p>Git: checkout (-b), commit –a -m, merge, push, branch (–m), gitk –all&, reset –hard, pull.       </p>
        <p>Libs: react-router-dom, react-redux, redux-form (+ validation), reselect, styled-components.        </p>
        <p>Node: npm. </p>
        <p>IDE: Webstorm/ codesandbox.io. </p>
        <p>Test: Jest.</p>
        <p>Extra: Extra: html, css, module.css, grid, cookie, github pages.</p>
        <p>BugFix: Debugger/ breakpoint/console/network/window.store, ReduxDevTools (state, history).</p>
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
