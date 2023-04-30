import {ResultCodeEnum, ResultCodeEnumCaptcha} from "./enum";

export type getProfileType = {
    aboutMe: string,
    userId: number
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: {
        github: string,
        vk: string,
        facebook: string,
        instagram: string,
        twitter: string
        website: string
        youtube: string
        mainLink: string
    },
    photos: {
        small: string,
        large: string
    }
    URL: string | null
}


export type usersType = {
    followed: boolean
    id: number
    name: string
    photos: {
        large: string | null
        small: string | null
    }
    status: string | null
    uniqueUrlName: string | null
}

export type getUsersType = {
    error: object,
    items: Array<usersType>,
    totalCount: number
}
export type getCaptchaType = {
    url: string
}



export type commonResponseType = {
    resultCode: ResultCodeEnum | ResultCodeEnumCaptcha
    messages: Array<string>,
    fieldsErrors: Array<string>,
    data: object
}

//Общий тип возвращаемый
export type commRespType<D={}, RC = ResultCodeEnum > = {
    resultCode: RC // 0 успешный ответ, 1 ошибка, 10 - каптча. Все определяется Enum
    messages: Array<string>,
    data: D // возможны разные варианты ответа объекта data
    fieldsErrors: Array<string>,

}
