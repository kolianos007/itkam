import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import {follow, setCurrentPage, unfollow, toggleFollowingProgress, getUsers} from '../../redux/users-reducer'
import { compose } from 'redux'
import {getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersS} from '../../redux/users-selectors'

class UsersContainer extends React.Component {

    componentDidMount() {
      this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
  
    onPageChange = (pageNumber) => {
      this.props.getUsers(pageNumber, this.props.pageSize)
    }
  
    render() {

      return <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize} currentPage={this.props.currentPage} onPageChange={this.onPageChange} users={this.props.users} follow={this.props.follow} unfollow={this.props.unfollow} isFetching={this.props.isFetching} followingInProgress={this.props.followingInProgress} /> 
    }
  };

// const mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//     }
// }

const mapStateToProps = (state) => {
    return {
        users: getUsersS(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPageAC(currentPage))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//           dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }

export default compose(connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  getUsers
}))(UsersContainer)