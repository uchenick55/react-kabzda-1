import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "672204d9-92d7-4a15-9913-d64f4d26dd62"
    }
});

export let apiUsers = {
    getUsers: (currentPage, pageSize) => {
        return (
            instance.get(`users?count=${pageSize}&page=${currentPage}`)
                .then((response) => {
                    return (response.data)
                })
        )
    },
    postFollow: (userId) => {
        return (
            instance.post(`follow/${userId}`)
                .then((response) => {
                    return (response.data)
                })
        )
    },
    deleteFollow: (userId) => {
        return (
            instance.delete(`follow/${userId}`)
                .then((response) => {
                    return (response.data)
                })
        )
    }
}

export let apiProfile = {
    getProfile: (userId) => {
        return (
            instance.get(`profile/` + userId)
                .then((response) => {
                    return (response.data)
                })
        )
    },
    getAuthMe: () => {
        return (
            instance.get(`auth/me`)
                .then((response) => {
                    return (response.data)
                })
        )
    },
    getStatus: (userId) => {
        return (
            instance.get(`/profile/status/${userId}`)
                .then((response) => {
                    return (response.data)
                })
        )
    },
    putStatus: (statusTmpInput) => {
        return (
            instance.put(`/profile/status/`, {status: statusTmpInput})
                .then((response) => {
                    return (response.data)
                })
        )
    }
}











