import { stopSubmit } from "redux-form"
import { authApi } from "../api/api"

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA"

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    data: {id, email, login, isAuth}
})

//thunk-creator
export const getAuthUserData = () => (dispatch) => {
    return authApi.me().then(
        data => {
            if(data.resultCode === 0) {
                const {id, login, email} = data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        }
    )
}

export const login = (email, password, rememberMe) => (dispatch) => {
    authApi.login(email, password, rememberMe).then(
        data => {
            if(data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                const message = data.messages.length > 0 ? data.messages[0] : "Some error"
                dispatch(stopSubmit("login", {_error: message}))
            }
        }
    )
}

export const logout = () => (dispatch) => {
    authApi.logout().then(
        data => {
            if(data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        }
    )
}

export default authReducer