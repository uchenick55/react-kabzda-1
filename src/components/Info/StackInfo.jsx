import ScrollContainer from "../common/Scroll/ScrollContainer";
import React from "react";

let StackInfo = () => {
    const usedStack = <div>
        <h3>Used Stack</h3>
        <p>UI (React): create-react-app, function component, props (spread), import /export (named/default),
            connect (mstp, mdtp (short record)), class component (lifecycle methods, localState, this), pagination,
            presentation/wrapped components, HOC (isAuth redirect, withRouter), compose, preloader, ref/value,
            async. buttons disabled, initial App, useState/useEffect/useReducer/useParams,
            lazy/Suspense/ErrorBoundary/namedExport, selector, BrowserRouter/HashRouter
            (NavLink/Navigate/Routes/Route), Lifting State Up, top-down (unidirectional) flow, props.children, fragment, JSX, React.createElement </p>
        <p>BLL (Redux): store, state, reducer, callback, dispatch, action (type), action creator, case/switch,
            thunk/thunkCreator, thunkMiddleWare, redux-ducks. </p>
        <p>DAL (API): ajax, axios, get, post, put, delete, async/await, .then/.catch.        </p>
        <p>JS: try/catch/finally, setTimeout/setInterval, Object.keys/values, Math.ceil, new Date(), JSON.stringify, deep/shallow copy, closure, map, filter, some, find, sort.</p>
        <p>Git: checkout (-b), commit –a -m, merge, push, branch (–m), gitk –all&, reset –hard, pull.       </p>
        <p>Libs: react-router-dom, react-redux, redux-form, formik + yup, reselect, styled-components.        </p>
        <p>Node: npm/npx </p>
        <p>IDE: Webstorm/ codesandbox.io. </p>
        <p>Test: Jest.</p>
        <p>Extra: base html, fieldset/legend, cookie, github pages.</p>
        <p>CSS: base css, module.css, grid. </p>
        <p>BugFix: debugger/ breakpoint/console/network/window.store, ReduxDevTools (state, history), ReactDevTools(state, props, components).</p>
    </div>

    return (<div>
        <ScrollContainer // обернуть диалоги скролом
            child={usedStack}
            height={window.screen.availHeight - 218} // высота поля скрола
            firstInsideContainer={"DialogsUp"}
            secondInsideContainer={"DialogsDown"}
            containerElement={"DialogsContainer"}
        /> {/*отрисовка диалогов в скрол контейнере*/}

    </div>)
}
export default StackInfo
