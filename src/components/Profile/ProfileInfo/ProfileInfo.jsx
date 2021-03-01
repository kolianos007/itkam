import React from "react";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ_G9U9095poYEIvtg8fnA2Ef3dcjLEebptQ&usqp=CAU"
          alt=""
        />
      </div>
      <div className={classes.descriptionBlock}>ava + descr</div>
    </div>
  );
};

export default ProfileInfo;
