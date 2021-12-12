import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        'API-KEY': "d734b2e9-499a-4520-8779-b3c38f7c5878"
    }
}) 

export const usersApi = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    unfollowUser(userId:number) {
        return instance.delete(`follow/${userId}`).then(response => response.data)
    },
    followUser(userId:number) {
        return instance.post(`follow/${userId}`).then(response => response.data)
    },
    getProfile(userId:number) {
        console.warn('Obsolete method. Please use profileApi object')
        return profileApi.getProfile(userId)
    }
}

export const profileApi = {
    getProfile(userId:number) {
        return instance.get(`profile/${userId}`).then(response => response.data)
    },
    getStatus(userId:number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status:string) {
        return instance.put(`profile/status`, {status: status})
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {id:number, email: string, login: string}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {userId: number}
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}

export const authApi = {
    me() {
        return instance.get<MeResponseType>("auth/me").then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post<LoginResponseType>("auth/login", {email, password, rememberMe}).then(response => response.data)
    },
    logout() {
        return instance.delete("auth/login").then(response => response.data)
    }
}



// export const getUsers = (currentPage = 1, pageSize = 10) => {
//     return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
// }

// export const getIsAuth = () => {
//     return instance.get("auth/me").then(response => response.data)
// }

// export const unfollowUser = (userId) => {
//     return instance.delete(`follow/${userId}`).then(response => response.data)
// }

// export const followUser = (userId) => {
//     return instance.post(`follow/${userId}`).then(response => response.data)
// }
