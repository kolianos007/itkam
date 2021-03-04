import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = ({ posts, newPostText, updateNewPostText, addPost }) => {
  let postsElements = posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ));

  let newPostElement = React.createRef();

  let onAddPost = () => {
    addPost();
    // dispatch(addPostActionCreator());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    updateNewPostText(text);
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <textarea
          onChange={onPostChange}
          ref={newPostElement}
          value={newPostText}
        />
      </div>
      <div>
        <button onClick={onAddPost}>Add Post</button>
      </div>
      <div>new post</div>
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
