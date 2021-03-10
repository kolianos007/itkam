import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from 'redux-form'

const AddNewPostsForm = (props)=> {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="newPostText" component="textarea"/>
      </div>
      <div>
        <button>Add Post</button>
      </div>
    </form>
  )
}

const PostsReduxForm = reduxForm({
  form: "ProfileAddNewPostForm"
})(AddNewPostsForm)

const MyPosts = ({ posts, addPost }) => {
  let postsElements = posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ));

  let onAddPost = (values) => {
    addPost(values.newPostText);
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <PostsReduxForm onSubmit={onAddPost} />
      <div>new post</div>
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
