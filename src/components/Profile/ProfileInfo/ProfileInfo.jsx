import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import classes from "./ProfileInfo.module.css";
import ProfileStatus from './ProfileStatus'

const ProfileInfo = (props) => {
  if(!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      {/* <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ_G9U9095poYEIvtg8fnA2Ef3dcjLEebptQ&usqp=CAU"
          alt=""
        />
      </div> */}
      <div className={classes.descriptionBlock}>
        <div>{props.profile.fullName}</div>
        {/* <img src={props.profile.photos.large} alt=""/> */}
        <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
        <span>{props.profile.aboutMe}</span>
        <ul>
          <li>{props.profile.contacts.facebook}</li>
          <li>{props.profile.contacts.vk}</li>
          <li>{props.profile.contacts.twitter}</li>
          <li>{props.profile.contacts.instagram}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileInfo;
