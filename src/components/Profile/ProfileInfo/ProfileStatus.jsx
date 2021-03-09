import React from 'react'
import classes from "./ProfileInfo.module.css";

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    activateEditMode() {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode() {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&  
                <div onDoubleClick={this.activateEditMode.bind(this)}>
                    <span>{this.props.status}</span>
                </div>}
                {this.state.editMode &&
                <div onBlur={this.deactivateEditMode.bind(this)}>
                    <input autoFocus value={this.props.status}/>
                </div>}
            </div>
        )
    }
}

export default ProfileStatus