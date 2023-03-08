export type usersType = {
    followed: boolean
    id:number
    name:string
    photos: {
        large: string | null
        small: string | null
    }
    status: string | null
    uniqueUrlName:string | null
}


export type postsType = {
    id: number
    message: string
    like: number
}
