import React, { FC } from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/img/user.png";
import Preloader from "../common/Preloader/Preloader";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";

type UsersType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  isFetching: boolean;
  followingInProgress: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
  users: Array<UserType>;
};

const Users: FC<UsersType> = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChange,
  isFetching,
  followingInProgress,
  unfollow,
  follow,
  users,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <div>
      {isFetching ? <Preloader /> : null}
      <div>
        {pages.map((p) => {
          return (
            <span
              key={p}
              className={currentPage === p ? styles.selectedPage : ""}
              onClick={() => {
                onPageChange(p);
              }}
            >
              {p}
            </span>
          );
        })}
      </div>
      {users.map((u: UserType) => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                <img
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  disabled={followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    follow(u.id);
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
  );
};

export default Users;
