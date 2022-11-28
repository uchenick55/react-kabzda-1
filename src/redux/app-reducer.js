import {getAuthMeThunkCreator} from "./auth-reducer";
import {state_copy_for_debug} from "./store-redux";

const SET_INITIALISED_APP = "myApp/app-reducer/SET_INITIALISED_APP"; //константа инициализации приложения

export let setInitialisedApp = () => { // экшн креатор  инициализации приложения
    return {type: SET_INITIALISED_APP}
};

let initialState = { //стейт по умолчанию для инициализации приложения
    initialisedApp: false, // флаг приложение инициализировано?
    bedug_mode: false,
}

let appReducer = (state = initialState, action) => {//редьюсер инициализации приложения
  let stateCopy; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_INITIALISED_APP: // экшн инициализации приложения
            stateCopy = {
                ...state, // копия всего стейта
                initialisedApp: true, // смена флага инициализации приложения на true
            }
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}

export let initialisedAppThunkCreator = () =>{// санкреатор инициализации приложения
    let initialisedAppThunk = (dispatch) => { // санки  инициализации приложения
        const promise1 = dispatch(getAuthMeThunkCreator()) // диспатч инициализации
        Promise.all([promise1])
          .then(()=>{
            // если диспатч авторизации прошел успешно (и все остальные диспатчи в массиве)
            dispatch(setInitialisedApp()) // смена флага инициализации на true
        })
    }
    return initialisedAppThunk;
}

export default appReducer;










