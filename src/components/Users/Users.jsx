import React from 'react'
import styles from './Users.module.css'
import userPhoto from "../../assets/img/user.png";
import Preloader from '../common/Preloader/Preloader';
import {NavLink} from 'react-router-dom'
import { usersApi } from '../../api/api';


const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []

    for(let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }
    return (
        <div>
          {props.isFetching ? <Preloader /> : null}
        <div>
          {pages.map(p => {
            return <span key={p} className={props.currentPage === p ? styles.selectedPage : ''} onClick={() => {props.onPageChange(p)}}>{p}</span>
          })}
        </div>
        {props.users.map((u) => (
          <div key={u.id}>
            <span>
              <div>
                <NavLink to={'/profile/' + u.id}>
                  <img
                    src={u.photos.small != null ? u.photos.small : userPhoto}
                    alt={u.id}
                    className={styles.userPhoto}
                  />
                </NavLink>
              </div>
              <div>
                {u.followed ? (
                  <button
                    onClick={() => {
                      usersApi.unfollowUser(u.id)
                        .then((data) => {
                          if(data.resultCode === 0) {
                            props.unfollow(u.id);
                          }
                        });
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      usersApi.followUser(u.id)
                        .then((data) => {
                          if(data.resultCode === 0) {
                            props.follow(u.id);
                          }
                        });
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </span>
            <span>
              <span>
                <div>{u.name}</div>
                <div>{u.status}</div>
              </span>
              <span>
                <div>{"u.location.country"}</div>
                <div>{"u.location.city"}</div>
              </span>
            </span>
          </div>
        ))}
      </div>
    )
}

export default Users