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
    getIsAuth() {
        return instance.get("auth/me").then(response => response.data)
    },
    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`).then(response => response.data)
    },
    followUser(userId) {
        return instance.post(`follow/${userId}`).then(response => response.data)
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
