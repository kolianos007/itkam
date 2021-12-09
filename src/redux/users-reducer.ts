import { usersApi } from "../api/api";
import { PhotosType, UserType } from "../types/types";

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

const usersReducer = (state = initialState, action: any): InitialState => {
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

type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userId: number
}
export let followSuccess = (userId: number): FollowSuccessActionType => ({
    type: FOLLOW,
    userId
});

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userId: number
}

export let unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({
    type: UNFOLLOW,
    userId
});

type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}

export let setUsers = (users: Array<UserType>): SetUsersActionType => ({
    type: SET_USERS,
    users
})

type SetCurrentActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

export let setCurrentPage = (currentPage: number): SetCurrentActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

type SetTotalActionType = {
    type: typeof TOTAL_USERS_COUNT,
    totalUsersCount: number
}

export let setTotalUsersCount = (totalUsersCount: number): SetTotalActionType => ({
    type: TOTAL_USERS_COUNT,
    totalUsersCount
})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}

export let toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS,
    isFetching: boolean
    userId: number
}

export let toggleFollowingProgress = (isFetching:boolean, userId:number): ToggleFollowingProgressActionType => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

// thunkCreator
export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch:any) => {
        dispatch(setCurrentPage(currentPage))
        dispatch(toggleIsFetching(true))
        usersApi.getUsers(currentPage, pageSize)
        .then((data) => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
      });
    }
}

export const follow = (userId: number) => {
    return (dispatch:any) => {
        dispatch(toggleFollowingProgress(true, userId))
            usersApi.followUser(userId)
            .then((data) => {
                if(data.resultCode === 0) {
                dispatch(followSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            });
    }
}

export const unfollow = (userId: number) => {
    return (dispatch:any) => {
        dispatch(toggleFollowingProgress(true, userId))
            usersApi.unfollowUser(userId)
            .then((data) => {
                if(data.resultCode === 0) {
                dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            });
    }
}

export default usersReducer;
