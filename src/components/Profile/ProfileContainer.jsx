import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {getUserProfile, getStatus, updateStatus} from '../../redux/profile-reducer'
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class ProfileContainer extends React.Component{

    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        console.log(this.props.status)
        return (
            <Profile {...this.props} profile={this.props.userProfile} status={this.props.status} updateStatus={this.props.updateStatus} />
        )
    }

};

const mapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authorizedUserId: state.auth.id
    }
}

export default compose(connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}), withRouter)(ProfileContainer)
