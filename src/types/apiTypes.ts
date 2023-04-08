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
