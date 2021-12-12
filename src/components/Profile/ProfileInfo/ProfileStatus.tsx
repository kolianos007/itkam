import React, { ChangeEvent } from "react";
import classes from "./ProfileInfo.module.css";
import { updateStatus } from "../../../redux/profile-reducer";

type PropsType = {
  status: string;
  updateStatus: (newStates: string) => void;
};

type StateType = {
  editMode: boolean;
  status: string;
};

class ProfileStatus extends React.Component<PropsType, StateType> {
  state = {
    editMode: false,
    status: !this.props.status ? "------" : this.props.status,
  };

  activateEditMode() {
    this.setState({
      editMode: true,
    });
  }
  deactivateEditMode() {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  }

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode.bind(this)}>
              {this.state.status}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onBlur={this.deactivateEditMode.bind(this)}
              onChange={this.onStatusChange}
              autoFocus
              defaultValue={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
