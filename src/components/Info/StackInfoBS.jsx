import React from "react";
import "bootstrap/dist/css/bootstrap-grid.min.css"
import Container from "react-bootstrap/Container";
import commonClasses from "../common/CommonClasses/common.module.css";

let StackInfoBS = () => {
    const usedStack = <div>
        <Container>

            <h2 className={commonClasses.pageHeader}>My Stack</h2>

            <p>UI (React): create-react-app, function component, props (spread), import /export (named/default),
                connect (mstp, mdtp (short record)), class component (lifecycle methods, localState, this), pagination,
                presentation/wrapped components, HOC (isAuth redirect, withRouter), compose, preloader, ref/value,
                async. buttons disabled, initial App, useState/ useEffect/ useReducer/ useParams/ useNavigate,
                lazy/Suspense/ ErrorBoundary/namedExport, selector, BrowserRouter/HashRouter
                (NavLink/Navigate/ Routes/Route), Lifting State Up, top-down (unidirectional) flow, props.children, fragment, JSX, React.createElement </p>
            <p>BLL (Redux): store, state, reducer, callback, dispatch, action (type), action creator, case/switch,
                thunk/thunkCreator, thunkMiddleWare, redux-ducks. </p>
            <p>DAL (API): ajax, axios, get, post, put, delete, async/await, .then/.catch.        </p>
            <p>JS: try/catch/finally, setTimeout/setInterval, Object.keys/values/ hasOwnProperty,  Math.ceil/floor, new Date(), JSON.stringify, deep/shallow copy, closure, map, filter, some, find, sort, reduce, forEach, slice, splice, split, join, includes, Array.from, reverse etc. </p>
            <p>Typescript: primitive, typeof, commonType/import, selector, Array/Object, reducer, thunk, connect(MSTP, MDTP, globalStateType), function, event, FC, useState, generic  </p>
            <p>Git: checkout (-b), commit –a -m, merge, push, branch (–m), gitk –all&, reset –hard, pull.       </p>
            <p>Libs: react-router-dom, react-redux, redux-form, formik + yup, reselect, styled-components.        </p>
            <p>Node: npm/npx </p>
            <p>IDE: Webstorm/ codesandbox.io. </p>
            <p>Test: Jest.</p>
            <p>Extra: base html, fieldset/legend, cookie, github pages.</p>
            <p>CSS: basic css (+ grid), module.css, SCSS, bootstrap. </p>
            <p>BugFix: debugger/ breakpoint/console/ network/window.store, ReduxDevTools (state, history), ReactDevTools(state, props, components).</p>
            <p>My CodeWars acc: <a href="https://www.codewars.com/users/uchenick55/completed" >completed kata</a></p>

        </Container>
    </div>

    return (<div>
        {usedStack}
    </div>)
}
export default StackInfoBS

