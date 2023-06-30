import React from "react";
import "bootstrap/dist/css/bootstrap-grid.min.css"
import Container from "react-bootstrap/Container";
import commonClasses from "../common/CommonClasses/common.module.css";

type StackInfoBSType = {}
const StackInfoBS:React.FC<StackInfoBSType> = () => {
    const usedStack = <div>
        <Container>

            <h2 className={commonClasses.pageHeader}>My Stack</h2>

            <p><b>UI (React):</b> CRA, function component, props (spread), import /export (named/default),
                connect (mstp, mdtp ), class component (lifecycle methods, localState, this),
                presentation/wrapped components, HOC (isAuth redirect, withRouter), compose, preloader, ref/value,
                async. buttons disabled, initial App, useState/ useEffect/ useReducer/ useParams/ useNavigate/ useDispatch/ useSelector / useMemo/ useCallback/ React.memo,
                lazy/Suspense/ ErrorBoundary/namedExport, selector, BrowserRouter/HashRouter
                (NavLink/Navigate/ Routes/Route), Lifting State Up, top-down (unidirectional) flow, props.children, fragment, JSX, React.createElement </p>
            <p><b>BLL (Redux):</b> store, state, reducer, callback, dispatch, action (type), action creator, case/switch,
                redux-ducks. </p>
            <p><b>DAL (API):</b> ajax, axios (instance.interceptors.response.use - common error), REST API/GraphQL, async/await, .then/.catch., thunk (thunkCreator, thunkMiddleWare, getState ), saga (sagaMiddleware, watcher, worker (yield), effects)  </p>
            <p><b>JS:</b>pagination, try/catch/finally, setTimeout/setInterval, Object.keys/values/ hasOwnProperty,  Math.ceil/floor, new Date(), JSON.stringify, deep/shallow copy, structuredClone, closure, map, filter, some, find, sort, reduce, forEach, slice, splice, split, join, includes, Array.from, reverse etc. </p>
            <p><b>Typescript:</b> primitives, Array/Object/function, ReturnType, typeof, commonType/import, selector,  reducer, thunkType, connect(MSTP, MDTP, globalStateType), event, FC/CC, useState, generic, InferActionsTypes  </p>
            <p><b>Git:</b> checkout (-b), commit –a -m, merge, push, branch (–m), gitk –all&, reset –hard, pull.       </p>
            <p><b>Libs:</b> react-router-dom, react-redux, redux-form, formik + yup, reselect, styled-components.        </p>
            <p><b>Node: </b>npm/npx </p>
            <p><b>IDE:</b> Webstorm/ codesandbox </p>
            <p><b>Test:</b> Jest/ PlayWright.</p>
            <p><b>Extra:</b> base html, fieldset/legend, cookie, github pages.</p>
            <p><b>Style:</b> basic css (+ grid), module.css, SCSS, bootstrap(+react). </p>
            <p><b>BugFix:</b> debugger/ breakpoint/console/ network/window.store, ReduxDevTools (state, history), ReactDevTools(state, props, components).</p>
            <p><b>CodeWars acc:</b> <a href="https://www.codewars.com/users/uchenick55/completed" >completed kata</a></p>

        </Container>
    </div>

    return (<div>
        {usedStack}
    </div>)
}
export default StackInfoBS

