export type getAuthMeType = {
    resultCode: number,
    messages: Array<string>,
    data: {
        id: number,
        email: string,
        login: string
    }
}
export type getProfileType = {
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

export type commonResponseType = {
    resultCode: number
    messages: Array<string>,
    fieldsErrors: Array<string>,
    data: object
}
