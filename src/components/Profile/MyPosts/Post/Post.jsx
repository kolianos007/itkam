import React from "react";
import classes from "./Post.module.css";

const Post = ({ message, likesCount }) => {
  return (
    <div className={classes.item}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNslP7-_P7jz5MrT5yhW14y_IzBDbZZT0ag&usqp=CAU"
        alt=""
      />
      {message}
      <div>
        <span>like </span>
        {likesCount}
      </div>
    </div>
  );
};

export default Post;
