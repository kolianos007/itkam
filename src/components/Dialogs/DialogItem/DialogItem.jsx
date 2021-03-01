import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./../Dialogs.module.css";

const DialogItem = ({ name, id }) => {
  return (
    <div className={classes.dialog + " " + classes.active}>
      <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
    </div>
  );
};

export default DialogItem;
