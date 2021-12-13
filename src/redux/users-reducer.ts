import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersApi } from "../api/api";
import { UserType } from "../types/types";
import { AppStateType } from "./redux-store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const TOTAL_USERS_COUNT = "TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS"

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, //array of users ids
};

type InitialState = typeof initialState

const usersReducer = (state = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case FOLLOW:
        return {
            ...state,
            users: state.users.map(u => {
                if(u.id === action.userId) {
                    return {...u, followed: true}
                }
                return u
            })
        }
    case UNFOLLOW: 
        return {
            ...state,
            users: state.users.map(u => {
                if(u.id === action.userId) {
                    return {...u, followed: false}
                }
                return u
            })
        }
    case SET_USERS: 
        return {
            ...state,
            users: action.users
        }
    case SET_CURRENT_PAGE:
        return {
            ...state,
            currentPage: action.currentPage
        }
    case TOTAL_USERS_COUNT:
        return {
            ...state,
            totalUsersCount: action.totalUsersCount
        }
    case TOGGLE_IS_FETCHING:
        return {
            ...state,
            isFetching: action.isFetching
        }
    case TOGGLE_FOLLOWING_PROGRESS:
        return {
            ...state,
            followingInProgress: action.isFetching 
            ? [...state.followingInProgress, action.userId] 
            : state.followingInProgress.filter(id => id !== action.userId)
        }
    default:
        return state
  }
};

type ActionsType = any

export const actions = {
    followSuccess: (userId: number) => ({
    type: FOLLOW,
    userId
    }),
    unfollowSuccess: (userId: number) => ({
    type: UNFOLLOW,
    userId
    }),
    setUsers: (users: Array<UserType>) => ({
    type: SET_USERS,
    users
    }),
    setCurrentPage: (currentPage: number) => ({
    type: SET_CURRENT_PAGE,
    currentPage
    }),
    setTotalUsersCount: (totalUsersCount: number) => ({
    type: TOTAL_USERS_COUNT,
    totalUsersCount
    }),
    toggleIsFetching: (isFetching: boolean) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
    }),
    toggleFollowingProgress: (isFetching:boolean, userId:number) => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFetching,
    userId
    })
}

// thunkCreator
type GetStateType = () => AppStateType
type CurrentDispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch:CurrentDispatchType, getState: GetStateType) => {
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.toggleIsFetching(true))
        await usersApi.getUsers(currentPage, pageSize)
        .then((data) => {
            dispatch(actions.toggleIsFetching(false))
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setTotalUsersCount(data.totalCount))
      });
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleFollowingProgress(true, userId))
            await usersApi.followUser(userId)
            .then((data) => {
                if(data.resultCode === 0) {
                dispatch(actions.followSuccess(userId))
                }
                dispatch(actions.toggleFollowingProgress(false, userId))
            });
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId))
            await usersApi.unfollowUser(userId)
            .then((data) => {
                if(data.resultCode === 0) {
                dispatch(actions.unfollowSuccess(userId))
                }
                dispatch(actions.toggleFollowingProgress(false, userId))
            });
    }
}

export default usersReducer;
