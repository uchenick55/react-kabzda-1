import {ResultCodeEnum, ResultCodeEnumCaptcha} from "./enum";

export type GetProfileType = {
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


export type UsersType = {
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

export type GetUsersType = {
    error: object,
    items: Array<UsersType>,
    totalCount: number
}
export type GetCaptchaType = {
    url: string
}

//Общий возвращаемый тип на ряд запросов - дженерик
export type CommRespType<D={}, RC = ResultCodeEnum > = {
    resultCode: RC // 0 успешный ответ, 1 ошибка, 10 - каптча. Все определяется Enum
    messages: ApiErrorMsgType,
    data: D // возможны разные варианты ответа объекта data
    fieldsErrors: Array<string>,

}
export type D2ItemType = {
    id: number, //27045
    userName: string, //"evgeniysazonov"
    hasNewMessages: boolean,
    lastDialogActivityDate: string, //"2023-04-30T19:10:31.843"
    lastUserActivityDate: string, //"2023-04-30T10:34:17.757"
    newMessagesCount: number, //0
    photos: {
        small: string,// "https://social-network.samuraijs.com/activecontent/images/users/27045/user-small.jpg?v=1",
        large: string// "https://social-network.samuraijs.com/activecontent/images/users/27045/user.jpg?v=1"
    }
}

export type GetDialog2AllType = Array<D2ItemType>

export type SendMessageType = {
    id: string// "cde7821a-6981-4f49-8b12-faf681cb1621",
    body: string// "555",
    translatedBody: null,
    addedAt: string// "2023-05-01T07:13:00.54",
    senderId:number// 25528,
    senderName:string// "evgeniysazonov1983",
    recipientId: number//27045,
    recipientName:string// "evgeniysazonov",
    viewed: boolean// false,
    deletedBySender:boolean//false,
    deletedByRecipient:boolean //false,
    isSpam: boolean//false,
    distributionId: number//null
}

export type ApiErrorMsgType = Array<string>
