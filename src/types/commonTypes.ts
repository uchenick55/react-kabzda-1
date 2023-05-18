import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "../redux/store-redux";


export type postsType = {
    id: number
    message: string
    like: number
}
export type ProfileType = {
    AboutMe: string,
    FullName: string,
    LookingForAJob: boolean,
    LookingForAJobDescription: string,
    contacts: {
        facebook: string,
        github: string,
        instagram: string,
        mainLink: string
        twitter: string,
        vk: string,
        website: string,
        youtube: string
    }
    //  userId: number
}


export type apiFeedBackDataType = {
    email: string
    message: string
    name: string
}

export type NulableType<n> = null | n // тип нулевой


export type tasksDataType = {
    TaskHeader: JSX.Element | string, // заголовок задачи
    imgSrc: string, // источник картинки
    taskLink: string, // ссылка на задачу
    altTitle: string, // альтернатива картинке
    description: JSX.Element[], // описание задачи
    repositoryHref: string // ссылка на репозиторий
}


export type DateType = {
    Day: number
    Hour: number
    Minutes: number
    Month: string
    Seconds: number
    Year: number
}

export type messages2Type = {
    id: number
    Date: DateType
    userId: number
    message: string
}


export type dialogs2Type = {
    dialogId: number
    userId: number
    userName: string
    userPhoto: string
}

export type modalHeaderType = JSX.Element | string
export type modalBodyType = JSX.Element | string


export type ComThunkTp<A extends Action> = ThunkAction<
    void,    // санка ничего не возвращает
    GlobalStateType,    // глобальный стейт из redux
    unknown,    // нет доп параметров
    A // все типы ActionCreator
    >